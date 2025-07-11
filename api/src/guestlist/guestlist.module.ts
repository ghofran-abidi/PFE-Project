import { Module } from '@nestjs/common';
import { GuestlistService } from './guestlist.service';
import { GuestlistController } from './guestlist.controller';
import mongoose from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { guestlistSchema } from './entities/guestlist.entity';

@Module({
  imports: [MongooseModule.forFeature([{name:'guestlist',schema:guestlistSchema}])],
  controllers: [GuestlistController],
  providers: [GuestlistService],
})
export class GuestlistModule {}
