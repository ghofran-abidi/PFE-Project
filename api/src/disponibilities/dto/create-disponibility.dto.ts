import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsString } from "class-validator";


export class CreateDisponibilityDto {
    @ApiProperty({
        type : Date,
        description : "this is required field",

    })
    @IsDate()
    @IsNotEmpty()
    date : Date

    @ApiProperty({
        type:String,
        description:"this is a requiered field"
      
      } )
      @IsString()
      @IsNotEmpty()
      service:string
}
