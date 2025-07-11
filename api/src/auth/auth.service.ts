import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { CreateLoginDto } from './dto/create-login.dto';
import * as argon2 from 'argon2';
import { ConfigService } from '@nestjs/config';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { MailerService } from '@nestjs-modules/mailer';
@Injectable()
export class AuthService {
    constructor(
        private usersService:UsersService,
        private jwtService:JwtService,
        private configService:ConfigService,
        private mailerservice:MailerService

    ){}
    async signIn(createLoginDto:CreateLoginDto){
        //test user exist dand db
        const user=await this.usersService.findUserByUserName(createLoginDto.userName)
        if(!user) throw new BadRequestException ('user does not exist')

        //test password correct
        const passwordMatches= await argon2.verify(user.password,createLoginDto.password)
        if(!passwordMatches)
        throw new BadRequestException ("Password is incorrect")
        //generate json web Token
        const tokens=await this.generateToken(user._id,user.userName)
        await this.updateRefreshToken(user._id, tokens.refreshToken)
        return{tokens,user}
        
        
    }

    //generate json web Token
    async generateToken(userId:string, userName:string){
        const[accessToken, refreshToken]=await Promise.all([
            this.jwtService.signAsync(
                {
                    sub:userId,
                    userName
                },
                {
                    secret:this.configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
                    expiresIn:'20m'
                }
            ),
            this.jwtService.signAsync(
                {
                    sub:userId,
                    userName
                },
                {
                    secret:this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
                    expiresIn:'2d'
                }
            )
        ])
        return {accessToken, refreshToken}
    }

    async updateRefreshToken(userId:string ,refreshToken:string){
        const hashedRefresh=await argon2.hash(refreshToken)
        await this.usersService.updateUser(userId,{refreshToken:hashedRefresh})
    }

    async logout(userId:string){
        this.usersService.updateUser(userId,{refreshToken:null})
    }

    async refreshTokens(userId:string, refreshToken:string){
        const user=await this.usersService.findOneUser(userId)
        if(!user || !user.refreshToken) throw new ForbiddenException('access denied')

        const refreshTokenMatches=await argon2.verify(user.refreshToken, refreshToken)

        if(!refreshTokenMatches)throw new ForbiddenException('access denied')
        const tokens=await this.generateToken(user._id, user.userName)
    await this.updateRefreshToken(user._id , tokens.refreshToken)
    return {tokens , user}
    }

    //update password
    async updatePassword(userId:string , updateUserDto :UpdateUserDto){
        const user=await this.usersService.findOneUser(userId)
        if(!user) throw new NotFoundException('User does not found')
        const hashedPassword=await argon2.hash(updateUserDto.password)
    const updatePass=await this.usersService.updateUser(userId , {
       ...updateUserDto, password:hashedPassword 
    })
    console.log(updatePass , "update passs");
    const tokens=await this.generateToken(user._id , user.userName)
    await this.updateRefreshToken(user._id , tokens.refreshToken)
    return {tokens , user}
    }
    async updateProfile(userId:string , updateUserDto:UpdateUserDto){
        const user= await this.usersService.updateUser(userId , updateUserDto)
        const tokens=await this.generateToken(user._id , user.userName)
        await this.updateRefreshToken(userId , tokens.refreshToken)
        return{tokens, user}
    }
    async resetPassword(user:any , tokenPassword:string){
        const newPassword=tokenPassword
        await this.usersService.findUserByEmail(user.email)
        await this.mailerservice.sendMail({
            to:user.email,
            template:'./resetPassword',
            context:{
                subject:"Reset Password",
                name:user.fullName,
                email:user.email,
                newPassword
            }
        })
        const hashedPassword=await argon2.hash(newPassword)
        await this.usersService.findOneUserAndResetPassword(
            {email:user.email},
            {password:hashedPassword}

        )
    }
}
