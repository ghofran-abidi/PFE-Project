import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";



export class CreateAppointmentDto {

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
      provider:string
}
