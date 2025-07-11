import { Document } from "mongoose";

export interface IDisponibility extends Document{
    readonly date:Date
    readonly service:string
}