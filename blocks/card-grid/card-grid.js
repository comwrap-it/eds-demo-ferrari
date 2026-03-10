export default function decorate(block) {
  const rows = [...block.children];

  // Riga 0: title del blocco
  const blockTitle = rows[0]?.children[1]?.textContent.trim() ?? '';

  // Riga 1: intestazione campi (ignorata nel rendering)
  // Righe 2+: card
  const cardRows = rows.slice(2);

  block.textContent = '';

  // Titolo sezione
  if (blockTitle) {
    const titleEl = document.createElement('p');
    titleEl.className = 'card-grid-title';
    titleEl.textContent = blockTitle;
    block.append(titleEl);
  }

  // Wrapper slider
  const sliderWrapper = document.createElement('div');
  sliderWrapper.className = 'card-grid-slider';

  const track = document.createElement('div');
  track.className = 'card-grid-track';

  cardRows.forEach((row, i) => {
    const title = row.children[0]?.textContent.trim() ?? '';
    const date = row.children[1]?.textContent.trim() ?? '';
    const type = row.children[2]?.textContent.trim() ?? '';
    const picture = row.children[3]?.querySelector('picture');

    const card = document.createElement('div');
    card.className = 'card-grid-card';
    if (i >= 3) card.classList.add('card-grid-card--hidden');

    // Immagine
    if (picture) {
      const imageWrapper = document.createElement('div');
      imageWrapper.className = 'card-grid-card-image';

      // Share icon
      const shareBtn = document.createElement('button');
      shareBtn.className = 'card-grid-card-share';
      shareBtn.setAttribute('aria-label', 'Share');
      shareBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>';
      imageWrapper.append(picture, shareBtn);
      card.append(imageWrapper);
    }

    // Label: date + separatore + type
    const label = document.createElement('div');
    label.className = 'card-grid-card-label';

    const dateEl = document.createElement('span');
    dateEl.className = 'card-grid-card-date';
    dateEl.textContent = date;

    const separator = document.createElement('span');
    separator.className = 'f-label-separator';
    separator.innerHTML = '<i></i>';

    const typeEl = document.createElement('span');
    typeEl.className = 'card-grid-card-type';
    typeEl.textContent = type;

    label.append(dateEl, separator, typeEl);
    card.append(label);

    // Titolo articolo
    const titleEl = document.createElement('p');
    titleEl.className = 'card-grid-card-title';
    titleEl.textContent = title;
    card.append(titleEl);

    track.append(card);
  });

  sliderWrapper.append(track);

  // Controlli slider (visibili solo se card > 3)
  if (cardRows.length > 3) {
    const controls = document.createElement('div');
    controls.className = 'card-grid-controls';

    const prev = document.createElement('button');
    prev.className = 'card-grid-controls-prev';
    prev.setAttribute('aria-label', 'Previous');
    prev.innerHTML = '&#8592;';

    const next = document.createElement('button');
    next.className = 'card-grid-controls-next';
    next.setAttribute('aria-label', 'Next');
    next.innerHTML = '&#8594;';

    let currentPage = 0;

    const getVisibleCount = () => {
      if (window.innerWidth >= 1024) return 3;
      if (window.innerWidth >= 640) return 2;
      return 1;
    };

    const updateSlider = () => {
      const visible = getVisibleCount();
      const totalPages = Math.ceil(cardRows.length / visible);
      const cards = [...track.querySelectorAll('.card-grid-card')];

      cards.forEach((c, i) => {
        const inRange = i >= currentPage * visible && i < (currentPage + 1) * visible;
        c.classList.toggle('card-grid-card-hidden', !inRange);
      });

      prev.disabled = currentPage === 0;
      next.disabled = currentPage >= totalPages - 1;
    };

    prev.addEventListener('click', () => {
      if (currentPage > 0) { currentPage -= 1; updateSlider(); }
    });

    next.addEventListener('click', () => {
      const visible = getVisibleCount();
      const totalPages = Math.ceil(cardRows.length / visible);
      if (currentPage < totalPages - 1) { currentPage += 1; updateSlider(); }
    });

    window.addEventListener('resize', () => { currentPage = 0; updateSlider(); });

    updateSlider();
    controls.append(prev, next);
    sliderWrapper.append(controls);
  }

  block.append(sliderWrapper);
}
