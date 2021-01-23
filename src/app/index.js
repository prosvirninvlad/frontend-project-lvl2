const { Command } = require('./command');
const { createCommandParser } = require('./command/parser');

function createApp({ cli }) {
  const parser = createCommandParser();

  function execute(argv) {
    const command = parser.parseCommand(argv);
    switch (command.key) {
      case Command.HELP:
        return cli.printHelp();
      case Command.VERSION:
        return cli.printVersion();
    }
  }

  return { execute };
}

module.exports = { createApp };
