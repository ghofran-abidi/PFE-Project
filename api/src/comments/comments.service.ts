import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IComment } from './interfaces/comment.interface';
import { IEvent } from 'src/events/interfaces/event.interface';
import { IService } from 'src/services/interfaces/service.interface';
import { IUser } from 'src/users/interfaces/user.interface';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel('comments')
    private commentModel: Model<IComment>,
    @InjectModel("services")
    private serviceModel:Model<IService>,
    @InjectModel("users")
    private userModel:Model<IUser>
  ) {}



  async createComment(createCommentDto: CreateCommentDto):Promise<IComment> {
    const newComment = new this.commentModel(createCommentDto);
    await this.serviceModel.updateOne({_id: createCommentDto.service},
      {$push:{comments:newComment._id
      }})
      await this.userModel.updateOne({_id: createCommentDto.customer},
        {$push:{comments:newComment._id
        }})
  return await newComment.save();
    
  }

  async findAllComments():Promise<IComment[]> {
    const CommentsData = await this.commentModel.find().populate('service').exec();
    if (!CommentsData || CommentsData.length === 0) {
      throw new NotFoundException ('No Comments found');
    }
    return CommentsData;
  }

  async findOneComment(CommentId: string): Promise<IComment> {
    const ExistingComment = await this.commentModel.findById(CommentId).populate('service')
    if(!ExistingComment){
      throw new NotFoundException ('Comment not found');
    }
    return ExistingComment;
    
  }

  async updateComment(CommentId: string, updateCommentDto: UpdateCommentDto):Promise<IComment> {
    const updateComment=await this.commentModel.findByIdAndUpdate(CommentId , updateCommentDto, {new:true})
    if(!updateComment) throw new NotFoundException("Comment does not found")
    return updateComment
   
    
    
  }

  async removeComment(CommentId: string) {
    const deletedComment=await this.commentModel.findByIdAndDelete(CommentId)
    if(!deletedComment) throw new NotFoundException( "Comment does not found")
    await this.serviceModel.updateOne({_id: deletedComment.service},
      {$pull:{comments:deletedComment._id
      }})
      await this.userModel.updateOne({_id: deletedComment.customer},
        {$pull:{comments:deletedComment._id
        }})
    return deletedComment
  }
  async findCommentByService(service:string):Promise<IComment[]>{
    const commentByService=await this.commentModel.find({service}).exec()
    return commentByService
  }
}
