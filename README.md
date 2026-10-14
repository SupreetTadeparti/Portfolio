# Portfolio 3.0 — Center Court

A table-tennis-broadcast portfolio: a live 3D rally on the home page, one "court" per role (Security, Full-Stack, ML), case studies, an archive of every repo, and an open source & leadership page.

## Run

```bash
npm install
npm run dev       # local dev server
npm run build     # production build in dist/
npm run preview   # serve the build
npm run repos     # refresh src/data/repos.json from the GitHub API
```

## Editing content

All copy lives in `src/data/`:

| File | What it controls |
|---|---|
| `profile.js` | Name, contact, "Now" ticker, experience, education |
| `roles.js` | Each court's headline, stats, project order, skills, resume PDF |
| `projects.js` | Project cards (bullets can differ per role) |
| `caseStudies.js` | The four "Match breakdown" pages |
| `team.js` | Open source, leadership and hackathons |
| `repoNotes.js` | Descriptions for repos that have none on GitHub |

Resumes are in `public/resumes/` and the photo is `public/img/supreet.jpeg`. Replace the files to update them.

## Deploy

Works on Vercel (`vercel.json`) or Netlify (`public/_redirects`) as a single-page app. Point the project root at this folder.
