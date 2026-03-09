export default function decorate(block) {
  const rows = [...block.children];

  const date = rows[0]?.children[1]?.textContent.trim() ?? '';
  const type = rows[1]?.children[1]?.textContent.trim() ?? '';
  const title = rows[2]?.children[1]?.textContent.trim() ?? '';
  const picture = rows[3]?.children[1]?.querySelector('picture');

  block.textContent = '';

  const label = document.createElement('div');
  label.className = 'hero-label';

  const dateEl = document.createElement('span');
  dateEl.className = 'hero-label-date';
  dateEl.textContent = date;

  const separator = document.createElement('span');
  separator.className = 'f-label-separator';
  separator.innerHTML = '<i></i>';

  const typeEl = document.createElement('span');
  typeEl.className = 'hero-label-type';
  typeEl.textContent = type;

  label.append(dateEl, separator, typeEl);
  block.append(label);

  const titleEl = document.createElement('p');
  titleEl.className = 'hero-title';
  titleEl.textContent = title;
  block.append(titleEl);

  if (picture) {
    const thumbnailWrapper = document.createElement('div');
    thumbnailWrapper.className = 'hero-thumbnail';
    thumbnailWrapper.append(picture);
    block.append(thumbnailWrapper);
  }
}
