import { Router } from "express";
import { CategoryController } from "./controller";
import { AuthMiddleware } from "../middleware/auth.middleware";



export class CategoryRoutes {
    static get routes():Router{
        const router = Router();
        const categoryController=new CategoryController()

        router.post('/',[AuthMiddleware.validateJwt], categoryController.createCategory);
        router.get('/',categoryController.getCategory);
        return router;
    }
}