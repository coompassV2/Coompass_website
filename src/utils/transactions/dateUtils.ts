
// Helper function to parse transaction dates
export function parseTxDate(dateStr: string): Date {
  const now = new Date();
  
  if (dateStr.includes("Today")) {
    return now;
  } else if (dateStr.includes("Yesterday")) {
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    return yesterday;
  } else if (dateStr.includes("days ago")) {
    const daysAgo = parseInt(dateStr);
    const pastDate = new Date(now);
    pastDate.setDate(now.getDate() - daysAgo);
    return pastDate;
  } else {
    return new Date(dateStr);
  }
}
