import { Request, Response } from "express";

//clase que permite hacer inyeccion de dependencias
export class AuthController {
    constructor(){

    }


    regisger=(req:Request,res:Response)=>{
        res.json('register user')
    }
    loginUser=(req:Request,res:Response)=>{
        res.json('register loginUser')
    }
    validateEmail=(req:Request,res:Response)=>{
        res.json('register validateEmail')
    }
}