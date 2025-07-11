import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePackDto } from './dto/create-pack.dto';
import { UpdatePackDto } from './dto/update-pack.dto';
import { InjectModel } from '@nestjs/mongoose';
import { IPack } from './interfaces/pack.interface';
import { Model } from 'mongoose';

@Injectable()
export class PacksService {
  constructor(
    @InjectModel('packs')
    private packModel: Model<IPack>
 ){}

 async createPack(createPackDto: CreatePackDto):Promise<IPack> {
  const newPack = new this.packModel(createPackDto);
  return await newPack.save();

  }

  async findAllPacks():Promise<IPack[]> {
    const PacksData = await this.packModel.find().exec();
    if (!PacksData || PacksData.length === 0) {
      throw new NotFoundException ('No Packs found');
    }
    return PacksData;
   
  }

  async findOnePack(PackId: string):Promise<IPack> {
    const ExistingPack = await this.packModel.findById(PackId).exec();
    if(!ExistingPack){
      throw new NotFoundException ('Pack not found');
    }
    return ExistingPack;
    
  }

  async updatePack(PackId: string, updatePackDto: UpdatePackDto):Promise<IPack> {
    const updatePack=await this.packModel.findByIdAndUpdate(PackId , updatePackDto, {new:true})
    if(!updatePack) throw new NotFoundException("Pack does not found")
    return updatePack
    
  }

  async removePack(PackId: string) {
    const deletedPack=await this.packModel.findByIdAndDelete(PackId)
    if(!deletedPack) throw new NotFoundException( "Category does not found")
    return deletedPack
    
    
  }
}
