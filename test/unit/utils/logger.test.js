const logger = require("../../../src/utils/logger")

describe("Logger", () => {
  const loggerMock = {
    log: jest.fn(),
  }

  it("should call logger when the flag is enabled", () => {
    logger({ app: { debug: true } }, loggerMock)("any message")

    expect(loggerMock.log).toBeCalledTimes(1)
  })

  it("should not call logger when the flag is disabled", () => {
    logger({ app: { debug: false } }, loggerMock)("any message")

    expect(loggerMock.log).toBeCalledTimes(1)
  })
})
