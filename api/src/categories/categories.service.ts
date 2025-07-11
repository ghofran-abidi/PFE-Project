import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ICategory } from './interfaces/category.interface';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel('categories')
    private categoryModel: Model<ICategory>,
  ) {}



  async createCategory(createCategoryDto: CreateCategoryDto): Promise<ICategory> {
    const newCategory = new this.categoryModel(createCategoryDto);
    return await newCategory.save();
  }

  async findAllCategories(): Promise<ICategory[]> {
    const CategoriesData = await this.categoryModel.find().exec();
    if (!CategoriesData || CategoriesData.length === 0) {
      throw new NotFoundException ('No Categories found');
    }
    return CategoriesData;
  }

  
  async findOneCategory(CategoryId: string): Promise<ICategory> {
    const ExistingCategory = await this.categoryModel.findById(CategoryId).exec();
    if(!ExistingCategory){
      throw new NotFoundException ('Category not found');
    }
    return ExistingCategory;
    
  }

  async updateCategory(CategoryId: string, updateCategoryDto: UpdateCategoryDto):Promise<ICategory> {
    const updateCategory=await this.categoryModel.findByIdAndUpdate(CategoryId , updateCategoryDto, {new:true})
    if(!updateCategory) throw new NotFoundException("Category does not found")
    return updateCategory
  }

  async removeCategory(CategoryId: string) {
    const deletedCategory=await this.categoryModel.findByIdAndDelete(CategoryId)
    if(!deletedCategory) throw new NotFoundException( "Category does not found")
    return deletedCategory
   }
 }
