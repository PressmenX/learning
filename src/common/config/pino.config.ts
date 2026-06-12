import { ConfigService } from '@nestjs/config';
import { LoggerModuleAsyncParams, Params } from 'nestjs-pino';

export const pinoConfigAsync: LoggerModuleAsyncParams = {
  inject: [ConfigService],
  useFactory: (configService: ConfigService): Params => {
    const nodeEnv = configService.get<string>('NODE_ENV');
    const isDev = nodeEnv === 'development';

    return {
      pinoHttp: {
        level: isDev ? 'debug' : 'info',
        transport: isDev
          ? {
              target: 'pino-pretty',
              options: { colorize: true },
            }
          : undefined,
      },
    };
  },
};
