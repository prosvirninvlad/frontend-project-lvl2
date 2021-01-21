const { createApp } = require('./app');
const { createCli } = require('./app/cli');
const { createCommandParser } = require('./app/command-parser');
const { createIo } = require('./app/io');

function main({ description, version, argv }) {
  const cli = createCli({ version, io: createIo() });
  const parser = createCommandParser(description);
  createApp({ parser, cli }).execute(argv);
}

module.exports = { main };
