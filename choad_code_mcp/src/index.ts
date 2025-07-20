import server from './core/server';
import logger from './utils/logger';
import appConfig from './config';

const port = appConfig.port;

const runningServer = server.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});

const gracefulShutdown = () => {
  logger.info('SIGTERM signal received: closing HTTP server');
  runningServer.close(() => {
    logger.info('HTTP server closed');
    process.exit(0);
  });
};

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
