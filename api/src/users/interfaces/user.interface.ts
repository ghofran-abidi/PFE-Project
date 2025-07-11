import { Document } from "mongoose";



export interface IUser extends Document{
    readonly role:string
    readonly fullName:string 
    readonly email:string
    readonly userName:string
    readonly phone:Number
    readonly password:string
    readonly refreshToken:string
}