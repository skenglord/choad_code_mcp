import { RequestHandler } from './types';

const localProcessing = (query: string): string | null => {
  if (query.toLowerCase().includes('hello')) {
    return 'Hello there! How can I help you today?';
  }
  return null;
}

export const multiModelQueryHandler: RequestHandler = (req, res) => {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ error: 'Query is required' });
  }

  const localResponse = localProcessing(query);
  if (localResponse) {
    return res.json({ response: localResponse });
  }

  // TODO: Implement model routing and response handling
  res.json({ response: `You queried: ${query}` });
};
