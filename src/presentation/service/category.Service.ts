import { CategoryModel } from "../../data";
import { CreateCategoryDto, CustomError, UserEntity } from "../../domain";



export class CategoryService{
     constructor(){

     }

     async createCategory(createCategory:CreateCategoryDto,user:UserEntity){
        const CategoryExists= await CategoryModel.findOne({name:createCategory.name});
        if(CategoryExists) throw CustomError.badRequest('Category already exists');
         try {
            const category= new CategoryModel({
                ...createCategory,
                user:user.id
            });

            await category.save();

            return {
                id:category.id,
                name:category.name,
                available:category.available,
            }
         } catch (error) {
            throw CustomError.internalServer(`${error}`);
         }
     }

      async getCategory(){
        try {
            const categories= await CategoryModel.find()
            return categories
        } catch (error) {

            throw CustomError.internalServer(`${error}`)
        }
     }
}