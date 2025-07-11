import { Document } from "mongoose";

export interface IType extends Document{
    readonly name:string
}