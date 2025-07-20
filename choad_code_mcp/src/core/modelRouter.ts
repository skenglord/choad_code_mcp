import { Tool } from '@modelcontextprotocol/sdk';

interface Model {
  name: string;
  tool: Tool;
  keywords: string[];
}

const models: Model[] = [
  {
    name: 'general-knowledge',
    tool: {
      name: 'general_knowledge_query',
      description: 'Queries a general knowledge model.',
      inputSchema: {
        type: 'object',
        properties: {
          query: {
            type: 'string',
            description: 'The query to send to the model.',
          },
        },
        required: ['query'],
      },
    },
    keywords: ['what', 'who', 'when', 'where', 'why', 'how'],
  },
  {
    name: 'code-generation',
    tool: {
      name: 'code_generation_query',
      description: 'Generates code based on a query.',
      inputSchema: {
        type: 'object',
        properties: {
          query: {
            type: 'string',
            description: 'The query to send to the model.',
          },
        },
        required: ['query'],
      },
    },
    keywords: ['code', 'generate', 'function', 'class', 'method'],
  },
];

export const routeQuery = (query: string): Tool | null => {
  const lowerCaseQuery = query.toLowerCase();
  for (const model of models) {
    for (const keyword of model.keywords) {
      if (lowerCaseQuery.includes(keyword)) {
        return model.tool;
      }
    }
  }
  return null;
};
