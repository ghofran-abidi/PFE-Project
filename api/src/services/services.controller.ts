import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, UseInterceptors, UploadedFile, UploadedFiles } from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { response } from 'express';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('services')
@ApiTags('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}
  @Get(':category')
  async findServiceByCategory(@Param('category') category:string,@Res() response){
    try {
      const serviceByCategory = await this.servicesService.findServiceByCategory(category);
      return response.status(HttpStatus.OK).json({
        message : "Service found successfully with id category",
        status : HttpStatus.OK,
        data : serviceByCategory
      })
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message : error.message,
        status: HttpStatus.BAD_REQUEST,
        data : null
      })
    }
  }

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema:{
      type:'object',
      properties:{
        title:{type:'string'},
        description:{type:'string'},
        price:{type:'number'},
        adress:{type:'string'},
        phone:{type:'number'},
        email:{type:'string'},
        insragram:{type:'string'},
        page:{type:'string'},
        site:{type:'string'},
        category:{type:'string'},
       
        files:{type:'array' , items:{type:'string', format:'binary'}},
      }

    }
  })
  //Configuration multer
  @UseInterceptors(FilesInterceptor("files",4,{
    storage:diskStorage({
      destination:"./upload/service",
      filename:(_request, file , callback)=>
      callback(null , `${new Date().getTime()}-${file.originalname}`)
    })
  }))


  async createService(@Body() createServiceDto: CreateServiceDto , @Res() response, @UploadedFiles() files
  ) {
    try {
      //createServiceDto.file=file.filename
      createServiceDto.files=files.map(item=>item.filename)
      const newService = await this.servicesService.createService(createServiceDto);
      response.status(HttpStatus.CREATED).json({
        message :"Service created successfully",
        status: HttpStatus.CREATED,
        data : newService
      })

      
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message : error.message,
        status : HttpStatus.BAD_REQUEST,
        data : null
      })

       }
  }

  @Get()
 async findAllServices(@Res() response) {
  try {
    const ServicesData = await this.servicesService.findAllServices();
      return response.status(HttpStatus.OK).json({
        message : "Services found successfully",
        status : HttpStatus.OK,
        data : ServicesData
      })
    
  } catch (error) {
    return response.status(HttpStatus.NOT_FOUND).json({
      message : error.message,
      status : HttpStatus.NOT_FOUND,
      data : null
    })
    
  }
    
  }

  

  @Get('ById/:id')
  async findOneService(@Param('id') ServiceId: string, @Res() response) {
  try {
    const ExistingService = await this.servicesService.findOneService(ServiceId);
      return response.status(HttpStatus.OK).json({
        message : "Service found successfully",
        status : HttpStatus.OK,
        data : ExistingService
      })
    
  } catch (error) {
    return response.status(HttpStatus.BAD_REQUEST).json({
      message : error.message,
      status: HttpStatus.BAD_REQUEST,
      data : null
    })
    
  }
  }

  @Patch(':id')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema:{
      type:'object',
      properties:{
        title:{type:'string'},
        description:{type:'string'},
        price:{type:'number'},
        adress:{type:'string'},
        phone:{type:'number'},
        email:{type:'string'},
        insragram:{type:'string'},
        page:{type:'string'},
        site:{type:'string'},
        category:{type:'string'},
       
        files:{type:'array' , items:{type:'string', format:'binary'}},
      }

    }
  })
  //Configuration multer
  @UseInterceptors(FilesInterceptor("files",4,{
    storage:diskStorage({
      destination:"./upload/service",
      filename:(_request, file , callback)=>
      callback(null , `${new Date().getTime()}-${file.originalname}`)
    })
  }))
  async updateService(@Param('id') ServiceId: string, @Body() updateServiceDto: UpdateServiceDto, @Res() response,
  @UploadedFiles() files
  ) {
    try {
      //updateServiceDto.file=file?.filename
      if(files.length!=0){
        updateServiceDto.files=files.map((item)=>item.filename)
      }
      const updateService = await this.servicesService.updateService(ServiceId, updateServiceDto)
     return response.status(HttpStatus.OK).json({
       message:"Service updated Successfully !" ,
       status:HttpStatus.OK,
       data:updateService
 
     })
      
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message:error.message,
        status:HttpStatus.BAD_REQUEST,
        data:null
  
      })
      
    }
    
  }

  @Delete(':id')
  async removeService(@Param('id') ServiceId: string , @Res() response) {
    try {
      const removeService=await this.servicesService.removeService(ServiceId)
       return response.status(HttpStatus.OK).json({
         message:"Service deleted Successfully!" ,
         status:HttpStatus.OK,
         data: removeService
         
       })

      
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message:error.message,
        status:HttpStatus.BAD_REQUEST,
        data:null
  
      })

      
    }
    
  }
}
