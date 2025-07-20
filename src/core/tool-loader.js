/**
 * @fileoverview Tool loader for the MCP.
 */

const fs = require('fs');
const path = require('path');

const TOOLS_DIR = path.join(__dirname, '../tools');

/**
 * Loads all tools from the tools directory.
 *
 * @returns {Promise<object>} A map of tool names to tool functions.
 */
async function loadTools() {
  const tools = {};
  const files = await fs.promises.readdir(TOOLS_DIR);

  for (const file of files) {
    if (file.endsWith('.js')) {
      const toolName = path.basename(file, '.js');
      const toolPath = path.join(TOOLS_DIR, file);
      tools[toolName] = require(toolPath);
    }
  }

  return tools;
}

module.exports = {
  loadTools,
};
