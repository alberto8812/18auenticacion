// se encargara de manejar todso los estados

import { bcryptAdapter } from "../../config";
import { ueserModel } from "../../data";
import {
  CustomError,
  RegisterUserDto,
  UserEntity,
  LoginUserDto,
} from "../../domain";

export class AuthService {
  constructor() {}

  private async userExist(email: string) {
    const existUser = await ueserModel.findOne({ email });
    if (!existUser) throw CustomError.badRequest("Email not exist");
    return UserEntity.fromObject(existUser!);
  }
  public async registerUser(registerUser: RegisterUserDto) {
    await this.userExist(registerUser.email);
    const existUser = await ueserModel.findOne({ email: registerUser.email });
    if (existUser) throw CustomError.badRequest("Email already exist");
    try {
      const user = new ueserModel(registerUser); //
      //encriptar la contrasena
      user.password = bcryptAdapter.hash(registerUser.password);
      await user.save();
      // jwt<-- para mantener la autencacion del usuario

      // Email confirmacion

      const { password, ...userEntity } = UserEntity.fromObject(user);
      return { ...userEntity };
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
    return {
      user: { ...rest },
    };
  }
}
