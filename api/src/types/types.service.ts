import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IType } from './interfaces/type.interface';

@Injectable()
export class TypesService {
  constructor(
    @InjectModel("types")
    private typeModel:Model<IType>
  ) {}
  


  async createType(createTypeDto: CreateTypeDto):Promise<IType> {
    const newType = new this.typeModel(createTypeDto);
    return await newType.save();

   
  }

  async findAllType():Promise<IType[]> {
    const TypesData = await this.typeModel.find().exec();
    if (!TypesData || TypesData.length === 0) {
      throw new NotFoundException ('No Types found');
    }
    return TypesData;
   
  }

  async findOneType(TypeId: string):Promise<IType> {
    const ExistingType = await this.typeModel.findById(TypeId).exec();
    if(!ExistingType){
      throw new NotFoundException ('Type not found');
    }
    return ExistingType;
    
  }

  async updateType(TypeId: string, updateTypeDto: UpdateTypeDto):Promise<IType> {
    const updateType=await this.typeModel.findByIdAndUpdate(TypeId , updateTypeDto, {new:true})
    if(!updateType) throw new NotFoundException("Type does not found")
    return updateType
  }

  async removeType(TypeId: string) {
    const deletedType=await this.typeModel.findByIdAndDelete(TypeId)
    if(!deletedType) throw new NotFoundException( "Type does not found")
    return deletedType
  }
}
