const Position = require('../../../src/domain/position')
const { OutOfBoundaryError } = require('../../../src/domain/errors/errors')
const marsRoverCommandsMap = require('../../../src/domain/marsRoverCommandsMap')
const {
  initialNorthPositionParams,
  endNorthPositionParams,
} = require('../../mocks')

describe('From (0, 0, N) as an initial position', () => {
  it('should move to (0, 1, N) when receive M command', async () => {
    // GIVEN
    const position = Position.create(initialNorthPositionParams)

    // WHEN
    const currentPosition = position.moveForward(
      marsRoverCommandsMap.NM.params
    )

    // THEN
    expect(currentPosition.toString()).toBe('0 1 N')
  })

  it('should move to (0, 0, W) when receive L command', async () => {
    // GIVEN
    const position = Position.create(initialNorthPositionParams)

    // WHEN
    const currentPosition = position.moveSideways(
      marsRoverCommandsMap.NL.params
    )

    // THEN
    expect(currentPosition.toString()).toBe('0 0 W')
  })

  it('should throw an error when receive LM command as we should not accept (-1 0 W)', async () => {
    // GIVEN
    const position = Position.create(initialNorthPositionParams)

    // THEN
    expect(() =>
      position
        .moveSideways(marsRoverCommandsMap.NL.params)
        .moveForward(marsRoverCommandsMap.WM.params)
    ).toThrow(OutOfBoundaryError)
  })
})

describe('From (5, 5, N) as an initial position', () => {
  it('should move to (5, 4, S) when receive RRM command', async () => {
    // GIVEN
    const position = Position.create(endNorthPositionParams)

    // WHEN
    const currentPosition = position
      .moveSideways(marsRoverCommandsMap.NR.params)
      .moveSideways(marsRoverCommandsMap.ER.params)
      .moveForward(marsRoverCommandsMap.SM.params)

    // THEN
    expect(currentPosition.toString()).toBe('5 4 S')
  })

  it('should move to (4, 5, W) when receive LM command', async () => {
    // GIVEN
    const position = Position.create(endNorthPositionParams)

    // WHEN
    const currentPosition = position
      .moveSideways(marsRoverCommandsMap.NL.params)
      .moveForward(marsRoverCommandsMap.WM.params)

    // THEN
    expect(currentPosition.toString()).toBe('4 5 W')
  })

  it('should throw an error when receive M command as we are at the end of plateau', async () => {
    // GIVEN
    const position = Position.create(endNorthPositionParams)

    // THEN
    expect(() => position.moveForward(marsRoverCommandsMap.NM.params)).toThrow(
      OutOfBoundaryError
    )
  })
})
