import { Schema, SchemaFactory } from "@nestjs/mongoose";

Schema({timestamps:true})
export class Provider {}

export const providerSchema=SchemaFactory.createForClass(Provider)
