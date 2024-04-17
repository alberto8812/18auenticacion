// se encargara de manejar todso los estados

import { ueserModel } from "../../data";
import { CustomError, RegisterUserDto, UserEntity } from "../../domain";

export class AuthService {
  constructor() {}

  public async registerUser(registerUser: RegisterUserDto) {
    const existUser = await ueserModel.findOne({ email: registerUser.email });
    if (existUser) throw CustomError.badRequest("Email already exist");
    try {
        const user= new ueserModel(registerUser);//
        await user.save();
        //encriptar la contrasena

        // jwt<-- para mantener la autencacion del usuario
        
        // Email confirmacion

        const {password,...userEntity}=UserEntity.fromObject(user);
        return {...userEntity}
    } catch (error) {
        console.log(error)
        throw CustomError.internalServer(`${error}`)
    }
  }
}
