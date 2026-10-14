export const profile = {
  name: 'Supreet Tadeparti',
  first: 'Supreet',
  last: 'Tadeparti',
  school: 'University of Florida',
  degree: 'B.S. Computer Science',
  grad: 'May 2028',
  location: 'Gainesville, FL',
  email: 'supreettadeparti@gmail.com',
  github: 'https://github.com/SupreetTadeparti',
  githubHandle: 'SupreetTadeparti',
  devpost: 'https://devpost.com/SupreetTadeparti',
  photo: '/img/supreet.jpeg',
  tagline: 'Software engineer building secure systems, full-stack apps & models that learn.',
  binaryBio: '01100011 01101111 01100100 01100101',
};

// "Now" items show in the home ticker and on the About page.
export const now = [
  { label: 'Shipping', text: '.NET 8 / Azure features at NCTTA for 1,000+ collegiate athletes' },
  { label: 'Building', text: 'Textraordinary — a texting-coach app, with classmates' },
  { label: 'Leading', text: 'UF Table Tennis Club as President — Nationals bound' },
  { label: 'Contributing', text: 'UF Open Source Club’s Jukebox frontend' },
  { label: 'Studying', text: 'CS @ UF, class of 2028 · Dean’s List' },
];

export const experience = [
  {
    id: 'nctta',
    org: 'NCTTA',
    orgLong: 'National Collegiate Table Tennis Association',
    role: 'Software Engineer',
    dates: 'Jan 2026 – Present',
    place: 'Remote',
    bullets: [
      'Building full-stack **.NET 8/Azure** features for an app serving **1,000+ athletes** across **150+ universities**.',
      'Shipping **code-reviewed pull requests** in a multi-contributor codebase with **25+ API endpoints**.',
      'Built an **Add Officer** feature using **role-based access control** to manage admin permissions.',
    ],
    tags: ['.NET 8', 'C#', 'Azure', 'RBAC'],
  },
  {
    id: 'club',
    org: 'UF Table Tennis Club',
    role: 'President',
    dates: 'Jan 2025 – Present',
    place: 'Gainesville, FL',
    bullets: [
      'Led club operations, navigating the team to **Nationals for the first time in 8 years**.',
      'Fundraised **$8,000+** in new revenue to support expanded operations and national travel.',
      'Hosted tournaments, attracting **100+ unique participants** and generating **180+ registrations**.',
    ],
    tags: ['Leadership', 'Operations', 'Fundraising'],
  },
  {
    id: 'mentor',
    org: 'University of Florida',
    role: 'Peer Mentor · COP 3502C',
    dates: 'Aug 2025 – Dec 2025',
    place: 'Gainesville, FL',
    bullets: [
      'Facilitated 2 weekly labs for **60+ students** in COP 3502C, providing **Python** debugging and optimization support.',
      'Designed **14 collaborative activities** to reinforce complex programming concepts.',
      'Proctored exams for **100+ students**, ensuring academic integrity and providing technical support.',
    ],
    tags: ['Python', 'Teaching'],
  },
];

export const education = {
  school: 'University of Florida',
  degree: 'Bachelor of Science in Computer Science',
  dates: 'Aug 2024 – May 2028',
  honors: 'Dean’s List (2024–2025)',
};
