import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin:['http://localhost:3001','http://192.168.1.3:3001'],
    methods:'GET,PUT,DELETE,PATH,POST,UPDATE',
    credentials:true
  })
  await app.listen(3000);
}
bootstrap();
