import { Document } from "mongoose"


export interface IComment extends Document{
    readonly note:string 
    readonly comment:string
    readonly service:string 
    readonly customer:string
    
}