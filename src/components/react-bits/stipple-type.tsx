"use client";

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useSyncExternalStore,
  type CSSProperties,
  type ReactNode,
} from "react";
import * as THREE from "three";
import "./stipple-type.css";

export interface StippleTypeHandle {
  drop: (x?: number, y?: number, size?: number) => void;
  stir: (from: [number, number], to: [number, number], duration?: number) => void;
  replay: () => void;
}

export interface StippleTypeProps {
  text?: string;
  fontFamily?: string;
  fontWeight?: number;
  fontSize?: number;
  letterSpacing?: number;
  lineHeight?: number;
  colors?: [string, string];
  baseColor?: string;
  bandSize?: number;
  waviness?: number;
  grain?: number;
  grainSize?: number;
  dotSize?: number;
  current?: number;
  interactive?: boolean;
  stirStrength?: number;
  stirRadius?: number;
  dropInk?: boolean;
  dropSize?: number;
  viscosity?: number;
  memory?: number;
  intro?: boolean;
  introDuration?: number;
  paused?: boolean;
  quality?: number;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

interface Settings {
  text: string;
  fontFamily: string;
  fontWeight: number;
  fontSize: number;
  letterSpacing: number;
  lineHeight: number;
  colors: [string, string];
  baseColor: string;
  bandSize: number;
  waviness: number;
  grain: number;
  grainSize: number;
  dotSize: number;
  current: number;
  interactive: boolean;
  stirStrength: number;
  stirRadius: number;
  dropInk: boolean;
  dropSize: number;
  viscosity: number;
  memory: number;
  intro: boolean;
  introDuration: number;
  paused: boolean;
  quality: number;
  reduced: boolean;
}

interface Controller {
  sync: () => void;
  destroy: () => void;
  drop: (x: number, y: number, size: number) => void;
  stir: (from: [number, number], to: [number, number], duration: number) => void;
  replay: () => void;
}

interface Drop {
  x: number;
  y: number;
  radius: number;
  target: number;
  age: number;
  hue: number;
}

interface Stroke {
  from: [number, number];
  to: [number, number];
  duration: number;
  elapsed: number;
}

type Lab = [number, number, number];

const STEP = 1 / 60;

const subscribeToMotion = (notify: () => void) => {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", notify);
  return () => media.removeEventListener("change", notify);
};

const readMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

let colorContext: CanvasRenderingContext2D | null = null;

const parseColor = (value: string, fallback: Lab): Lab => {
  if (!colorContext) colorContext = document.createElement("canvas").getContext("2d", { willReadFrequently: true });
  if (!colorContext) return fallback;
  colorContext.fillStyle = "#010203";
  colorContext.fillStyle = value;
  if (String(colorContext.fillStyle) === "#010203" && value.trim().toLowerCase() !== "#010203") return fallback;
  colorContext.clearRect(0, 0, 1, 1);
  colorContext.fillRect(0, 0, 1, 1);
  const pixel = colorContext.getImageData(0, 0, 1, 1).data;
  return [pixel[0] / 255, pixel[1] / 255, pixel[2] / 255];
};

const toLinear = (value: number) =>
  value <= 0.04045 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4);

const toOklab = ([r, g, b]: Lab): Lab => {
  const lr = toLinear(r);
  const lg = toLinear(g);
  const lb = toLinear(b);
  const l = Math.cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb);
  const m = Math.cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb);
  const s = Math.cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb);
  return [
    0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
  ];
};

const inkVertex = `
out vec2 vPos;

void main() {
  vec4 world = modelMatrix * vec4(position, 1.0);
  vPos = world.xy;
  gl_Position = projectionMatrix * viewMatrix * world;
}
`;

