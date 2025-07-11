import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";

@Schema({timestamps:true})
export class Facture {
    @Prop({required:true  })
    price:number

    @Prop({type:SchemaTypes.ObjectId , ref:'event' , required:true})
    event:Types.ObjectId
}
export const factureSchema=SchemaFactory.createForClass(Facture)
