import { productModel } from "../../data";
import { CustomError, PaginationDto } from "../../domain";
import { CreateProductDto } from "../../domain/dtos/product/create-product.dto";

export class ProductService {
  constructor() {}

  async createProduct(createProduct: CreateProductDto) {
    const ProductExists = await productModel.findOne({
      name: createProduct.name,
    });
    if (ProductExists) throw CustomError.badRequest("Category already exists");
    try {
      const product = new productModel({
        ...createProduct,
      });

      await product.save();

      return product;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  async getProduct(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    try {
      const [total, Products] = await Promise.all([
        productModel.countDocuments(),
        productModel
          .find()
          .skip((page - 1) * limit)
          .limit(limit),
      ]);
      // const total=await CategoryModel.countDocuments();
      // const categories= await CategoryModel.find()
      // .skip((page-1)*limit)
      // .limit(limit)
      return {
        page: page,
        limit: limit,
        total,
        next: `/api/categories?page=${page + 1}&limit=${limit}`,
        prev:
          page - 1 > 0
            ? `/api/categories?page=${page - 1}&limit=${limit}`
            : null,
        Products,
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
}
