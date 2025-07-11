import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
 
  const config=new DocumentBuilder()
  .setTitle("Event Planner")
  .setDescription("pfe project")
  .addTag('users')
  .addTag('auth')
  .addTag('categories')
  .addTag('services')
  .addTag('events')
  .addTag('comments')
  .addTag('guestlist')
  .addTag('types')
  .addTag('packs')
  .addTag('appointment')
  .addTag('factures')
  .addTag('disponibilities')
  .addBearerAuth({
    description:'Please enter token in following format :Bearer <JWT>',
    name:'Bearer',
    scheme: 'Bearer',
    type:'http',
    in:'Header'

  },
  'access-token')

  .addBearerAuth({
    description:'Please enter token in following format :Bearer <JWT REFRESH>',
    name:'Authorization',
    scheme: 'Bearer',
    type:'http',
    in:'Header'

  },
  'refresh-token')

  .build()
  const Document=SwaggerModule.createDocument(app , config)
  SwaggerModule.setup("api" , app , Document)
  await app.listen(4000);
}
bootstrap();

