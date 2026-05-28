/** Generate unique daily token e.g. T-20260528-042 */
export function generateToken(sequenceNumber) {
  const date = new Date();
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const seq = String(sequenceNumber).padStart(3, "0");
  return `T-${y}${m}${d}-${seq}`;
}

/** Numeric part for display sorting */
export function parseTokenNumber(token) {
  const parts = token?.split("-");
  return parts?.length >= 3 ? parseInt(parts[2], 10) : 0;
}
