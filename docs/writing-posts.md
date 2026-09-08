# Writing and maintaining the site

Reference for day-to-day changes. For repo structure and the `/history` archive,
see the [README](../README.md).

---

## Quick start

```bash
npm run dev        # http://localhost:4321 — hot reloads as you type
```

1. Create `src/content/posts/my-new-post.md`
2. Give it front matter (`title` and `date` are the only required fields)
3. Write
4. `git commit && git push` — the Action builds and deploys

You never edit an `.astro` file to publish a post. No route to register, no index
to update, no config to touch.

---

## Where posts live

```
src/content/posts/my-new-post.md   →   daniel-choi.com/posts/my-new-post/
```

The **filename becomes the URL slug**. Keep it lowercase and hyphenated.

The filename has nothing to do with ordering — the posts list is sorted by the
`date` field, newest first. Renaming a file changes its URL, so avoid renaming
anything already published.

---

## Front matter

```yaml
---
title: "Post title"
date: 2026-09-07
description: "One line. Shown as the excerpt on the posts list."
tags: ["Astro", "Notes"]
draft: false
---

Body markdown starts here.
```

| Field | Required | Notes |
|---|---|---|
| `title` | **yes** | Shown as the `<h1>` and in the browser tab |
| `date` | **yes** | `YYYY-MM-DD`. Drives sort order and the displayed date |
| `description` | no | The grey excerpt under the title on the list page, and the meta description |
| `tags` | no | Array of strings. Stored but not yet displayed anywhere |
| `draft` | no | Defaults to `false` |

The contract lives in `src/content.config.ts`. To add a field — a `cover` image,
an `updated` date — add it to that schema and it becomes available to all posts.

### Drafts

`draft: true` removes a post **completely**: no page is generated, and it's absent
from the posts list and the RSS feed. Safe to commit and push half-finished work.

### If you get the front matter wrong

The build fails, names the file and the field, and doesn't deploy:

```
[InvalidContentEntryDataError] posts → hello-astro data does not match collection schema.
  date: Expected type "date", received "object"
  …/src/content/posts/hello-astro.md
```

This is deliberate — a typo can't quietly ship a broken page. If a push doesn't
appear on the site, check the Actions tab first; it's usually this.

---

## Images

Put files in `public/images/`, reference them from the site root:

```markdown
![Class diagram](/images/projects/workout_tracker/1.png)
```

Everything under `public/` is copied to the site root untouched — which is also
how `/history/v1`–`v3` survive the build. Note the leading `/`; a relative path
like `images/foo.png` will break, because a post is served from
`/posts/<slug>/`, not from the root.

PDFs and other downloads go in `public/docs/` and work the same way.

---

## Changing the About page

Everything on it comes from **`src/data/profile.ts`** — name, bio, social links,
work history, education. You shouldn't need to open an `.astro` file to reword
anything.

A work-history entry:

```ts
{
  years: '2021—23',                 // free text; '2023—' for current
  role: 'Software Engineer',
  org: 'Fasoo · Seoul',
  current: true,                    // optional — fills the timeline dot black
  detail: {                         // optional — omit and the row isn't clickable
    summary: 'What the team was and what you built.',
    projects: [                     // optional — renders under "Related posts"
      { name: 'CVE WebCrawler', href: '/posts/cve-web-crawler/' },
    ],
  },
}
```

Rows with a `detail` block open the overlay and show a small `+` beside the role.
Rows without one render as plain text.

---

## Adding a small app or standalone page

Posts are for writing. Self-contained pages — a solver, a toy, a one-off
visualisation — go in `public/apps/<slug>/` as plain files:

```
public/apps/calendar-puzzle/index.html   →   /apps/calendar-puzzle/
```

Anything under `public/` is copied to the site root verbatim and never touched
by the build, so an app can use whatever it likes — its own fonts, its own
palette, inline scripts, a framework, nothing at all. No schema, no front
matter, no bundling. This is the same mechanism that carries `/history`.

Then add a row to `src/data/apps.ts` so it appears on `/apps/`:

```ts
{
  name: 'Calendar house puzzle',
  href: '/apps/calendar-puzzle/',
  year: '2026',
  description: 'One line, shown under the name.',
  thumbnail: '/images/apps/calendar-puzzle.png',   // optional
}
```

`thumbnail` is a screenshot shown beside the entry. Save it under
`public/images/apps/` at roughly 2x its rendered width (108px, so ~240px
wide) and crop it tight — the whole page shrunk down reads as noise, whereas
the one thing the app *is* reads instantly.

To capture one reliably, don't try to find the interesting element by colour
in a full-page screenshot. Serve a throwaway copy of the page with a `<style>`
block that hides everything except that element and zeroes the body padding,
plus a script that puts the app into a representative state (for the puzzle,
clicking Solve — an empty board shows nothing of what it does). Then screenshot
at 2x and trim the flat background. The board is the only thing in frame, so
the crop is exact.

If an app has its own build step, build it elsewhere and copy the *output*
into `public/apps/<slug>/` — don't wire a second build into this repo.

Worth adding a link back to `/apps/` inside the app itself, or visitors who
land on it directly have no way into the rest of the site.

## Routes

| URL | Source |
|---|---|
| `/` | redirect → `/about/` (`redirects` in `astro.config.mjs`) |
| `/about/` | `src/pages/about.astro` |
| `/posts/` | `src/pages/posts/index.astro` |
| `/posts/<slug>/` | `src/pages/posts/[...slug].astro`, one page per markdown file |
| `/apps/` | `src/pages/apps/index.astro`, listing `src/data/apps.ts` |
| `/apps/<slug>/` | static files in `public/apps/<slug>/` — not built |
| `/rss.xml` | `src/pages/rss.xml.js` |
| `/history/…` | static files in `public/history/` — not built, see README |

### Replacing the homepage later

Right now `/` is only a redirect, so the real homepage slot is free. When you
want something there:

1. Create `src/pages/index.astro`
2. Delete the `redirects` block from `astro.config.mjs`

`/about/` keeps working and keeps its URL. Nothing else needs to change.

Because GitHub Pages can't issue a real 301, the redirect is a generated
meta-refresh page. It carries `noindex` and a canonical link to `/about/`, so
search engines index the About page rather than the stub. Worth knowing: `curl -L`
will *not* follow it — meta-refresh is a browser behaviour. Test it in a browser.

### Adding a nav item

Add to the `nav` array at the bottom of `src/data/profile.ts`. The current page
is highlighted automatically by matching the URL.

---

## Editors

Any markdown editor works — all Astro sees is a file on disk.

**Obsidian** pointed at `src/content/posts/` is a good setup: live preview while
writing, and the Git community plugin can commit and push for you.

One gotcha: Obsidian's `[[wiki-links]]` and `![[embeds]]` are non-standard and
render as literal text. Use standard `[text](url)` and `![alt](/images/…)`.

---

## Commands

| | |
|---|---|
| `npm run dev` | dev server, hot reload |
| `npm run build` | production build into `dist/` |
| `npm run preview` | serve the built output — closest to production |

Prefer `npm run preview` over `dev` when checking anything about URLs, redirects
or the `/history` archive, since it serves the real built files.

---

## Deploying

Push to `master`. `.github/workflows/deploy.yml` builds and publishes `dist/`.

This needs **Settings → Pages → Build and deployment → Source: GitHub Actions**.
The repo used to deploy from a branch; on that setting the workflow runs but
nothing goes live.

`public/CNAME` must stay where it is, or the custom domain drops on the next
deploy.
