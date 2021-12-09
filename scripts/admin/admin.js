const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

yargs(hideBin(process.argv))
  .scriptName("admin")
  .command(require("../update-paths/update-paths"))
  .help().argv;
