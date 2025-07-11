import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";


export class CreateFactureDto {

    @ApiProperty({
        type:Number,
        description:"this is a requiered field"
      
      } )
      @IsNumber()
      @IsNotEmpty()
      price:number

      @ApiProperty({
        type:String,
        description:"this is a requiered field"
      
      } )
      @IsString()
      @IsNotEmpty()
      event:string
}
