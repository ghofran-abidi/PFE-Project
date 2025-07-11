import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";



@Schema({timestamps:true})
export class Disponibility {
    @Prop({required:true  })
    date:Date

    @Prop({type:SchemaTypes.ObjectId , ref:'services' , required:true})
    service:Types.ObjectId
}
export const disponibilitySchema=SchemaFactory.createForClass(Disponibility)
