import repos from './repos.json';

// One entry per "court". RolePage renders entirely from this.
export const roles = {
  security: {
    id: 'security',
    court: '01',
    label: 'Security',
    short: 'SEC',
    color: 'var(--sec)',
    hex: '#ff3b5c',
    headline: 'Defense wins championships.',
    intro:
      'A lot of what I build comes down to who gets to see and change what. At NCTTA I built role-based access control for admin permissions, and in my own projects I’ve set up Supabase access policies, Firebase IAM and security rules, and tamper-proof storage on the ICP blockchain.',
    resume: '/resumes/security.pdf',
    stats: [
      { value: 1000, suffix: '+', label: 'Athletes behind RBAC' },
      { value: 25, suffix: '+', label: 'API endpoints shipped into' },
      { value: 4, suffix: '', label: 'Access-control systems built' },
      { value: 3, suffix: 'rd', label: 'SwampHacks X overall' },
    ],
    projects: ['inkwell', 'mathwhiz', 'recom'],
    bench: ['nodeauth', 'gatorleague'],
    skills: [
      { group: 'Secure Development', items: ['.NET 8', 'C#', 'Python', 'Flask', 'Node.js', 'React.js', 'Vue.js'] },
      { group: 'Cloud & Identity', items: ['Azure', 'Firebase', 'Supabase (IAM)', 'Auth0', 'OAuth 2.0'] },
      { group: 'Security Fundamentals', items: ['OWASP Top 10', 'Network Security', 'Cryptography Basics'] },
    ],
    coursework: ['Data Structures', 'Algorithms', 'Databases'],
  },
  fullstack: {
    id: 'fullstack',
    court: '02',
    label: 'Full-Stack',
    short: 'FS',
    color: 'var(--fs)',
    hex: '#22d3ee',
    headline: 'I like owning a feature from the database to the button.',
    intro:
      'At NCTTA I work in .NET 8 and Azure. On my own projects it’s usually React or Vue on the front end, with Supabase, Firebase or MongoDB behind it. I’ve also designed apps in Figma before building them, and MathWhiz, which my team built in 24 hours, took 3rd at SwampHacks X.',
    resume: '/resumes/fullstack.pdf',
    stats: [
      { value: 150, suffix: '+', label: 'Universities served' },
      { value: 25, suffix: '+', label: 'API endpoints in codebase' },
      { value: repos.length, suffix: '', label: 'Public repos shipped' },
      { value: 100, suffix: '+', label: 'Projects in the SwampHacks field' },
    ],
    projects: ['mathwhiz', 'recom', 'inkwell'],
    bench: ['jukebox', 'gatorleague', 'snowgineer', 'piary'],
    skills: [
      { group: 'Languages', items: ['Python', 'Java', 'JavaScript', 'TypeScript', 'C#', 'SQL'] },
      { group: 'Tools', items: ['React.js', 'Vue.js', 'Node.js', 'Flask', '.NET', 'Firebase', 'MongoDB', 'TensorFlow', 'ICP', 'Figma'] },
    ],
    coursework: ['Data Structures', 'Algorithms', 'Databases'],
  },
  ml: {
    id: 'ml',
    court: '03',
    label: 'ML',
    short: 'ML',
    color: 'var(--ml)',
    hex: '#a78bfa',
    headline: 'Reading spin is basically pattern recognition.',
    intro:
      'I’ve trained a model that recognizes hand-drawn constellations, used NLP to pull characters out of stories and drop them into new ones, and worked on a pipeline that turns math questions into animated lessons. Before any of that, I was teaching neural networks to play Tetris and Snake with NEAT.',
    resume: '/resumes/ml.pdf',
    stats: [
      { value: 85, suffix: '%+', label: 'Constellation accuracy' },
      { value: 10, suffix: '+', label: 'Constellation classes' },
      { value: 2, suffix: 'nd', label: 'LingHacks V overall (Paruni)' },
      { value: 3, suffix: 'rd', label: 'SwampHacks X overall' },
    ],
    projects: ['mathwhiz', 'constelguessr', 'paruni'],
    bench: ['tetrisai', 'snakeai'],
    skills: [
      { group: 'Languages', items: ['Python', 'JavaScript', 'C/C++', 'SQL'] },
      { group: 'Machine Learning', items: ['Scikit-learn', 'TensorFlow', 'NumPy', 'Pandas', 'Image Augmentation'] },
    ],
    certification: 'DeepLearning.AI Specialization (Neural Networks, Hyperparameter Tuning, Structuring ML Projects)',
    coursework: ['Data Structures', 'Algorithms', 'Engineering Statistics'],
  },
};

export const roleList = Object.values(roles);
