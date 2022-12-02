const {
  InvalidPlateauCoordinatesError,
  InvalidPositionError,
  InvalidDirectionError,
  InvalidCommandError,
} = require('../domain/errors/errors')
const marsRoverCommandsMap = require('../domain/marsRoverCommandsMap')
const Position = require('../domain/position')
const consts = require('../utils/consts')
const isNonEmptyString = require('../utils/isNonEmptyString')

class PositionService {
  executeCommands(upperRightLine, positionLine, commandLine) {
    const initialPosition = Position.create({
      ...this.getUpperRightCoordinates(upperRightLine),
      ...this.getRoversPosition(positionLine),
    })

    const finalPosition = this.getCommands(commandLine).reduce(
      (position, command) => {
        const action = this.getActionBy(command, position.direction)

        return position[action.method](action.params)
      },
      initialPosition
    )

    return finalPosition
  }

  getUpperRightCoordinates(line) {
    if (!isNonEmptyString(line)) {
      throw new InvalidPlateauCoordinatesError()
    }

    const [upperInput, rightInput] = line.split(' ')
    const upper = parseInt(upperInput, 10)
    const right = parseInt(rightInput, 10)

    return {
      upper,
      right,
    }
  }

  getRoversPosition(line) {
    if (!isNonEmptyString(line)) {
      throw new InvalidPositionError()
    }
    const [x, y, direction] = line.split(' ')

    return {
      x: parseInt(x, 10),
      y: parseInt(y, 10),
      direction,
    }
  }

  getCommands(line) {
    if (!isNonEmptyString(line)) {
      throw new InvalidDirectionError()
    }

    return line.split('')
  }

  isValidCommand(command) {
    return consts.commands.includes(command)
  }

  getActionBy(command, direction) {
    if (!this.isValidCommand(command)) {
      throw new InvalidCommandError()
    }

    return marsRoverCommandsMap[`${direction}${command}`]
  }
}

module.exports = PositionService
