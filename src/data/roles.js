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
      'I build software that assumes someone is trying to break it — role-based access control in production at NCTTA, row-level access policies in Supabase, IAM and server-side rules in Firebase, and tamper-proof storage on-chain.',
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
    headline: 'Every layer. Every rally.',
    intro:
      'From Figma frames to Azure deploys: .NET 8 APIs at NCTTA, React and Vue frontends, Supabase, Firebase and MongoDB backends — and a hackathon podium finish built in 24 hours.',
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
    headline: 'Read the spin. Predict the shot.',
    intro:
      'Models that see, read and play: a constellation classifier, an NLP narrative engine, an OpenAI + Manim pipeline that turns prompts into animated lessons, and neuroevolved agents that taught themselves Tetris and Snake.',
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
    certification: 'DeepLearning.AI Specialization — Neural Networks, Hyperparameter Tuning, Structuring ML Projects',
    coursework: ['Data Structures', 'Algorithms', 'Engineering Statistics'],
  },
};

export const roleList = Object.values(roles);
