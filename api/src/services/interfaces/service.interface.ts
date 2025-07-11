import { Document } from "mongoose"

export interface IService extends Document{

    readonly title:string 
    readonly description:string
    readonly files:string[]
    readonly phone:number
    readonly price:string
    readonly email:string
    readonly instagram:string
    readonly page:string
    readonly site:string
    readonly category:string
   
}