import { Request, Response } from "express";
import { CreateCategoryDto, CustomError, PaginationDto } from "../../domain";
import { CategoryService } from "../service/category.Service";

export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCade).json({ error: error.message });
    }
  };
  createCategory = (req: Request, res: Response) => {
    const [error, createCategoryDto] = CreateCategoryDto.create({
      ...req.body,
    });
    if (error) return res.status(400).json({ error });
    this.categoryService
      .createCategory(createCategoryDto!, req.body.user)
      .then((category) => res.status(200).json(category))
      .catch((error) => this.handleError(error, res));
  };
  getCategory = async (req: Request, res: Response) => {
    const {page=1,limit=10}=req.query;

    const [error,paginationDto]= PaginationDto.create(+page,+limit);
     if(error) return res.status(400).json({error});

    this.categoryService
      .getCategory(paginationDto!)
      .then((categories) => res.json(categories))
      .catch((error) => this.handleError(error, res));
  };
}
