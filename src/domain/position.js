const consts = require('../utils/consts')
const {
  OutOfBoundaryError,
  InvalidPlateauCoordinatesError,
  InvalidDirectionError,
} = require('./errors/errors')

/**
 * // THIS COMMENT IS ONLY TO EXPLAIN WHY I MADE THIS DECISION BELOW
 *
 * Why did I use closure here and expose only the create method insteaof ?
 *
 * The point of this closure is to simulate a private constructor for Position class.
 * I'm not preventing object construction. It is about controlling which code can access the constructor
 * The idea here is to make sure that a Position class instace will always be valid.
 *
 * The only way to create a Position class instance will be by calling the 'create function' that will validate the input params and throw an error if the input data is not valid
 * Now we don't need to do any kind of validation when we have a Position class instance, since we know that it is a valid instance anywhere in the system
 *
 */

const PositionWrapper = (() => {
  class Position {
    constructor(position) {
      this.x = position.x
      this.y = position.y
      this.direction = position.direction
      this.right = position.right
      this.upper = position.upper
    }

    /**
     * Returns position point to the new direction.
     *
     * @throws {OutOfBoundaryError} Argument x and y must be greater than zero.
     * @throws {BoundaryNotAllowedError} Argument right and upper can't be negative.
     * @throws {UnknownDirection} Argument direction must be "N", "W", "S" or "E"
     * @param {string} direction - The title of the book.
     * @return {Position} return a new position point to the new direction
     */
    moveSideways(direction) {
      return Position.create({
        ...this,
        direction,
      })
    }

    /**
     * Add or subtract from the object's current position
     *
     * @throws {OutOfBoundaryError} Argument x and y must be greater than zero.
     * @throws {BoundaryNotAllowedError} Argument right and upper can't be negative.
     * @throws {UnknownDirection} Argument direction must be "N", "W", "S" or "E"
     * @param {array} coordinates Argument to add or subtract from the object's current position
     * @return {Position} return a new position point to the new direction
     */
    moveForward([x, y]) {
      return Position.create({
        ...this,
        x: this.x + x,
        y: this.y + y,
      })
    }

    /**
     * The mars rover's current position
     *
     * @return {string} return the mars rover's current position
     */
    toString() {
      return `${this.x} ${this.y} ${this.direction}`
    }

    static isOutOfBound(position) {
      return (
        position.x < 0 ||
        position.y < 0 ||
        position.x > position.right ||
        position.y > position.upper
      )
    }

    static isValidDirection(direction) {
      return consts.directions.includes(direction)
    }

    static isValidPlateau(upper, right) {
      return upper > 0 && right > 0
    }

    /**
     * Create a valid new position.
     *
     * @throws {OutOfBoundaryError} Argument x and y must be greater than zero.
     * @throws {BoundaryNotAllowedError} Argument right and upper can't be negative.
     * @throws {UnknownDirection} Argument direction must be "N", "W", "S" or "E"
     * @param {object} position Argument to create a new position
     * @return {Position} return a valid new position
     */
    static create(position) {
      if (Position.isOutOfBound(position)) {
        throw new OutOfBoundaryError('Out of boundary')
      }

      if (!Position.isValidPlateau(position.upper, position.right)) {
        throw new InvalidPlateauCoordinatesError()
      }

      if (!Position.isValidDirection(position.direction)) {
        throw new InvalidDirectionError('Unknown direction')
      }

      return new Position(position)
    }
  }

  return {
    create: Position.create,
  }
})()

module.exports = Object.freeze(PositionWrapper)
