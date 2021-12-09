const path = require("path");
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

yargs(hideBin(process.argv))
  .scriptName("admin")
  .commandDir(path.resolve(__dirname, "../commands"))
  .help().argv;
