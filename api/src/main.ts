import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';
import open from 'open';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true, // importante para que @Param use DTO correctamente
      errorHttpStatusCode: HttpStatus.CONFLICT,
    }),
  );

  const options = new DocumentBuilder()
    .setTitle('Api de autenticación')
    .setDescription('Api multiple sistemas')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);

  // Por defecto queda en /docs (SIN /api)
  app.use(
    '/api/docs',
    apiReference({
      content: document,
    }),
  );
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') ?? 3000;
  await app.listen(port ?? 3000);

  console.log(`Api corriendo en http://localhost:${port}/api`);
  // setTimeout(() => {
  //   open(`http://localhost:${port}/api/docs`);
  // }, 3000);
}
bootstrap();
