import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { TypesService } from './types.service';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { ApiTags } from '@nestjs/swagger';
import { response } from 'express';

@Controller('types')
@ApiTags('types')
export class TypesController {
  constructor(private readonly typesService: TypesService) {}

  @Post()
  async createType(@Body() createTypeDto: CreateTypeDto,@Res() response) {
    try {
      const newType = await this.typesService.createType(createTypeDto);
      response.status(HttpStatus.CREATED).json({
        message :"Type created successfully",
        status: HttpStatus.CREATED,
        data : newType
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
  async findAllType(@Res() response) {
    try {
      const TypesData = await this.typesService.findAllType();
      return response.status(HttpStatus.OK).json({
        message : "Types found successfully",
        status : HttpStatus.OK,
        data : TypesData
      })
    } catch (error) {
      return response.status(HttpStatus.NOT_FOUND).json({
        message : error.message,
        status : HttpStatus.NOT_FOUND,
        data : null
      })
    }
    
  }

  @Get(':id')
  async findOneType(@Param('id') TypeId: string ,@Res() response) {
    try {
      const ExistingType = await this.typesService.findOneType(TypeId);
      return response.status(HttpStatus.OK).json({
        message : "Type found successfully",
        status : HttpStatus.OK,
        data : ExistingType
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
  async updateType(@Param('id') TypeId: string, @Body() updateTypeDto: UpdateTypeDto,@Res()response) {
    try {
      const updateType = await this.typesService.updateType(TypeId, updateTypeDto)
      return response.status(HttpStatus.OK).json({
        message:"Type updated Successfully !" ,
        status:HttpStatus.OK,
        data:updateType
  
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
  async removeType(@Param('id') TypeId: string, @Res() response) {

    try {
      const removeType=await this.typesService.removeType(TypeId)
      return response.status(HttpStatus.OK).json({
        message:"Type deleted Successfully!" ,
        status:HttpStatus.OK,
        data: removeType
        
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
