/* eslint-disable max-classes-per-file */
const CoreError = require('./coreError');

class OutOfBoundaryError extends CoreError {
  constructor(message = "Rover can not go outside the Plateau's boundaries.") {
    super(message);
  }
}

class InvalidDirectionError extends CoreError {
  constructor(message = 'Argument direction must be N, W, S or E ') {
    super(message);
  }
}

class EmptyFileError extends CoreError {
  constructor(message = 'Empty File') {
    super(message);
  }
}

class InvalidPlateauCoordinatesError extends CoreError {
  constructor(message = 'Invalid Plateau Upper-right Coordinates') {
    super(message);
  }
}

class InvalidPositionError extends CoreError {
  constructor(message = 'Invalid Rover Positon Error') {
    super(message);
  }
}

class InvalidCommandError extends CoreError {
  constructor(message = 'Invalid Command Error') {
    super(message);
  }
}

module.exports = {
  OutOfBoundaryError,
  InvalidDirectionError,
  EmptyFileError,
  InvalidPlateauCoordinatesError,
  InvalidPositionError,
  InvalidCommandError,
};
