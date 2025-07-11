import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { serviceSchema } from './entities/service.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { categorySchema } from 'src/categories/entities/category.entity';
import { packSchema } from 'src/packs/entities/pack.entity';

@Module({
  imports:[MongooseModule.forFeature([{name :'services', schema:serviceSchema}]),
MongooseModule.forFeature([{name:"categories" , schema:categorySchema}]), 
   ], 
  controllers: [ServicesController],
  providers: [ServicesService],
})
export class ServicesModule {}
