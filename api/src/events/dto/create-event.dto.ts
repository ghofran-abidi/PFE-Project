import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateEventDto {
    @ApiProperty({
        type : String,
        description : "this is required field",

    })
    @IsString()
    @IsNotEmpty()
    title : string


    @ApiProperty({
        type : Date,
        description : "this is required field",

    })
    @IsDate()
    @IsNotEmpty()
    date : Date

    @ApiProperty({
        type:Number,
        description:"this is a requiered field"
      
      } )
      @IsNumber()
      @IsNotEmpty()
      nbr:number






    @ApiProperty({
        type:String,
        description:"this is a requiered field"
      
      } )
      @IsString()
      @IsNotEmpty()
      customer:string

      @ApiProperty({
        type:String,
        description:"this is a requiered field"
      
      } )
      @IsString()
      @IsNotEmpty()
      type:string
    

}
