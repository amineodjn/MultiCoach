/**
 * Splits a camelCase string into a space-separated string.
 * @param {string} str - The camelCase string.
 * @returns {string} - The space-separated string.
 */
export function splitCamelCase(str) {
  return str.replace(/([a-z0-9])([A-Z])/g, "$1 $2").toLowerCase();
}

/**
 * Validates if a string is a valid date in the format 'yyyy-MM-dd'.
 * @param {string} dateString - The date string.
 * @returns {boolean} - True if valid, false otherwise.
 */
export function isValidDate(dateString) {
  const regEx = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateString.match(regEx)) return false;
  const d = new Date(dateString);
  const dNum = d.getTime();
  if (!dNum && dNum !== 0) return false;
  return d.toISOString().slice(0, 10) === dateString;
}

/**
 * Validates if a string is a valid time in the format 'HH:mm'.
 * @param {string} timeString - The time string.
 * @returns {boolean} - True if valid, false otherwise.
 */
export function isValidTime(timeString) {
  const regEx = /^([01]\d|2[0-3]):([0-5]\d)$/;
  return regEx.test(timeString);
}
