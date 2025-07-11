import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { SchemaTypes, Types } from "mongoose"

@Schema({timestamps:true})
export class Comment {

    @Prop({required:true  })
    note:string

    @Prop({required:true  })
    comment:string

    @Prop({type:SchemaTypes.ObjectId , ref:'services' , required:true})
    service:Types.ObjectId

    @Prop({type:SchemaTypes.ObjectId , ref:'users' , required:true})
    customer:Types.ObjectId
    
}
export const commentSchema=SchemaFactory.createForClass(Comment)