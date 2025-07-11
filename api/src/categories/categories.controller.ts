import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, Response } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { response } from 'express';
import { ApiTags } from '@nestjs/swagger';

@Controller('categories')
@ApiTags('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  async createCategory( @Body() createCategoryDto: CreateCategoryDto ,@Res() response ) {
    try {
      const newCategory = await this.categoriesService.createCategory(createCategoryDto);
      response.status(HttpStatus.CREATED).json({
        message :"Category created successfully",
        status: HttpStatus.CREATED,
        data : newCategory
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
  async findAllCategories(@Res() response) {
    try {
      const CategoriesData = await this.categoriesService.findAllCategories();
      return response.status(HttpStatus.OK).json({
        message : "Categories found successfully",
        status : HttpStatus.OK,
        data : CategoriesData
      })
      
    } catch (error) {
      return response.status(HttpStatus.NOT_FOUND).json({
        message : error.message,
        status : HttpStatus.NOT_FOUND,
        data : null
      })

      
    }
    
  }

  @Get(':id')
  async findOneCategory(@Param('id') categoryId: string , @Res() response) {

    try {
      const existingCategory = await this.categoriesService.findOneCategory(categoryId);
      return response.status(HttpStatus.OK).json({
        message : "Category found successfully",
        status : HttpStatus.OK,
        data : existingCategory
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
  async updateCategory(@Param('id') categoryId: string, @Body() updateCategoryDto: UpdateCategoryDto , @Res() response) {
   try {
     const updateCategory = await this.categoriesService.updateCategory(categoryId, updateCategoryDto)
     return response.status(HttpStatus.OK).json({
       message:"Category updated Successfully !" ,
       status:HttpStatus.OK,
       data:updateCategory
 
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
  async removeCategory(@Param('id') categoryId: string, @Res() response) {
     try {
       const removeCategory=await this.categoriesService.removeCategory(categoryId)
       return response.status(HttpStatus.OK).json({
         message:"Category deleted Successfully!" ,
         status:HttpStatus.OK,
         data: removeCategory
         
       }
 
       )
       
     } catch (error) {
       return response.status(HttpStatus.BAD_REQUEST).json({
         message:error.message,
         status:HttpStatus.BAD_REQUEST,
         data:null
   
       })
       
     }
   }
 }
 