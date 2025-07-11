import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";
import { Service } from "src/services/entities/service.entity";


@Schema({timestamps:true})
export class Type {
    @Prop({required:true})
    name:string
    @Prop([{type:SchemaTypes.ObjectId, ref:'events'}])
    events:Types.ObjectId[]

}
export const typeSchema=SchemaFactory.createForClass(Type)
