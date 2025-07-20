import { routeQuery } from '../src/core/modelRouter';

describe('Model Router', () => {
  it('should route a general knowledge query to the general knowledge model', () => {
    const query = 'What is the capital of France?';
    const routedTool = routeQuery(query);
    expect(routedTool).not.toBeNull();
    expect(routedTool?.name).toBe('general_knowledge_query');
  });

  it('should route a code generation query to the code generation model', () => {
    const query = 'generate a function to calculate the factorial of a number';
    const routedTool = routeQuery(query);
    expect(routedTool).not.toBeNull();
    expect(routedTool?.name).toBe('code_generation_query');
  });

  it('should return null if no model matches the query', () => {
    const query = 'I want to order a pizza';
    const routedTool = routeQuery(query);
    expect(routedTool).toBeNull();
  });
});
