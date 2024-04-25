import { Router } from "express";
import { ProductController } from "./controller";
import { AuthMiddleware } from "../middleware/auth.middleware";
import { ProductService } from "../service/product.service";


export class ProductRoutes {


    static get routes():Router{
        const router = Router();
        const productService= new ProductService()
        const productController=new ProductController(productService);
        router.post('/',[AuthMiddleware.validateJwt], productController.createProduct);
        router.get('/', productController.getProduct);
        
        return router;
    }
} 