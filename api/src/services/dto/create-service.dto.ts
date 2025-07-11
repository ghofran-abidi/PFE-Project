import { ApiProperty } from "@nestjs/swagger"
import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateServiceDto {
    @ApiProperty({
        type:String,
        description:"this is a requiered field"

    } )
    @IsString()
    @IsNotEmpty()
  title:string

@ApiProperty({
        type:String,
        description:"this is a requiered field"

    } )
    @IsString()
    @IsNotEmpty()
  description:string

@ApiProperty({
        type:String,
        description:"this is a requiered field"

    } )
    @IsString()
    @IsNotEmpty()
  price:string

@ApiProperty({
        type:String,
        description:"this is a requiered field"

    } )
    @IsString()
    @IsNotEmpty()
  adress:string

@ApiProperty({
        type:[String],
        description:"this is a requiered field"

    } )
    @IsArray()
    @IsNotEmpty()
  files:string[]

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
email:string

@ApiProperty({
    type:String,
    description:"this is a requiered field"

} )
@IsString()
@IsNotEmpty()
page:string

@ApiProperty({
  type:String,
  description:"this is a requiered field"

} )
@IsString()
@IsNotEmpty()
site:string

@ApiProperty({
  type:String,
  description:"this is a requiered field"

} )
@IsString()
@IsNotEmpty()
instagram:string


@ApiProperty({
  type:String,
  description:"this is a requiered field"

} )
@IsString()
@IsNotEmpty()
category:string



}
