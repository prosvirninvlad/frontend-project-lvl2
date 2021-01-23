const { Command } = require('./index');
const { createCommand } = require('commander');
const config = require('./parser.config.json');

function createCommandParser() {
  const command = instantiateCommand();

  function parseCommand(argv) {
    try {
      return tryCommandParsing(argv);
    } catch {
      return help();
    }
  }

  function tryCommandParsing(argv) {
    command.parse(argv);
    const args = command.args;
    const opts = command.opts();
    return opts.version ? version() : help();
  }

  return { parseCommand };
}

function instantiateCommand() {
  const command = createCommand()
    .configureOutput({
      writeOut: disable,
      writeErr: disable,
    })
    .arguments(config.arguments)
    .allowExcessArguments(false)
    .addHelpCommand(false)
    .exitOverride();
  return config.options.reduce((result, option) => {
    return result.option(option.flags, option.description);
  }, command);
}

function disable() {
  return;
}

function version() {
  return { key: Command.VERSION };
}

function help() {
  return { key: Command.HELP };
}

module.exports = { createCommandParser };
