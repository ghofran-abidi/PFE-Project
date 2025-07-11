import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";

@Schema({timestamps:true})
export class Pack {
    @Prop({required:true  })
    name:string

    @Prop({required:true  })
    price:string

    @Prop([{type:SchemaTypes.ObjectId, ref:'services'}])
    services:Types.ObjectId[]



}
export const packSchema=SchemaFactory.createForClass(Pack)
