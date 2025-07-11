import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ApiTags } from '@nestjs/swagger';
import { response } from 'express';

@Controller('comments')
@ApiTags('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}
  @Get(':service')
  async findCommentByService(@Param('service') service:string,@Res() response){
    try {
      const commentByService = await this.commentsService.findCommentByService(service);
      return response.status(HttpStatus.OK).json({
        message : "Comment found successfully with id service",
        status : HttpStatus.OK,
        data : commentByService
      })
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message : error.message,
        status: HttpStatus.BAD_REQUEST,
        data : null
      })
    }
  }
  

  @Post()
  async createComment(@Body() createCommentDto: CreateCommentDto,@Res() response ) {
    try {
      const newComment = await this.commentsService.createComment(createCommentDto);
      response.status(HttpStatus.CREATED).json({
        message :"Comment created successfully",
        status: HttpStatus.CREATED,
        data : newComment
      })
      
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message : error.message,
        status : HttpStatus.BAD_REQUEST,
        data : null
      })
      
    }


    
  }

  @Get()
  async findAllComments(@Res() response) {
    try {
      const CommentsData = await this.commentsService.findAllComments();
      return response.status(HttpStatus.OK).json({
        message : "Comments found successfully",
        status : HttpStatus.OK,
        data : CommentsData
      })
      
    } catch (error) {
      return response.status(HttpStatus.NOT_FOUND).json({
        message : error.message,
        status : HttpStatus.NOT_FOUND,
        data : null
      })
      
    }
    
  }

  @Get('ById/:id')
  async findOneComment(@Param('id') CommentId: string ,@Res() response) {
    try {
      const ExistingComment = await this.commentsService.findOneComment(CommentId);
      return response.status(HttpStatus.OK).json({
        message : " Comment found successfully",
        status : HttpStatus.OK,
        data : ExistingComment
      })
      
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message : error.message,
        status: HttpStatus.BAD_REQUEST,
        data : null
      })
      
    }
    
  }

  @Patch(':id')
  async updateComment(@Param('id') CommentId: string, @Body() updateCommentDto: UpdateCommentDto, @Res() response) {
    try {
      const updateComment = await this.commentsService.updateComment(CommentId, updateCommentDto)
      return response.status(HttpStatus.OK).json({
        message:"Comment updated Successfully !" ,
        status:HttpStatus.OK,
        data:updateComment
  
      })
      
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message:error.message,
        status:HttpStatus.BAD_REQUEST,
        data:null
  
      })
      
    }
    
  }

  @Delete(':id')
  async removeComment(@Param('id') CommentId: string , @Res() response) {
    try {
      const removeComment=await this.commentsService.removeComment(CommentId)
       return response.status(HttpStatus.OK).json({
         message:"Comment deleted Successfully!" ,
         status:HttpStatus.OK,
         data: removeComment
         
       }
 
       )
      
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message:error.message,
        status:HttpStatus.BAD_REQUEST,
        data:null
  
      })
      
    }
    
  }
}
