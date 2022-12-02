const isString = require('./isString');

/**
 * Check if a value is a non-empty `string`.
 */
const isNonEmptyString = (value) => isString(value) && value.trim() !== '';

module.exports = isNonEmptyString;
