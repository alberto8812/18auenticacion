import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../../config";
import { ueserModel } from "../../data";
import { UserEntity } from '../../domain/entities/uese.entity';

export class AuthMiddleware {

    static async validateJwt(req:Request,res:Response,next:NextFunction){

        const authorization= req.header('Authorization');

        if(!authorization) return res.status(401).json({error:'No token provide'});

        if(!authorization.startsWith('Bearer ')) return res.status(401).json({error:'Invaled Beard token'});

        const token= authorization.split(' ').at(1) || '';
        try {
            const payload= await JwtAdapter.ValidationToken<{id:string}>(token);
            if(!payload) return res.status(401).json({error:'Invalid token'});
            const user=await ueserModel.findById(payload.id);
            if(!user)return res.status(500).json({error:'Invaled token - user'});

            req.body.user=UserEntity.fromObject(user);
            next();//procede con el siguiente middleware on controlador

        } catch (error) {
            console.log(error);//usar wiston
            res.status(500).json({error:'internal servel error'})
        }


    }
}