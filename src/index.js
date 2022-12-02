const path = require('path');
const NReadlines = require('n-readlines');
const fs = require('fs');
const PositionService = require('./services/position');
const ReadLineFile = require('./infrastructure/readLineFile');
const WriteLineFile = require('./infrastructure/writeLineFile');
const loggerWrapper = require('./utils/logger');
const config = require('./config');
const CoreError = require('./domain/errors/coreError');
const PositionAdapter = require('./adapter/position');

const logger = loggerWrapper(config, console);
const inputFileName = path.resolve(config.app.inputFileName);
const outputFileName = path.resolve(config.app.outputFileName);
const writeStream = fs.createWriteStream(outputFileName, { flags: 'a' });
const nReadLines = new NReadlines(inputFileName);
const reader = new ReadLineFile(nReadLines);
const writer = new WriteLineFile(writeStream);
const positionService = new PositionService();
const adapter = new PositionAdapter(positionService, reader, writer, logger);

const main = async () => {
  try {
    await adapter.init();
  } catch (error) {
    if (!(error instanceof CoreError)) {
      throw error;
    }

    logger(error.logData().message);
  }
};

main();
