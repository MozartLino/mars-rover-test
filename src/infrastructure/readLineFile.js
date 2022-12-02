module.exports = class ReadLineFile {
  constructor(reader) {
    this.reader = reader;
    this.hasNextLine = false;
    this.nextLine = undefined;
  }

  /**
   * Returns false | Buffer
   *
   * @return { false | Buffer } return false | Buffer
   */
  next() {
    if (this.hasNextLine) {
      const result = this.nextLine;
      this.hasNextLine = false;

      return result;
    }

    return this.reader.next();
  }

  /**
   * Returns boolean
   *
   * @return { boolean } returns boolean
   */
  hasNext() {
    const line = this.reader.next();

    if (line) {
      this.hasNextLine = true;
      this.nextLine = line;

      return true;
    }

    return false;
  }

  /**
   * Close stream
   *
   * @return { void } close stream
   */
  close() {
    this.reader.close();
  }
};
