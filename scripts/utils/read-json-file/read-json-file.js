const fs = require("fs");

/**
 * Reads a file and returns an object
 * @param {string} path absolute path of the target file to read
 * @returns object with the parsed json
 */
module.exports.readJSONFile = (path) => {
  return JSON.parse(fs.readFileSync(path));
};
