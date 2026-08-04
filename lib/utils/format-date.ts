export function formatPostDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  // UTC keeps SSR and client output identical (avoids React #418 hydration mismatches).
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}
