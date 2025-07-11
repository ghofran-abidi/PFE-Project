import { Document } from "mongoose"

export interface IEvent extends Document{
    readonly title:string 
    readonly date:Date
    readonly nbr:number
    readonly customer:string
    readonly type:string
    
}