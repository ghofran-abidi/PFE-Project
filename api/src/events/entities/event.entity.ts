import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";

@Schema({timestamps:true})
export class Event {
    @Prop({required:true  })
    title:string

    @Prop({required:true  })
    date:Date

    @Prop({required:true  })
    nbr:number

    @Prop({type:SchemaTypes.ObjectId , ref:'user' , required:true})
    customer:Types.ObjectId

    @Prop({type:SchemaTypes.ObjectId , ref:'types' , required:true})
    type: Types.ObjectId



}
export const eventSchema=SchemaFactory.createForClass(Event)
