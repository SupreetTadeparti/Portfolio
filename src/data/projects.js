// Every project that appears on a role page. `bullets` is keyed by role so each
// page uses the wording from that role's resume; `default` covers the rest.
const gh = (name) => `https://github.com/SupreetTadeparti/${name}`;

export const projects = {
  mathwhiz: {
    name: 'MathWhiz',
    year: 2025,
    tagline: 'Math prompts in, animated tutorials out.',
    award: '3rd Place Overall · SwampHacks X',
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Flask', 'OpenAI API', 'Manim', 'Auth0'],
    repo: gh('MathWhiz'),
    caseStudy: 'mathwhiz',
    bullets: {
      security: [
        'Awarded **3rd Place** at **SwampHacks X** for an **OpenAI/Manim**-powered pipeline that automates the conversion of math prompts into animated tutorials.',
        'Engineered a secure **React.js/Supabase** architecture, implementing robust **database access policies** to protect user data and ensure authorized API usage.',
      ],
      default: [
        'Awarded **3rd Place Overall** at **SwampHacks X**, a 24-hour in-person hackathon, competing against **100+ projects**.',
        'Engineered an **automated pipeline** using **OpenAI API** and **Manim** to convert math prompts into animated tutorials.',
        'Engineered a **React.js** frontend styled with **Tailwind CSS**, utilizing **Supabase** for real-time database management and the **OpenAI API** to drive the core animation logic.',
      ],
    },
  },
  inkwell: {
    name: 'Inkwell',
    year: 2024,
    tagline: 'Tamper-proof notes on the Internet Computer — built for the dApp Hackathon.',
    stack: ['React', 'Motoko', 'ICP', 'dfx'],
    repo: gh('Inkwell'),
    live: 'https://vjd2p-iqaaa-aaaap-ahobq-cai.icp0.io/',
    bullets: {
      default: [
        'Developed a **decentralized note-taking app** on the **ICP blockchain**, ensuring tamper-proof data storage.',
        'Built using **React.js** for the frontend and **Motoko** for secure, high-performance backend smart contracts.',
      ],
    },
  },
  recom: {
    name: 'Recom',
    year: 2023,
    tagline: 'A community hub with donations, chat and elections.',
    stack: ['Vue', 'Firebase', 'Figma'],
    repo: gh('Recom'),
    bullets: {
      security: [
        'Designed a community platform in **Figma** enabling peer interaction, donation tracking, and decentralized elections.',
        'Developed the frontend with **Vue.js** and **Firebase**, implementing **Identity and Access Management (IAM)** and server-side database rules to ensure data integrity.',
      ],
      default: [
        'Designed a community platform in **Figma** for peer interaction, donation tracking, and decentralized elections.',
        'Developed the frontend with **Vue.js** and **Firebase** for real-time authentication and secure database operations.',
      ],
    },
  },
  constelguessr: {
    name: 'ConstelGuessr',
    year: 2025,
    tagline: 'Draw a constellation, get an instant guess.',
    stack: ['React', 'Flask', 'scikit-learn', 'Image Augmentation'],
    repo: gh('ConstelGuessr'),
    caseStudy: 'constelguessr',
    bullets: {
      default: [
        'Engineered a **machine learning** web app to classify star patterns with **85%+ accuracy** across 10+ constellations.',
        'Built using **React.js**, **SKLearn**, and **image augmentation**.',
      ],
    },
  },
  paruni: {
    name: 'Paruni',
    year: 2023,
    tagline: 'A parallel-universe emulator for story characters.',
    award: '2nd Place Overall · LingHacks V',
    stack: ['JavaScript', 'OpenAI API', 'compromise (NLP)'],
    repo: gh('Paruni'),
    bullets: {
      default: [
        'Engineered a **Natural Language Processing** app to extract character entities and programmatically synthesize them into new narratives within custom world settings.',
        'Built using **JavaScript** and **OpenAI API**.',
      ],
    },
  },
  nodeauth: {
    name: 'NodeAuth',
    year: 2022,
    tagline: 'Session-based auth server from first principles.',
    stack: ['Node.js', 'Express', 'Passport', 'bcrypt', 'MongoDB'],
    repo: gh('NodeAuth'),
    bullets: {
      default: [
        'Built a local-strategy **authentication server** with **Passport.js**, **bcrypt**-hashed credentials and **express-session** cookies.',
        'Protected routes with login guards and persisted users in **MongoDB** via Mongoose.',
      ],
    },
  },
  piary: {
    name: 'Piary',
    year: 2022,
    tagline: 'A private online diary — client + server.',
    stack: ['TypeScript', 'React', 'Node.js', 'Express', 'MongoDB'],
    repo: gh('Piary'),
    bullets: {
      default: [
        'Built an online diary platform focused on **privacy**, with a separate **TypeScript client** and **Node/Express API**.',
        'Modeled entries and users in **MongoDB** behind authenticated REST routes.',
      ],
    },
  },
  jukebox: {
    name: 'Jukebox (UF OSC)',
    year: 2026,
    tagline: 'Open-source Jukebox frontend for UF’s Open Source Club.',
    stack: ['React', 'TypeScript', 'GitHub Actions'],
    repo: 'https://github.com/ufosc/Jukebox-Frontend',
    bullets: {
      default: [
        'Contributing to the **UF Open Source Club** Jukebox frontend, a microservice that pairs with the Jukebox server.',
        'Working inside a repo gated by **CI linting and unit-test** workflows.',
      ],
    },
  },
  gatorleague: {
    name: 'Gator League',
    year: 2025,
    tagline: 'League management for Gator table tennis.',
    stack: ['Vue', 'Vite', 'Firebase', 'Firestore Rules'],
    repo: gh('GatorLeagueTableTennis'),
    bullets: {
      default: [
        'Built a **Vue 3 + Firebase** web app for running a table tennis league.',
        'Locked down data with **Firestore** and **Storage security rules**.',
      ],
    },
  },
  snowgineer: {
    name: 'Snowgineer',
    year: 2024,
    tagline: 'Weekly engineering challenges, built at a hackathon.',
    award: 'Most Technical Complexity · Steel City Hacks 2024',
    stack: ['Nuxt 3', 'Vue', 'TypeScript', 'Bun'],
    repo: gh('Snowgineer'),
    bullets: {
      default: [
        'Built a **Nuxt 3** full-stack app where users compete on weekly challenges.',
        'Paired file-based **server routes** with Vue pages and components.',
      ],
    },
  },
  tetrisai: {
    name: 'TetrisAI',
    year: 2023,
    tagline: 'An agent that evolves to play Tetris.',
    stack: ['Python', 'NEAT', 'Pygame'],
    repo: gh('TetrisAI'),
    bullets: {
      default: [
        'Wrote Tetris from scratch in **Pygame** and trained agents with **NEAT** neuroevolution.',
        'Designed the board-state features and fitness function that the networks optimize.',
      ],
    },
  },
  snakeai: {
    name: 'Snake-AI',
    year: 2022,
    tagline: 'Watch a network learn Snake.',
    stack: ['Python', 'NEAT', 'Pygame'],
    repo: gh('Snake-AI'),
    bullets: {
      default: [
        'Trained Snake agents through **NeuroEvolution of Augmenting Topologies (NEAT)**.',
        'Visualized generations in **Pygame** to watch strategies emerge.',
      ],
    },
  },
};

export const getBullets = (id, role) => {
  const b = projects[id].bullets;
  return b[role] || b.default;
};
