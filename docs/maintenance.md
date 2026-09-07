# Maintenance

Practical notes for keeping this site working. For writing posts see
[writing-posts.md](writing-posts.md); for repo structure see the
[README](../README.md).

---

## Verifying any change

```bash
npm run verify     # build, then check every local link resolves
```

`check:links` walks the built site and confirms every local `href`/`src` points
at a real file (~930 refs across ~67 pages). It exists because `/history` is
around 500 files of hand-written 2016–2020 HTML with fragile relative paths, and
because post image paths are plain strings nothing else validates. External URLs
are counted but not fetched — a third-party host being down shouldn't fail your
build.

Use `npm run preview`, not `npm run dev`, when checking anything about URLs,
redirects or the archive. Preview serves the real built output; dev doesn't.

---

## Updating dependencies

```bash
npm outdated
npm update                 # minor + patch
npx @astrojs/upgrade       # Astro major versions, handles breaking changes
npm run verify
```

After any Astro major bump, check specifically:

- **The work timeline still aligns.** It depends on `<astro-island>` being
  `display: contents`. If a future Astro changes that, rows will break — see
  the traps below.
- **`_astro/` is still the asset directory.** If it ever changes, `.nojekyll`
  stops mattering, but nothing else should.
- **The trailing-slash behaviour.** `trailingSlash: 'ignore'` plus
  `build.format: 'directory'` is what matches GitHub Pages.

There's no lockfile-driven security surface worth worrying about here: the site
is static, ships no server code, and the only runtime JavaScript is React for
one modal.

---

## Deploying

Push to `master` → `.github/workflows/deploy.yml` builds and publishes `dist/`.
`ci.yml` builds pull requests without deploying.

**If a push doesn't appear on the site**, check the Actions tab. In order of
likelihood:

1. **A content schema error.** A mistyped post `date` or missing `title` fails
   the build and names the file. Pages keeps serving the previous deployment, so
   the symptom is "the site silently stopped updating", not an outage.
2. **Pages source got switched off Actions.** Settings → Pages must say
   **Source: GitHub Actions**, or `deploy-pages` fails outright.
3. **The custom domain field emptied itself.** Changing Pages settings sometimes
   clears it. `public/CNAME` re-asserts it on deploy, but check the field.

---

## Domain and HTTPS

DNS is at **Squarespace Domains** (inherited from Google Domains, which is why
the nameservers are `ns-cloud-*.googledomains.com`).

The records that must stay as they are:

| Host | Type | Value |
|---|---|---|
| `www` | CNAME | `jerichoi224.github.io` |
| `@` | A | `185.199.108.153`, `.109.153`, `.110.153`, `.111.153` |

Those four apex IPs are GitHub's current set. The domain was previously pointed
at `192.30.252.153/154`, GitHub's long-deprecated addresses — which prevented
the TLS certificate from provisioning at all. **If HTTPS ever breaks, check the
apex A records first.**

`public/CNAME` must stay in `public/` so it lands in the build artifact. Delete
it and the custom domain drops on the next deploy.

Certificates are Let's Encrypt, issued and renewed by GitHub automatically. They
only issue once the domain resolves correctly *and* a deployment exists. Enable
**Enforce HTTPS** in Settings → Pages once the cert is live.

---

## The archive is frozen

`public/history/v1`–`v3` are snapshots. Don't edit them except to fix a broken
link, and don't try to rebuild them — v3's Jekyll toolchain no longer resolves
on a current Ruby, which is why the site was migrated in the first place.

Each version is self-contained: it holds its own copies of the CSS, JS and
images it needs, so the live site and the archive can diverge freely. The live
site keeps separate copies of the project images under `public/images/`.

If you ever prune the archive, note the live posts do **not** depend on it.

---

## Design tokens are duplicated — keep them in step

The palette lives in `src/styles/global.css`. Three files in `public/` are served
as-is and can't import it, because the built stylesheet's filename is
content-hashed, so they inline the same tokens:

- `public/404.html`
- `public/history/index.html`
- `public/history/gone.html`

Change `--bg` or `--ink` in `global.css` and these three need the same edit, or
they'll visibly diverge. Each carries a comment saying so.

---

## Things that will rot

- **Company logos** (`public/logos/`). Sourced from company sites and Wikimedia,
  so they'll go stale as brands change. Fasoo's mark is already slightly
  anachronistic — it reads "FASOO" cropped from their current "FASOO | AI"
  identity, which postdates when you worked there. Each entry takes an optional
  `logoScale` in `profile.ts` for optical tuning; widths are normalised to 65px,
  Imagoworks overridden to 75px because its wordmark is longer.
- **External links in old posts.** Two `mega.nz` links (Dead Life game builds)
  and a Google Drive link (ML notebook) are ~8-year-old capability URLs — the
  link *is* the access control, and they may already be dead. `check:links`
  won't tell you; it doesn't fetch external URLs.
- **The `dc9db@virginia.edu` address** appears 19 times across the archive. It's
  a dead UVA alias, and not the live contact — that's `profile.ts`.

---

## Traps already hit, so you don't re-introduce them

- **`.nojekyll` is load-bearing.** Astro emits to `_astro/`, and GitHub's Jekyll
  step skips underscore-prefixed directories. Without it the deployed site loses
  all CSS and JS, with no error.
- **`:last-child` doesn't work across Astro islands.** Each island wraps its
  content in `<astro-island>`, so a component's root element is the only child
  of *its own* wrapper and `:last-child` matches every one. The timeline rail
  uses an explicit `.last` class for this reason.
- **Flexbox `min-width: auto` overrides `flex-basis`.** An image wider than its
  slot's basis grows the slot anyway, knocking a row's text out of alignment.
  The logo slot is sized to the widest mark (76px) to avoid this.
- **`curl -L` won't follow the `/` redirect.** `public/index.html` uses
  `location.replace` plus meta-refresh; neither is an HTTP redirect. Test it in
  a browser.
- **Don't accept GitHub's Jekyll workflow suggestion.** Setting Pages source to
  Actions offers starter templates because it looks for a workflow on the
  default branch. Ours is `deploy.yml`; ignore the prompt.

---

## Recovering old files

Nothing is really gone — the résumé, transcript and every prior version of the
site are in git history:

```bash
git log --all --oneline -- assets/docs/resume.pdf     # find a commit
git show 578feca:assets/docs/resume.pdf > resume.pdf  # pull the file out
```

That's how the work history on the About page was sourced, and how a project
image missing from the v2 archive since 2020 was recovered.

---

## Periodic check

Worth doing a couple of times a year, or after any dependency bump:

- [ ] `npm outdated`, then `npm run verify`
- [ ] Load the live site over HTTPS; confirm the cert isn't near expiry
- [ ] Click through `/history/v1`, `/v2`, `/v3` — the archive is what silently rots
- [ ] Spot-check external links in old posts
- [ ] Confirm Pages source is still **GitHub Actions** and the custom domain is set
