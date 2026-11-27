# Boaz Aine — Personal Portfolio

A static portfolio published with GitHub Pages. It uses plain HTML, CSS and JavaScript; public profile and portfolio content is maintained in `content/site.json`.

## Site files

- `index.html` — page structure, page metadata and static profile fallback.
- `assets/css/styles.css` — responsive layout and visual styles.
- `assets/js/main.js` — content rendering, accessible navigation, enquiry form and optional public GitHub activity.
- `assets/images/boaz-aine-cutout-optimized.png` — transparent 950 × 1140 hero portrait cutout.
- `assets/images/boaz-aine-portrait.jpg` — optimized portrait used for social sharing.
- `assets/images/hero-genomics.jpg` — compressed decorative genomics background for the hero and project art.
- `assets/favicon.svg` — site icon.
- `content/site.json` — editable profile, research, projects, outputs, development, articles and services.
- `.pages.yml` — Pages CMS schema for editing `content/site.json`.

## Content editing

Edit `content/site.json` directly or connect the repository to Pages CMS and use `.pages.yml`. Keep the JSON valid. Dynamic sections are shown only when they contain usable records; incomplete records and unpublished article drafts do not appear on the public site. An unavailable or invalid JSON file leaves the static profile copy visible and hides the data-driven sections without exposing an error or editing instructions.

Project records need a title and summary to appear. Optional fields are category, status, methods, a project link (`github`) and a context note. Publications, training and certification records need a title. Published articles need a title, summary, `Published` status and public URL. Service cards need a title and description. Research interests and expertise tags are plain text lists.

The home-page summary counts are calculated from the current project, publication, training and service records; they are not manually entered or fixed claims.

Pages CMS schemas may evolve. After connecting Pages CMS, validate `.pages.yml` in its editor and confirm that nested arrays can be edited and saved as JSON. The CMS configuration is a repository-side authoring aid; it is not linked from the public site.

## Local preview

Run a local static server from the repository root, for example:

```sh
python -m http.server 8000
```

Then open `http://localhost:8000`. A local server is needed because the browser fetches `content/site.json`; opening the HTML as a `file://` URL can block that request. If only About and Contact appear, the JSON did not load, so the data-driven sections and their navigation links are being hidden by design.

## GitHub Pages

The site is intended to publish from the repository root. In the repository’s **Settings → Pages**, choose the approved source branch and `/ (root)`. Review the preview and approve changes before merging or publishing them to the live site.

## Integrations and limitations

- The GitHub activity panel requests recent public push events from GitHub’s public API in the visitor’s browser. It can be unavailable due to network access, rate limits or a lack of recent public pushes; the profile link remains available.
- The enquiry form prepares a message in the visitor’s email application using `mailto:`. It does not store submissions or send messages automatically.
- The portrait should be reviewed by its subject before publication. Profile claims, links, project status and public records should be checked by the owner before deployment.
