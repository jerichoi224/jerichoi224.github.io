# daniel-choi.com

Personal site of Daniel Choi. Astro, deployed to GitHub Pages.

## Develop

```bash
npm install
npm run dev      # local dev server
npm run build    # production build -> dist/
npm run preview  # serve the built output
npm run verify   # build + check every local link resolves
```

## Writing a post

Drop a markdown file in `src/content/posts/`. The filename becomes the URL
(`my-post.md` → `/posts/my-post/`). Only `title` and `date` are required:

```yaml
---
title: "Post title"
date: 2026-02-14
description: "One line, shown as the excerpt in the posts list."
draft: false          # true hides it from the site and the feed
---
```

Then commit and push.

- **[docs/writing-posts.md](docs/writing-posts.md)** — front matter reference,
  images, drafts, routes, editor setup
- **[docs/maintenance.md](docs/maintenance.md)** — dependency updates, deploy
  debugging, DNS and HTTPS, and the traps worth not re-introducing

## Layout

```
src/
  data/profile.ts       name, bio, work, education, social links  ← edit here
  content/posts/*.md    the posts
  content.config.ts     front-matter schema
  layouts/Base.astro    page shell: nav, identity block, footer
  components/           WorkRow.jsx — the interactive work-history row
  pages/
    about.astro         About  (/ redirects here)
    posts/index.astro   post list
    posts/[...slug].astro  a single post
    rss.xml.js          feed
  styles/global.css     all styling; tokens at the top
public/                 copied to the site root verbatim
  CNAME                 custom domain — must stay, or the domain drops
  .nojekyll             stops GitHub Pages running Jekyll over the build
  history/              frozen previous versions of the site (see below)
```

`.nojekyll` is load-bearing: Astro emits its assets to `_astro/`, and Jekyll
skips underscore-prefixed directories, so without it the deployed site would
lose all its CSS and JS.

Almost all page content comes from `src/data/profile.ts`. Everything else is
layout — you should rarely need to touch the `.astro` files to change wording.

## Site archive

Every previous version of this site is kept, working, under `/history/`. The
paths are unlisted — nothing links to them and `robots.txt` disallows crawling —
but they are plain static files and resolve if you type the URL.

| Path | Years | What it was |
|---|---|---|
| `/history/v1/` | 2016–2017 | Bootstrap; full-bleed cover photo, a few posts |
| `/history/v2/` | 2017–2020 | Foundation / Hawthorne; per-project galleries |
| `/history/v3/` | 2020–2024 | Jekyll; the projects layout |
| `/history/` | — | index of the above |

These are frozen. Don't edit them except to fix a broken link.

### Notes on the archive

- **They were repaired, not just copied.** All three shipped with broken
  references — wrong relative paths, and in v2's case project images that were
  never moved when the site was archived in 2020. Those were restored, one of
  them recovered from a git blob orphaned since the Jekyll migration.
- **v3 is a real Jekyll build** from the last source state (May 2024), with
  `url` set to `/history/v3` so internal links resolve. Its footer year is
  pinned to 2024 rather than the build date.
- **Résumé and transcript files were deliberately not preserved.** Links that
  pointed at them now land on `/history/gone.html`.
- **The two Jekyll theme demo posts were dropped** — upstream template
  leftovers, one credited to the theme author.
- **v3's Blog nav item and `/blog/` page were removed.** The link pointed at an
  external Notion workspace that is no longer used. A deliberate departure from
  an otherwise faithful snapshot.

The ten real project write-ups from v3 were carried forward into
`src/content/posts/` as the current site's posts, so they live on in both places.

## Deploying

Pushing to `master` triggers `.github/workflows/deploy.yml`, which builds and
publishes `dist/` to GitHub Pages.

This requires **Settings → Pages → Build and deployment → Source: GitHub
Actions**. The repo previously deployed from a branch; on that setting the
workflow runs but nothing goes live.
