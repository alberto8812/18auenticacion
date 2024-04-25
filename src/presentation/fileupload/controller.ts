import { CustomError } from "../../domain";
import { Request, Response } from "express";


export class FileUploadController {
    constructor(){}

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
          return res.status(error.statusCade).json({ error: error.message });
        }
      };

    uploadFile=(req: Request, res: Response)=>{
        res.json('uploadFile')
    }
    uploadMultipleFile=(req: Request, res: Response)=>{
        res.json('uploadFile')
    }
}
