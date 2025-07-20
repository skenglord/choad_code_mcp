export class RequestAnalyzer {
  analyze(query: string, context?: any): { service: 'local' | 'rovodev' | 'gemini' } {
    if (query.length < 20) {
      return { service: 'local' };
    }
    // Add more complex analysis later
    return { service: 'rovodev' };
  }
}
