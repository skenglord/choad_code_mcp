import express from 'express';
import { multiModelQueryTool } from '../tools/multiModelQuery';
import { multiModelQueryHandler } from './requestHandler';
import logger from '../utils/logger';
import { performanceMiddleware } from '../middleware/performance';

const app = express();

app.use(express.json());
import { apiLimiter } from '../middleware/rateLimiter';

app.use(performanceMiddleware);
app.use(apiLimiter);

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

app.get('/tools', (req, res) => {
  res.json([multiModelQueryTool]);
});

import { validateQuery } from '../middleware/validation';

app.post('/multi_model_query', validateQuery, multiModelQueryHandler);

app.get('/health', async (req, res) => {
  const routingEngine = new RoutingEngine();
  const services = ['local', 'rovodev', 'gemini'];
  const healthChecks = await Promise.all(
    services.map(async (serviceName) => {
      const service = routingEngine.getServiceClient(serviceName);
      if (service) {
        const health = await service.healthCheck();
        return { service: serviceName, status: health.status };
      }
      return { service: serviceName, status: 'not found' };
    })
  );

  res.json({ status: 'ok', services: healthChecks });
});

import { setupSwagger } from '../utils/swagger';

/**
 * @swagger
 * /tools:
 *   get:
 *     summary: Get available tools
 *     responses:
 *       200:
 *         description: A list of tools
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
app.get('/tools', (req, res) => {
  res.json([multiModelQueryTool]);
});

/**
 * @swagger
 * /multi_model_query:
 *   post:
 *     summary: Execute a multi-model query
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               query:
 *                 type: string
 *               context:
 *                 type: object
 *     responses:
 *       200:
 *         description: The result of the query
 *       400:
 *         description: Invalid input
 */
app.post('/multi_model_query', validateQuery, multiModelQueryHandler);

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check
 *     responses:
 *       200:
 *         description: Server and service health status
 */
app.get('/health', async (req, res) => {
  const routingEngine = new RoutingEngine();
  const services = ['local', 'rovodev', 'gemini'];
  const healthChecks = await Promise.all(
    services.map(async (serviceName) => {
      const service = routingEngine.getServiceClient(serviceName);
      if (service) {
        const health = await service.healthCheck();
        return { service: serviceName, status: health.status };
      }
      return { service: serviceName, status: 'not found' };
    })
  );

  res.json({ status: 'ok', services: healthChecks });
});

setupSwagger(app);

export default app;
