import { Router } from "express";
import { FileUploadController } from "./controller";
import { FileUploadservice } from "../service/file-upload.service";
import { FileUpLoadMiddleware } from "../middleware/file-upload.middleware";



export class FileUploadRoutes {

    static get routes():Router{
        const router=Router();
        const fileUploadservice=new FileUploadservice()
        const fileUploadController=new FileUploadController(fileUploadservice)

        router.post('/single/:type',[FileUpLoadMiddleware.containFile],fileUploadController.uploadFile)
        router.post('/multiple/:type',[FileUpLoadMiddleware.containFile],fileUploadController.uploadMultipleFile)

        return router;
    }
}