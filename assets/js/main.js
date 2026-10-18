async function loadContent() {
  let data;
  try {
    const response = await fetch('content/site.json');
    if (!response.ok) throw new Error('Content file not available');
    data = await response.json();
  } catch (error) {
    console.warn('Could not load content/site.json; using built-in preview content.', error);
    data = {
      name: "Boaz Aine",
      headline: "BIOINFORMATICS · GENOMICS · DATA SCIENCE",
      intro: "I bring a medical laboratory science perspective to bioinformatics and data science, connecting biological questions with careful data analysis, genomic methods and reproducible research.",
      current_focus: "Bacterial genomics · Antimicrobial resistance · Research data analysis · Reproducible workflows",
      about: "My background in medical laboratory science informs how I approach research data: with attention to quality, context and reliable interpretation.",
      about_lead: "My background in medical laboratory science informs how I approach research data: with attention to quality, context and reliable interpretation.",
      about_text: "Working with laboratory processes has shown me how specimen quality, standard procedures, documentation and quality assurance affect the reliability of results. Those principles remain important as I work with computational methods: data need to be checked, analytical decisions documented, and findings interpreted in their biological and public-health context. My experience includes laboratory quality systems and working with principles associated with ISO 15189:2022.",
      about_ambition: "My current focus is developing and applying skills in genomic analysis, statistical methods, R and Python, and reproducible computational workflows. Research interests include bacterial genomics and antimicrobial resistance, pathogen evolution, infectious-disease research, and public-health data science. I want to contribute to African-led research, collaborate across disciplines, and make responsible analytical methods more accessible through project-based support, training and scientific communication.",
      portrait: "assets/images/boaz-aine-portrait.png",
      research_interests: [
        "Antimicrobial resistance and bacterial genomics",
        "Pathogen genomics and phylogenetic analysis",
        "Public-health data science and disease modelling",
        "Reproducible computational research"
      ],
      projects: [
        {title:"Bacterial genome analysis workflow",category:"Bioinformatics",status:"In progress",summary:"A practical workflow for analysing paired-end bacterial sequencing reads, from quality control and trimming to genome assembly assessment and preparation for comparative analysis.",methods:["FastQC","fastp","Shovill / SPAdes","QUAST"],github:"https://github.com/AineBoaz",note:"Work in progress. Specific repository links, final quality metrics and biological findings will be added when they are ready to share."},
        {title:"Research data analysis workflow",category:"Data science",status:"Developing",summary:"Building a reproducible approach to research data analysis, including data cleaning, exploratory analysis, statistical summaries, visualisation and interpretation.",methods:["R","Python","Exploratory data analysis","Data visualisation"],github:"https://github.com/AineBoaz",note:"This entry describes an area of portfolio development, not a completed analysis or published result."},
        {title:"Genomics for infectious-disease research",category:"Research",status:"Research focus",summary:"Exploring how pathogen genomic data and population-level evidence can be combined to investigate variation, transmission and public-health questions.",methods:["Genomics","Phylogenetics","Statistical analysis"],github:"https://github.com/AineBoaz",note:"Research direction; specific studies and outputs will be listed separately as they become available."}
      ],
      services: [{"title": "Bioinformatics & sequence analysis", "description": "Project-scoped support with sequencing-data quality checks, read trimming, genome assembly assessment and interpretation of bioinformatics outputs.", "scope": "Workflow and deliverables agreed for each dataset."}, {"title": "Genomics & comparative analysis", "description": "Support organising genomic comparisons, exploring sequence variation, reviewing annotation outputs and preparing clear summaries of results.", "scope": "Methods depend on organism, data quality and research question."}, {"title": "Research data analysis", "description": "Data cleaning, exploratory data analysis, descriptive statistics, statistical summaries and interpretation for research datasets.", "scope": "Analysis plan defined before work starts."}, {"title": "Data visualisation & reporting", "description": "Clear charts, tables and analytical summaries that help communicate research findings to technical and non-technical audiences.", "scope": "Figures and reports tailored to the intended audience."}, {"title": "Public-health data science", "description": "Support exploring surveillance and population-health datasets, identifying trends and preparing evidence-informed summaries.", "scope": "Findings are reported with appropriate limitations."}, {"title": "Research methods & study planning", "description": "Practical support refining research questions, aligning objectives with analysis plans and organising reproducible data workflows.", "scope": "Does not replace institutional or ethics review."}, {"title": "Scientific writing & technical editing", "description": "Editing and structuring methods, analytical reports, technical documentation and research proposals for clarity and consistency.", "scope": "Authorship, citations and research integrity are maintained."}, {"title": "Training & workflow support", "description": "One-to-one or small-group practical sessions in selected bioinformatics, R/Python data analysis and reproducible research workflows.", "scope": "Topics and level agreed in advance."}, {"title": "Grant & project proposal support", "description": "Support organising proposal narratives, workplans, methods sections, deliverables and budgets for research or data-focused projects.", "scope": "Funding requirements and eligibility remain the applicant’s responsibility."}, {"title": "Data management & reproducibility", "description": "Help organising project files, documenting analysis steps, improving script readability and preparing workflows that others can review.", "scope": "Security and data-sharing rules are agreed before access."}],
      publications: [],
      trainings: [],
      certifications: [],
      articles: [
        {title:"Quality control before bacterial genome assembly",summary:"A planned practical note on read quality assessment, trimming decisions and assembly quality checks.",status:"Planned note",url:""},
        {title:"Building reproducible computational research",summary:"A planned note on scripts, documentation, project organisation and transparent reporting.",status:"Planned note",url:""}
      ]
    };
  }
  const setText = (id, value) => { const el = document.getElementById(id); if (el && value) el.textContent = value; };
  setText('hero-kicker', data.headline);
  setText('hero-intro', data.intro);
  setText('current-focus', data.current_focus);
  setText('about-lead', data.about_lead || data.about);
  setText('about-text', data.about_text || data.about);
  setText('about-ambition', data.about_ambition || '');
  const portrait = document.getElementById('portrait');
  if (portrait && data.portrait) portrait.src = data.portrait;
  renderProjects(data.projects || []);
  renderInterests(data.research_interests || []);
  renderRecords('publication-list', 'publication-empty', data.publications || [], 'publication');
  renderRecords('training-list', 'training-empty', data.trainings || [], 'training');
  renderRecords('certification-list', 'certification-empty', data.certifications || [], 'certification');
  renderArticles(data.articles || []);
  renderServices(data.services || []);
}
function safeLink(url) {
  try { const parsed = new URL(url, window.location.href); return ['http:', 'https:'].includes(parsed.protocol) ? parsed.href : ''; }
  catch { return ''; }
}
function escapeHtml(value='') {
  return String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
}
function renderProjects(items) {
  const root = document.getElementById('project-grid'); if (!root) return;
  root.innerHTML = items.map((item, i) => {
    const category = (item.category || '').toLowerCase();
    const style = category.includes('data') ? 'data' : category.includes('research') ? 'research' : '';
    const methods = (item.methods || []).map(method => `<span>${escapeHtml(method)}</span>`).join('');
    const url = safeLink(item.github);
    return `<article class="project-card"><div class="project-top ${style}"><span class="number">${String(i+1).padStart(2,'0')}</span><span class="project-symbol">${category.includes('data') ? '▥' : category.includes('research') ? '⌬' : '〰'}</span><span class="category">${escapeHtml(item.category || 'Project')}</span></div><div class="project-content"><span class="status">${escapeHtml(item.status || 'In progress')}</span><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.summary)}</p><div class="method-tags">${methods}</div><div class="project-foot"><span>${escapeHtml(item.category || 'Work')}</span>${url ? `<a href="${url}" target="_blank" rel="noreferrer">Repository ↗</a>` : '<span>Link to be added</span>'}</div>${item.note ? `<p class="project-note">${escapeHtml(item.note)}</p>` : ''}</div></article>`;
  }).join('');
}
function renderInterests(items) {
  const root = document.getElementById('research-list'); if (!root) return;
  root.innerHTML = items.map((item, i) => `<article><span>${String(i+1).padStart(2,'0')}</span><div><h3>${escapeHtml(item)}</h3><p>Research interest — specific questions and project details will be added as the work develops.</p></div></article>`).join('');
}
function renderRecords(listId, emptyId, items, kind) {
  const root = document.getElementById(listId), empty = document.getElementById(emptyId);
  if (!root || !empty) return;
  if (!items.length) { empty.hidden = false; return; }
  empty.hidden = true;
  root.innerHTML = items.map(item => {
    const date = item.date || item.year || (item.status || '');
    const title = item.title || item.name || 'Untitled record';
    const meta = [item.organisation, item.issuer, item.credential, item.role].filter(Boolean).join(' · ');
    const description = item.description || item.details || item.summary || '';
    const link = safeLink(item.url || item.verification_url || item.doi_url);
    return `<article class="record-item"><div class="record-date">${escapeHtml(date)}</div><div><h3>${escapeHtml(title)}</h3>${description ? `<p>${escapeHtml(description)}</p>` : ''}${meta ? `<p class="record-meta">${escapeHtml(meta)}</p>` : ''}</div>${link ? `<a href="${link}" target="_blank" rel="noreferrer">View record ↗</a>` : ''}</article>`;
  }).join('');
}
function renderArticles(items) {
  const root = document.getElementById('article-list'); if (!root) return;
  root.innerHTML = items.map(item => {
    const url = safeLink(item.url);
    return `<article class="article-item"><div class="article-status">${escapeHtml(item.status || 'Note')}</div><div><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.summary || '')}</p></div>${url ? `<a href="${url}" target="_blank" rel="noreferrer">Read ↗</a>` : '<span class="article-status">Draft idea</span>'}</article>`;
  }).join('');
}
function renderServices(items) {
  const root = document.getElementById('service-grid'); if (!root) return;
  root.innerHTML = items.map((item, i) => `<article class="service-card"><div class="service-icon">${['⌬','▦','⌘','✎'][i % 4]}</div><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.description)}</p><p class="service-scope">${escapeHtml(item.scope || '')}</p><a href="mailto:aine.datascience@gmail.com?subject=${encodeURIComponent('Service enquiry: ' + item.title)}">Contact for pricing ↗</a></article>`).join('');
}
async function loadGitHubActivity() {
  const root = document.getElementById('github-activity');
  if (!root) return;
  try {
    const response = await fetch('https://api.github.com/users/AineBoaz/events/public?per_page=30', {headers: {'Accept':'application/vnd.github+json'}});
    if (!response.ok) throw new Error('GitHub public API unavailable');
    const events = await response.json();
    const pushes = events.filter(event => event.type === 'PushEvent' && event.payload && event.payload.commits && event.payload.commits.length);
    const commits = [];
    for (const event of pushes) {
      for (const commit of event.payload.commits.slice().reverse()) {
        commits.push({repo:event.repo.name, message:commit.message, sha:commit.sha, date:event.created_at});
        if (commits.length >= 6) break;
      }
      if (commits.length >= 6) break;
    }
    if (!commits.length) {
      root.innerHTML = '<div class="activity-item"><span class="activity-bullet"></span><div><strong>No recent public push events found.</strong><p>Public activity may be quiet, or GitHub may limit the request.</p><a href="https://github.com/AineBoaz" target="_blank" rel="noreferrer">Browse repositories ↗</a></div></div>';
      return;
    }
    root.innerHTML = commits.map(commit => {
      const repoUrl = safeLink('https://github.com/' + commit.repo);
      const shaUrl = safeLink('https://github.com/' + commit.repo + '/commit/' + commit.sha);
      const date = new Date(commit.date).toLocaleDateString(undefined, {year:'numeric',month:'short',day:'numeric'});
      return `<article class="activity-item"><span class="activity-bullet"></span><div><strong>${escapeHtml(commit.message.split('\\n')[0])}</strong><p>${escapeHtml(commit.repo)} · ${escapeHtml(date)}</p><a href="${shaUrl || repoUrl}" target="_blank" rel="noreferrer">View commit ↗</a></div></article>`;
    }).join('');
  } catch (error) {
    root.innerHTML = '<div class="activity-item"><span class="activity-bullet"></span><div><strong>GitHub activity is not available right now.</strong><p>You can still explore repositories and commits directly.</p><a href="https://github.com/AineBoaz" target="_blank" rel="noreferrer">Open GitHub profile ↗</a></div></div>';
  }
}
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#primary-nav');
if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => { const open = nav.classList.toggle('open'); menuToggle.setAttribute('aria-expanded', String(open)); });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { nav.classList.remove('open'); menuToggle.setAttribute('aria-expanded', 'false'); }));
}
const year = document.querySelector('#year'); if (year) year.textContent = new Date().getFullYear();
const form = document.querySelector('#enquiry-form');
if (form) form.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(form);
  const subject = encodeURIComponent('[Website enquiry] ' + String(data.get('topic') || 'General enquiry'));
  const body = encodeURIComponent(`Name: ${data.get('name')}\nReply email: ${data.get('email')}\nTopic: ${data.get('topic')}\n\nMessage:\n${data.get('message')}`);
  const status = document.querySelector('#form-status');
  if (status) status.textContent = 'Your email application should open with the enquiry prepared. Review it and press Send to deliver it.';
  window.location.href = `mailto:aine.datascience@gmail.com?subject=${subject}&body=${body}`;
});
loadContent();
loadGitHubActivity();
