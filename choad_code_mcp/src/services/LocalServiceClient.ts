import { BaseServiceClient } from './BaseServiceClient';

export class LocalServiceClient extends BaseServiceClient {
  constructor() {
    super('local');
  }

  async query(query: string, context?: any): Promise<any> {
    if (query.includes('hello')) {
      return { service: this.serviceName, response: 'Hello from local service!' };
    }
    return { service: this.serviceName, response: query };
  }

  async healthCheck(): Promise<{ status: string }> {
    return { status: 'ok' };
  }
}