const inkFragment = `
precision highp float;
uniform sampler2D uMask;
uniform vec4 uMaskRect;
uniform sampler2D uMap;
uniform vec4 uMapRect;
uniform ivec2 uMapSize;
uniform sampler2D uStir;
uniform vec4 uStirRect;
uniform ivec2 uStirSize;
uniform vec3 uInkA;
uniform vec3 uInkB;
uniform vec3 uInkC;
uniform vec3 uBase;
uniform float uBand;
uniform float uWave;
uniform float uGrain;
uniform float uGrainSize;
uniform float uDotSize;
uniform vec2 uDrift;
uniform float uIntro;
in vec2 vPos;
out vec4 fragColor;

vec3 labToLinear(vec3 lab) {
  float l = lab.x + 0.3963377774 * lab.y + 0.2158037573 * lab.z;
  float m = lab.x - 0.1055613458 * lab.y - 0.0638541728 * lab.z;
  float s = lab.x - 0.0894841775 * lab.y - 1.2914855480 * lab.z;
  l = l * l * l;
  m = m * m * m;
  s = s * s * s;
  return max(vec3(
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s
  ), 0.0);
}

vec3 encode(vec3 c) {
  c = clamp(c, 0.0, 1.0);
  return mix(c * 12.92, 1.055 * pow(c, vec3(1.0 / 2.4)) - 0.055, step(vec3(0.0031308), c));
}

vec2 hash2(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return fract(sin(p) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
  float a = dot(hash2(i) - 0.5, f);
  float b = dot(hash2(i + vec2(1.0, 0.0)) - 0.5, f - vec2(1.0, 0.0));
  float c = dot(hash2(i + vec2(0.0, 1.0)) - 0.5, f - vec2(0.0, 1.0));
  float d = dot(hash2(i + vec2(1.0, 1.0)) - 0.5, f - vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y) * 2.0;
}

float fbm(vec2 p) {
  return noise(p) * 0.6 + noise(p * 2.03 + vec2(3.1, 1.7)) * 0.3 + noise(p * 4.07 - vec2(1.7, 4.3)) * 0.1;
}

vec3 marble(vec2 h) {
  vec2 q = h / uBand;
  vec2 warp = vec2(fbm(q * 0.42 + vec2(1.7, 9.2)), fbm(q * 0.42 + vec2(8.3, 2.8)));
  float s = q.y * 0.8 + uWave * 1.35 * fbm(q * 0.55 + warp * 1.7) + 0.35 * sin(q.x * 0.31 + warp.x * 2.0);
  float f1 = abs(fract(s) - 0.5);
  float veinA = 1.0 - smoothstep(0.035, 0.12, f1);
  float f2 = abs(fract(s + 0.5) - 0.5);
  float veinB = 1.0 - smoothstep(0.015, 0.065, f2);
  float cloud = 0.5 + 0.5 * fbm(q * 0.3 + warp + 5.0);
  vec3 col = mix(uInkC, mix(uInkC, uInkA, 0.4), smoothstep(0.45, 0.85, cloud));
  col = mix(col, uInkA, veinA);
  return mix(col, uInkB, veinB);
}

vec3 dye(float hue) {
  return hue < 0.33 ? uInkB : hue < 0.66 ? uInkC : uInkA;
}

vec4 mapAt(vec2 p) {
  vec2 g = vec2((p.x - uMapRect.x) / uMapRect.z, (uMapRect.y - p.y) / uMapRect.z) - 0.5;
  ivec2 i = ivec2(floor(g));
  vec2 f = g - vec2(i);
  ivec2 top = uMapSize - 1;
  vec4 a = texelFetch(uMap, clamp(i, ivec2(0), top), 0);
  vec4 b = texelFetch(uMap, clamp(i + ivec2(1, 0), ivec2(0), top), 0);
  vec4 c = texelFetch(uMap, clamp(i + ivec2(0, 1), ivec2(0), top), 0);
  vec4 d = texelFetch(uMap, clamp(i + ivec2(1, 1), ivec2(0), top), 0);
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float stirAt(vec2 p) {
  vec2 g = vec2((p.x - uStirRect.x) / uStirRect.z, (uStirRect.y - p.y) / uStirRect.z) - 0.5;
  ivec2 i = ivec2(floor(g));
  vec2 f = g - vec2(i);
  ivec2 top = uStirSize - 1;
  float a = texelFetch(uStir, clamp(i, ivec2(0), top), 0).r;
  float b = texelFetch(uStir, clamp(i + ivec2(1, 0), ivec2(0), top), 0).r;
  float c = texelFetch(uStir, clamp(i + ivec2(0, 1), ivec2(0), top), 0).r;
  float d = texelFetch(uStir, clamp(i + ivec2(1, 1), ivec2(0), top), 0).r;
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

vec3 inkAt(vec2 p) {
  vec4 field = mapAt(p);
  vec2 h = vec2(p.x + field.x, p.y - field.y) + uDrift;
  float amount = clamp(field.z, 0.0, 1.0);
  return mix(marble(h), dye(field.w / max(field.z, 1e-4)), amount);
}

void main() {
  vec2 mu = vec2((vPos.x - uMaskRect.x) / uMaskRect.z, (uMaskRect.y - vPos.y) / uMaskRect.w);
  float alpha = smoothstep(0.25, 0.75, texture(uMask, mu).a);
  if (alpha < 0.003) discard;
  vec2 g = vPos / uGrainSize;
  float aa = max(length(fwidth(g)) * 0.75, 1e-3);
  vec2 cell = floor(g);
  float best = 1e9;
  vec2 centre = g;
  vec2 seed = vec2(0.0);
  for (int j = -1; j <= 1; j++) {
    for (int i = -1; i <= 1; i++) {
      vec2 c = cell + vec2(float(i), float(j));
      vec2 r = hash2(c);
      vec2 p = c + 0.5 + (r - 0.5) * 0.76;
      float d = length(g - p);
      if (d < best) {
        best = d;
        centre = p;
        seed = r;
      }
    }
  }
  vec2 dot = centre * uGrainSize;
  float across = clamp((dot.x - uMaskRect.x) / uMaskRect.z, 0.0, 1.0);
  float rank = 0.4 * seed.x + 0.6 * across;
  float reveal = smoothstep(rank, rank + 0.1, uIntro * 1.45);
  float settle = smoothstep(rank + 0.16, rank + 0.45, uIntro * 1.45);
  float stirred = clamp(stirAt(dot), 0.0, 1.0);
  float merged = settle * (1.0 - stirred) * (1.0 - uGrain);
  float radius = mix((0.26 + 0.12 * seed.y) * uDotSize, 1.25, merged);
  float cover = (1.0 - smoothstep(radius - aa, radius + aa, best)) * reveal;
  vec3 ink = inkAt(mix(dot, vPos, merged));
  ink.x *= 0.975 + 0.05 * seed.y * (1.0 - merged * 0.6);
  vec3 lab = mix(uBase, ink, cover);
  float fill = smoothstep(0.25, 0.8, uIntro);
  float a = alpha * max(fill, cover);
  fragColor = vec4(encode(labToLinear(lab)) * a, a);
}
`;

