// Pulls public repos from GitHub and writes src/data/repos.json for the Archive page.
// Usage: npm run repos
import { writeFileSync } from 'node:fs';

const USER = 'SupreetTadeparti';
const OUT = new URL('../src/data/repos.json', import.meta.url);

// Hand-tagged categories; anything unlisted falls back to "Web" or "Tools" by language.
const CATEGORY = {
  'AI/ML': ['ConstelGuessr', 'Blagama', 'TetrisAI', 'Snake-AI', 'CovidWavePredictor', 'NeuralNetworkVisualizer', 'Paruni', 'MathWhiz'],
  'Graphics/Sim': ['Moon', 'TerrainGeneration', 'NBodySimulator', 'SNOP', 'Pathfinding-Visualizer', 'SortingAlgorithmVisualizer', 'RubiksCubeSolver'],
  Games: ['Die-or-Die', 'Ballooneedle', 'Mathical', 'Farmonopoly', 'MazeRunner', 'PotatoGames', 'SpeedTyper', 'Shogun', 'whackamole-template', 'Sudoku-Solver'],
  Hackathon: ['MathWhiz', 'Paruni', 'Inkwell', 'Snowgineer', 'WordStorm', 'ConstelGuessr', 'Recom', 'Farmonopoly', 'Mathical', 'BioAlmanac', 'EdBud', 'Potatoes', '404Hackathon', 'SwampHacksPractice'],
  Tools: ['CPAnalysisTimer', 'VergeArticleScraper', 'CheetahPy', 'Algofinity', 'MERN-Template', 'CodeEditor', 'SnippetSandbox', 'Calculator'],
};
// manim-data-structures is a fork Supreet didn't contribute to.
const SKIP = new Set(['SupreetTadeparti', 'PotatoFleet', 'Portfolio', 'Pideas', 'manim-data-structures']);

const res = await fetch(`https://api.github.com/users/${USER}/repos?per_page=100&sort=pushed`, {
  headers: { Accept: 'application/vnd.github+json' },
});
if (!res.ok) throw new Error(`GitHub API ${res.status}`);
const repos = await res.json();

const out = repos
  .filter((r) => !SKIP.has(r.name))
  .map((r) => {
    const cats = Object.entries(CATEGORY).filter(([, names]) => names.includes(r.name)).map(([c]) => c);
    if (!cats.length) cats.push(r.language === 'Python' || r.language === 'Java' ? 'Tools' : 'Web');
    return {
      name: r.name,
      description: r.description || '',
      language: r.language || 'Other',
      stars: r.stargazers_count,
      fork: r.fork,
      url: r.html_url,
      homepage: r.homepage || '',
      created: r.created_at.slice(0, 10),
      pushed: r.pushed_at.slice(0, 10),
      categories: cats,
    };
  });

writeFileSync(OUT, JSON.stringify(out, null, 2) + '\n');
console.log(`Wrote ${out.length} repos → src/data/repos.json`);
