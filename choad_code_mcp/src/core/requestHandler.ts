import { RequestHandler } from 'express';
import { RoutingEngine } from './RoutingEngine';
import logger from '../utils/logger';

const routingEngine = new RoutingEngine();

export const multiModelQueryHandler: RequestHandler = async (req, res) => {
  const { query, context } = req.body;

  if (!query) {
    return res.status(400).json({ error: 'Query is required' });
  }

  try {
    const response = await routingEngine.route(query, context);
    res.json(response);
  } catch (error) {
    const err = error as Error;
    logger.error(`Error processing query: ${err.message}`);
    res.status(500).json({ error: 'An internal error occurred' });
  }
};
