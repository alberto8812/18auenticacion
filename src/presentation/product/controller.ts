import { Request, Response } from "express";
import { CustomError } from "../../domain";
import { PaginationDto } from "../../domain/dtos/shared/pagination.dto";
import { CreateProductDto } from '../../domain/dtos/product/create-product.dto';

export class ProductController {
  constructor() {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCade).json({ error: error.message });
    }

    return res.status(500).json({ error: "internal server error" });

  };

  createProduct = (req: Request, res: Response) => {
    const [error,createProductDto]=CreateProductDto.create(req.body);
    if(error) return res.status(400).json({error});
    
    res.json('create product')
  };
  getProduct = (req: Request, res: Response) => {
    const { page = 1, limit = 10 } = req.query;
    const [error, paginationDto] = PaginationDto.create(+page, +limit);
    res.json(' get products')
  };
}

