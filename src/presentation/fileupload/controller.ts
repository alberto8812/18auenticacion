import { CustomError } from "../../domain";
import { Request, Response } from "express";
import { FileUploadservice } from "../service/file-upload.service";
import { UploadedFile } from "express-fileupload";

export class FileUploadController {
  constructor(private readonly fileUploadservice: FileUploadservice) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCade).json({ error: error.message });
    }
  };

  uploadFile = (req: Request, res: Response) => {
    const type=req.params.type;
    const validTypes= ['users','products','categories'];

    if(!validTypes.includes(type)){
        return res.status(400).json({error:`invalid type:${type},valid ones ${validTypes}`})
    }
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ error: "No files were selected" });
    }
    const file = req.files.file as UploadedFile;

    this.fileUploadservice
      .uploadSingle(file,`upload/${type}`)
      .then((upload) => res.json(upload))
      .catch((error) => this.handleError(error, res));
  };
  uploadMultipleFile = (req: Request, res: Response) => {
    res.json("uploadFile");
  };
}
