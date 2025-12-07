function timeAgo(date) {
  if (!date) return "";

  const diffMs = Date.now() - new Date(date).getTime();
  const diffSeconds = Math.floor(diffMs / 1000);

  const intervals = {
    yrs: 365 * 24 * 60 * 60,
    mnth: 30 * 24 * 60 * 60,
    week: 7 * 24 * 60 * 60,
    day: 24 * 60 * 60,
    hr: 60 * 60,
    min: 60,
    sec: 1,
  };

  for (const key in intervals) {
    const value = intervals[key];
    const count = Math.floor(diffSeconds / value);
    if (count > 0) return `${count} ${key}${count > 1 ? "s" : ""} ago`;
  }

  return "just now";
}

export { timeAgo };
