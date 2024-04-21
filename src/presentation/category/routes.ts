import { Router } from "express";
import { CategoryController } from "./controller";
import { AuthMiddleware } from "../middleware/auth.middleware";
import { CategoryService } from "../service/category.Service";



export class CategoryRoutes {
    static get routes():Router{
        const router = Router();
        const categoryService=new CategoryService()
        const categoryController=new CategoryController(categoryService)

        router.post('/',[AuthMiddleware.validateJwt], categoryController.createCategory);
        router.get('/',categoryController.getCategory);
        return router;
    }
}