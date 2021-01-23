function createCli({ manifest, console }) {
  function printHelp() {
    console.log(manifest.description);
  }

  function printVersion() {
    console.log(manifest.version);
  }

  return { printHelp, printVersion };
}

module.exports = { createCli };
