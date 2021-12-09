/**
 * update-paths.js – v0.1.0
 *
 * This script allows you to automatically update tsconfig paths based in the
 * package name and path.
 *
 * TODO: Allow custom behavior on paths resolution
 */

// @packages
const path = require("path");
const fs = require("fs");

// @scripts
const { readJSONFile, cmd, logger } = require("../utils");

const PKGS_DIR = "packages";
const ROOT_DIR = path.resolve(__dirname, "../../");
const PKGS = path.resolve(ROOT_DIR, PKGS_DIR);
const TSCONFIG_PATH = path.resolve(ROOT_DIR, "tsconfig.json");

async function updatePaths() {
  const tsconfig = readJSONFile(TSCONFIG_PATH);

  logger.info("reading packages directories and manifests...");

  const packages = fs.readdirSync(PKGS).map((pkg) => ({
    libDir: path.join(PKGS_DIR, pkg, "lib"),
    name: readJSONFile(path.resolve(ROOT_DIR, PKGS_DIR, pkg, "package.json"))
      .name,
  }));

  logger.info("putting new content on tsconfig...");

  const paths = packages.reduce(
    (last, { libDir, name }) => ({
      ...last,
      [name]: [libDir],
      [`${name}/*`]: [`${libDir}/*`],
    }),
    {},
  );

  tsconfig.compilerOptions.paths = paths;

  logger.info("writing new tsconfig...");

  fs.writeFileSync(TSCONFIG_PATH, JSON.stringify(tsconfig), {
    encoding: "utf-8",
  });

  logger.info("formatting json file with prettier...");

  await cmd("prettier", ["--write", TSCONFIG_PATH]);

  logger.info("process done");
}

module.exports = {
  command: "update-paths",
  describe: "Update paths in tsconfig",
  handler: updatePaths,
};
