import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateLoginDto{
    
    @ApiProperty({
        type:String,
        description:"this is a requiered field"

    } )
    @IsString()
    @IsNotEmpty()
  userName:string
    
    
    
    @ApiProperty({
        type:String,
        description:"this is a requiered field"

    } )
    @IsString()
    @IsNotEmpty()
  password:string
}