module.exports = (config, logger) => (message) => {
  if (config.app.debug) {
    logger.log(message);
  }
};
