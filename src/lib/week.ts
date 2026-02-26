function pad(n: number): string {
  return n.toString().padStart(2, "0");
}

function formatDate(d: Date): string {
  return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`;
}

export function getWeekRange(): string {
  const now = new Date();
  const day = now.getDay();
  // Friday = 5. Offset so Friday is day 0 of the range.
  const friday = new Date(now);
  friday.setDate(now.getDate() - ((day + 2) % 7));
  const thursday = new Date(friday);
  thursday.setDate(friday.getDate() + 6);
  return `${formatDate(friday)}-${formatDate(thursday)}`;
}
