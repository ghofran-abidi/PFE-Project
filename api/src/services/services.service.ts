import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { InjectModel } from '@nestjs/mongoose';
import { IService } from './interfaces/service.interface';
import { Model } from 'mongoose';
import { ICategory } from 'src/categories/interfaces/category.interface';
import { IPack } from 'src/packs/interfaces/pack.interface';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';

@Injectable()
export class ServicesService {
  constructor(
    @InjectModel('services')
    private serviceModel: Model<IService>,
    @InjectModel("categories")
    private categoryModel:Model<ICategory>,
    
  
    

  ) {}



  async createService(createServiceDto: CreateServiceDto): Promise<IService> {
    const newService = new this.serviceModel(createServiceDto);
    await this.categoryModel.updateOne({_id: createServiceDto.category},
      {$push:{services:newService._id
      }})
   /*  await this.packModel.updateOne({_id: createServiceDto.pack},
      {$push:{services:newService._id
      }}) */
    return await newService.save();
    
  }


  async findAllServices(): Promise<IService[]> {
    const ServicesData = await this.serviceModel.find().populate('category').exec();
    if(!ServicesData || ServicesData.length === 0) {
      throw new NotFoundException ('No Services found');
    }
    return ServicesData;

    }



  async findOneService(ServiceId: string): Promise<IService> {
    const ExistingService = await (await this.serviceModel.findById(ServiceId)).populate('category');
    if(!ExistingService){
      throw new NotFoundException ('Service not found');
    }
    return ExistingService;

   
  }

  async updateService(ServiceId: string, updateServiceDto: UpdateServiceDto):Promise<IService> {
    const updateService=await this.serviceModel.findByIdAndUpdate(ServiceId , updateServiceDto, {new:true})
    if(!updateService) throw new NotFoundException("Service does not found")
    return updateService
    
  }

 async removeService(ServiceId: string) {
  const deletedServise=await this.serviceModel.findByIdAndDelete(ServiceId)
  if(!deletedServise) throw new NotFoundException( "Service does not found")
  await this.categoryModel.updateOne({_id: deletedServise.category},
    {$pull:{services:deletedServise._id
    }})
  return deletedServise
 }
 async findServiceByCategory(category:string):Promise<IService[]>{
  const serviceByCategory=await this.serviceModel.find({category}).exec()
  return serviceByCategory
}

  
}
