import request from 'supertest';
import express from 'express';
import { multiModelQueryTool } from '../src/tools/multiModelQuery';
import { multiModelQueryHandler } from '../src/core/requestHandler';

const app = express();
app.use(express.json());
app.get('/tools', (req, res) => {
    res.json([multiModelQueryTool]);
});
app.post('/multi_model_query', multiModelQueryHandler);
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

describe('MCP Server', () => {
    describe('Tool Discovery', () => {
        it('should return the list of available tools', async () => {
            const response = await request(app).get('/tools');
            expect(response.status).toBe(200);
            expect(response.body).toEqual([
                {
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
                },
            ]);
        });
    });

    describe('Health Check', () => {
        it('should return a 200 OK for the health check', async () => {
            const response = await request(app).get('/health');
            expect(response.status).toBe(200);
            expect(response.body).toEqual({ status: 'ok' });
        });
    });

    describe('Multi-Model Query', () => {
        it('should handle a simple query with a local response', async () => {
            const response = await request(app)
                .post('/multi_model_query')
                .send({ query: 'hello there' });
            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                response: 'Hello there! How can I help you today?',
            });
        });

        it('should route a general knowledge query to the general knowledge model', async () => {
            const response = await request(app)
                .post('/multi_model_query')
                .send({ query: 'What is the capital of France?' });
            expect(response.status).toBe(200);
            expect(response.body).toEqual({
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
            });
        });

        it('should route a code generation query to the code generation model', async () => {
            const response = await request(app)
                .post('/multi_model_query')
                .send({ query: 'generate a function to calculate the factorial of a number' });
            expect(response.status).toBe(200);
            expect(response.body).toEqual({
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
            });
        });

        it('should return the query if no model matches', async () => {
            const response = await request(app)
                .post('/multi_model_query')
                .send({ query: 'I want to order a pizza' });
            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                response: 'You queried: I want to order a pizza',
            });
        });

        it('should return a 400 Bad Request if the query is missing', async () => {
            const response = await request(app)
                .post('/multi_model_query')
                .send({});
            expect(response.status).toBe(400);
            expect(response.body).toEqual({ error: 'Query is required' });
        });
    });
});
