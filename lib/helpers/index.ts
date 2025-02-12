export const formatDate = (timestamp: Date | null) => {
  if (!timestamp) return "";

  const date = new Date(timestamp);
  return date.toLocaleString("en-US", {
    weekday: "short", // Abbreviated weekday (e.g., Mon)
    month: "short", // Abbreviated month (e.g., Jan)
    day: "2-digit", // Two-digit day
    year: "numeric", // Full year (e.g., 2025)
    hour: "numeric", // Hour in 12-hour format
    minute: "2-digit", // Two-digit minutes
    hour12: true, // Enable 12-hour format
  });
};

export const headingDate = (timestamp: string | number | Date): string => {
  const date = new Date(timestamp);
  const today = new Date();

  const isToday =
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();

  if (isToday) {
    return "Today";
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};
