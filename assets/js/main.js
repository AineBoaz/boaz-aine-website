const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

function text(id, value) {
  const element = document.getElementById(id);
  if (element && typeof value === 'string' && value.trim()) element.textContent = value.trim();
}

function safeLink(value) {
  if (typeof value !== 'string' || !value.trim()) return '';
  try {
    const url = new URL(value.trim(), window.location.href);
    return ['http:', 'https:'].includes(url.protocol) ? url.href : '';
  } catch {
    return '';
  }
}

function cleanList(value, isValid = item => Boolean(item)) {
  return Array.isArray(value) ? value.filter(isValid) : [];
}

function revealSection(id, visible) {
  const section = document.getElementById(id);
  if (section) section.hidden = !visible;
  $$(`[data-nav-target="${id}"]`).forEach(link => { link.hidden = !visible; });
  const more = $('#more-menu');
  if (more) more.hidden = !$$('.nav-dropdown [data-nav-target]:not([hidden])').length;
}

function renderProjects(items) {
  const projects = cleanList(items, item => item && item.title?.trim() && item.summary?.trim());
  const root = $('#project-grid');
  if (!root) return;
  root.innerHTML = projects.map((item, index) => {
    const category = String(item.category || '');
    const lowerCategory = category.toLowerCase();
    const title = String(item.title || '').toLowerCase();
    const style = title.includes('heart') ? 'clinical' : lowerCategory.includes('data') ? 'data' : lowerCategory.includes('research') ? 'research' : 'science';
    const methods = cleanList(item.methods, method => typeof method === 'string' && method.trim());
    const candidateLink = safeLink(item.github || item.url);
    const candidateUrl = candidateLink ? new URL(candidateLink) : null;
    const link = candidateUrl?.hostname === 'github.com' && candidateUrl.pathname.replace(/\/+$/, '').toLowerCase() === '/aineboaz'
      ? '' : candidateLink;
    const status = typeof item.status === 'string' && item.status.trim()
      ? `<span class="status">${escapeHtml(item.status)}</span>` : '';
    const methodTags = methods.length
      ? `<ul class="method-tags" aria-label="Methods and tools">${methods.map(method => `<li>${escapeHtml(method)}</li>`).join('')}</ul>` : '';
    const note = item.note?.trim() ? `<p class="project-note">${escapeHtml(item.note)}</p>` : '';
    return `<article class="project-card">
      <div class="project-top ${style}"><span class="number">${String(index + 1).padStart(2, '0')}</span><span class="project-symbol" aria-hidden="true">${lowerCategory.includes('data') ? '▥' : lowerCategory.includes('research') ? '⌬' : '〰'}</span><span class="category">${escapeHtml(category)}</span></div>
      <div class="project-content">${status}<h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.summary)}</p>${methodTags}
        <div class="project-foot">${category ? `<span>${escapeHtml(category)}</span>` : '<span></span>'}${link ? `<a href="${escapeHtml(link)}" target="_blank" rel="noopener noreferrer">View project <span aria-hidden="true">↗</span></a>` : ''}</div>${note}
      </div></article>`;
  }).join('');
  revealSection('work', projects.length > 0);
}

function renderInterests(items) {
  const interests = cleanList(items, item => typeof item === 'string' && item.trim());
  const root = $('#research-list');
  if (root) root.innerHTML = interests.map((item, index) => `<article><span>${String(index + 1).padStart(2, '0')}</span><div><h3>${escapeHtml(item)}</h3></div></article>`).join('');
  revealSection('research', interests.length > 0);
}

function renderRecords(listId, items, kind) {
  const hasDetails = item => {
    if (!item || !(item.title || item.name)?.trim()) return false;
    if (kind === 'publication') return Boolean(item.date || item.year || item.description || item.url || item.doi_url);
    if (kind === 'training') return Boolean(item.date || item.organisation || item.description || item.url);
    if (kind === 'certification') return Boolean(item.date || item.issuer || item.credential || item.verification_url);
    return false;
  };
  const records = cleanList(items, hasDetails);
  const root = $(`#${listId}`);
  if (!root) return records.length;
  root.innerHTML = records.map(item => {
    const date = item.date || item.year || item.status || '';
    const title = item.title || item.name;
    const meta = [item.organisation, item.issuer, item.credential].filter(value => typeof value === 'string' && value.trim()).join(' · ');
    const description = item.description || item.details || item.summary || '';
    const link = safeLink(item.url || item.verification_url || item.doi_url);
    return `<article class="record-item">${date ? `<div class="record-date">${escapeHtml(date)}</div>` : '<div></div>'}<div><h3>${escapeHtml(title)}</h3>${description ? `<p>${escapeHtml(description)}</p>` : ''}${meta ? `<p class="record-meta">${escapeHtml(meta)}</p>` : ''}</div>${link ? `<a href="${escapeHtml(link)}" target="_blank" rel="noopener noreferrer">${kind === 'publication' ? 'View publication' : kind === 'certification' ? 'Verify credential' : 'View details'} <span aria-hidden="true">↗</span></a>` : ''}</article>`;
  }).join('');
  return records.length;
}

