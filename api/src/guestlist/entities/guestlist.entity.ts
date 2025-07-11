import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";
@Schema({timestamps:true})
export class Guestlist {
    @Prop({required:true  })
    firstName:string
    @Prop({required:true  })
    lastName:string
    @Prop({required:true  })
    adress:string
    
    @Prop({type:SchemaTypes.ObjectId , ref:'event' , required:true})
    event:Types.ObjectId




}
export const guestlistSchema=SchemaFactory.createForClass(Guestlist)
