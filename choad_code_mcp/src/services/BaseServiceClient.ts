export interface ServiceClient {
  query(query: string, context?: any): Promise<any>;
  healthCheck(): Promise<{ status: string }>;
}

export abstract class BaseServiceClient implements ServiceClient {
  abstract query(query: string, context?: any): Promise<any>;
  abstract healthCheck(): Promise<{ status: string }>;
}
