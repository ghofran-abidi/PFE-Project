import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { GuestlistService } from './guestlist.service';
import { CreateGuestlistDto } from './dto/create-guestlist.dto';
import { UpdateGuestlistDto } from './dto/update-guestlist.dto';
import { ApiTags } from '@nestjs/swagger';
import {  response } from 'express';

@Controller('guestlist')
@ApiTags('guestlist')
export class GuestlistController {
  constructor(private readonly guestlistService: GuestlistService) {}

  @Post()
 async createGuestlist(@Body() createGuestlistDto: CreateGuestlistDto, @Res() response) {
  try {
    const newGuestlist = await this.guestlistService.createGuestlist(createGuestlistDto);
    response.status(HttpStatus.CREATED).json({
      message :"Guestlist created successfully",
      status: HttpStatus.CREATED,
      data : newGuestlist
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
  async findAllGuestlist(@Res() response) {
    try {
      const GuestlistData = await this.guestlistService.findAllGuestlist();
      return response.status(HttpStatus.OK).json({
        message : "Guestlist found successfully",
        status : HttpStatus.OK,
        data : GuestlistData
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
  async findOneGuestlist(@Param('id') GuestlistId: string , @Res() response) {
    try {
      const ExistingGuestlist = await this.guestlistService.findOneGuestList(GuestlistId);
      return response.status(HttpStatus.OK).json({
        message : " Guestlist found successfully",
        status : HttpStatus.OK,
        data : ExistingGuestlist
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
  async updateGuestlist(@Param('id') GuestlistId: string, @Body() updateGuestlistDto: UpdateGuestlistDto , @Res() response) {
    try {
      const updateGuestlist = await this.guestlistService.updateGuestlist(GuestlistId, updateGuestlistDto)
      return response.status(HttpStatus.OK).json({
        message:"Guestlist updated Successfully !" ,
        status:HttpStatus.OK,
        data:updateGuestlist
  
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
 async removeGuestlist(@Param('id') GuestlistId: string , @Res() response) {
  try {
    const removeGuestlist=await this.guestlistService.removeGuestlist(GuestlistId)
    return response.status(HttpStatus.OK).json({
      message:"Guestlist deleted Successfully!" ,
      status:HttpStatus.OK,
      data: removeGuestlist
      
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
