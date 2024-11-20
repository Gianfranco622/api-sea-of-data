import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { loggerConfig } from '@core/config/logger';
import { useContainer } from "class-validator";
import cors from 'cors';
import helmet from 'helmet';

async function bootstrap() {
  const logger = new Logger(bootstrap.name);
  const app = await NestFactory.create(AppModule, loggerConfig); 
  const port = process.env.PORT;

  // Use container to allowed to access the DI three to access @Injectable services
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.setGlobalPrefix('api/honkai3rd');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.use(cors());
  app.use(helmet({
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: {
      directives: {
        imgSrc: [`'self'`, 'data:', 'apollo-server-landing-page.cdn.apollographql.com'],
        scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
        manifestSrc: [`'self'`, 'apollo-server-landing-page.cdn.apollographql.com'],
        frameSrc: [`'self'`, 'sandbox.embed.apollographql.com'],
      },
    },
  }));
  
  app.use(helmet.hidePoweredBy());
  await app.listen(port);

  logger.log(`Aplication Listening : ${await app.getUrl()}`);
}
bootstrap();