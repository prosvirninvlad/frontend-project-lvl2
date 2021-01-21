function createCli({ version, io }) {
  function printHelp(help) {
    io.write(help);
  }

  function printVersion() {
    io.write(version);
  }

  return { printHelp, printVersion };
}

module.exports = { createCli };
