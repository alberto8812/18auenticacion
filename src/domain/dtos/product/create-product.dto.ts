import { Validators } from "../../../config";

export class CreateProductDto {
  constructor(
    public readonly name: string,
    public readonly available: boolean,
    public readonly price: number,
    public readonly description: string,
    public readonly user: string,
    public readonly category: string
  ) {}

  static create(object: { [key: string]: any }): [string?, CreateProductDto?] {
    const { name, available, price, description, user, category } = object;
    let avialableBoolean = available;
    if (!name) return ["Missing name"];
    if (typeof available !== "boolean") {
      avialableBoolean = available === "true";
    }
    if (!price) return ["Missing price"];
    if (isNaN(price)) return ["price is not  number"];
    if (!description) return ["Missing description"];
    if (!category) return ["Missing category"];
    if (!user) return ["Missing user"];
    if(!Validators.ismongoID(user)) return ["Invalid user ID"];
    if(!Validators.ismongoID(category)) return ["Invalid category ID"];

    return [
      undefined,
      new CreateProductDto(name, avialableBoolean, price, description, user, category),
    ];
  }
}
