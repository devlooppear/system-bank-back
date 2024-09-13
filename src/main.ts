import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('System Bank Test API Documentation')
    .setDescription('API for managing System Bank Test')
    .setVersion('1.0')
    .build();

  const environment = process.env.ENVIROMENT || 'production';
  const isDevelopment = environment === 'development';

  app.enableCors({
    origin: (origin, callback) => {
      if (!origin || ['http://localhost:5173', 'http://localhost:5174'].includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3000;

  await app.listen(port);
}

bootstrap();
