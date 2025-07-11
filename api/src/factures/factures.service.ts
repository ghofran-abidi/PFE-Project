import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFactureDto } from './dto/create-facture.dto';
import { UpdateFactureDto } from './dto/update-facture.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IFacture } from './interfaces/facture.interface';

@Injectable()
export class FacturesService {
  constructor(
    @InjectModel('factures')
    private factureModel: Model<IFacture>,

  ){}
  async createFacture(createFactureDto: CreateFactureDto):Promise<IFacture> {
    const newFacture = new this.factureModel(createFactureDto);
    return await newFacture.save();
  }

  async findAllFactures():Promise<IFacture[]> {
    const FacturesData = await this.factureModel.find().populate('event').exec();
    if (!FacturesData || FacturesData.length === 0) {
      throw new NotFoundException ('No Factures found');
    }
    return FacturesData;
  }

  async findOneFacture(FactureId: string):Promise<IFacture> {
    const ExistingFacture = await this.factureModel.findById(FactureId).populate('event')
    if(!ExistingFacture){
      throw new NotFoundException ('Facture not found');
    }
    return ExistingFacture;
  }

  async updateFacture(FactureId: string, updateFactureDto: UpdateFactureDto):Promise<IFacture> {
    const updateFacture=await this.factureModel.findByIdAndUpdate(FactureId , updateFactureDto, {new:true})
    if(!updateFacture) throw new NotFoundException("Facture does not found")
    return updateFacture
    
  }

  async removeFacture(FactureId: string) {
    const deletedFacture=await this.factureModel.findByIdAndDelete(FactureId)
    if(!deletedFacture) throw new NotFoundException( "Facture does not found")
    return deletedFacture
  }
}
