import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDisponibilityDto } from './dto/create-disponibility.dto';
import { UpdateDisponibilityDto } from './dto/update-disponibility.dto';
import { InjectModel } from '@nestjs/mongoose';
import { IDisponibility } from './interfaces/disponibility.interface';
import { Model } from 'mongoose';
import { IService } from 'src/services/interfaces/service.interface';
import { CreateServiceDto } from 'src/services/dto/create-service.dto';

@Injectable()
export class DisponibilitiesService {
  constructor(
    @InjectModel('disponibilities')
    private disponibilityModel: Model<IDisponibility>,
    @InjectModel("services")
    private serviceModel:Model<IService>,

  ){}
 async createDisponibility(createDisponibilityDto: CreateDisponibilityDto):Promise<IDisponibility> {
  const newDisponibility = new this.disponibilityModel(createDisponibilityDto);
  await this.serviceModel.updateOne({_id: createDisponibilityDto.service},
    {$push:{disponibilities:newDisponibility._id
    }})
  return await newDisponibility.save();
  }

  async findAllDisponibilities():Promise<IDisponibility[]> {
    const DisponibilitiesData = await this.disponibilityModel.find().exec();
    if (!DisponibilitiesData || DisponibilitiesData.length === 0) {
      throw new NotFoundException ('No Disponibilities found');
    }
    return DisponibilitiesData;

    
  }

  async findOneDisponibility(DisponibilityId: string):Promise<IDisponibility> {
    const ExistingDisponibility = await this.disponibilityModel.findById(DisponibilityId).exec();
    if(!ExistingDisponibility){
      throw new NotFoundException ('Disponibility not found');
    }
    return ExistingDisponibility;
  }

  async updateDisponibility(DisponibilityId: string, updateDisponibilityDto: UpdateDisponibilityDto):Promise<IDisponibility> {
    const updateDisponibility=await this.disponibilityModel.findByIdAndUpdate(DisponibilityId , updateDisponibilityDto, {new:true})
    if(!updateDisponibility) throw new NotFoundException("Disponibility does not found")
    return updateDisponibility
  }

  async removeDisponibility(DisponibilityId: string) {
    const deletedDisponibility=await this.disponibilityModel.findByIdAndDelete(DisponibilityId)
    if(!deletedDisponibility) throw new NotFoundException( "Disponibility does not found")
    await this.serviceModel.updateOne({_id: deletedDisponibility.service},
      {$pull:{services:deletedDisponibility._id
      }})
    return deletedDisponibility
  }
}
