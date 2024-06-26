import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  // validationlar burdan harekte geçer
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true // dto içinden hariç diğer eklenen veriler alınmaz 
  }))

  const config = new DocumentBuilder()
  .setTitle('Mava Pms')
  .setDescription('The Pms API description')
  .setVersion('1.0')
  .addTag('Demo')
  .addBearerAuth()
  .build();
  
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);
  
  await app.listen(3000);
}
bootstrap();
