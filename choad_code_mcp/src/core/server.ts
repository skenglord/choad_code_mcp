import express from 'express';
import { multiModelQueryTool } from '../tools/multiModelQuery';
import { multiModelQueryHandler } from './requestHandler';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/tools', (req, res) => {
  res.json([multiModelQueryTool]);
});

app.post('/multi_model_query', multiModelQueryHandler);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
