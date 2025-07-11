import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { SchemaTypes, Types } from "mongoose"

@Schema({timestamps:true})
export class Service {
    @Prop({required:true})
    title:string 
    @Prop({required:true, unique:true})
    description:string 
    @Prop({required:true})
    price:string

    @Prop({required:true})
    adress:string
  
    @Prop({required:true})
    files:string[]
    @Prop({required:true})
    phone:number
    @Prop({required:true})
    email:string
    @Prop({required:true})
    page:string
    @Prop({required:false})
    instagram:string
    @Prop({required:true})
    site:string


    @Prop({type:SchemaTypes.ObjectId , ref:'categories' , required:true})
    category:Types.ObjectId

    @Prop([{type:SchemaTypes.ObjectId , ref:"comments"}])
    comments:Types.ObjectId[]

    @Prop([{type:SchemaTypes.ObjectId , ref:"diponibilities"}])
    disponibilities:Types.ObjectId[]

  

}
export const serviceSchema=SchemaFactory.createForClass(Service)
