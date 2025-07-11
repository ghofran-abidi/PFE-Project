import { Document } from "mongoose";

export interface IPack extends Document{
    readonly name:string
    readonly price:string

}