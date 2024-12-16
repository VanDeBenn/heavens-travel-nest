import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';
import { CorrelationIdMiddleware } from './utils/correlation-id.middleware';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const logger = app.get(Logger);

  app.disable('x-powered-by');
  app.use(CorrelationIdMiddleware());
  app.useLogger(logger);
  app.enableCors({
    origin: [
      'http://localhost:3000',
      '192.168.195.16:3000',
      '192.168.195.59:3000',
      'http://192.168.195.16:3000',
      'http://192.168.195.59.16:3000',
    ],
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('API Docs')
    .setDescription('API description')
    .setVersion('1.0')
    .addTag('apidocs')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  const configService = app.get<ConfigService>(ConfigService);
  const port = configService.get<number>('port');

  const hostname = '0.0.0.0';

  await app.listen(port, hostname, () => {
    // logger.log(`Server listening on ${hostname}:${port}`);
    // if (error) {
    //   logger.error(error);
    //   process.exit(1);
    // } else {
    //   logger.log(`Server listening on ${address}`);
    // }
  });
}

bootstrap();
