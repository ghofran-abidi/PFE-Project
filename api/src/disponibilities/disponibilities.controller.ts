import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { DisponibilitiesService } from './disponibilities.service';
import { CreateDisponibilityDto } from './dto/create-disponibility.dto';
import { UpdateDisponibilityDto } from './dto/update-disponibility.dto';
import { ApiTags } from '@nestjs/swagger';
import { response } from 'express';

@Controller('disponibilities')
@ApiTags('disponibilities')
export class DisponibilitiesController {
  constructor(private readonly disponibilitiesService: DisponibilitiesService) {}

  @Post()
  async createDisponibility(@Body() createDisponibilityDto: CreateDisponibilityDto,@Res() response) {
    try {
      const newDisponibility = await this.disponibilitiesService.createDisponibility(createDisponibilityDto);
      response.status(HttpStatus.CREATED).json({
        message :"Disponibility created successfully",
        status: HttpStatus.CREATED,
        data : newDisponibility
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
  async findAllDisponibilities(@Res() response) {
    try {
      const DisponibilitiesData = await this.disponibilitiesService.findAllDisponibilities();
      return response.status(HttpStatus.OK).json({
        message : "Disponibilities found successfully",
        status : HttpStatus.OK,
        data : DisponibilitiesData
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
  async findOneDisponibility(@Param('id') DisponibiltyId: string,@Res() response) {
    try {
      const ExistingDisponibility = await this.disponibilitiesService.findOneDisponibility(DisponibiltyId);
      return response.status(HttpStatus.OK).json({
        message : " Disponibility found successfully",
        status : HttpStatus.OK,
        data : ExistingDisponibility
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
  async update(@Param('id') DisponibilityId: string, @Body() updateDisponibilityDto: UpdateDisponibilityDto,@Res() response)
   {
   try {
    const updateDisponibility = await this.disponibilitiesService.updateDisponibility(DisponibilityId, updateDisponibilityDto)
      return response.status(HttpStatus.OK).json({
        message:"Disponibility updated Successfully !" ,
        status:HttpStatus.OK,
        data:updateDisponibility
  
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
  async removeDisponibility(@Param('id') DisponibilityId: string,@Res() response) {
    try {
      const removeDisponibility=await this.disponibilitiesService.removeDisponibility(DisponibilityId)
       return response.status(HttpStatus.OK).json({
         message:"Disponibility deleted Successfully!" ,
         status:HttpStatus.OK,
         data: removeDisponibility
         
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
