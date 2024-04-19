import { Request, Response } from "express";
import { CustomError, LoginUserDto, RegisterUserDto } from "../../domain";
import { AuthService } from "../service/auth.service";

//clase que permite hacer inyeccion de dependencias
export class AuthController {
  constructor(
    public readonly authService:AuthService,
  ) {}

  private handleError=(error:unknown,res:Response)=>{
    if(error instanceof CustomError){
      return res.status(error.statusCade).json({error:error.message})
    }
  }

  register = (req: Request, res: Response) => {
    const [error, registerUserDto] = RegisterUserDto.create(req.body);
    if (error) return res.status(400).json({error});
    this.authService.registerUser(registerUserDto!)
    .then(user=>res.json(user))
    .catch(error=>this.handleError(error,res))
  };
  loginUser = (req: Request, res: Response) => {
   const [error,loginUserDto]=LoginUserDto.Login(req.body);
   if(error)  return res.status(400).json({error});
   this.authService.LoginUser(loginUserDto!)
    .then(user=>res.json(user))
    .catch(error=>this.handleError(error,res))
  };
  validateEmail = (req: Request, res: Response) => {
    res.json("register validateEmail");
  };
}
