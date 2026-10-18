# Boaz Aine — Personal Bioinformatics & Data Science Portfolio

This is a personal portfolio, not a company landing page. It foregrounds the person's current work, research interests, public GitHub activity, publications, professional development, technical notes and services.

## Included
- `index.html`: portfolio structure
- `assets/css/styles.css`: responsive navy/teal/white design
- `assets/js/main.js`: navigation, content rendering, GitHub public activity and email-draft enquiry form
- `assets/images/boaz-aine-portrait.png`: enhanced portrait prepared for the website
- `content/site.json`: editable content source
- `.pages.yml`: Pages CMS starter configuration

## Review before deployment
1. Confirm the portrait accurately represents you and approve it for public use.
2. Confirm the LinkedIn URL and GitHub username/repository.
3. Replace the example project entries with specific projects, results and repository URLs. Some entries are deliberately labelled as in progress or portfolio entries to complete.
4. Add verified publication records, trainings and certifications to `content/site.json`; empty arrays currently display a clear placeholder instead of invented records.
5. Review service descriptions and only keep offers that reflect your current skills and capacity.
6. Confirm the current-focus and biography text.

## Preview
Because the page loads `content/site.json` with `fetch()`, do not preview by double-clicking `index.html` from a local file path (for example `file:///E:/...`). Browser security can block local JSON requests. Preview with a local server or after deploying to GitHub Pages.

## GitHub Pages deployment
1. Create a repository named `<your-github-username>.github.io` if you want a root-level personal site. Confirm the exact username first.
2. Upload the *contents* of this folder to the repository root, including the hidden `.pages.yml` file.
3. In GitHub, go to Settings → Pages → Deploy from a branch, select `main` and `/(root)`, then save.
4. Wait for GitHub Pages to publish, then open the URL shown in Settings → Pages and verify it in a private browser window and on mobile.
5. Do not describe the website as live until the published URL loads and the main links and sections have been tested.

## Pages CMS
1. Sign in at https://app.pagescms.org with GitHub.
2. Authorise Pages CMS for the website repository only if you are comfortable with its permissions.
3. Open the repository and validate `.pages.yml` in the CMS. CMS field schemas can change; resolve any validation messages using https://pagescms.org/docs/.
4. Test a harmless edit in `content/site.json`, save it through Pages CMS, and confirm the change appears on the website after GitHub Pages updates.
5. The site currently uses a single JSON content file for easy content editing. If the CMS cannot edit the nested arrays with the provided schema, we should adjust the schema or split projects/training/publications into separate JSON files.

## GitHub activity panel
The website requests recent public push events from GitHub's public API in the visitor's browser. It requires internet access, may be affected by GitHub rate limits, and only displays public activity. A fallback link to the GitHub profile is shown if the request fails.

## Enquiry form
The form uses `mailto:`. It prepares an email draft in the visitor's configured email application; it does not store submissions or send them automatically. For a true hosted form, connect a form service after the site structure is approved.


## Readability and consultancy update
- Typography has been increased across body text, section summaries, project cards, outputs and form labels.
- Section spacing and hierarchy have been strengthened for easier scanning.
- The Services section is now labelled as consultancy and covers bioinformatics/sequence analysis, genomics, research data analysis, visualisation, public-health data science, research planning, scientific editing, training, grant/project proposals and reproducibility.
- A built-in preview fallback allows content cards to appear when opening `index.html` directly from a local file, even if the browser blocks fetching `content/site.json`. The hosted website continues to use `content/site.json` as its main content source.
- Service descriptions are framed as project-scoped support; keep only services that you are comfortable and qualified to provide.


## Professional identity and accessibility update
- Homepage identity now presents Boaz as a bioinformatician with a medical laboratory science foundation, without making the hero dependent on current MSc enrolment.
- The About section is a narrative connecting laboratory practice, quality systems and ISO 15189:2022 principles with current bioinformatics/data-science development and long-term ambitions.
- Removed repeated About copy and added distinct narrative paragraphs.
- Increased navigation, branding, hero metadata and section-label text sizes.
- Darkened teal and muted text colours to improve contrast. Links retain text labels and underlines on hover so colour is not the only cue.
- The portrait remains at `assets/images/boaz-aine-portrait.png`.
