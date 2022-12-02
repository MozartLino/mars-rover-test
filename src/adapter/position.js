const { EmptyFileError } = require('../domain/errors/errors')

class PositionAdapter {
  constructor(positionService, reader, writer, logger) {
    this.positionService = positionService
    this.reader = reader
    this.writer = writer
    this.logger = logger
  }

  async init() {
    if (!this.reader.hasNext()) {
      throw new EmptyFileError()
    }

    const upperRightLine = this.reader.next().toString()

    while (this.reader.hasNext()) {
      const initialPositionLine = this.reader.next().toString()
      const commandLine = this.reader.next().toString()

      const finalPosition = this.positionService.executeCommands(
        upperRightLine,
        initialPositionLine,
        commandLine
      )

      this.logger(finalPosition.toString())

      await this.writer.save(finalPosition.toString())
    }

    this.writer.end()
  }
}

module.exports = PositionAdapter
