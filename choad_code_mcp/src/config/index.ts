import config from 'config';

interface AppConfig {
  port: number;
  services: {
    [key: string]: {
      url: string;
      timeout: number;
    };
  };
  logging: {
    level: string;
    file: string;
  };
  routing: any;
}

const appConfig: AppConfig = {
  port: config.get<number>('port'),
  services: config.get<any>('services'),
  logging: config.get<any>('logging'),
  routing: config.get<any>('routing'),
};

export default appConfig;
