/**
 * Safely converts a value to a number.
 */
export default function safeNumber(value) {
  const number = parseInt(value, 10);
  if (Number.isNaN(value)) {
    return 0;
  }

  return number;
}