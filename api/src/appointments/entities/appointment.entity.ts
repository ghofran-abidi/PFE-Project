import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";

@Schema({timestamps:true})
export class Appointment {
    @Prop({type: SchemaTypes.ObjectId,ref:'users',required:true})
    customer: Types.ObjectId;

    @Prop({type: SchemaTypes.ObjectId,ref:'users',required:true})
    provider: Types.ObjectId;

    

}
export const appointmentSchema=SchemaFactory.createForClass(Appointment)
