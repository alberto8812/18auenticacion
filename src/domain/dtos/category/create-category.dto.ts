export class CreateCategoryDto {
  private constructor(
    public readonly name: string,
    public readonly aviable: boolean
  ) {}

  static create(object: { [key: string]: any }): [string?, CreateCategoryDto?] {
    const { name, available = false } = object;
    let avialableBoolean=available

    if (!name) return ["Missing name"];
    if(typeof available !=='boolean'){
        avialableBoolean=(available==='true')
    }

    return [undefined,new CreateCategoryDto(name,avialableBoolean)]
  }
}
