import { compareSync, genSaltSync, hashSync } from "bcryptjs";

//con metodos
// export const bcryptAdapter =  {
//     hash:(password:string)=>{
//         const salt=genSaltSync();
//         return hashSync(password,salt)
//     },
//     compare:(password:string,hashed:string)=>{
//         return compareSync(password,hashed)
//     }
// }



export class bcryptAdapter   {
   static hash(password: string): string {
    const salt = genSaltSync();
    return hashSync(password, salt);
  }
  static compare(password: string, hashed: string): boolean {
    return compareSync(password, hashed);
  }
}
