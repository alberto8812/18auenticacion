import { Request, Response } from "express";
import { CustomError } from "../../domain";
import { PaginationDto } from "../../domain/dtos/shared/pagination.dto";
import { CreateProductDto } from '../../domain/dtos/product/create-product.dto';
import { ProductService } from '../service/product.service';

export class ProductController {
  constructor(
    private readonly productService:ProductService
  ) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCade).json({ error: error.message });
    }

    return res.status(500).json({ error: "internal server error" });

  };

  createProduct = (req: Request, res: Response) => {
    console.log(req.body)
    const [error,createProductDto]=CreateProductDto.create({...req.body,user:req.body.user.id,});
    if(error) return res.status(400).json({error});


    this.productService.createProduct(createProductDto!)
    .then(product=>res.status(201).json(product))
    .catch(error=>this.handleError(error,res))
    
  };
  getProduct = (req: Request, res: Response) => {
    const { page = 1, limit = 10 } = req.query;
    const [error, paginationDto] = PaginationDto.create(+page, +limit);
    this.productService.getProduct(paginationDto!)
    .then(products=>res.status(201).json(products))
    .catch(error=>this.handleError(error,res))
  };
}

