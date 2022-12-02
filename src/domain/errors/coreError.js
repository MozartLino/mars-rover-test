const isNonEmptyString = require('../../utils/isNonEmptyString')
const isObject = require('../../utils/isObject')

/**
 * @internal
 */
const getMessage = (message, cause) => {
  if (isNonEmptyString(message)) {
    return message
  }
  if (isObject(cause) && isNonEmptyString(cause.message)) {
    return cause.message
  }
  if (isNonEmptyString(cause)) {
    return cause
  }
  return undefined
}

/**
 * All errors within this project should extend the `CoreError` class.
 */
class CoreError extends Error {
  constructor(message, cause) {
    super(getMessage(message, cause))
    this.cause = cause
  }

  /**
   * This method transforms the error to its representation in the log.
   * It can be extended to log error-specific information.
   */
  logData() {
    return {
      message: this.message,
      type: this.constructor.name,
      stack: this.stack,
      cause: this.cause,
    }
  }
}

module.exports = CoreError
