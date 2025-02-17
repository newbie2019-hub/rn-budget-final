export const formatDate = (
  timestamp: Date | null,
  formatType: "default" | "short" = "default",
) => {
  if (!timestamp) return "";

  const date = new Date(timestamp);

  if (formatType === "short") {
    return (
      date.toLocaleString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }) + ` (${date.toLocaleString("en-US", { weekday: "short" })})`
    );
  }

  return date.toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
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
