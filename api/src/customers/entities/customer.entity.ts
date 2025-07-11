import { Schema, SchemaFactory } from "@nestjs/mongoose";



@Schema({timestamps:true})
export class Customer {}

export const CustomerSchema=SchemaFactory.createForClass(Customer)
