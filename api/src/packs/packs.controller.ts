import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { PacksService } from './packs.service';
import { CreatePackDto } from './dto/create-pack.dto';
import { UpdatePackDto } from './dto/update-pack.dto';
import { ApiTags } from '@nestjs/swagger';
import { response } from 'express';

@Controller('packs')
@ApiTags('packs')
export class PacksController {
  constructor(private readonly packsService: PacksService) {}

  @Post()
  async createPack(@Body() createPackDto: CreatePackDto, @Res() response) {
    try {
      const newPack = await this.packsService.createPack(createPackDto);
      response.status(HttpStatus.CREATED).json({
        message :"Pack created successfully",
        status: HttpStatus.CREATED,
        data : newPack
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
  async findAllPacks(@Res() response) {
   try {
    const PacksData = await this.packsService.findAllPacks();
      return response.status(HttpStatus.OK).json({
        message : "Packs found successfully",
        status : HttpStatus.OK,
        data : PacksData
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
  async findOnePack(@Param('id') PackId: string , @Res() response) {
    try {
      const ExistingPack = await this.packsService.findOnePack(PackId);
      return response.status(HttpStatus.OK).json({
        message : "Pack found successfully",
        status : HttpStatus.OK,
        data : ExistingPack
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
  async updatePack(@Param('id') PackId: string, @Body() updatePackDto: UpdatePackDto, @Res() response) {
    try {
      const updatePack = await this.packsService.updatePack(PackId, updatePackDto)
     return response.status(HttpStatus.OK).json({
       message:"Pack updated Successfully !" ,
       status:HttpStatus.OK,
       data:updatePack
 
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
  async removePack(@Param('id') PackId: string, @Res() response) {
    try {
      const removePack=await this.packsService.removePack(PackId)
      return response.status(HttpStatus.OK).json({
        message:"Pack deleted Successfully!" ,
        status:HttpStatus.OK,
        data: removePack
        
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
