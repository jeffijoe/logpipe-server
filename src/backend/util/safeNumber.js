/**
 * Safely converts a value to a number.
 */
export default function safeNumber(value, defaultValue = 0) {
  const number = parseInt(value, 10);
  if (Number.isNaN(number)) {
    return defaultValue;
  }

  return number;
}