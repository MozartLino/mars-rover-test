module.exports = class WriteLineFile {
  constructor(writer) {
    this.writer = writer
  }

  /**
   * Append the new line at the end of the file
   *
   * @param {string} line Append the line at the end of the file
   */
  async save(line) {
    await new Promise((resolve) => {
      this.writer.write(`${line}\n`, resolve)
    })
  }

  /**
   * Close stream
   *
   * @return { void } close stream
   */
  end() {
    this.writer.end()
  }
}
