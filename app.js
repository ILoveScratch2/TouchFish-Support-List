let config = null;
let activeCategory = 'all';

async function init() {
  const res = await fetch('./config.json');
  config = await res.json();

  document.getElementById('page-title').textContent = config.site.title;
  document.getElementById('page-subtitle').textContent = config.site.subtitle;
  document.title = config.site.title;

  const footerParts = [];
  if (config.site.author) footerParts.push(`作者：${config.site.author}`);
  if (config.site.maintainer) footerParts.push(`主维护者：${config.site.maintainer}`);
  if (footerParts.length > 0) {
    document.getElementById('page-footer').textContent = footerParts.join('　|　');
  }

  renderTabs();
  renderCards('all');

  document.getElementById('dialog-close-btn').addEventListener('click', () => {
    document.getElementById('detail-dialog').open = false;
  });
}

function renderTabs() {
  const tabs = document.getElementById('category-tabs');
  tabs.innerHTML = '';

  for (const cat of config.categories) {
    const tab = document.createElement('mdui-tab');
    tab.value = cat.id;
    tab.innerHTML = `<mdui-icon name="${cat.icon}" slot="icon"></mdui-icon>${cat.name}`;
    tabs.appendChild(tab);
  }

  tabs.addEventListener('change', (e) => {
    activeCategory = e.target.value;
    renderCards(activeCategory);
  });
}

function renderCards(categoryId) {
  const grid = document.getElementById('app-grid');
  const emptyState = document.getElementById('empty-state');
  const filtered = categoryId === 'all'
    ? config.apps
    : config.apps.filter(app => app.category === categoryId);

  grid.innerHTML = '';

  if (filtered.length === 0) {
    emptyState.style.display = 'flex';
    return;
  }
  emptyState.style.display = 'none';

  for (const app of filtered) {
    const card = createCard(app);
    grid.appendChild(card);
  }
}

function renderIcon(icon, size = 'medium') {
  const cls = size === 'large' ? 'app-icon-large' : 'app-icon';
  if (icon.type === 'material') {
    return `<mdui-icon name="${icon.value}" class="${cls}"></mdui-icon>`;
  }
  if (icon.type === 'url' || icon.type === 'image') {
    return `<img src="${icon.value}" alt="icon" class="${cls} app-icon-img" />`;
  }
  if (icon.type === 'emoji') {
    return `<span class="${cls} emoji-icon">${icon.value}</span>`;
  }
  return `<mdui-icon name="apps" class="${cls}"></mdui-icon>`;
}

function createCard(app) {
  const card = document.createElement('mdui-card');
  card.clickable = true;
  card.className = 'app-card';

  card.innerHTML = `
    <div class="card-inner">
      <div class="card-icon-wrap">
        ${renderIcon(app.icon)}
      </div>
      <div class="card-content">
        <div class="card-title">${app.name}</div>
        <div class="card-desc">${app.description}</div>
        <div class="card-meta">
          ${app.isOpenSource
            ? `<mdui-chip class="chip-open" icon="lock_open" elevated>开源</mdui-chip>`
            : `<mdui-chip class="chip-closed" icon="lock" elevated>闭源</mdui-chip>`}
          ${getCategoryName(app.category)
            ? `<mdui-chip icon="${getCategoryIcon(app.category)}" elevated>${getCategoryName(app.category)}</mdui-chip>`
            : ''}
        </div>
      </div>
    </div>
  `;

  card.addEventListener('click', () => openDetail(app));
  return card;
}

function getCategoryName(id) {
  const cat = config.categories.find(c => c.id === id);
  return cat ? cat.name : '';
}

function getCategoryIcon(id) {
  const cat = config.categories.find(c => c.id === id);
  return cat ? cat.icon : 'label';
}

function openDetail(app) {
  const dialog = document.getElementById('detail-dialog');
  document.getElementById('dialog-headline').textContent = app.name;

  const websiteBtn = app.website
    ? `<mdui-button href="${app.website}" target="_blank" variant="filled" icon="language">访问网站</mdui-button>`
    : '';
  const githubBtn = app.github
    ? `<mdui-button href="${app.github}" target="_blank" variant="tonal" icon="code">GitHub</mdui-button>`
    : '';

  const openSourceChip = app.isOpenSource
    ? `<mdui-chip class="chip-open" icon="lock_open" elevated>开源</mdui-chip>
       <mdui-chip icon="description" elevated>${app.license}</mdui-chip>`
    : `<mdui-chip class="chip-closed" icon="lock" elevated>闭源</mdui-chip>`;

  // 作者/维护者信息
  let authorInfo = '';
  if (app.author && app.maintainer && app.author === app.maintainer) {
    authorInfo = `<mdui-chip icon="person" elevated>${app.author}</mdui-chip>`;
  } else {
    if (app.author) authorInfo += `<mdui-chip icon="person" elevated>作者：${app.author}</mdui-chip>`;
    if (app.maintainer) authorInfo += `<mdui-chip icon="manage_accounts" elevated>维护者：${app.maintainer}</mdui-chip>`;
  }

  document.getElementById('dialog-body').innerHTML = `
    <div class="detail-icon-wrap">
      ${renderIcon(app.icon, 'large')}
    </div>
    <div class="detail-chips">
      ${openSourceChip}
      ${authorInfo}
    </div>
    <p class="detail-full-desc">${app.fullDescription}</p>
    <div class="detail-actions">
      ${websiteBtn}
      ${githubBtn}
    </div>
  `;

  dialog.open = true;
}

init();
