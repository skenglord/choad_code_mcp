/**
 * @fileoverview Example tool for the MCP.
 */

/**
 * The main function for the tool.
 *
 * @param {object} context The context object.
 * @param {object} context.params The parameters for the tool.
 * @returns {Promise<object>} The result of the tool.
 */
async function main(context) {
  const { params } = context;
  const { name } = params;

  return {
    message: `Hello, ${name}!`,
  };
}

module.exports = main;
