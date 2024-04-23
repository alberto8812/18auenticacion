export class CreateProductDto {
  constructor(
    private readonly name: string,
    private readonly available: boolean,
    private readonly price: number,
    private readonly description: string,
    private readonly user: string,
    private readonly category: string
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

    return [
      undefined,
      new CreateProductDto(name, avialableBoolean, price, description, user, category),
    ];
  }
}
