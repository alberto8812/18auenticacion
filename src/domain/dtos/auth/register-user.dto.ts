import { regularExps } from "../../../config";

export class RegisterUserDto {
  private constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly password: string
  ) {}
  static create(object: { [key: string]: any }): [string?, RegisterUserDto?] {
    const { name, email, password } = object;
    if(!name){
        return ['Missing name'];
    }
    if(!email){
        return ['Missing email'];
    }
    if(!password){
        return ['Missing email'];
    }
    if(!regularExps.email.test(email)){
        return ['email is no valid '];
    }
    return [undefined,new RegisterUserDto(name,email,password)]
  }
}
