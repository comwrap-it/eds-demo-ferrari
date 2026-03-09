export default function decorate(block) {
  const rows = [...block.children];
  const labels = ['quote-author', 'quote-text'];

  rows.forEach((row, i) => {
    const cell = row.firstElementChild;
    if (cell) {
      cell.className = labels[i] ?? 'quote-text';
    }
  });
}
