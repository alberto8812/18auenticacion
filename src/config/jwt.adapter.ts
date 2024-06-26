import jwt from 'jsonwebtoken'
import { envs } from './envs';

const JWT_SEED=envs.JWR_SEED;


export class JwtAdapter {
  //di?

  static async generateToken(payload: any, duration: string = "2h") {

    return new Promise((resolve)=>{

        jwt.sign(payload,JWT_SEED,{expiresIn:duration},(err,token)=>{
            if(err) return resolve(null);
            return resolve(token)
        })//funciona con callback
    })
  }

  static ValidationToken<T>(token: string):Promise<T | null> {
     return new Promise((resolve)=>{
      jwt.verify(token,JWT_SEED,(err,decoded)=>{
        if(err) return  resolve(null);
        return resolve(decoded as T)
      })
     })
    
  }
}
