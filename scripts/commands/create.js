/**
 * create.js – v0.1.0
 *
 * This script allows you to easly scaffold a new package into the project, you
 * can choose multiple templates placed in the scripts/templates folder
 */

// @packages
const path = require("path");
const fs = require("fs");

// @scripts
const { logger } = require("../utils");

// @json
const pkg = require("../../package.json");

const TEMPLATES_PATH = path.resolve(__dirname, "../templates");
const PACKAGES_DIR = path.resolve(__dirname, "../../packages");
const SCOPE = /(?<=@)(.*?)(?=\/)/.exec(pkg.name)[0];

/**
 * Creates a new package under the packages directory
 * @param {Object} argv argumments
 */
function create({ name, template }) {
  const pkg = { dir: `${SCOPE}-${name}`, name: `@${SCOPE}/${name}` };

  // Verifies if the provided name doesn't exists under the `packages` directory
  if (fs.existsSync(path.resolve(PACKAGES_DIR, pkg.dir))) {
    logger.error(`package ${pkg.dir} already exists`);
    process.exit(1);
  }

  // Verifies if the template exists
  if (!fs.existsSync(path.resolve(TEMPLATES_PATH, template))) {
    logger.error(`template ${template} doesn't exists`);
    process.exit(1);
  }
}

module.exports = {
  command: "create [name]",
  describe: "Create a scaffold package or app",
  builder: {
    name: {
      type: "string",
    },
    template: {
      type: "string",
      default: "typescript",
    },
  },
  handler: create,
};
