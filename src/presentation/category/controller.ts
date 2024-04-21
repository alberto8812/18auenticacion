import { Request, Response } from "express";
import { CreateCategoryDto, CustomError } from "../../domain";
export class CategoryController {
  constructor() {}


  private handleError=(error:unknown,res:Response)=>{
    if(error instanceof CustomError){
      return res.status(error.statusCade).json({error:error.message})
    }
  }
  createCategory = async (req: Request, res: Response) => {
    
    const [error,createCategoryDto]= CreateCategoryDto.create({...req.body})
    if(!error) res.status(400).json({error})
    res.json('Create category')
  };
  getCategory = async (req: Request, res: Response) => {
    res.json('get category')
  };
}
