import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { response } from 'express';
import { Customer } from 'src/customers/entities/customer.entity';

@Controller('events')
@ApiTags('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}
  @Get(':Customer')
  async findEventByCustomer(@Param('Customer') customer:string,@Res() response){
    try {
      const eventBycustomer = await this.eventsService.findEventByCustomer(customer);
      return response.status(HttpStatus.OK).json({
        message : "Event found successfully with id Customer",
        status : HttpStatus.OK,
        data : eventBycustomer
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
  async createEvent(@Body() createEventDto: CreateEventDto, @Res() response) {
    try {
      const newEvent = await this.eventsService.createEvent(createEventDto);
      response.status(HttpStatus.CREATED).json({
        message :"Event created successfully",
        status: HttpStatus.CREATED,
        data : newEvent
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
  async findAllEvents(@Res() response) {
    try {
      const EventsData = await this.eventsService.findAllEvents();
      return response.status(HttpStatus.OK).json({
        message : "Events found successfully",
        status : HttpStatus.OK,
        data : EventsData
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
  async findOneEvent(@Param('id') EventId: string, @Res() response) {
    try {
      const ExistingEvent = await this.eventsService.findOneEvent(EventId);
      return response.status(HttpStatus.OK).json({
        message : " Event found successfully",
        status : HttpStatus.OK,
        data : ExistingEvent
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
 async updateEvent(@Param('id') EventId: string, @Body() updateEventDto: UpdateEventDto, @Res() response) {
  try {
    const updateEvent = await this.eventsService.updateEvent(EventId, updateEventDto)
     return response.status(HttpStatus.OK).json({
       message:"Event updated Successfully !" ,
       status:HttpStatus.OK,
       data:updateEvent
 
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
  async removeEvent(@Param('id') EventId: string, @Res() response) {
    try {
      const removeEvent=await this.eventsService.removeEvent(EventId)
       return response.status(HttpStatus.OK).json({
         message:"Event deleted Successfully!" ,
         status:HttpStatus.OK,
         data: removeEvent
         
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
