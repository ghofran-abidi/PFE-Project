import { Document } from "mongoose";

export interface IAppointment extends Document{
    readonly customer:string
    readonly provider:string
}