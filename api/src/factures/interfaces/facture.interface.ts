import { Document } from "mongoose";


export interface IFacture extends Document{
readonly price:number
readonly event:string
}