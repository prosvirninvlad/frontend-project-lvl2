function createIo() {
  function write(message) {
    process.stdout.write(message);
  }

  function error(message) {
    process.stderr.write(message);
  }

  return { write, error };
}

module.exports = { createIo };
