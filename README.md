<div align="center">
	<h1>Rithvik Gurajala — Portfolio</h1>
	<p>Personal portfolio site.</p>
</div>

<div align="center">
	<img src="https://img.shields.io/badge/Astro-0C1222?style=for-the-badge&logo=astro&logoColor=FDFDFE">
	<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB">
	<img src="https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00">
	<img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white">
	<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white">
</div>

---

## Getting started

```bash
npm install
npm run dev
```

The dev server runs at http://localhost:4321.

| Command           | Action                                    |
| ----------------- | ----------------------------------------- |
| `npm run dev`     | Start the local dev server                |
| `npm run build`   | Build the production site into `./dist/`  |
| `npm run preview` | Preview the production build locally      |
| `npm run format`  | Format all files with Prettier            |

## Editing your content

**Almost everything you'll want to change lives in one file: [`src/data/profile.ts`](src/data/profile.ts).**

It exports:

| Export          | What it controls                                              |
| --------------- | ------------------------------------------------------------- |
| `profile`       | Name, title, location, bio, email, tagline                     |
| `socials`       | The social icon row (LinkedIn, email; GitHub is commented out) |
| `navItems`      | Navigation bar links                                           |
| `experience`    | The Experience tab entries                                     |
| `education`     | The Education tab entries                                      |
| `projects`      | Project cards, including their tags, links, and card colors    |
| `caseCompetitions` | Case competition cards (first entry renders as a full-width lead card) |
| `skills`        | The grouped skill chips                                        |
| `skillsSummary` | The paragraphs beside the skills grid                          |

Components read from this file, so a content change never requires touching markup.

### Changing the profile photo

The avatar is a single asset at `public/images/avatar.webp`, square and 320px so
it stays sharp at the 120px render. Replace that file to change the photo; no
markup change is needed. Crop it centred on the face, since the avatar is masked
to a circle and the corners are clipped.

### Changing the color palette

The palette is defined as Tailwind theme variables at the top of
[`src/styles/global.css`](src/styles/global.css) — `--color-accent` is the steel
blue used throughout. The page background gradient is set on `body` in
[`src/layouts/Layout.astro`](src/layouts/Layout.astro).

## Project structure

```
src/
├── components/
│   ├── cases/       CasesComponent.astro
│   ├── contact/     ContactComponent.astro
│   ├── experience/  ExperienceComponent.tsx   (React island, tabbed)
│   ├── global/      Avatar, Card, NavBar, NetworkLine, Footer
│   ├── home/        Intro.astro, Greeting.svelte  (Svelte island)
│   ├── projects/    ProjectsComponent.astro, Project.astro
│   ├── skills/      SkillsComponent.astro
│   ├── socials/     Socials.astro
│   └── ui/          NavigationBar.tsx, tabs.tsx
├── data/            profile.ts   ← all site content
├── layouts/         Layout.astro, PageLayout.astro
├── lib/             utils.ts
├── pages/           index.astro
└── styles/          global.css
```

## Notes

- **Node version.** This project is pinned to Astro 5, which supports the Node 20
  currently installed on this machine. Astro 7 requires Node >= 22.12 — if you
  upgrade Node, you can bump `astro`, `@astrojs/react`, and `@astrojs/svelte` to
  their latest majors.
- **Deployment.** Hosted on Vercel via its GitHub integration, so every push to
  `main` triggers a redeploy. `npm run build` produces a fully static `dist/`
  directory, so any static host would work equally well.
- **Canonical URLs.** `site` in `astro.config.mjs` reads
  `VERCEL_PROJECT_PRODUCTION_URL` at build time and falls back to the dev origin
  locally, so attaching a custom domain needs no code change.

## License

MIT — see [LICENSE](./LICENSE).


