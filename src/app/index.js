function createApp({ parser, cli }) {
  function execute(argv) {
    parser.parseCommand(argv);
    cli.printHelp(parser.generateHelp());
  }

  return { execute };
}

module.exports = { createApp };
