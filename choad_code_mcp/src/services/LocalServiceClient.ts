import { BaseServiceClient } from './BaseServiceClient';

export class LocalServiceClient extends BaseServiceClient {
  async query(query: string, context?: any): Promise<any> {
    if (query.includes('hello')) {
      return { response: 'Hello from local service!' };
    }
    return { response: query };
  }

  async healthCheck(): Promise<{ status: string }> {
    return { status: 'ok' };
  }
}