function renderArticles(items) {
  const articles = cleanList(items, item => item && item.title?.trim() && item.summary?.trim() && safeLink(item.url) && /^published$/i.test(item.status || ''));
  const root = $('#article-list');
  if (root) root.innerHTML = articles.map(item => `<article class="article-item"><div class="article-status">Published</div><div><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.summary)}</p></div><a href="${escapeHtml(safeLink(item.url))}" target="_blank" rel="noopener noreferrer">Read article <span aria-hidden="true">↗</span></a></article>`).join('');
  revealSection('notes', articles.length > 0);
}

function renderServices(items, email) {
  const services = cleanList(items, item => item && item.title?.trim() && item.description?.trim());
  const root = $('#service-grid');
  if (root) root.innerHTML = services.map((item, index) => {
    const mailto = email ? `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(`Service enquiry: ${item.title}`)}` : '';
    const scope = item.scope?.trim() ? `<p class="service-scope">${escapeHtml(item.scope)}</p>` : '';
    return `<article class="service-card"><div class="service-icon" aria-hidden="true">${['⌬', '▦', '⌘', '✎'][index % 4]}</div><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.description)}</p>${scope}${mailto ? `<a href="${mailto}">Discuss this service <span aria-hidden="true">↗</span></a>` : ''}</article>`;
  }).join('');
  revealSection('services', services.length > 0);
}

function renderStats(data) {
  const stats = [
    { value: cleanList(data.projects, item => item && item.title?.trim() && item.summary?.trim()).length, label: 'Portfolio projects', icon: '⌬' },
    { value: cleanList(data.publications, item => item && item.title?.trim() && /^published$/i.test(item.status || '')).length, label: 'Published outputs', icon: '▤' },
    { value: cleanList(data.trainings, item => item && item.title?.trim() && (item.date || item.organisation || item.description || item.url)).length, label: 'Training records', icon: '♙' },
    { value: cleanList(data.services, item => item && item.title?.trim() && item.description?.trim()).length, label: 'Project support areas', icon: '▱' }
  ].filter(item => item.value > 0);
  const root = $('#stats-grid');
  const section = $('#portfolio-stats');
  if (root) root.innerHTML = stats.map(item => `<div class="stat-item"><span class="stat-icon" aria-hidden="true">${item.icon}</span><span><strong>${item.value}</strong><small>${item.label}</small></span></div>`).join('');
  if (section) section.hidden = stats.length === 0;
}

function escapeHtml(value = '') {
  return String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
}

function applyContactLinks(data) {
  const email = typeof data.email === 'string' ? data.email.trim() : '';
  const emailLink = $('#email-link');
  const emailLabel = $('#email-label');
  if (emailLink && email) emailLink.href = `mailto:${email}`;
  if (emailLabel && email) emailLabel.textContent = email;
  const linkedin = safeLink(data.linkedin);
  const github = safeLink(data.github_url) || (data.github_username ? safeLink(`https://github.com/${data.github_username}`) : '');
  for (const [id, link] of [['about-linkedin', linkedin], ['contact-linkedin', linkedin], ['portfolio-github', github], ['github-profile', github], ['contact-github', github]]) {
    const element = document.getElementById(id);
    if (element && link) element.href = link;
    else if (element && !link) element.hidden = true;
  }
  const form = $('#enquiry-form');
  if (!email && form) form.hidden = true;
  return email;
}

function renderContent(data) {
  renderStats(data);
  if (typeof data.name === 'string' && data.name.trim()) {
    $$('[data-site-name]').forEach(element => { element.textContent = data.name.trim(); });
    document.title = `${data.name.trim()} | Bioinformatics & Genomics`;
    const socialTitle = $('meta[property="og:title"]');
    if (socialTitle) socialTitle.content = document.title;
  }
  text('hero-kicker', data.headline);
  text('hero-role', data.hero_role);
  text('hero-intro', data.intro);
  text('current-focus', data.current_focus);
  text('about-lead', data.about_lead || data.about);
  text('about-text', data.about_text);
  text('about-ambition', data.about_ambition || data.about);
  const portrait = $('#portrait');
  const portraitPath = safeLink(data.portrait);
  if (portrait && portraitPath) portrait.src = portraitPath;
  const tags = cleanList(data.expertise, item => typeof item === 'string' && item.trim());
  const tagRoot = $('#expertise-tags');
  if (tagRoot) tagRoot.innerHTML = tags.map(tag => `<span>${escapeHtml(tag)}</span>`).join('');

  const email = applyContactLinks(data);
  renderProjects(data.projects);
  renderInterests(data.research_interests);
  const publicationCount = renderRecords('publication-list', data.publications, 'publication');
  revealSection('outputs', publicationCount > 0);
  const trainingCount = renderRecords('training-list', data.trainings, 'training');
  const certificationCount = renderRecords('certification-list', data.certifications, 'certification');
  const trainingColumn = $('#training-column');
  const certificationColumn = $('#certification-column');
  if (trainingColumn) trainingColumn.hidden = trainingCount === 0;
  if (certificationColumn) certificationColumn.hidden = certificationCount === 0;
  revealSection('learning', trainingCount + certificationCount > 0);
  renderArticles(data.articles);
  renderServices(data.services, email);
}

