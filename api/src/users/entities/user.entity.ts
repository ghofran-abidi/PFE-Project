import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, SchemaTypes, Types } from "mongoose";
import { Admin } from "src/admins/entities/admin.entity";
import { Customer } from "src/customers/entities/customer.entity";
import { Provider } from "src/providers/entities/provider.entity";
import * as argon2 from 'argon2'

export type UserDocument=HydratedDocument<User>
@Schema({timestamps:true , discriminatorKey:'role'})
export class User {
    @Prop({required:true , type:String , enum:[Admin.name , Customer.name , Provider.name]})
    role:string
    @Prop({required:true})
    fullName:string 
    @Prop({required:true , unique:true })
    email:string 
    @Prop({required:true , unique:true})
    userName:string 

    @Prop({required:true})
    phone:number 
    @Prop({required:true})
    password:string

    @Prop([{type:SchemaTypes.ObjectId, ref:'events'}])
    events:Types.ObjectId[]

    @Prop([{type:SchemaTypes.ObjectId, ref:'comments'}])
    comments:Types.ObjectId[]

    @Prop()
    refreshToken:string



}

export const userSchema=SchemaFactory.createForClass(User).pre('save', 
async function(){
    this.password=await argon2.hash(this.password)
})
