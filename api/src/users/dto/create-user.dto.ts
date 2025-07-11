import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateUserDto {
  @ApiProperty({
    type:String,
    description:"this is a requiered field"

} )
@IsString()
@IsNotEmpty()
role:string




    @ApiProperty({
        type:String,
        description:"this is a requiered field"

    } )
    @IsString()
    @IsNotEmpty()
  fullName:string

@ApiProperty({
        type:String,
        description:"this is a requiered field"

    } )
    @IsString()
    @IsNotEmpty()
  email:string

@ApiProperty({
        type:String,
        description:"this is a requiered field"

    } )
    @IsString()
    @IsNotEmpty()
  userName:string

@ApiProperty({
        type:Number,
        description:"this is a requiered field"

    } )
    @IsNumber()
    @IsNotEmpty()
  phone:number

@ApiProperty({
        type:String,
        description:"this is a requiered field"

    } )
    @IsString()
    @IsNotEmpty()
  password:string


}
