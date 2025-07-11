import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectModel } from '@nestjs/mongoose';
import { IEvent } from './interfaces/event.interface';
import { Model } from 'mongoose';
import { IUser } from 'src/users/interfaces/user.interface';
import { IType } from 'src/types/interfaces/type.interface';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel('events')
    private eventModel: Model<IEvent>,
    @InjectModel("users")
    private userModel:Model<IUser>,
    @InjectModel("types")
    private typeModel:Model<IType>
  ) {}



 async createEvent(createEventDto: CreateEventDto):Promise<IEvent> {
  const newEvent = new this.eventModel(createEventDto);
 
  await this.userModel.updateOne({_id: createEventDto.customer},
    {$push:{events:newEvent._id
    }});
  

  await this.typeModel.updateOne({_id: createEventDto.type},
    {$push:{events:newEvent._id
    }});
    
  return await newEvent.save();
    
  }

  async findAllEvents(): Promise<IEvent[]> {
    const EventsData = await this.eventModel.find().populate('type').exec();
    if (!EventsData || EventsData.length === 0) {
      throw new NotFoundException ('No Events found');
    }
    return EventsData;

    }

  async findOneEvent(EventId: string):Promise<IEvent> {
    const ExistingEvent = await (await this.eventModel.findById(EventId)).populate('type')
    if(!ExistingEvent){
      throw new NotFoundException ('Event not found');
    }
    return ExistingEvent;
    
    }

  async updateEvent(EventId: string, updateEventDto: UpdateEventDto): Promise<IEvent> {
    const updateEvent=await this.eventModel.findByIdAndUpdate(EventId , updateEventDto, {new:true})
    if(!updateEvent) throw new NotFoundException("Event does not found")
    return updateEvent
    
  }

  async removeEvent(EventId: string) {
    const deletedEvent=await this.eventModel.findByIdAndDelete(EventId)
    if(!deletedEvent) throw new NotFoundException( "Event does not found")
    await this.userModel.updateOne({_id: deletedEvent.customer},
      {$pull:{events:deletedEvent._id
      }});
    
  
    await this.typeModel.updateOne({_id: deletedEvent.type},
      {$pull:{events:deletedEvent._id
      }});
    return deletedEvent
   }
   async findEventByCustomer(customer:string):Promise<IEvent[]>{
    const eventBycustomer=await this.eventModel.find({customer}).exec()
    return eventBycustomer
  }
  }
