import { BaseServiceClient } from './BaseServiceClient';

export class RovodevServiceClient extends BaseServiceClient {
  constructor() {
    super('rovodev');
  }

  async query(query: string, context?: any): Promise<any> {
    return { service: this.serviceName, response: query };
  }

  async healthCheck(): Promise<{ status: string }> {
    return { status: 'ok' };
  }
}
