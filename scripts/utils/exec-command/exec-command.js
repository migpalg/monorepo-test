const { spawn } = require("child_process");
const { logger } = require("../logger/logger");

module.exports.cmd = function (command, options = []) {
  return new Promise((resolve, reject) => {
    const process = spawn(command, options);
    logger.info(`Running process "${command} ${options.join(" ")}"`);

    process.stdout.on("data", (data) => {
      logger.info(`${command} stdout: ${data}`);
    });

    process.stderr.on("data", (data) => {
      logger.error(`${command} stderr: ${data}`);
    });

    process.on("error", (error) => {
      reject(error.message);
    });

    process.on("close", (code) => {
      logger.info("process closed with code " + code);
      resolve(code);
    });
  });
};
