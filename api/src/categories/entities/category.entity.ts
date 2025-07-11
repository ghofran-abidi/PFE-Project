import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaType, SchemaTypes, Types } from "mongoose";


@Schema({timestamps:true})

export class Category {
    @Prop({required:true , unique:true})
    name:string

    @Prop([{type:SchemaTypes.ObjectId , ref:"services"}])
    services:Types.ObjectId[]
}

export const categorySchema=SchemaFactory.createForClass(Category)


