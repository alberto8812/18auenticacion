// se encargara de manejar todso los estados

import { JwtAdapter, bcryptAdapter, envs } from "../../config";
import { ueserModel } from "../../data";
import {
  CustomError,
  RegisterUserDto,
  UserEntity,
  LoginUserDto,
} from "../../domain";
import { EmailService } from "./email.service";

export class AuthService {

  constructor(

    private  emailService:EmailService
  ) {}

  

  private async userExist(email: string) {
    const existUser = await ueserModel.findOne({ email });
    if (!existUser) throw CustomError.badRequest("Email not exist");
    return UserEntity.fromObject(existUser!);
  }

  public async registerUser(registerUser: RegisterUserDto) {
    const existUser = await ueserModel.findOne({ email: registerUser.email });
    if (existUser) throw CustomError.badRequest("Email already exist");
    try {
      const user = new ueserModel(registerUser); //
      //encriptar la contrasena
      user.password = bcryptAdapter.hash(registerUser.password);
      await user.save();
      // jwt<-- para mantener la autencacion del usuario
       const token= await JwtAdapter.generateToken({id:user._id})
      // Email confirmacion
      await this.sendEmailValidationLink(user.email!)

      if(!token) throw CustomError.internalServer('Erro to generate  token')
      const { password, ...userEntity } = UserEntity.fromObject(user);
      return { 
       user:{ ...userEntity },
       token
      };
    } catch (error) {
      console.log(error);
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async LoginUser(loginUserDto: LoginUserDto) {
    //si existe
    const existUser = await this.userExist(loginUserDto.email);
    //ismatch bcrp compare
    const isEqualPassword = bcryptAdapter.compare(
      loginUserDto.password,
      existUser.password
    );
    if (!isEqualPassword) throw CustomError.unautorized(`password not mach`);
    //retornar
    const { password, ...rest } = existUser;
    const token=await JwtAdapter.generateToken({id:rest.id});

    if(!token) throw CustomError.internalServer('Erro to generate  token')
    return {
      user: { ...rest },
      token
    };
  }

  private sendEmailValidationLink=async(email:string)=>{
    const token=await JwtAdapter.generateToken({email});

    if(!token) throw CustomError.internalServer('Error getting token');
    const link=`${envs.WEBSERVICE_URL}/auth/validate-email/${token}`;
    const html=`
     <h1>Validate your email</h1>
     <p>Click on the folling link to validate your email</p>
     <a href="${link}">Validate your email:${email}</a>
    `;

    const options={
      
    }
  }
}
