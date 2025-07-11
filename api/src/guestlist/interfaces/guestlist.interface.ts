import { Document } from "mongoose"

export interface IGuestlist extends Document{
    readonly firstName:string 
    readonly lastName:string
    readonly adress:string
    readonly event:string
    
}