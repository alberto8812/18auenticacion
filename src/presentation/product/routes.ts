import { Router } from "express";
import { ProductController } from "./controller";
import { AuthMiddleware } from "../middleware/auth.middleware";


export class ProductRoutes {


    static get routes():Router{
        const router = Router();

        const productController=new ProductController();
        router.post('/',[AuthMiddleware.validateJwt], productController.createProduct);
        router.get('/', productController.getProduct);
        
        return router;
    }
} 