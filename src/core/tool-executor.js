/**
 * @fileoverview Tool executor for the MCP.
 */

/**
 * Executes a tool with the given context.
 *
 * @param {Function} tool The tool function to execute.
 * @param {object} context The context object.
 * @returns {Promise<object>} The result of the tool.
 */
async function executeTool(tool, context) {
  return tool(context);
}

module.exports = {
  executeTool,
};
