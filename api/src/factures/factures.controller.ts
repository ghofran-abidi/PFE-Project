import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { FacturesService } from './factures.service';
import { CreateFactureDto } from './dto/create-facture.dto';
import { UpdateFactureDto } from './dto/update-facture.dto';
import { ApiTags } from '@nestjs/swagger';
import { response } from 'express';

@Controller('factures')
@ApiTags('factures')
export class FacturesController {
  constructor(private readonly facturesService: FacturesService) {}

  @Post()
 async createFacture(@Body() createFactureDto: CreateFactureDto,@Res() response) {
    try {
      const newFacture = await this.facturesService.createFacture(createFactureDto);
      response.status(HttpStatus.CREATED).json({
        message :"Facture created successfully",
        status: HttpStatus.CREATED,
        data : newFacture
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
  async findAllFactures(@Res() response) {
    try {
      const FacturesData = await this.facturesService.findAllFactures();
      return response.status(HttpStatus.OK).json({
        message : "Factures found successfully",
        status : HttpStatus.OK,
        data : FacturesData
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
  async findOneFacture(@Param('id') FactureId: string,@Res() response) {
    try {
      const ExistingFacture = await this.facturesService.findOneFacture(FactureId);
      return response.status(HttpStatus.OK).json({
        message : " Facture found successfully",
        status : HttpStatus.OK,
        data : ExistingFacture
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
  async updateFacture(@Param('id') FactureId: string, @Body() updateFactureDto: UpdateFactureDto, @Res() response) {
   try {
    const updateFacture = await this.facturesService.updateFacture(FactureId, updateFactureDto)
      return response.status(HttpStatus.OK).json({
        message:"Facture updated Successfully !" ,
        status:HttpStatus.OK,
        data:updateFacture
  
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
  async removeFacture(@Param('id') FactureId: string,@Res() response) {
    try {
      const removeFacture=await this.facturesService.removeFacture(FactureId)
       return response.status(HttpStatus.OK).json({
         message:"Facture deleted Successfully!" ,
         status:HttpStatus.OK,
         data: removeFacture
         
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
