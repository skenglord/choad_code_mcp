import { BaseServiceClient } from './BaseServiceClient';

export class GeminiServiceClient extends BaseServiceClient {
  constructor() {
    super('gemini');
  }

  async query(query: string, context?: any): Promise<any> {
    return { service: this.serviceName, response: query };
  }

  async healthCheck(): Promise<{ status: string }> {
    return { status: 'ok' };
  }
}
