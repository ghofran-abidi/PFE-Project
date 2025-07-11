import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { commentSchema } from './entities/comment.entity';
import { serviceSchema } from 'src/services/entities/service.entity';
import { userSchema } from 'src/users/entities/user.entity';

@Module({
  imports:[MongooseModule.forFeature([{name:'comments',schema:commentSchema}]),
  MongooseModule.forFeature([{name:"services" , schema:serviceSchema}]) ,
  MongooseModule.forFeature([{name:"users" , schema:userSchema}]) ],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
