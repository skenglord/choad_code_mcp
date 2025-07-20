import { BaseServiceClient } from './BaseServiceClient';

export class GeminiServiceClient extends BaseServiceClient {
  async query(query: string, context?: any): Promise<any> {
    throw new Error('Not implemented');
  }

  async healthCheck(): Promise<{ status: string }> {
    return { status: 'ok' };
  }
}
