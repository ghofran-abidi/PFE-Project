import { Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({timestamps:true})
export class Admin {}

export const adminSchema=SchemaFactory.createForClass(Admin)
