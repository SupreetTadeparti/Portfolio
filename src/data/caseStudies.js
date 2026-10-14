// "Match breakdowns": long-form case studies. `pipeline` drives the architecture diagram.
export const caseStudies = [
  {
    slug: 'mathwhiz',
    name: 'MathWhiz',
    kicker: 'Hackathon · 24 hours',
    year: 'Jan 2025',
    result: '3rd Place Overall · SwampHacks X',
    color: 'var(--ball)',
    roles: ['Full-stack', 'Pipeline'],
    team: 'Team of 4 — with Lucas Reilly, Rishab Fulke & Julian Ubico',
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Flask', 'Supabase', 'Auth0', 'OpenAI API', 'Manim', 'Cloudflare Workers AI'],
    summary:
      'Type a math or physics prompt and get back a narrated, Manim-animated lesson plus a quiz. Built in a day, against 100+ projects.',
    problem:
      'Great math animation (think 3Blue1Brown) takes hours of hand-written Manim code per scene. Teachers and students who need a quick visual explanation of a concept have no way to get one on demand.',
    pipeline: [
      { label: 'Prompt', note: 'React + Tailwind client' },
      { label: 'Auth', note: 'Auth0 session' },
      { label: 'Script', note: 'OpenAI writes Manim scene code' },
      { label: 'Render', note: 'Flask runs Manim' },
      { label: 'Voice', note: 'AI voiceover track' },
      { label: 'Library', note: 'Supabase saved videos' },
    ],
    decisions: [
      { title: 'Generate code, not pixels', body: 'Instead of asking a model for video, the pipeline asks it for Manim Python. That keeps every frame mathematically exact and makes failures debuggable — a bad scene is a stack trace, not a blurry frame.' },
      { title: 'Access policies from minute one', body: 'Saved videos live in Supabase behind database access policies, so users only ever read their own library and the generation API can only be called by authenticated sessions.' },
      { title: 'Fine-tuned toggle', body: 'A switch lets users route generation through a custom fine-tuned model, so its output can be compared against the base model side by side.' },
    ],
    outcomes: ['3rd Place Overall out of 100+ projects', 'End-to-end prompt → narrated video in one flow', 'Still maintained after the hackathon'],
    links: [
      { label: 'GitHub', href: 'https://github.com/SupreetTadeparti/MathWhiz' },
      { label: 'Devpost', href: 'https://devpost.com/software/mathwhiz' },
      { label: 'mathwhiz.biz', href: 'https://mathwhiz.biz' },
    ],
  },
  {
    slug: 'constelguessr',
    name: 'ConstelGuessr',
    kicker: 'Machine learning · Hackathon build',
    year: 'Jul 2025',
    result: '85%+ accuracy across 10+ constellations',
    color: 'var(--ml)',
    roles: ['ML', 'Frontend', 'Backend'],
    team: 'With Sravya Tadeparti',
    stack: ['React', 'Flask', 'scikit-learn', 'NumPy', 'Image augmentation', 'pickle'],
    summary:
      'Place stars, connect them, and an alien astronomer guesses which real constellation you drew — instantly.',
    problem:
      'Hand-drawn constellations are messy: different sizes, positions, rotations and star counts. A classifier trained on clean star charts falls apart the moment a real person draws one.',
    pipeline: [
      { label: 'Draw', note: 'React canvas: stars + edges' },
      { label: 'Normalize', note: 'Scale & center to match training data' },
      { label: 'Predict', note: 'Flask /predict endpoint' },
      { label: 'Model', note: 'scikit-learn classifier (.pkl)' },
      { label: 'Decode', note: 'Label encoder → name' },
      { label: 'Reveal', note: 'Animated alien guess' },
    ],
    decisions: [
      { title: 'Augment the sky', body: 'A dedicated augmentation step jitters, rotates and rescales each constellation\'s connections so the model learns the shape, not the exact coordinates.' },
      { title: 'Normalize at the edge', body: 'The canvas normalizes drawings client-side into the same space as the training data before they ever hit the API, so the server stays a thin, fast prediction call.' },
      { title: 'Delight is a feature', body: 'Shuffleable background music, a custom cursor and an alien speech-bubble reveal turn a classifier demo into something people want to play twice.' },
    ],
    outcomes: ['85%+ classification accuracy', '10+ constellation classes', 'Responsive on desktop and mobile'],
    links: [
      { label: 'GitHub', href: 'https://github.com/SupreetTadeparti/ConstelGuessr' },
      { label: 'Devpost', href: 'https://devpost.com/software/constelguessr' },
    ],
  },
  {
    slug: 'snop',
    name: 'SNOP',
    kicker: 'Simulation · Algorithms',
    year: 'Oct 2025',
    result: 'Side-by-side scheduler benchmark',
    color: 'var(--fs)',
    roles: ['Algorithms', 'Flutter UI'],
    aka: 'Student Nighttime Optimized Patrol',
    stack: ['Flutter', 'Dart'],
    summary:
      'A live simulation that pits first-come-first-serve against a custom “Supishu Sort” scheduler for late-night campus safety rides.',
    problem:
      'Campus night-patrol services dispatch rides in order of request. When requests cluster, that wastes miles and leaves students waiting in the dark longer than necessary.',
    pipeline: [
      { label: 'Requests', note: '150 orders on a 15×15 grid' },
      { label: 'FCFS', note: 'Baseline dispatcher' },
      { label: 'Supishu', note: 'Optimized scheduler' },
      { label: 'Simulate', note: 'Vehicles move tick by tick' },
      { label: 'Measure', note: 'Wait, ride time, throughput' },
      { label: 'Compare', note: 'Twin grids + CLI report' },
    ],
    decisions: [
      { title: 'Same world, two brains', body: 'Both algorithms consume the identical request stream on mirrored grids, so every difference on screen is the scheduler — not luck.' },
      { title: 'Headless mode', body: 'compare.dart runs the benchmark without the UI, making it quick to sweep parameters and get numbers instead of eyeballing animation.' },
      { title: 'Readable at a glance', body: 'Color-coded incoming, pickup and drop-off points plus a live stats panel let a non-technical audience see why one scheduler wins.' },
    ],
    outcomes: ['Configurable grid, order count and start positions', 'Real-time metrics per algorithm', 'UI and headless benchmark modes'],
    links: [{ label: 'GitHub', href: 'https://github.com/SupreetTadeparti/SNOP' }],
  },
  {
    slug: 'moon',
    name: 'Moon',
    kicker: 'Graphics · C++ engine',
    year: '2022 – 2025',
    result: 'A from-scratch OpenGL engine',
    color: 'var(--sec)',
    roles: ['Engine architecture', 'Rendering'],
    stack: ['C++17', 'OpenGL', 'GLEW', 'GLFW', 'FreeType', 'premake5'],
    summary:
      'A programming-first graphics engine — renderer, camera, lights, materials, physics bodies, text and audio — built as a shared library with a sandbox app.',
    problem:
      'Game engines hide everything that makes graphics interesting. Moon exists to understand (and own) every layer, from vertex buffers to the event loop.',
    pipeline: [
      { label: 'Window', note: 'GLFW + event controller' },
      { label: 'Scene', note: 'Entities, models, sprites' },
      { label: 'Buffers', note: 'VBO / VAO abstractions' },
      { label: 'Shaders', note: 'Materials + lights' },
      { label: 'Renderer', note: 'Camera & draw calls' },
      { label: 'Sandbox', note: 'Client app via EntryPoint' },
    ],
    decisions: [
      { title: 'Engine as a DLL', body: 'Moon builds as a shared library and the Sandbox links against it through an EntryPoint header — the same split real engines use to keep engine and game code honest.' },
      { title: 'premake over hand-made projects', body: 'premake5 generates the Visual Studio solution, so dependency paths, configs and platform defines live in one readable script.' },
      { title: 'Small, owned modules', body: 'Buffer, VertexArray, Shader, Material, Light, RigidBody, Text and Audio each get their own unit — easy to test, swap and extend.' },
    ],
    outcomes: ['20+ engine modules', 'Text rendering via FreeType', 'Rigid bodies, lights & materials'],
    links: [{ label: 'GitHub', href: 'https://github.com/SupreetTadeparti/Moon' }],
  },
];

export const getCaseStudy = (slug) => caseStudies.find((c) => c.slug === slug);