const createInk = (root: HTMLDivElement, settingsRef: { current: Settings }): Controller | null => {
  const canvas = document.createElement("canvas");
  canvas.setAttribute("aria-hidden", "true");
  canvas.style.position = "absolute";
  canvas.style.inset = "0";
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.style.display = "block";
  canvas.style.pointerEvents = "none";
  root.prepend(canvas);

  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, premultipliedAlpha: true, antialias: false });
  } catch {
    canvas.remove();
    return null;
  }
  if (!renderer.capabilities.isWebGL2) {
    renderer.dispose();
    canvas.remove();
    return null;
  }
  renderer.setClearColor(0x000000, 0);

  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, -10, 10);
  const scene = new THREE.Scene();
  const maskCanvas = document.createElement("canvas");
  const maskTexture = new THREE.CanvasTexture(maskCanvas);
  maskTexture.flipY = false;
  maskTexture.minFilter = THREE.LinearFilter;
  maskTexture.magFilter = THREE.LinearFilter;
  maskTexture.generateMipmaps = false;
  maskTexture.colorSpace = THREE.NoColorSpace;

  const makeTexture = (data: Float32Array, w: number, h: number, format: THREE.PixelFormat) => {
    const texture = new THREE.DataTexture(data, w, h, format, THREE.FloatType);
    texture.minFilter = THREE.NearestFilter;
    texture.magFilter = THREE.NearestFilter;
    texture.flipY = false;
    texture.needsUpdate = true;
    return texture;
  };
  let mapTexture = makeTexture(new Float32Array(4), 1, 1, THREE.RGBAFormat);
  let stirTexture = makeTexture(new Float32Array(1), 1, 1, THREE.RedFormat);
  const uniforms = {
    uMask: { value: maskTexture },
    uMaskRect: { value: new THREE.Vector4(0, 0, 1, 1) },
    uMap: { value: mapTexture as THREE.Texture },
    uMapRect: { value: new THREE.Vector4(0, 0, 1, 0) },
    uMapSize: { value: new THREE.Vector2(1, 1) },
    uStir: { value: stirTexture as THREE.Texture },
    uStirRect: { value: new THREE.Vector4(0, 0, 1, 0) },
    uStirSize: { value: new THREE.Vector2(1, 1) },
    uInkA: { value: new THREE.Vector3() },
    uInkB: { value: new THREE.Vector3() },
    uInkC: { value: new THREE.Vector3() },
    uBase: { value: new THREE.Vector3() },
    uBand: { value: 40 },
    uWave: { value: 0.7 },
    uGrain: { value: 0.1 },
    uGrainSize: { value: 2 },
    uDotSize: { value: 1 },
    uDrift: { value: new THREE.Vector2() },
    uIntro: { value: 1 },
  };
  const material = new THREE.ShaderMaterial({
    glslVersion: THREE.GLSL3,
    vertexShader: inkVertex,
    fragmentShader: inkFragment,
    uniforms,
    transparent: true,
    depthTest: false,
    depthWrite: false,
    premultipliedAlpha: true,
    blending: THREE.CustomBlending,
    blendSrc: THREE.OneFactor,
    blendDst: THREE.OneMinusSrcAlphaFactor,
  });
  const quad = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material);
  quad.frustumCulled = false;
  scene.add(quad);

  const box = { x0: 0, y0: 0, x1: 0, y1: 0, size: 100 };
  const fluid = {
    nx: 2,
    ny: 2,
    cell: 8,
    u: new Float32Array(4),
    v: new Float32Array(4),
    u0: new Float32Array(4),
    v0: new Float32Array(4),
    p: new Float32Array(4),
    div: new Float32Array(4),
    stir: new Float32Array(4),
    energy: 0,
    stirred: false,
  };
  const map = {
    nx: 2,
    ny: 2,
    cell: 4,
    front: new Float32Array(16),
    back: new Float32Array(16),
    busy: false,
  };
  const splats: { x: number; y: number; fx: number; fy: number; radius: number }[] = [];
  const drops: Drop[] = [];
  const strokes: Stroke[] = [];
  const pointer = { x: 0, y: 0, t: 0, placed: false, id: -1, moved: 0 };
  let dropCount = 0;
  let layoutKey = "";
  let introKey = "";
  let introTime = 1e9;
  let width = 1;
  let height = 1;
  let pixelRatio = 1;
  let driftTime = 0;
  let accumulator = 0;
  let raf = 0;
  let last = 0;
  let visible = true;
  let destroyed = false;
  let sized = false;
  let frames = 0;
  const requested = new Set<string>();

  const fontFor = (size: number) => {
    const settings = settingsRef.current;
    const family = settings.fontFamily || getComputedStyle(root).fontFamily;
    return `${clamp(Math.round(settings.fontWeight), 100, 900)} ${size}px ${family}`;
  };

  const buildFields = () => {
    const w = box.x1 - box.x0;
    const h = box.y1 - box.y0;
    let cell = clamp(box.size * 0.08, 6, 16);
    while ((w / cell) * (h / cell) > 3200) cell *= 1.08;
    fluid.cell = cell;
    fluid.nx = Math.max(4, Math.ceil(w / cell));
    fluid.ny = Math.max(4, Math.ceil(h / cell));
    const cells = fluid.nx * fluid.ny;
    fluid.u = new Float32Array(cells);
    fluid.v = new Float32Array(cells);
    fluid.u0 = new Float32Array(cells);
    fluid.v0 = new Float32Array(cells);
    fluid.p = new Float32Array(cells);
    fluid.div = new Float32Array(cells);
    fluid.stir = new Float32Array(cells);
    fluid.energy = 0;
    fluid.stirred = false;
    stirTexture.dispose();
    stirTexture = makeTexture(fluid.stir, fluid.nx, fluid.ny, THREE.RedFormat);
    uniforms.uStir.value = stirTexture;
    uniforms.uStirRect.value.set(box.x0, box.y1, cell, 0);
    uniforms.uStirSize.value.set(fluid.nx, fluid.ny);
    let mapCell = clamp(box.size * 0.03, 2.5, 7);
    while ((w / mapCell) * (h / mapCell) > 22000) mapCell *= 1.08;
    map.cell = mapCell;
    map.nx = Math.max(4, Math.ceil(w / mapCell));
    map.ny = Math.max(4, Math.ceil(h / mapCell));
    map.front = new Float32Array(map.nx * map.ny * 4);
    map.back = new Float32Array(map.nx * map.ny * 4);
    map.busy = false;
    mapTexture.dispose();
    mapTexture = makeTexture(map.front, map.nx, map.ny, THREE.RGBAFormat);
    uniforms.uMap.value = mapTexture;
    uniforms.uMapRect.value.set(box.x0, box.y1, mapCell, 0);
    uniforms.uMapSize.value.set(map.nx, map.ny);
    splats.length = 0;
    drops.length = 0;
  };

  const layout = () => {
    const settings = settingsRef.current;
    const context = maskCanvas.getContext("2d");
    if (!context) return;
    const face = fontFor(16);
    if (document.fonts?.load && !requested.has(face)) {
      requested.add(face);
      document.fonts
        .load(face)
        .then((faces) => {
          if (destroyed || !faces.length) return;
          layoutKey = "";
          if (sized) render();
        })
        .catch(() => {});
    }
    const words = settings.text.split(/\s+/).filter(Boolean);
    const leading = clamp(settings.lineHeight, 0.7, 2);
    const spacing = clamp(settings.letterSpacing, -0.2, 1);
    let size = clamp(settings.fontSize, 12, 600);
    let rows: string[] = [];
    const measure = (value: string) => {
      context.font = fontFor(size);
      context.letterSpacing = `${spacing * size}px`;
      return context.measureText(value).width;
    };
    for (let attempt = 0; attempt < 40; attempt++) {
      rows = [];
      let row = "";
      let fits = true;
      for (const word of words) {
        if (measure(word) > width * 0.92) {
          fits = false;
          break;
        }
        const next = row ? `${row} ${word}` : word;
        if (row && measure(next) > width * 0.92) {
          rows.push(row);
          row = word;
        } else row = next;
      }
      if (row) rows.push(row);
      if (fits && rows.length * size * leading <= height * 0.7) break;
      size *= 0.94;
    }
    let widest = 0;
    rows.forEach((row) => {
      widest = Math.max(widest, measure(row));
    });
    const blockH = Math.max(1, rows.length) * size * leading;
    const pad = size * 0.2;
    box.size = size;
    // Edited: anchor the text block to the frame's left edge instead of centering it.
    box.x0 = -width / 2;
    box.x1 = box.x0 + widest + pad * 2;
    box.y0 = -blockH / 2 - pad;
    box.y1 = blockH / 2 + pad;
    const w = box.x1 - box.x0;
    const h = box.y1 - box.y0;
    const scale = Math.min(pixelRatio * 1.25, 3);
    maskCanvas.width = Math.max(1, Math.ceil(w * scale));
    maskCanvas.height = Math.max(1, Math.ceil(h * scale));
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, maskCanvas.width, maskCanvas.height);
    context.setTransform(scale, 0, 0, scale, 0, 0);
    context.font = fontFor(size);
    context.letterSpacing = `${spacing * size}px`;
    context.textAlign = "left";
    context.textBaseline = "middle";
    context.fillStyle = "#fff";
    rows.forEach((row, index) => {
      const y = ((rows.length - 1) / 2 - index) * size * leading;
      context.fillText(row, pad + (spacing * size) / 2, box.y1 - y);
    });
    maskTexture.dispose();
    maskTexture.needsUpdate = true;
    uniforms.uMaskRect.value.set(box.x0, box.y1, w, h);
    quad.scale.set(w, h, 1);
    quad.position.set((box.x0 + box.x1) / 2, (box.y0 + box.y1) / 2, 0);
    buildFields();
    const key = [settings.text, settings.fontFamily, settings.fontWeight, settings.fontSize, settings.letterSpacing, settings.lineHeight].join("|");
    if (key !== introKey) {
      introKey = key;
      introTime = settings.intro && !settings.reduced && !settings.paused ? 0 : 1e9;
    }
  };

  const ensure = () => {
    const settings = settingsRef.current;
    const key = [
      settings.text,
      settings.fontFamily,
      settings.fontWeight,
      settings.fontSize,
      settings.letterSpacing,
      settings.lineHeight,
      Math.round(width),
      Math.round(height),
      pixelRatio.toFixed(2),
      settings.fontFamily ? "" : getComputedStyle(root).fontFamily,
    ].join("|");
    if (key !== layoutKey) {
      layoutKey = key;
      layout();
    }
  };

  const sampleGrid = (field: Float32Array, nx: number, ny: number, gx: number, gy: number) => {
    const x = clamp(gx, 0, nx - 1.001);
    const y = clamp(gy, 0, ny - 1.001);
    const i = Math.floor(x);
    const j = Math.floor(y);
    const fx = x - i;
    const fy = y - j;
    const k = j * nx + i;
    const a = field[k] + (field[k + 1] - field[k]) * fx;
    const b = field[k + nx] + (field[k + nx + 1] - field[k + nx]) * fx;
    return a + (b - a) * fy;
  };

  const stepFluid = (dt: number) => {
    const settings = settingsRef.current;
    const { nx, ny, cell, u, v, u0, v0, p, div, stir } = fluid;
    for (const splat of splats) {
      const radius = splat.radius / cell;
      const ci = splat.x / cell - 0.5;
      const cj = splat.y / cell - 0.5;
      const reach = Math.ceil(radius * 2);
      for (let j = Math.max(0, Math.floor(cj - reach)); j <= Math.min(ny - 1, Math.ceil(cj + reach)); j++) {
        for (let i = Math.max(0, Math.floor(ci - reach)); i <= Math.min(nx - 1, Math.ceil(ci + reach)); i++) {
          const dx = i - ci;
          const dy = j - cj;
          const weight = Math.exp(-(dx * dx + dy * dy) / (radius * radius));
          if (weight < 0.01) continue;
          u[j * nx + i] += splat.fx * weight;
          v[j * nx + i] += splat.fy * weight;
        }
      }
    }
    splats.length = 0;
    u0.set(u);
    v0.set(v);
    const scale = dt / cell;
    for (let j = 0; j < ny; j++) {
      for (let i = 0; i < nx; i++) {
        const k = j * nx + i;
        const x = i - u0[k] * scale;
        const y = j - v0[k] * scale;
        u[k] = sampleGrid(u0, nx, ny, x, y);
        v[k] = sampleGrid(v0, nx, ny, x, y);
      }
    }
    const fade = Math.exp(-dt / (0.3 + 1.7 * (1 - clamp(settings.viscosity, 0, 1))));
    for (let k = 0; k < nx * ny; k++) {
      u[k] *= fade;
      v[k] *= fade;
    }
    for (let i = 0; i < nx; i++) {
      v[i] = 0;
      v[(ny - 1) * nx + i] = 0;
    }
    for (let j = 0; j < ny; j++) {
      u[j * nx] = 0;
      u[j * nx + nx - 1] = 0;
    }
    for (let j = 0; j < ny; j++) {
      for (let i = 0; i < nx; i++) {
        const k = j * nx + i;
        const ul = i > 0 ? u[k - 1] : 0;
        const ur = i < nx - 1 ? u[k + 1] : 0;
        const vu = j > 0 ? v[k - nx] : 0;
        const vd = j < ny - 1 ? v[k + nx] : 0;
        div[k] = (ur - ul + (vd - vu)) * 0.5;
        p[k] = 0;
      }
    }
    const omega = 1.86;
    for (let iteration = 0; iteration < 70; iteration++) {
      for (let parity = 0; parity < 2; parity++) {
        for (let j = 0; j < ny; j++) {
          for (let i = (j + parity) & 1; i < nx; i += 2) {
            const k = j * nx + i;
            let sum = 0;
            let n = 0;
            if (i > 0) {
              sum += p[k - 1];
              n++;
            }
            if (i < nx - 1) {
              sum += p[k + 1];
              n++;
            }
            if (j > 0) {
              sum += p[k - nx];
              n++;
            }
            if (j < ny - 1) {
              sum += p[k + nx];
              n++;
            }
            p[k] += omega * ((sum - div[k]) / n - p[k]);
          }
        }
      }
    }
    let energy = 0;
    const settleStir = Math.exp(-dt / 0.45);
    let stirred = false;
    for (let j = 0; j < ny; j++) {
      for (let i = 0; i < nx; i++) {
        const k = j * nx + i;
        const pl = i > 0 ? p[k - 1] : p[k];
        const pr = i < nx - 1 ? p[k + 1] : p[k];
        const pu = j > 0 ? p[k - nx] : p[k];
        const pd = j < ny - 1 ? p[k + nx] : p[k];
        u[k] -= (pr - pl) * 0.5;
        v[k] -= (pd - pu) * 0.5;
        const speed = Math.abs(u[k]) + Math.abs(v[k]);
        energy = Math.max(energy, speed);
        const target = speed > 120 ? Math.min(1, (speed - 120) / 520) : 0;
        const next = Math.max(stir[k] * settleStir, target);
        stir[k] = next < 0.004 ? 0 : next;
        if (stir[k] > 0) stirred = true;
      }
    }
    if (energy < 3) {
      u.fill(0);
      v.fill(0);
      energy = 0;
    }
    fluid.energy = energy;
    fluid.stirred = stirred;
    stirTexture.needsUpdate = true;
  };

  const settleStirOnly = (dt: number) => {
    const { stir } = fluid;
    const decay = Math.exp(-dt / 0.45);
    let stirred = false;
    for (let k = 0; k < stir.length; k++) {
      const next = stir[k] * decay;
      stir[k] = next < 0.004 ? 0 : next;
      if (stir[k] > 0) stirred = true;
    }
    fluid.stirred = stirred;
    stirTexture.needsUpdate = true;
  };

  const sampleMap = (source: Float32Array, gx: number, gy: number, out: number[]) => {
    const { nx, ny } = map;
    const x = clamp(gx, 0, nx - 1.001);
    const y = clamp(gy, 0, ny - 1.001);
    const i = Math.floor(x);
    const j = Math.floor(y);
    const fx = x - i;
    const fy = y - j;
    const k = (j * nx + i) * 4;
    const kr = k + 4;
    const kd = k + nx * 4;
    const kdr = kd + 4;
    for (let c = 0; c < 4; c++) {
      const a = source[k + c] + (source[kr + c] - source[k + c]) * fx;
      const b = source[kd + c] + (source[kdr + c] - source[kd + c]) * fx;
      out[c] = a + (b - a) * fy;
    }
  };

  const stepMap = (dt: number) => {
    const settings = settingsRef.current;
    const { nx, ny, cell } = map;
    const source = map.front;
    const target = map.back;
    const memory = clamp(settings.memory, 0.5, 120);
    const calm = Math.exp(-fluid.energy / 500);
    const heal = 1 - (1 - Math.exp(-(dt * 3) / memory)) * calm;
    const flowing = fluid.energy > 0;
    const value = [0, 0, 0, 0];
    const ratio = cell / fluid.cell;
    let busy = false;
    for (let j = 0; j < ny; j++) {
      for (let i = 0; i < nx; i++) {
        const k = (j * nx + i) * 4;
        let vx = 0;
        let vy = 0;
        if (flowing) {
          const gx = (i + 0.5) * ratio - 0.5;
          const gy = (j + 0.5) * ratio - 0.5;
          vx = sampleGrid(fluid.u, fluid.nx, fluid.ny, gx, gy);
          vy = sampleGrid(fluid.v, fluid.nx, fluid.ny, gx, gy);
        }
        if (vx !== 0 || vy !== 0) {
          sampleMap(source, i - (vx * dt) / cell, j - (vy * dt) / cell, value);
          target[k] = (value[0] - vx * dt) * heal;
          target[k + 1] = (value[1] - vy * dt) * heal;
          target[k + 2] = value[2] * heal;
          target[k + 3] = value[3] * heal;
        } else {
          target[k] = source[k] * heal;
          target[k + 1] = source[k + 1] * heal;
          target[k + 2] = source[k + 2] * heal;
          target[k + 3] = source[k + 3] * heal;
        }
        if (!busy && (Math.abs(target[k]) > 0.05 || Math.abs(target[k + 1]) > 0.05 || target[k + 2] > 0.004)) busy = true;
      }
    }
    map.front = target;
    map.back = source;
    for (let d = drops.length - 1; d >= 0; d--) {
      const drop = drops[d];
      drop.age += dt;
      const progress = clamp(drop.age / 0.75, 0, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const next = drop.target * eased;
      if (next > drop.radius + 1e-3) {
        applyDrop(drop, drop.radius, next);
        drop.radius = next;
      }
      if (progress >= 1) drops.splice(d, 1);
      busy = true;
    }
    map.busy = busy;
    mapTexture.image.data = map.front;
    mapTexture.needsUpdate = true;
  };

  const applyDrop = (drop: Drop, from: number, to: number) => {
    const { nx, ny, cell } = map;
    const source = map.front;
    const target = map.back;
    target.set(source);
    const area = to * to - from * from;
    const reach = to * 5 + cell * 2;
    const ci = drop.x / cell - 0.5;
    const cj = drop.y / cell - 0.5;
    const span = Math.ceil(reach / cell);
    const value = [0, 0, 0, 0];
    for (let j = Math.max(0, Math.floor(cj - span)); j <= Math.min(ny - 1, Math.ceil(cj + span)); j++) {
      for (let i = Math.max(0, Math.floor(ci - span)); i <= Math.min(nx - 1, Math.ceil(ci + span)); i++) {
        const k = (j * nx + i) * 4;
        const px = (i + 0.5) * cell;
        const py = (j + 0.5) * cell;
        const dx = px - drop.x;
        const dy = py - drop.y;
        const distance = Math.hypot(dx, dy);
        if (distance > to - cell) {
          const factor = Math.sqrt(Math.max(0, 1 - area / Math.max(distance * distance, 1e-6)));
          const sx = drop.x + dx * factor;
          const sy = drop.y + dy * factor;
          sampleMap(source, sx / cell - 0.5, sy / cell - 0.5, value);
          target[k] = value[0] + (sx - px);
          target[k + 1] = value[1] + (sy - py);
          target[k + 2] = value[2];
          target[k + 3] = value[3];
        }
        const rim = clamp((to - distance) / (cell * 1.2) + 0.5, 0, 1);
        if (rim > 0) {
          target[k] *= 1 - rim;
          target[k + 1] *= 1 - rim;
          target[k + 2] = target[k + 2] * (1 - rim) + rim;
          target[k + 3] = target[k + 3] * (1 - rim) + rim * drop.hue;
        }
      }
    }
    map.front = target;
    map.back = source;
    const stirCell = fluid.cell;
    const sci = drop.x / stirCell - 0.5;
    const scj = drop.y / stirCell - 0.5;
    const stirSpan = Math.ceil((to * 1.6) / stirCell);
    for (let j = Math.max(0, Math.floor(scj - stirSpan)); j <= Math.min(fluid.ny - 1, Math.ceil(scj + stirSpan)); j++) {
      for (let i = Math.max(0, Math.floor(sci - stirSpan)); i <= Math.min(fluid.nx - 1, Math.ceil(sci + stirSpan)); i++) {
        const distance = Math.hypot(i - sci, j - scj) * stirCell;
        const ring = Math.exp(-Math.pow((distance - to) / (to * 0.45 + stirCell), 2));
        const k = j * fluid.nx + i;
        fluid.stir[k] = Math.max(fluid.stir[k], ring * 0.85);
      }
    }
    fluid.stirred = true;
    stirTexture.needsUpdate = true;
  };

  const addDrop = (x: number, y: number, size: number) => {
    const hues = [0.1, 0.5, 0.1, 0.9];
    drops.push({ x, y, radius: 0, target: size, age: 0, hue: hues[dropCount % hues.length] });
    dropCount++;
  };

  const apply = () => {
    const settings = settingsRef.current;
    const inkA = toOklab(parseColor(settings.colors[0], [0.32, 0.15, 1]));
    const inkB = toOklab(parseColor(settings.colors[1], [1, 0.62, 0.99]));
    const ground = toOklab(parseColor(settings.baseColor, [0.95, 0.93, 1]));
    const u = uniforms;
    u.uInkA.value.set(inkA[0], inkA[1], inkA[2]);
    u.uInkB.value.set(inkB[0], inkB[1], inkB[2]);
    u.uInkC.value.set(ground[0], ground[1], ground[2]);
    if (ground[0] > 0.6) u.uBase.value.set(Math.min(0.3, ground[0] * 0.32), inkA[1] * 0.5, inkA[2] * 0.5);
    else u.uBase.value.set(Math.max(0.9, ground[0] + 0.6), inkA[1] * 0.08, inkA[2] * 0.08);
    u.uBand.value = box.size * clamp(settings.bandSize, 0.05, 2);
    u.uWave.value = clamp(settings.waviness, 0, 2);
    u.uGrain.value = clamp(settings.grain, 0, 1);
    u.uGrainSize.value = clamp(settings.grainSize, 1.2, 14) * (box.size / clamp(settings.fontSize, 12, 600));
    u.uDotSize.value = clamp(settings.dotSize, 0.3, 2);
    u.uDrift.value.set(driftTime * box.size * 0.06, Math.sin(driftTime * 0.21) * box.size * 0.05);
    const duration = clamp(settings.introDuration, 0.2, 8);
    u.uIntro.value = introTime >= 1e8 ? 1 : clamp(introTime / duration, 0, 1);
  };

  const render = () => {
    if (!sized) return;
    ensure();
    apply();
    renderer.setRenderTarget(null);
    renderer.clear();
    renderer.render(scene, camera);
  };

  const animating = () => {
    const settings = settingsRef.current;
    return !settings.reduced && !settings.paused;
  };

  const stirAt = (x0: number, y0: number, x1: number, y1: number, dt: number) => {
    const settings = settingsRef.current;
    const dx = x1 - x0;
    const dy = y1 - y0;
    const distance = Math.hypot(dx, dy);
    if (distance < 0.3 || dt <= 0) return;
    const speed = Math.min(distance / Math.max(dt, 1 / 120), 1600);
    const strength = clamp(settings.stirStrength, 0, 3) * 0.42;
    const radius = clamp(settings.stirRadius, 0.1, 3) * box.size * 0.5;
    const steps = Math.max(1, Math.ceil(distance / (radius * 0.5)));
    for (let s = 0; s < steps; s++) {
      const t = (s + 0.5) / steps;
      splats.push({
        x: x0 + dx * t,
        y: y0 + dy * t,
        fx: ((dx / distance) * speed * strength) / steps,
        fy: ((dy / distance) * speed * strength) / steps,
        radius,
      });
    }
  };

  const runStrokes = (dt: number) => {
    for (let s = strokes.length - 1; s >= 0; s--) {
      const stroke = strokes[s];
      const point = (t: number) => {
        const e = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        const fx = stroke.from[0] + (stroke.to[0] - stroke.from[0]) * e;
        const fy = stroke.from[1] + (stroke.to[1] - stroke.from[1]) * e;
        return [fx * (box.x1 - box.x0), fy * (box.y1 - box.y0)] as const;
      };
      const a = point(clamp(stroke.elapsed / stroke.duration, 0, 1));
      stroke.elapsed += dt;
      const b = point(clamp(stroke.elapsed / stroke.duration, 0, 1));
      stirAt(a[0], a[1], b[0], b[1], dt);
      if (stroke.elapsed >= stroke.duration) strokes.splice(s, 1);
    }
  };

  const tick = (now: number) => {
    raf = 0;
    if (destroyed) return;
    const dt = Math.min(0.1, Math.max(0, (now - last) / 1000));
    last = now;
    frames++;
    if (frames % 30 === 0 && (Math.abs(root.clientWidth - width) > 1 || Math.abs(root.clientHeight - height) > 1)) resize();
    if (sized) ensure();
    const settings = settingsRef.current;
    if (animating()) {
      driftTime += dt * clamp(settings.current, 0, 4);
      if (introTime < 1e8) {
        introTime += dt;
        if (introTime > clamp(settings.introDuration, 0.2, 8) + 0.2) introTime = 1e9;
      }
      accumulator += dt;
      let steps = 0;
      while (accumulator >= STEP && steps < 4) {
        runStrokes(STEP);
        const active = splats.length > 0 || fluid.energy > 0;
        if (active) stepFluid(STEP);
        else if (fluid.stirred) settleStirOnly(STEP);
        if (active || map.busy || drops.length) stepMap(STEP);
        accumulator -= STEP;
        steps++;
      }
      if (steps === 4) accumulator = 0;
    }
    render();
    const alive =
      settings.current > 0 ||
      introTime < 1e8 ||
      map.busy ||
      drops.length > 0 ||
      fluid.energy > 0 ||
      fluid.stirred ||
      strokes.length > 0 ||
      splats.length > 0;
    if (visible && !document.hidden && animating() && alive) raf = requestAnimationFrame(tick);
  };

  function wake() {
    if (destroyed || raf || !visible) return;
    last = performance.now();
    raf = requestAnimationFrame(tick);
  }

  function resize() {
    const rect = root.getBoundingClientRect();
    if (rect.width < 2 || rect.height < 2) {
      sized = false;
      return;
    }
    sized = true;
    width = rect.width;
    height = rect.height;
    pixelRatio = Math.min(window.devicePixelRatio || 1, 2) * clamp(settingsRef.current.quality, 0.25, 1);
    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(width, height, false);
    camera.left = -width / 2;
    camera.right = width / 2;
    camera.top = height / 2;
    camera.bottom = -height / 2;
    camera.updateProjectionMatrix();
    render();
    wake();
  }

  const toBox = (clientX: number, clientY: number) => {
    const rect = root.getBoundingClientRect();
    const wx = clientX - rect.left - width / 2;
    const wy = height / 2 - (clientY - rect.top);
    return [wx - box.x0, box.y1 - wy] as const;
  };

  const onMove = (event: PointerEvent) => {
    const settings = settingsRef.current;
    const [x, y] = toBox(event.clientX, event.clientY);
    const now = performance.now();
    if (settings.interactive && animating() && pointer.placed && now - pointer.t < 120) {
      stirAt(pointer.x, pointer.y, x, y, (now - pointer.t) / 1000);
      wake();
    }
    if (pointer.id === event.pointerId) pointer.moved += Math.hypot(x - pointer.x, y - pointer.y);
    pointer.x = x;
    pointer.y = y;
    pointer.t = now;
    pointer.placed = true;
  };

  const onDown = (event: PointerEvent) => {
    const settings = settingsRef.current;
    if (!settings.interactive || !animating()) return;
    if (event.pointerType === "mouse" && event.button !== 0) return;
    pointer.id = event.pointerId;
    pointer.moved = 0;
  };

  const onUp = (event: PointerEvent) => {
    if (pointer.id !== event.pointerId) return;
    pointer.id = -1;
    const settings = settingsRef.current;
    if (!settings.dropInk || !settings.interactive || !animating() || pointer.moved > 12) return;
    const [x, y] = toBox(event.clientX, event.clientY);
    if (x < 0 || y < 0 || x > box.x1 - box.x0 || y > box.y1 - box.y0) return;
    addDrop(x, y, clamp(settings.dropSize, 0.05, 2) * box.size * 0.5);
    wake();
  };

  const onLeave = () => {
    pointer.placed = false;
  };

  root.addEventListener("pointermove", onMove);
  root.addEventListener("pointerdown", onDown);
  root.addEventListener("pointerup", onUp);
  root.addEventListener("pointercancel", onUp);
  root.addEventListener("pointerleave", onLeave);
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(root);
  const intersection = new IntersectionObserver(
    (entries) => {
      visible = entries.some((entry) => entry.isIntersecting);
      if (visible) wake();
    },
    { rootMargin: "80px" },
  );
  intersection.observe(root);
  const onVisibility = () => {
    if (!document.hidden) wake();
  };
  document.addEventListener("visibilitychange", onVisibility);
  if (document.fonts?.ready)
    document.fonts.ready
      .then(() => {
        if (destroyed) return;
        layoutKey = "";
        if (sized) render();
      })
      .catch(() => {});
  const onLost = (event: Event) => event.preventDefault();
  canvas.addEventListener("webglcontextlost", onLost);
  resize();

  return {
    sync: () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2) * clamp(settingsRef.current.quality, 0.25, 1);
      if (!sized || Math.abs(ratio - pixelRatio) > 1e-3) resize();
      else {
        if (!animating()) introTime = 1e9;
        render();
      }
      wake();
    },
    destroy: () => {
      destroyed = true;
      cancelAnimationFrame(raf);
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerdown", onDown);
      root.removeEventListener("pointerup", onUp);
      root.removeEventListener("pointercancel", onUp);
      root.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      canvas.removeEventListener("webglcontextlost", onLost);
      resizeObserver.disconnect();
      intersection.disconnect();
      maskTexture.dispose();
      mapTexture.dispose();
      stirTexture.dispose();
      quad.geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      canvas.remove();
    },
    drop: (x, y, size) => {
      if (!animating() || !sized) return;
      ensure();
      addDrop(clamp(x, 0, 1) * (box.x1 - box.x0), clamp(y, 0, 1) * (box.y1 - box.y0), clamp(size, 0.05, 2) * box.size * 0.5);
      wake();
    },
    stir: (from, to, duration) => {
      if (!animating() || !sized) return;
      strokes.push({ from, to, duration: clamp(duration, 0.05, 10), elapsed: 0 });
      wake();
    },
    replay: () => {
      if (!animating() || !sized) return;
      introTime = 0;
      wake();
    },
  };
};

