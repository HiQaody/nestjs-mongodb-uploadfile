import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ErrorMiddleware } from './middleware/error.middleware';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger Configuration
  const config = new DocumentBuilder()
      .setTitle('API Documentation')
      .setDescription('API for managing shoe sales')
      .setVersion('1.0')
      .addBearerAuth()
      .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  // Use Error Middleware
  app.use(new ErrorMiddleware().use);

  // Serve Static Files
  app.use('/public', express.static(join(__dirname, '..', 'public')));

  // Start the Application
  const port = process.env.PORT ?? 3000;
  await app.listen(port);

  // Log the Host and Port
  console.log(`Application listening on port ${port}`);
}

bootstrap();
