const path = require('path')
const NReadlines = require('n-readlines')
const fs = require('fs')
const { EmptyFileError } = require('../../src/domain/errors/errors')
const PositionAdapter = require('../../src/adapter/position')
const PositionService = require('../../src/services/position')
const WriteLineFile = require('../../src/infrastructure/writeLineFile')
const ReadLineFile = require('../../src/infrastructure/readLineFile')
const loggerWrapper = require('../../src/utils/logger')
const config = require('../../src/config')

describe('position integration test', () => {
  const logger = loggerWrapper(config, { log: jest.fn() })
  const inputFileName = path.resolve('test/mocks/input.txt')
  const outputFileName = path.resolve('test/mocks/output.txt')
  const positionService = new PositionService()
  const reader = new ReadLineFile(new NReadlines(inputFileName))
  const writer = new WriteLineFile(
    fs.createWriteStream(outputFileName, { flags: 'a' })
  )

  const adapter = new PositionAdapter(positionService, reader, writer, logger)

  it('should generate a output file with the final rover positions when receive an input command file', async () => {
    await adapter.init()

    const outputReader = new ReadLineFile(new NReadlines(outputFileName))
    const finalPosition = outputReader.next()
    outputReader.close()
    fs.unlink(outputFileName, () => ({}))

    expect(finalPosition.toString()).toBe('1 3 N')
  })

  it('should throw an EmptyFileError when pass an empty file', async () => {
    const positionServiceInvalid = new PositionService()
    const emptyFileName = path.resolve('test/mocks/emptyFile.txt')
    const emptyReader = new ReadLineFile(new NReadlines(emptyFileName))
    const adapterInvalidInputName = new PositionAdapter(
      positionServiceInvalid,
      emptyReader,
      writer,
      logger
    )

    await expect(async () => adapterInvalidInputName.init()).rejects.toThrow(
      EmptyFileError
    )
  })
})
