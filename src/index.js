const { createApp } = require('./app');
const { createCli } = require('./app/cli');

function main({ manifest, argv }) {
  const cli = createCli({ manifest, console });
  createApp({ cli }).execute(argv);
}

module.exports = { main };
