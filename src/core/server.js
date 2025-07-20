/**
 * @fileoverview Main server file for the MCP.
 */

const express = require('express');
const { loadTools } = require('./tool-loader');
const { executeTool } = require('./tool-executor');

const app = express();
app.use(express.json());

let tools;

app.post('/tools/:toolName/execute', async (req, res) => {
  const { toolName } = req.params;
  const tool = tools[toolName];

  if (!tool) {
    return res.status(404).json({ error: `Tool not found: ${toolName}` });
  }

  const context = {
    params: req.body,
  };

  try {
    const result = await executeTool(tool, context);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

async function main() {
  tools = await loadTools();
  console.log('Tools loaded:', Object.keys(tools));

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

main();
