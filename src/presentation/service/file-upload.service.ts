import path from "path";
import fs from "fs";
import { UploadedFile } from "express-fileupload";
import { Uuid } from "../../config";
import { CustomError } from "../../domain";

export class FileUploadservice {
  constructor(private readonly uuid = Uuid.v4) {}

  private checkFolder(folderPath: string) {
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath); //validamos que exita si no lo vrea
    }
  }

  async uploadSingle(
    file: UploadedFile,
    folder: string = "upload",
    validExtensions: string[] = ["jpg", "png", "jpeg", "gif"]
  ) {
    try {
      const fileExtension = file.mimetype.split("/").at(1) ?? "";
      if (!validExtensions.includes(fileExtension)) {
        throw CustomError.badRequest(`Invalid Extension:${fileExtension}`);
      }
      const destinatiion = path.resolve(__dirname, "../../../", folder); //'_dirname la posicion en la que estamos
      this.checkFolder(destinatiion);
      const fileName = `${this.uuid()}.${fileExtension}`;
      file.mv(`${destinatiion}/${fileName}`);
      return { fileName };
    } catch (error) {
      console.log({ error });
    }
  }

  async uploadMultiple(
    files: UploadedFile[],
    folder: string = "upload",
    validExtensions: string[] = ["jpg", "png", "jpeg", "gir"]
  ) {
    const fileName = await Promise.all(
      files.map((file) => this.uploadSingle(file, folder, validExtensions))
    );
    return fileName;
  }
}
