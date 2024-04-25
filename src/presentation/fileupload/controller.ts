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
    const type = req.params.type;
    const file = req.body.files.at(0) as UploadedFile;

    this.fileUploadservice
      .uploadSingle(file, `upload/${type}`)
      .then((upload) => res.json(upload))
      .catch((error) => this.handleError(error, res));
  };
  uploadMultipleFile = (req: Request, res: Response) => {
    const type = req.params.type;

    const files = req.body.file as UploadedFile[];
    this.fileUploadservice
      .uploadMultiple(files, `upload/${type}`)
      .then((upload) => res.json(upload))
      .catch((error) => this.handleError(error, res));
  };
}
