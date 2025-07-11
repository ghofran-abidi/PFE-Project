import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { response } from 'express';
import { ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
   

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto , @Res() response) {
   try {
    const newUser=await this.usersService.createUser(createUserDto)
    return response.status(HttpStatus.CREATED).json({
      message:"User created succefully !",
      status:HttpStatus.CREATED,
      data:newUser
    })
    
   } catch (error) {
    return response.status(HttpStatus.BAD_REQUEST).json({
      message:error.message,
      status:HttpStatus.BAD_REQUEST,
      data:null
    })
    
   }
  }
  @Get('userName')
  async findUserByUserName(@Query('userName') userName:string,@Res() response){
    try {
      const userByUserName=await this.usersService.findUserByUserName(userName)
      return response.status(HttpStatus.OK).json({
        message:"User found by userName ",
        status:HttpStatus.OK,
        data:userByUserName
      })
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message:error.message,
        status:HttpStatus.BAD_REQUEST,
        data:null
      })
    }
  }
  @Get('role')
  async findUserByRole(@Query('role') role:string,@Res() response){
    try {
      const userByRole=await this.usersService.findUserByRole(role)
      return response.status(HttpStatus.OK).json({
        message:"User found by role ",
        status:HttpStatus.OK,
        data:userByRole
      })
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message:error.message,
        status:HttpStatus.BAD_REQUEST,
        data:null
      })
    }
  }

  @Get()
  async findAll(@Res() response) {
    try {
 // status code 200 ==OK
     const usersData=await this.usersService.findAllUsers()
     return response.status(HttpStatus.OK).json({
       message:"Users Data found successfully !",
       status:HttpStatus.OK,
       data:usersData
     })
     
    } catch (error) {
     return response.status(HttpStatus.BAD_REQUEST).json({
       message:error.message,
       status:HttpStatus.BAD_REQUEST,
       data:null
     })
     
    }
   }

  @Get(':id')
  async   findOneUser(@Param('id') userId: string , @Res() response) {
    try {
     const oneUser=await this.usersService.findOneUser(userId)
     return response.status(HttpStatus.OK).json({
       message:"User  found successfully with id !",
       status:HttpStatus.OK,
       data:oneUser
     })
     
    } catch (error) {
     return response.status(HttpStatus.BAD_REQUEST).json({
       message:error.message,
       status:HttpStatus.BAD_REQUEST,
       data:null
     })
     
    }
   }

  @Patch(':id')
 async updateUser(@Param('id') userId: string, @Body() updateUserDto: UpdateUserDto , @Res() response) {
  try {
    const updatedUser=await this.usersService.updateUser(userId , updateUserDto)
    return response.status(HttpStatus.OK).json({
      message:"User updated Successfully !" ,
      status:HttpStatus.OK,
      data:updatedUser

    })
    
  } catch (error) {
    return response.status(HttpStatus.BAD_REQUEST).json({
      message:error.message,
      status:HttpStatus.BAD_REQUEST,
      data:null

    })
    
  }
   
  }

  @Delete(':id')
 async removeUser(@Param('id') userId: string, @Res() response) {
    try {
      const removeUser=await this.usersService.removeUser(userId)
      return response.status(HttpStatus.OK).json({
        message:"User deleted Successfully!" ,
        status:HttpStatus.OK,
        data:removeUser
        
      }

      )
      
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message:error.message,
        status:HttpStatus.BAD_REQUEST,
        data:null
  
      })
      
    }
  }
}
