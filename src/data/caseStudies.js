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
    team: 'Lucas Reilly, Rishabh Fuke, Julian Ubico and me',
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Flask', 'Supabase', 'Auth0', 'OpenAI API', 'Manim', 'Cloudflare Workers AI'],
    summary:
      'You type in a math or physics question and get back a short animated lesson with a voiceover and a quiz. We built it in 24 hours at SwampHacks X.',
    problem:
      'Animations like the ones on 3Blue1Brown are great for learning, but each scene takes hours of hand-written Manim code. If a student or teacher just wants a quick visual for one concept, there isn’t really a way to get it.',
    pipeline: [
      { label: 'Prompt', note: 'React + Tailwind client' },
      { label: 'Auth', note: 'Auth0 session' },
      { label: 'Script', note: 'OpenAI writes Manim scene code' },
      { label: 'Render', note: 'Flask runs Manim' },
      { label: 'Voice', note: 'AI voiceover track' },
      { label: 'Library', note: 'Supabase saved videos' },
    ],
    decisions: [
      { title: 'Generating Manim code', body: 'We had the model write Manim code instead of trying to generate video directly. Every frame comes out mathematically exact, and when a scene breaks we get an error we can actually debug.' },
      { title: 'Locking down the data early', body: 'Saved videos live in Supabase behind access policies. Users can only see their own library, and only signed-in users can call the generation API.' },
      { title: 'A fine-tuned model toggle', body: 'There’s a switch that sends prompts through our fine-tuned model instead of the base one, so you can compare the two outputs side by side.' },
    ],
    outcomes: ['3rd Place Overall out of 100+ projects', 'Prompt to narrated video in one flow', 'Still getting updates after the hackathon'],
    links: [
      { label: 'GitHub', href: 'https://github.com/SupreetTadeparti/MathWhiz' },
      { label: 'Devpost', href: 'https://devpost.com/software/mathwhiz' },
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
    team: 'Sravya Tadeparti and me',
    stack: ['React', 'Flask', 'scikit-learn', 'NumPy', 'Image augmentation', 'pickle'],
    summary:
      'You place some stars, connect them, and a little alien tries to guess which real constellation you drew.',
    problem:
      'People don’t draw constellations neatly. Sizes, positions, angles and star counts are all over the place, so a model trained only on clean star charts gets confused as soon as someone draws one by hand.',
    pipeline: [
      { label: 'Draw', note: 'React canvas: stars + edges' },
      { label: 'Normalize', note: 'Scale & center to match training data' },
      { label: 'Predict', note: 'Flask /predict endpoint' },
      { label: 'Model', note: 'scikit-learn classifier (.pkl)' },
      { label: 'Decode', note: 'Label encoder → name' },
      { label: 'Reveal', note: 'Animated alien guess' },
    ],
    decisions: [
      { title: 'Augmenting the training data', body: 'The augmentation step shifts, rotates and rescales each constellation’s connections, so the model learns the overall shape instead of memorizing exact coordinates.' },
      { title: 'Normalizing in the browser', body: 'Drawings get scaled and centered on the client to match the training data before they’re sent, which keeps the Flask endpoint small and quick.' },
      { title: 'Making it fun to use', body: 'We added background music, a custom cursor and an alien who announces the guess. It made people want to try a second drawing.' },
    ],
    outcomes: ['85%+ classification accuracy', '10+ constellation classes', 'Works on desktop and mobile'],
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
      'A simulation of late-night campus safety rides that compares first-come-first-serve dispatching with a smarter scheduler called Supishu Sort.',
    problem:
      'Campus night patrols usually take ride requests in the order they come in. When a bunch of requests come from the same area, that order wastes a lot of driving and students end up waiting outside longer than they need to.',
    pipeline: [
      { label: 'Requests', note: '150 orders on a 15×15 grid' },
      { label: 'FCFS', note: 'Baseline dispatcher' },
      { label: 'Supishu', note: 'Optimized scheduler' },
      { label: 'Simulate', note: 'Vehicles move tick by tick' },
      { label: 'Measure', note: 'Wait, ride time, throughput' },
      { label: 'Compare', note: 'Twin grids + CLI report' },
    ],
    decisions: [
      { title: 'Same requests for both', body: 'Both schedulers get the exact same stream of requests on identical grids, so any difference you see comes from the algorithm and not from luck.' },
      { title: 'A headless mode', body: 'compare.dart runs the benchmark without the UI. That made it easy to try different settings and get real numbers instead of watching the animation and guessing.' },
      { title: 'Easy to follow', body: 'New, pickup and drop-off points each have their own color, and a stats panel updates live, so someone without a CS background can still see which scheduler is doing better.' },
    ],
    outcomes: ['Adjustable grid size, order count and start positions', 'Live stats for each algorithm', 'Runs with the UI or from the command line'],
    links: [{ label: 'GitHub', href: 'https://github.com/SupreetTadeparti/SNOP' }],
  },
  {
    slug: 'moon',
    name: 'Moon',
    kicker: 'Graphics · C++ engine',
    year: '2022 – 2025',
    result: 'An OpenGL engine written from scratch',
    color: 'var(--sec)',
    roles: ['Engine architecture', 'Rendering'],
    stack: ['C++17', 'OpenGL', 'GLEW', 'GLFW', 'FreeType', 'premake5'],
    summary:
      'A graphics engine I’ve been writing in C++ and OpenGL. It has a renderer, camera, lights, materials, rigid bodies, text and audio, and it builds as a library that a small sandbox app uses.',
    problem:
      'Using a game engine never taught me how one actually works. I wanted to understand every piece, from vertex buffers up to the event loop, so I started writing my own.',
    pipeline: [
      { label: 'Window', note: 'GLFW + event controller' },
      { label: 'Scene', note: 'Entities, models, sprites' },
      { label: 'Buffers', note: 'VBO / VAO abstractions' },
      { label: 'Shaders', note: 'Materials + lights' },
      { label: 'Renderer', note: 'Camera & draw calls' },
      { label: 'Sandbox', note: 'Client app via EntryPoint' },
    ],
    decisions: [
      { title: 'Building it as a DLL', body: 'Moon compiles to a shared library and the Sandbox app links to it through an EntryPoint header. Real engines are split the same way, and it keeps engine code and app code apart.' },
      { title: 'Using premake', body: 'premake5 generates the Visual Studio solution, so all the dependency paths, build configs and platform settings live in one short script.' },
      { title: 'Small modules', body: 'Buffer, VertexArray, Shader, Material, Light, RigidBody, Text and Audio each have their own files, which makes them easier to test and swap out.' },
    ],
    outcomes: ['20+ engine modules', 'Text rendering with FreeType', 'Rigid bodies, lights and materials'],
    links: [{ label: 'GitHub', href: 'https://github.com/SupreetTadeparti/Moon' }],
  },
];

export const getCaseStudy = (slug) => caseStudies.find((c) => c.slug === slug);
