import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Models, now } from 'mongoose';
import { IUser } from './interfaces/user.interface';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('users')
    private userModel:Model<IUser>
  ){}
 async createUser(createUserDto: CreateUserDto):Promise<IUser> {
  const newUser=new this.userModel(createUserDto)
    return await newUser.save()
  }

  async findAllUsers(): Promise<IUser[]> {
    const usersData=await this.userModel.find().exec()
    if(!usersData || usersData.length ===0) {
      throw new NotFoundException("Users Data does not found")
    }
    return usersData
  }
  


  async findOneUser(userId: string):Promise<IUser> {
    const oneUser=await this.userModel.findById(userId).exec()
    if(!oneUser){
      throw new NotFoundException("User does not found with this id")
    }
    return oneUser
      }

  async updateUser(userId: string, updateUserDto: UpdateUserDto):Promise<IUser> {
    const updateUser=await this.userModel.findByIdAndUpdate(userId , updateUserDto , {new:true})
    if(!updateUser) throw new NotFoundException("User does not found")
    return updateUser
  }

 async removeUser(userId: string) {
   const deletedUser=await this.userModel.findByIdAndDelete(userId)
   if(!deletedUser) throw new NotFoundException( "User does not found")
   return deletedUser
  }
  async findUserByRole(role:string):Promise<IUser[]>{
    const userByRole=await this.userModel.find({role}).exec()
    return userByRole
  }
  async findUserByUserName(userName:string):Promise<IUser>{
     const userByUserName=await this.userModel.findOne({userName:userName}).exec()
    return userByUserName
  }
  async findUserByEmail(email:string):Promise<IUser>{
    const userByemail=await this.userModel.findOne({email:email}).exec()
   return userByemail
 }
 async findOneUserAndResetPassword(email:any, password:any):Promise<IUser>{
  return this.userModel.findOneAndUpdate(email, password)
 }

}
