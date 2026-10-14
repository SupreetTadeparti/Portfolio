// Every project that appears on a role page. `bullets` is keyed by role so each
// page uses the wording from that role's resume; `default` covers the rest.
const gh = (name) => `https://github.com/SupreetTadeparti/${name}`;

export const projects = {
  mathwhiz: {
    name: 'MathWhiz',
    year: 2025,
    tagline: 'Turns math questions into animated lessons.',
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
    tagline: 'Tamper-proof notes on the Internet Computer, built for the dApp Hackathon.',
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
    tagline: 'A community app for donations, chat and elections.',
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
    tagline: 'Draw a constellation and see if the model can name it.',
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
    tagline: 'Drops story characters into a parallel universe.',
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
    tagline: 'A session-based login server built from scratch.',
    stack: ['Node.js', 'Express', 'Passport', 'bcrypt', 'MongoDB'],
    repo: gh('NodeAuth'),
    bullets: {
      default: [
        'Built a local-strategy **authentication server** with **Passport.js**, **bcrypt**-hashed credentials and **express-session** cookies.',
        'Protected routes behind a login check and stored users in **MongoDB** with Mongoose.',
      ],
    },
  },
  piary: {
    name: 'Piary',
    year: 2022,
    tagline: 'A private online diary with its own client and server.',
    stack: ['TypeScript', 'React', 'Node.js', 'Express', 'MongoDB'],
    repo: gh('Piary'),
    bullets: {
      default: [
        'Built a private online diary with a **TypeScript** client and a separate **Node/Express API**.',
        'Stored entries and users in **MongoDB**, and only signed-in users can reach the REST routes.',
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
        'Contributing to the frontend for the **UF Open Source Club** Jukebox project, which runs alongside the Jukebox server.',
        'Every pull request has to pass **CI linting and unit tests** before it gets merged.',
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
        'Wrote **Firestore** and **Storage security rules** so people can only change what they’re allowed to.',
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
        'Built a **Nuxt 3** full-stack app where people compete in weekly challenges.',
        'Used Nuxt’s **server routes** for the backend and Vue components for the frontend.',
      ],
    },
  },
  tetrisai: {
    name: 'TetrisAI',
    year: 2023,
    tagline: 'An agent that learns to play Tetris.',
    stack: ['Python', 'NEAT', 'Pygame'],
    repo: gh('TetrisAI'),
    bullets: {
      default: [
        'Wrote Tetris from scratch in **Pygame** and trained agents with **NEAT** neuroevolution.',
        'Picked the board features the networks see and wrote the fitness function they try to maximize.',
      ],
    },
  },
  snakeai: {
    name: 'Snake-AI',
    year: 2022,
    tagline: 'Watch a neural network learn to play Snake.',
    stack: ['Python', 'NEAT', 'Pygame'],
    repo: gh('Snake-AI'),
    bullets: {
      default: [
        'Trained Snake agents with **NEAT** (NeuroEvolution of Augmenting Topologies).',
        'Used **Pygame** to show each generation playing, so you can watch the strategies improve.',
      ],
    },
  },
};

export const getBullets = (id, role) => {
  const b = projects[id].bullets;
  return b[role] || b.default;
};
