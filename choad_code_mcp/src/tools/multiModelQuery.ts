import { Tool } from '@modelcontextprotocol/sdk';

export const multiModelQueryTool: Tool = {
  name: 'multi_model_query',
  description: 'Queries multiple models and returns the best response.',
  inputSchema: {
    type: 'object',
    properties: {
      query: {
        type: 'string',
        description: 'The query to send to the models.',
      },
    },
    required: ['query'],
  },
};
