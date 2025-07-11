import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"


export class CreateCommentDto {

    @ApiProperty({
        type : String,
        description : "this is required field",

    })
    @IsString()
    @IsNotEmpty()
    note : string


    @ApiProperty({
        type : String,
        description : "this is required field",

    })
    @IsString()
    @IsNotEmpty()
    comment : string


    @ApiProperty({
        type:String,
        description:"this is a requiered field"
      
      } )
      @IsString()
      @IsNotEmpty()
      service:string

      @ApiProperty({
        type:String,
        description:"this is a requiered field"
      
      } )
      @IsString()
      @IsNotEmpty()
      customer:string
}
