import { Router } from "express";
import { FileUploadController } from "./controller";
import { FileUploadservice } from "../service/file-upload.service";



export class FileUploadRoutes {

    static get routes():Router{
        const router=Router();
        const fileUploadservice=new FileUploadservice()
        const fileUploadController=new FileUploadController(fileUploadservice)

        router.post('/single/:type',fileUploadController.uploadFile)
        router.post('/multiple/:type',fileUploadController.uploadMultipleFile)

        return router;
    }
}