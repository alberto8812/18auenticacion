import mongoose from "mongoose";


export class Validators {
    static ismongoID(id:string){
     return mongoose.isValidObjectId(id)
    }
}