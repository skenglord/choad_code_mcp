import appConfig from '../config';

export class RequestAnalyzer {
  analyze(query: string, context?: any): { service: string } {
    const routingConfig = appConfig.routing;

    if (routingConfig.optimal) {
      // Check for command-based routing
      for (const route in routingConfig.routes) {
        if (query.toLowerCase().startsWith(`route ${route}`)) {
          return { service: routingConfig.routes[route] };
        }
      }

      // Dynamic switching based on token count and complexity
      if (routingConfig.dynamicSwitching.enabled) {
        const tokenCount = this.getTokenCount(query);
        const complexity = this.getComplexity(query);

        if (
          tokenCount < routingConfig.dynamicSwitching.tokenThresholds.low &&
          complexity < routingConfig.dynamicSwitching.complexityThresholds.low
        ) {
          return { service: routingConfig.scenarios.low.model };
        } else if (
          tokenCount < routingConfig.dynamicSwitching.tokenThresholds.medium &&
          complexity < routingConfig.dynamicSwitching.complexityThresholds.medium
        ) {
          return { service: routingConfig.scenarios.medium.model };
        } else {
          return { service: routingConfig.scenarios.high.model };
        }
      }
    }

    // Default routing
    return { service: routingConfig.routes.default };
  }

  private getTokenCount(query: string): number {
    // Simple token count estimation
    return query.split(' ').length;
  }

  private getComplexity(query: string): number {
    // Simple complexity estimation
    const uniqueWords = new Set(query.split(' '));
    return uniqueWords.size / query.split(' ').length;
  }
}
