const pascalConfigPath = process.argv[process.argv.findIndex(name => name === '--pascalConfig') + 1];
const projectPath = process.argv[process.argv.findIndex(name => name === '--projectPath') + 1];

const pascalConfig = require(pascalConfigPath);
pascalConfig.projectPath = projectPath;

module.exports = pascalConfig;
