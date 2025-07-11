import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateTypeDto {


    @ApiProperty({
        type:String,
        description:"this is a requiered field"
      
      } )
      @IsString()
      @IsNotEmpty()
      name:string
}
