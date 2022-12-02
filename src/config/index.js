require('dotenv').config()

module.exports = {
  app: {
    inputFileName: process.env.INPUT_FILE_NAME,
    outputFileName: process.env.OUTPUT_FILE_NAME,
    debug: process.env.DEBUG_ENABLE === 'true',
  },
}
