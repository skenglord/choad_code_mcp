import { RequestAnalyzer } from './RequestAnalyzer';
import { ServiceClient } from '../services/BaseServiceClient';
import { LocalServiceClient } from '../services/LocalServiceClient';
import { RovodevServiceClient } from '../services/RovodevServiceClient';
import { GeminiServiceClient } from '../services/GeminiServiceClient';
import appConfig from '../config';

export class RoutingEngine {
  private analyzer: RequestAnalyzer;
  private services: { [key: string]: ServiceClient };

  constructor() {
    this.analyzer = new RequestAnalyzer();
    this.services = {
      local: new LocalServiceClient(),
      rovodev: new RovodevServiceClient(),
      gemini: new GeminiServiceClient(),
    };
  }

  getServiceClient(serviceName: string): ServiceClient | undefined {
    return this.services[serviceName];
  }

  async route(query: string, context?: any): Promise<any> {
    const { service } = this.analyzer.analyze(query, context);
    const selectedService = this.services[service];

    if (!selectedService) {
      throw new Error(`Service ${service} not found`);
    }

    return selectedService.query(query, context);
  }
}
