/**
 * Check if a value is a non-`null` `object`.
 */
const isObject = (value) => typeof value === 'object' && value !== null

module.exports = isObject
