import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

export default async function decorate(block) {
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);

  block.textContent = '';

  const sections = fragment ? [...fragment.children] : [];

  // --- SEZIONE 1: NAV (lista annidata con categorie) ---
  const navSection = document.createElement('div');
  navSection.className = 'footer-nav';

  const navList = sections[0]?.querySelector('ul');
  if (navList) {
    const categories = [...navList.children];
    categories.forEach((item, i) => {
      const categoryName = item.querySelector('p')?.textContent.trim() ?? '';
      const subList = item.querySelector('ul');

      const col = document.createElement('div');
      col.className = 'footer-nav-col';

      // Titolo categoria
      const title = document.createElement('div');
      title.className = 'footer-nav-title';

      const titleText = document.createElement('span');
      titleText.textContent = categoryName;
      title.append(titleText);

      // Toggle button (solo mobile)
      const toggle = document.createElement('button');
      toggle.className = 'footer-nav-toggle';
      toggle.setAttribute('aria-expanded', i === 0 ? 'true' : 'false');
      toggle.setAttribute('aria-label', `Toggle ${categoryName}`);
      title.append(toggle);

      col.append(title);

      // Voci della categoria
      if (subList) {
        const links = document.createElement('ul');
        links.className = 'footer-nav-links';
        links.classList.add('footer-nav-links-collapsed');

        [...subList.children].forEach((sub) => {
          const li = document.createElement('li');
          const a = sub.querySelector('a');
          if (a) {
            li.append(a.cloneNode(true));
          } else {
            li.textContent = sub.textContent.trim();
          }
          links.append(li);
        });

        col.append(links);
      }

      // Toggle interaction
      title.addEventListener('click', () => {
        const links = col.querySelector('.footer-nav-links');
        const expanded = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', String(!expanded));
        links?.classList.toggle('footer-nav-links-collapsed', expanded);
      });

      navSection.append(col);
    });
  }

  // --- SEZIONE 2: SOCIAL ---
  const socialSection = document.createElement('div');
  socialSection.className = 'footer-social';
  const collapseSvg = await fetch('/icons/collapse.svg').then((r) => r.text());

  const socialList = sections[1]?.querySelector('ul');
  if (socialList) {
    const platforms = [...socialList.children];
    platforms.forEach((item) => {
      const platformName = item.querySelector('p')?.textContent.trim() ?? '';
      const subList = item.querySelector('ul');

      const platformEl = document.createElement('div');
      platformEl.className = 'footer-social-platform';

      const header = document.createElement('div');
      header.className = 'footer-social-header';
      header.setAttribute('aria-expanded', 'false');

      // Placeholder icona (verrà sostituita con SVG originale)
      const icon = document.createElement('span');
      icon.className = `footer-social-icon footer-social-icon-${platformName.toLowerCase().replace(/\s/g, '-')}`;
      const iconEl = item?.querySelector('.icon img');
      if (iconEl) icon.append(iconEl.cloneNode(true));

      const name = document.createElement('span');
      name.className = 'footer-social-name';
      name.textContent = platformName;

      const toggle = document.createElement('i');
      toggle.className = 'footer-social-toggle';
      toggle.setAttribute('aria-label', `Toggle ${platformName}`);
      toggle.innerHTML = collapseSvg;

      header.append(icon, name, toggle);
      platformEl.append(header);

      if (subList) {
        const dropdown = document.createElement('ul');
        dropdown.className = 'footer-social-dropdown footer-social-dropdown-collapsed';

        [...subList.children].forEach((sub) => {
          const li = document.createElement('li');
          const a = sub.querySelector('a');
          if (a) {
            li.append(a.cloneNode(true));
          } else {
            li.textContent = sub.textContent.trim();
          }
          dropdown.append(li);
        });

        platformEl.append(dropdown);

        header.addEventListener('click', () => {
          const expanded = header.getAttribute('aria-expanded') === 'true';
          header.setAttribute('aria-expanded', String(!expanded));
        });
      }

      socialSection.append(platformEl);
    });
  }

  // --- SEZIONE 3: RIGHTS (testo legale + copyright) ---
  const rightsSection = document.createElement('div');
  rightsSection.className = 'footer-rights';
  if (sections[2]) {
    [...sections[2].children].forEach((child) => {
      const p = document.createElement('p');
      p.className = 'footer-rights-text';
      p.textContent = child.textContent.trim();
      rightsSection.append(p);
    });
  }

  // --- SEZIONE 4 + 5: SERVICES + CHANGE COUNTRY (stessa riga) ---
  const bottomBar = document.createElement('div');
  bottomBar.className = 'footer-bottom';

  const servicesSection = document.createElement('nav');
  servicesSection.className = 'footer-services';

  const servicesList = sections[3]?.querySelector('ul');
  if (servicesList) {
    [...servicesList.children].forEach((item) => {
      const a = item.querySelector('a');
      const link = document.createElement('a');
      link.className = 'footer-services-link';
      if (a) {
        link.href = a.href;
        link.textContent = a.textContent.trim();
      } else {
        link.textContent = item.textContent.trim();
      }
      servicesSection.append(link);
    });
  }

  const countrySection = document.createElement('div');
  countrySection.className = 'footer-country';

  const countryText = sections[4]?.textContent.trim() ?? 'INTERNATIONAL';
  const countryBtn = document.createElement('button');
  countryBtn.className = 'footer-country-btn';
  countryBtn.innerHTML = `${countryText} <span class="footer-country-chevron"></span>`;
  countrySection.append(countryBtn);

  bottomBar.append(servicesSection, countrySection);

  // --- SEZIONE 6: LOGO PARTNER ---
  const logoSection = document.createElement('div');
  logoSection.className = 'footer-logo-partner';
  const logoImg = sections[5]?.querySelector('picture, img');
  if (logoImg) logoSection.append(logoImg.cloneNode(true));

  // --- ASSEMBLAGGIO ---
  block.append(navSection, socialSection, rightsSection, bottomBar, logoSection);
}
