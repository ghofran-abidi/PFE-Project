import { Module } from '@nestjs/common';
import { DisponibilitiesService } from './disponibilities.service';
import { DisponibilitiesController } from './disponibilities.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { disponibilitySchema } from './entities/disponibility.entity';
import { serviceSchema } from 'src/services/entities/service.entity';

@Module({
  imports:[MongooseModule.forFeature([{name:'disponibilities',schema:disponibilitySchema}]),
  MongooseModule.forFeature([{name:"services" , schema:serviceSchema}])  ],
  controllers: [DisponibilitiesController],
  providers: [DisponibilitiesService],
})
export class DisponibilitiesModule {}
