import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: 'http://localhost:63734', // Allow requests from your Flutter app's origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Specify allowed methods
    credentials: true, // If you're using cookies or authorization headers
  });
  await app.listen(process.env.PORT ?? 3000);
  console.log(`app running on port ${process.env.PORT}`);
}
bootstrap();
