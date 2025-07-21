import { RoutingEngine } from '../src/core/RoutingEngine';
import appConfig from '../src/config';

describe('RoutingEngine', () => {
  let routingEngine: RoutingEngine;

  beforeEach(() => {
    routingEngine = new RoutingEngine();
  });

  it('should route to the default service if optimal routing is disabled', async () => {
    appConfig.routing.optimal = false;
    const result = await routingEngine.route('test query');
    expect(result.service).toBe(appConfig.routing.routes.default);
  });

  it('should route to the correct service based on command', async () => {
    appConfig.routing.optimal = true;
    const result = await routingEngine.route('route code');
    expect(result.service).toBe(appConfig.routing.routes.code);
  });

  it('should route to the low complexity scenario', async () => {
    appConfig.routing.optimal = true;
    appConfig.routing.dynamicSwitching.enabled = true;
    const result = await routingEngine.route('short');
    expect(result.service).toBe(appConfig.routing.scenarios.low.model);
  });

  it('should route to the medium complexity scenario', async () => {
    appConfig.routing.optimal = true;
    appConfig.routing.dynamicSwitching.enabled = true;
    const result = await routingEngine.route('this is a medium complexity query');
    expect(result.service).toBe(appConfig.routing.scenarios.medium.model);
  });

  it('should route to the high complexity scenario', async () => {
    appConfig.routing.optimal = true;
    appConfig.routing.dynamicSwitching.enabled = true;
    const result = await routingEngine.route('this is a very long and complex query with many unique words that should be routed to the high complexity scenario');
    expect(result.service).toBe(appConfig.routing.scenarios.high.model);
  });
});
