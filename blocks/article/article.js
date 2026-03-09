export default function decorate(block) {
  const rows = [...block.children];
  const labels = ['text-title', 'text-subtitle', 'text-body'];

  rows.forEach((row, i) => {
    const cell = row.firstElementChild;
    if (cell) {
      cell.className = labels[i] ?? 'text-body';
    }
  });
}
