# Portfolio site

Static site (plain HTML/CSS/JS, no build step) — 4 pages: `index.html`, `skills.html`,
`past-work.html`, `open-source.html`. `.nojekyll` is included so GitHub Pages serves the files
as-is instead of running them through Jekyll.

## Preview locally

Any static file server works, e.g.:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Publish with GitHub Pages

Two ways to host this, pick one:

**Option A — project page** (e.g. `caicdo.github.io/portfolio`)
1. Create a new GitHub repo (any name) and push this folder's contents to its root.
2. On GitHub: Settings → Pages → Source → deploy from a branch → pick `main` and `/ (root)`.
3. Save. The URL appears at the top of that Pages settings page after the first deploy (usually a minute or two).

**Option B — root profile page** (`caicdo.github.io`, no subpath)
1. Create a repo named exactly `caicdo.github.io`.
2. Push this folder's contents to its root, on the default branch.
3. GitHub auto-enables Pages for this repo name — no toggle needed. Same Settings → Pages page
   confirms the URL once deployed.

Either way, `index.html` must sit at the root of whatever you push (it does here) — GitHub Pages
looks for `index.html` at the top of the published source.

## Updating content later

- Videos: `past-work.html` embeds YouTube via `<iframe src="https://www.youtube.com/embed/<id>">` —
  swap the ID to replace a video.
- Stats: the animated numbers in `index.html` are `<span class="stat-number" data-target="...">` —
  change `data-target` to the new number.
- Bento button art/copy: `.bento-cell` blocks in `index.html` are plain placeholders right now
  (title text only) — add images/backgrounds directly inside each `<a class="bento-cell ...">`.
