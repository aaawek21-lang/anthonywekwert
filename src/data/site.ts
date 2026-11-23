// Contact details used on the home page and footer.
// Leave a value empty ('') and its link is hidden instead of going nowhere.

export const site = {
  email: 'anthonywekwertcreative@gmail.com',
  linkedin: 'https://www.linkedin.com/in/anthonywekwert/',
  instagram: 'https://www.instagram.com/_antwek/',
  instagramHandle: '@_antwek',
  // Drop the PDF in /public as resume.pdf. The link shows once the file is there.
  resume: '/resume.pdf',
  // Drop your headshot in /public as anthony.jpg. A flat block shows until then.
  photo: '/anthony.jpg',
};

// From the About page on the current site, plus the resume.
export const about = {
  is: [
    'From Roseville, Michigan',
    'A junior in college',
    'A music enthusiast',
    '3-time Greek school dropout',
    'A cheese hater',
  ],
  sections: [
    {
      heading: 'Education',
      items: [
        {
          name: 'Michigan State University, East Lansing',
          detail: "BA, Creative Advertising. Dean's List Fall 2024, Spring 2025, Fall 2025",
          when: '2023 – 2027',
        },
      ],
    },
    {
      heading: 'Experience',
      items: [
        { name: 'Alpha Sigma Phi, MSU', detail: 'Brand and social media director', when: '2025 – now' },
        { name: 'Get Up Creative', detail: 'Graphic design and production assistant', when: 'Summer 2026' },
        { name: "Harper's Brew and Pub", detail: 'DJ and events specialist', when: '2024 – now' },
      ],
    },
    {
      heading: 'Achievements',
      items: [
        { name: 'Silver and Bronze Addy Awards', detail: 'American Advertising Federation', when: 'Feb 2026' },
        { name: 'Eagle Scout', detail: 'Boy Scouts of America', when: 'Sept 2023' },
      ],
    },
    {
      heading: 'Hobbies',
      items: [
        { name: 'Skipping leg day', detail: '', when: '' },
        { name: 'The Detroit Pistons', detail: '', when: '' },
        { name: 'Producing minimal deep tech music', detail: '', when: '' },
      ],
    },
  ],
};
