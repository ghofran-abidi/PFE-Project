import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGuestlistDto } from './dto/create-guestlist.dto';
import { UpdateGuestlistDto } from './dto/update-guestlist.dto';
import { InjectModel } from '@nestjs/mongoose';
import { IGuestlist } from './interfaces/guestlist.interface';
import { Model } from 'mongoose';
import { Guestlist } from './entities/guestlist.entity';

@Injectable()
export class GuestlistService {
  constructor(
    @InjectModel('guestlist')
    private guestlistModel: Model<IGuestlist>,
  ) {}



  async createGuestlist(createGuestlistDto: CreateGuestlistDto):Promise<IGuestlist> {
    const newGuestlist = new this.guestlistModel(createGuestlistDto);
  return await newGuestlist.save();
  }

  async findAllGuestlist():Promise<IGuestlist[]> {
    const GuestlistData = await this.guestlistModel.find().exec();
    if (!GuestlistData || GuestlistData.length === 0) {
      throw new NotFoundException ('No Guestlist found');
    }
    return GuestlistData;
    
  }

 async findOneGuestList(GuestlistId: string):Promise<IGuestlist> {
  const ExistingGuestlist = await this.guestlistModel.findById(GuestlistId).exec();
    if(!ExistingGuestlist){
      throw new NotFoundException ('Guestlist not found');
    }
    return ExistingGuestlist;
    
  }

  async updateGuestlist(GuestlistId: string, updateGuestlistDto: UpdateGuestlistDto):Promise<IGuestlist> {
    const updateGuestlist=await this.guestlistModel.findByIdAndUpdate(GuestlistId , updateGuestlistDto, {new:true})
    if(!updateGuestlist) throw new NotFoundException("Guestlist does not found")
    return updateGuestlist
   
  }

  async removeGuestlist(GuestlistId: string) {
    const deletedGuestlist=await this.guestlistModel.findByIdAndDelete(GuestlistId)
    if(!deletedGuestlist) throw new NotFoundException( "Guestlist does not found")
    return deletedGuestlist
  }
}
