const CoreError = require('../../../src/domain/errors/coreError')

describe('CoreError', () => {
  class TestError extends CoreError { }

  it('should be constructable from an optional message and cause', () => {
    const error1 = new TestError()
    expect(error1).toBeInstanceOf(CoreError)
    const error2 = new TestError('MESSAGE')
    expect(error2.message).toEqual('MESSAGE')
    const error3 = new TestError('MESSAGE', 'CAUSE')
    expect(error3.message).toEqual('MESSAGE')
    expect(error3.cause).toEqual('CAUSE')
    const error4 = new TestError(undefined, 'CAUSE')
    expect(error4.message).toEqual('CAUSE')
    const cause5 = new Error('MESSAGE')
    const error5 = new TestError(undefined, cause5)
    expect(error5.message).toEqual('MESSAGE')
    expect(error5.cause).toEqual(cause5)
    expect(error5.logData().message).toEqual('MESSAGE')
  })
})
