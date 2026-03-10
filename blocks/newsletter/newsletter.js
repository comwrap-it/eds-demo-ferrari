export default function decorate(block) {
  const rows = [...block.children];

  const title = rows[0]?.children[1]?.textContent.trim() ?? '';
  const text = rows[1]?.children[1]?.textContent.trim() ?? '';
  const cta = rows[2]?.children[1]?.textContent.trim() ?? '';

  block.textContent = '';

  const titleEl = document.createElement('p');
  titleEl.className = 'newsletter-title';
  titleEl.textContent = title;

  const textEl = document.createElement('p');
  textEl.className = 'newsletter-text';
  textEl.textContent = text;

  const button = document.createElement('button');
  button.className = 'newsletter-cta';
  button.textContent = cta;

  block.append(titleEl, textEl, button);
}