async function loadContent() {
  try {
    const response = await fetch('content/site.json', { headers: { Accept: 'application/json' } });
    if (!response.ok) throw new Error('Content unavailable');
    const data = await response.json();
    if (!data || typeof data !== 'object' || Array.isArray(data)) throw new Error('Invalid content');
    renderContent(data);
  } catch {
    // Static profile copy remains useful; data-driven sections stay hidden without approved content.
    for (const id of ['work', 'research', 'outputs', 'learning', 'notes', 'services']) revealSection(id, false);
    const form = $('#enquiry-form');
    if (form) form.hidden = true;
  }
}

async function loadGitHubActivity() {
  const root = $('#github-activity');
  if (!root) return;
  try {
    const response = await fetch('https://api.github.com/users/AineBoaz/events/public?per_page=30', {
      headers: { Accept: 'application/vnd.github+json' },
      signal: AbortSignal.timeout(8000)
    });
    if (!response.ok) throw new Error('Activity unavailable');
    const events = await response.json();
    const commits = [];
    for (const event of events.filter(item => item.type === 'PushEvent' && item.payload?.commits?.length)) {
      for (const commit of [...event.payload.commits].reverse()) {
        commits.push({ repo: event.repo.name, message: commit.message, sha: commit.sha, date: event.created_at });
        if (commits.length >= 6) break;
      }
      if (commits.length >= 6) break;
    }
    if (!commits.length) throw new Error('No recent pushes');
    root.innerHTML = commits.map(commit => {
      const repo = `https://github.com/${commit.repo}`;
      const commitUrl = `${repo}/commit/${encodeURIComponent(commit.sha)}`;
      const date = new Date(commit.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
      return `<article class="activity-item"><span class="activity-bullet" aria-hidden="true"></span><div><strong>${escapeHtml(commit.message.split('\n')[0])}</strong><p>${escapeHtml(commit.repo)} · ${escapeHtml(date)}</p><a href="${escapeHtml(commitUrl)}" target="_blank" rel="noopener noreferrer">View commit <span aria-hidden="true">↗</span></a></div></article>`;
    }).join('');
  } catch {
    root.innerHTML = '<div class="activity-fallback"><p>Recent activity is unavailable. Public repositories remain available on GitHub.</p><a href="https://github.com/AineBoaz" target="_blank" rel="noopener noreferrer">Browse repositories <span aria-hidden="true">↗</span></a></div>';
  }
}

function setupNavigation() {
  const toggle = $('.menu-toggle');
  const nav = $('#primary-nav');
  const more = $('#more-menu');
  if (!toggle || !nav) return;
  const closeMenu = () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    const label = $('.menu-toggle-label', toggle);
    if (label) label.textContent = 'Menu';
  };
  toggle.addEventListener('click', () => {
    const open = !nav.classList.contains('open');
    nav.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    const label = $('.menu-toggle-label', toggle);
    if (label) label.textContent = open ? 'Close menu' : 'Menu';
  });
  nav.addEventListener('click', event => {
    if (event.target.closest('a')) closeMenu();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      if (more?.open) { more.open = false; $('summary', more)?.focus(); }
      if (nav.classList.contains('open')) { closeMenu(); toggle.focus(); }
    }
  });
  document.addEventListener('click', event => {
    if (!nav.contains(event.target) && !toggle.contains(event.target)) closeMenu();
  });
}

function setupActiveSection() {
  if (!('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver(entries => {
    const active = entries.filter(entry => entry.isIntersecting && !entry.target.hidden).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!active) return;
    $$('[data-nav-target]').forEach(link => {
      if (link.getAttribute('href') === `#${active.target.id}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }, { rootMargin: '-25% 0px -65% 0px', threshold: [0, 0.1, 0.4] });
  $$('main > section[id]').forEach(section => observer.observe(section));
}

function setupEnquiryForm() {
  const form = $('#enquiry-form');
  if (!form) return;
  form.addEventListener('submit', event => {
    event.preventDefault();
    const values = new FormData(form);
    const email = $('#email-label')?.textContent?.trim();
    if (!email) return;
    const subject = encodeURIComponent(`[Website enquiry] ${values.get('topic') || 'General enquiry'}`);
    const body = encodeURIComponent(`Name: ${values.get('name')}\nReply email: ${values.get('email')}\nTopic: ${values.get('topic')}\n\nMessage:\n${values.get('message')}`);
    const status = $('#form-status');
    if (status) status.textContent = 'Your email application should open with the enquiry prepared. Review it and press Send to deliver it.';
    window.location.href = `mailto:${encodeURIComponent(email)}?subject=${subject}&body=${body}`;
  });
}

const year = $('#year');
if (year) year.textContent = String(new Date().getFullYear());
setupNavigation();
setupActiveSection();
setupEnquiryForm();
loadContent();
loadGitHubActivity();
