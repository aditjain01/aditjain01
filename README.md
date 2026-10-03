# Portfolio site

Astro static site, deployed to GitHub Pages by `.github/workflows/deploy.yml` on every push to `main`.

```sh
npm install
npm run dev          # drafts visible in dev
npm run build        # production build, drafts excluded
SHOW_DRAFTS=true npm run build   # preview build including drafts
```

## Hosting

The workflow computes the base path itself: a `<user>.github.io` repo or a `CUSTOM_DOMAIN` repo variable serves from `/`; any other repo name (including this one) serves from `/<repo>`. Enable Pages with **Source: GitHub Actions** in repo settings. Locally, set `BASE_PATH=` to serve from the root.

## Structure

- `src/content/work/*.mdx` case and design studies (frontmatter: title, slug, summary, stage, role, stack, order, diagram, optional builtOn / demo)
- `src/content/writing/*.mdx` notes; `draft: true` hides them from production
- `src/diagrams/*.ts` diagram data, rendered by `src/components/Diagram.astro` as inline SVG that themes with light and dark mode. Add a node `note` for the hover, focus and tap text.
- `src/data/site.ts` name, links and placeholders

## Open items (`TODO(adit)`)

Search the repo for `TODO(adit)`: contact links, resume (`public/resume.pdf` then set `resumeFile` in `site.ts`), NadiHMS ERD (`public/demos/nadihms-erd.html`), Locumsquare and Apsidata one-liners, employer display, custom domain, which notes to publish.

## Redaction rules

Generalized architecture only. Rounded or ranged metrics. No colleague, system, cluster or project names, and no screenshots with real data.
