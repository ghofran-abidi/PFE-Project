import { Module } from '@nestjs/common';
import { PacksService } from './packs.service';
import { PacksController } from './packs.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { packSchema } from './entities/pack.entity';

@Module({
  imports: [MongooseModule.forFeature([{name :'packs', schema : packSchema}])],
  controllers: [PacksController],
  providers: [PacksService],
})
export class PacksModule {}
