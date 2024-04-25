import { Router } from "express";
import { FileUploadController } from "./controller";



export class FileUploadRoutes {

    static get routes():Router{
        const router=Router();
        const fileUploadController=new FileUploadController()

        router.get('/single/:type',fileUploadController.uploadFile)
        router.get('/multiple/:type',fileUploadController.uploadMultipleFile)

        return router;
    }
}