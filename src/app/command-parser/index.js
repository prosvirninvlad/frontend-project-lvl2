const { createCommand } = require('commander');
const schema = require('./schema.json');

function createCommandParser(description) {
  const instance = instantiateParser(description);

  function parseCommand(argv) {
    instance.parse(argv);
    const opts = instance.opts();
    const args = instance.args;
    return { opts, args };
  }

  function generateHelp() {
    return instance.helpInformation();
  }

  return { parseCommand, generateHelp };
}

function instantiateParser(description) {
  const command = createCommand();
  setupDescription(command);
  setupBehaviour(command);
  setupArguments(command);
  setupOptions(command);
  return command;

  function setupOptions(command) {
    schema.options.forEach(({ flags, description }) => {
      command.option(flags, description);
    });
  }

  function setupDescription(command) {
    command.description(description);
  }

  function setupBehaviour(command) {
    command.addHelpCommand(false);
    command.allowUnknownOption();
  }

  function setupArguments(command) {
    command.arguments(schema.arguments);
  }
}

module.exports = { createCommandParser };
