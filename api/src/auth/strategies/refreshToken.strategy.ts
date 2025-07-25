import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";




@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh'){
    constructor(){
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey:process.env.JWT_REFRESH_TOKEN_SECRET,
            passReqToCallback:true
        })
    }
    validate(req:Request, payLoad:any){
        const refreshToken=req.get("Authorization").replace('Bearer','').trim()
        return{...payLoad,refreshToken}
    }
}