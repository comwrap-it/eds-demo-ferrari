export default async function decorate(block) {
  const row = block.children[1];

  if (!row) return;

  const sections = ['left', 'center', 'right'];
  const cells = [...row.children];

  block.textContent = '';

  cells.forEach((cell, i) => {
    const section = document.createElement('div');
    section.className = `menu-header-${sections[i]}`;

    const items = cell.querySelectorAll('li');
    if (items.length > 0) {
      items.forEach((item) => {
        const div = document.createElement('div');
        div.className = `menu-header-${sections[i]}-item`;
        div.append(...item.childNodes);
        section.append(div);
      });
    } else {
      const div = document.createElement('div');
      div.className = `menu-header-${sections[i]}-item`;
      div.append(...cell.childNodes);
      section.append(div);
    }

    block.append(section);
  });

  // --- FULLSCREEN MENU ---
  const overlay = document.createElement('div');
  overlay.className = 'menu-fullscreen';
  overlay.setAttribute('aria-hidden', 'true');

  const actionsBar = document.createElement('div');
  actionsBar.className = 'menu-fullscreen-actions-bar';

  const brandLogoText = await fetch('/icons/brand.svg').then((r) => r.text());
  const brandLogoWrapper = document.createElement('i');
  brandLogoWrapper.classList.add('menu-fullscreen-brand', 'menu-fullscreen-icon');
  brandLogoWrapper.innerHTML = brandLogoText;
  actionsBar.append(brandLogoWrapper);

  const closeBtnText = await fetch('/icons/close.svg').then((r) => r.text());
  const closeBtn = document.createElement('div');
  closeBtn.classList.add('menu-fullscreen-close', 'menu-fullscreen-icon');
  closeBtn.setAttribute('aria-label', 'Close menu');
  closeBtn.innerHTML = closeBtnText;

  actionsBar.append(closeBtn);

  const listing = document.createElement('div');
  listing.className = 'menu-fullscreen-listing';
  const listingWrapper = document.createElement('div');
  listingWrapper.className = 'menu-fullscreen-listing-wrapper';
  listing.append(listingWrapper);
  const listingTitle = document.createElement('div');
  listingTitle.className = 'menu-fullscreen-listing-title';
  listingTitle.textContent = 'FORMULA 1';
  listingWrapper.append(listingTitle);
  const listingListWrapper = document.createElement('div');
  listingListWrapper.className = 'menu-fullscreen-listing-list-wrapper';
  listingWrapper.append(listingListWrapper);
  const listingListContainer = document.createElement('div');
  listingListContainer.className = 'menu-fullscreen-listing-list-container';
  listingListWrapper.append(listingListContainer);
  const listingListUl = document.createElement('ul');
  listingListUl.className = 'menu-fullscreen-listing-ul';
  listingListContainer.append(listingListUl);

  const items = ['Home', 'SF-26', 'Team', 'News', 'Gare', 'Partner', 'Hospitality', 'Media Gallery', 'Storia'];
  items.forEach((text) => {
    const li = document.createElement('li');
    li.className = 'menu-fullscreen-listing-li';
    li.textContent = text;
    listingListUl.appendChild(li);
  });

  const preview = document.createElement('div');
  preview.className = 'menu-fullscreen-preview';

  overlay.append(actionsBar, listing, preview);
  document.body.append(overlay);

  // Apri menu
  const openMenu = () => {
    overlay.setAttribute('aria-hidden', 'false');
    overlay.classList.add('menu-fullscreen-open');
    document.body.style.overflowY = 'hidden';
  };

  // Chiudi menu
  const closeMenu = () => {
    overlay.setAttribute('aria-hidden', 'true');
    overlay.classList.remove('menu-fullscreen-open');
    document.body.style.overflowY = '';
  };

  closeBtn.addEventListener('click', closeMenu);

  // Trigger: click su hamburger
  const hamburger = block.querySelector('.icon-hamburger');
  if (hamburger) {
    hamburger.addEventListener('click', openMenu);
  }

  // updateTop
  const updateTop = () => {
    const navWrapper = document.querySelector('.nav-wrapper');
    const navBottom = navWrapper ? navWrapper.getBoundingClientRect().bottom : 0;
    block.style.top = navBottom > 0 ? `${navBottom}px` : '0px';
  };

  window.addEventListener('scroll', updateTop, { passive: true });

  const navWrapper = document.querySelector('.nav-wrapper');
  if (navWrapper) {
    const observer = new ResizeObserver(() => { updateTop(); });
    observer.observe(navWrapper);
  } else {
    updateTop();
  }

  block.style.top = '40px';
}