const StippleType = forwardRef<StippleTypeHandle, StippleTypeProps>(function StippleType(
  {
    text = "Made by hand",
    fontFamily = "",
    fontWeight = 800,
    fontSize = 124,
    letterSpacing = -0.02,
    lineHeight = 1,
    colors = ["#3F3F46", "#A1A1AA"],
    baseColor = "#F4F4F5",
    bandSize = 0.5,
    waviness = 1.2,
    grain = 0,
    grainSize = 2,
    dotSize = 1,
    current = 1,
    interactive = true,
    stirStrength = 1,
    stirRadius = 0.5,
    dropInk = true,
    dropSize = 0.5,
    viscosity = 0.5,
    memory = 8,
    intro = true,
    introDuration = 1.8,
    paused = false,
    quality = 1,
    className,
    style,
    children,
  },
  ref,
) {
  const rootRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<Controller | null>(null);
  const reduced = useSyncExternalStore(subscribeToMotion, readMotion, () => false);
  const settingsRef = useRef<Settings>({
    text,
    fontFamily,
    fontWeight,
    fontSize,
    letterSpacing,
    lineHeight,
    colors,
    baseColor,
    bandSize,
    waviness,
    grain,
    grainSize,
    dotSize,
    current,
    interactive,
    stirStrength,
    stirRadius,
    dropInk,
    dropSize,
    viscosity,
    memory,
    intro,
    introDuration,
    paused,
    quality,
    reduced,
  });

  useEffect(() => {
    settingsRef.current = {
      text,
      fontFamily,
      fontWeight,
      fontSize,
      letterSpacing,
      lineHeight,
      colors,
      baseColor,
      bandSize,
      waviness,
      grain,
      grainSize,
      dotSize,
      current,
      interactive,
      stirStrength,
      stirRadius,
      dropInk,
      dropSize,
      viscosity,
      memory,
      intro,
      introDuration,
      paused,
      quality,
      reduced,
    };
    controllerRef.current?.sync();
  });

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const controller = createInk(root, settingsRef);
    controllerRef.current = controller;
    return () => {
      controller?.destroy();
      controllerRef.current = null;
    };
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      drop: (x = 0.5, y = 0.5, size = 0.5) => controllerRef.current?.drop(x, y, size),
      stir: (from, to, duration = 1) => controllerRef.current?.stir(from, to, duration),
      replay: () => controllerRef.current?.replay(),
    }),
    [],
  );

  return (
    <div
      ref={rootRef}
      role="img"
      aria-label={text}
      className={["stipple-type", className].filter(Boolean).join(" ")}
      style={{ touchAction: "pan-y", ...style }}
    >
      {children && <div className="stipple-type__content">{children}</div>}
    </div>
  );
});

StippleType.displayName = "StippleType";

export { StippleType };
export default StippleType;
