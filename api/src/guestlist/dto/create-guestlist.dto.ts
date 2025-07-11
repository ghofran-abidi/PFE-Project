import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"


export class CreateGuestlistDto {
    @ApiProperty({
        type : String,
        description : "this is required field",

    })
    @IsString()
    @IsNotEmpty()
    firstName : string


    @ApiProperty({
        type : String,
        description : "this is required field",

    })
    @IsString()
    @IsNotEmpty()
    lastName : string


    @ApiProperty({
        type : String,
        description : "this is required field",

    })
    @IsString()
    @IsNotEmpty()
    adress: string


    @ApiProperty({
        type : String,
        description : "this is required field",

    })
    @IsString()
    @IsNotEmpty()
    event : string
}
