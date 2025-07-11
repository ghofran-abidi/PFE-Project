import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { response } from 'express';
import { ApiTags } from '@nestjs/swagger';

@Controller('appointment')
@ApiTags('appointment')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
 async createAppointment(@Body() createAppointmentDto: CreateAppointmentDto,@Res() response) {
    try {
      const newAppointment = await this.appointmentsService.createAppointment(createAppointmentDto);
      response.status(HttpStatus.CREATED).json({
        message :"Appointment created successfully",
        status: HttpStatus.CREATED,
        data : newAppointment
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
  async findAllAppointments(@Res() response) {
    try {
      const AppointmentsData = await this.appointmentsService.findAllAppointments();
      return response.status(HttpStatus.OK).json({
        message : "Appointments found successfully",
        status : HttpStatus.OK,
        data : AppointmentsData
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
  async findOneAppointment(@Param('id') AppointmentId: string, @Res() response) {
    try {
      const ExistingAppointment = await this.appointmentsService.findOneAppointment(AppointmentId);
      return response.status(HttpStatus.OK).json({
        message : " Appointment found successfully",
        status : HttpStatus.OK,
        data : ExistingAppointment
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
 async updateAppointment(@Param('id') AppointmentId: string, @Body() updateAppointmentDto: UpdateAppointmentDto,@Res() response) {
    try {
      const updateAppointment = await this.appointmentsService.updateAppointment(AppointmentId, updateAppointmentDto)
      return response.status(HttpStatus.OK).json({
        message:"Appointment updated Successfully !" ,
        status:HttpStatus.OK,
        data:updateAppointment
  
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
  async removeAppointment(@Param('id') AppointmentId: string,@Res()response) {
    try {
      const removeAppointment=await this.appointmentsService.removeAppointment(AppointmentId)
       return response.status(HttpStatus.OK).json({
         message:"Appointment deleted Successfully!" ,
         status:HttpStatus.OK,
         data: removeAppointment
         
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
