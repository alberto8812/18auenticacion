import { regularExps } from "../../../config";

export class LoginUserDto {
  private constructor(
    public readonly email: string,
    public readonly password: string
  ) {}
  static Login(object: { [key: string]: any }): [string?, LoginUserDto?] {
    const {  email, password } = object;
    if(!email){
        return ['Missing email'];
    }
    if(!password){
        return ['Missing password'];
    }
    if(!regularExps.email.test(email)){
        return ['email is no valid '];
    }
    return [undefined,new LoginUserDto(email,password)]
  }
}
