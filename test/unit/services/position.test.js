const { OutOfBoundaryError, InvalidPlateauCoordinatesError, InvalidPositionError, InvalidDirectionError, InvalidCommandError } = require("../../../src/domain/errors/errors");
const PositionService = require("../../../src/services/position");

const positionService = new PositionService()

describe("positionService executeCommands", () => {
  it("should move from  (1 2 N) to (1 3 N) when receive LMLMLMLMM command", async () => {
    // GIVEN
    const upperRightLine = '5 5'
    const positionLine = '1 2 N'
    const commandLine = 'LMLMLMLMM'

    // WHEN
    const currentPosition = positionService.executeCommands(upperRightLine, positionLine, commandLine)

    // THEN
    expect(currentPosition.toString()).toBe('1 3 N');
  });

  it("should move from (3 3 E) to (5 1 E) when receive MMRMMRMRRM command", async () => {
    // GIVEN
    const upperRightLine = '5 5'
    const positionLine = '3 3 E'
    const commandLine = 'MMRMMRMRRM'

    // WHEN
    const currentPosition = positionService.executeCommands(upperRightLine, positionLine, commandLine)

    // THEN
    expect(currentPosition.toString()).toBe('5 1 E');
  });
});

describe("with invalid data", () => {
  it("should throw an InvalidPlateauCoordinatesError when upper righ line is invalid", async () => {
    // GIVEN
    const positionLine = '1 2 N'
    const commandLine = 'LMLMLMLMM'

    // THEN
    expect(() => positionService.executeCommands('', positionLine, commandLine)).toThrow(InvalidPlateauCoordinatesError)
    expect(() => positionService.executeCommands('X X', positionLine, commandLine)).toThrow(InvalidPlateauCoordinatesError)
    expect(() => positionService.executeCommands(undefined, positionLine, commandLine)).toThrow(InvalidPlateauCoordinatesError)
  });

  it("should throw an Error when rover position is invalid", async () => {
    // GIVEN
    const upperRightLine = '5 5'
    const commandLine = 'LMLMLMLMM'

    // THEN
    expect(() => positionService.executeCommands(upperRightLine, '', commandLine)).toThrow(InvalidPositionError)
    expect(() => positionService.executeCommands(upperRightLine, '-1 1 N', commandLine)).toThrow(OutOfBoundaryError)
    expect(() => positionService.executeCommands(upperRightLine, '1 -1 N', commandLine)).toThrow(OutOfBoundaryError)
    expect(() => positionService.executeCommands(upperRightLine, '1 -1 N', commandLine)).toThrow(OutOfBoundaryError)
    expect(() => positionService.executeCommands(upperRightLine, '1 1 X', commandLine)).toThrow(InvalidDirectionError)
    expect(() => positionService.executeCommands(upperRightLine, undefined, commandLine)).toThrow(InvalidPositionError)
  });

  it("should throw an InvalidDirectionError when command is invalid", async () => {
    // GIVEN
    const upperRightLine = '5 5'
    const positionLine = '3 3 E'

    // THEN
    expect(() => positionService.executeCommands(upperRightLine, positionLine, '')).toThrow(InvalidDirectionError)
    expect(() => positionService.executeCommands(upperRightLine, positionLine, 'XPTO')).toThrow(InvalidCommandError)
    expect(() => positionService.executeCommands(upperRightLine, positionLine, undefined)).toThrow(InvalidDirectionError)
  });
});
