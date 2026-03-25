export default function decorate(block) {
  const rows = [...block.children];

  const date = rows[0]?.children[1]?.textContent.trim() ?? '';
  const type = rows[1]?.children[1]?.textContent.trim() ?? '';
  const title = rows[2]?.children[1]?.textContent.trim() ?? '';
  const picture = rows[3]?.children[1]?.querySelector('picture');

  // Capture the instrumentation source from the original row cells
  // before wiping block.textContent, so we can reapply it to new elements.
  const dateResource = rows[0]?.children[1];
  const typeResource = rows[1]?.children[1];
  const titleResource = rows[2]?.children[1];
  const pictureResource = rows[3]?.children[1];

  block.textContent = '';

  // --- block container: marks this as an editable component ---
  block.setAttribute('data-aue-resource', block.getAttribute('data-aue-resource') ?? '');
  block.setAttribute('data-aue-type', 'component');
  block.setAttribute('data-aue-label', 'Hero Article');

  const label = document.createElement('div');
  label.className = 'hero-label';

  const dateEl = document.createElement('span');
  dateEl.className = 'hero-label-date';
  dateEl.textContent = date;
  // Inherit the resource pointer from the original cell, then declare the prop
  if (dateResource) {
    dateEl.setAttribute('data-aue-resource', dateResource.getAttribute('data-aue-resource') ?? '');
  }
  dateEl.setAttribute('data-aue-prop', 'date');
  dateEl.setAttribute('data-aue-type', 'text');
  dateEl.setAttribute('data-aue-label', 'Date');

  const separator = document.createElement('span');
  separator.className = 'f-label-separator';
  separator.innerHTML = '<i></i>';

  const typeEl = document.createElement('span');
  typeEl.className = 'hero-label-type';
  typeEl.textContent = type;
  if (typeResource) {
    typeEl.setAttribute('data-aue-resource', typeResource.getAttribute('data-aue-resource') ?? '');
  }
  typeEl.setAttribute('data-aue-prop', 'type');
  typeEl.setAttribute('data-aue-type', 'text');
  typeEl.setAttribute('data-aue-label', 'Type');

  label.append(dateEl, separator, typeEl);
  block.append(label);

  const titleEl = document.createElement('p');
  titleEl.className = 'hero-title';
  titleEl.textContent = title;
  if (titleResource) {
    titleEl.setAttribute('data-aue-resource', titleResource.getAttribute('data-aue-resource') ?? '');
  }
  titleEl.setAttribute('data-aue-prop', 'title');
  titleEl.setAttribute('data-aue-type', 'text');
  titleEl.setAttribute('data-aue-label', 'Title');
  block.append(titleEl);

  if (picture) {
    const thumbnailWrapper = document.createElement('div');
    thumbnailWrapper.className = 'hero-thumbnail';
    if (pictureResource) {
      thumbnailWrapper.setAttribute('data-aue-resource', pictureResource.getAttribute('data-aue-resource') ?? '');
    }
    thumbnailWrapper.setAttribute('data-aue-prop', 'image');
    thumbnailWrapper.setAttribute('data-aue-type', 'image');
    thumbnailWrapper.setAttribute('data-aue-label', 'Thumbnail Image');
    thumbnailWrapper.append(picture);
    block.append(thumbnailWrapper);
  }
}