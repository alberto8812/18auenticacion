import { envs } from "../../config";
import { CategoryModel } from "../mongo/model/category.model";
import { productModel } from '../mongo/model/product.model';
import { ueserModel } from "../mongo/model/ueser.model";
import { MongoDatabese } from "../mongo/mongo-database";
import { seedData } from "./data";

(async () => {
  MongoDatabese.connect({
    dbName: envs.MONGO_DB_NAME,
    mongoUrl: envs.MONGO_URL,
  });
  await main();
  await MongoDatabese.disconnect();
})();



const randomBetwenn0Andx=(x:number)=>{
  return Math.floor(Math.random()*x);
}

async function main() {
  //0. borrar todo

  await Promise.all([
    ueserModel.deleteMany(),
    CategoryModel.deleteMany(),
    productModel.deleteMany(),
  ])
  //1. crear usuarios
  const users=await ueserModel.insertMany(seedData.users)

  //2.crear categorias
  const Categories= await CategoryModel.insertMany(
    seedData.categories.map(category=>(
      {...category,user:users[0]._id}
    ))
  )
  
  //3.crear productos
  const products= await productModel.insertMany(
    seedData.products.map(product=>(
     {...product,
      user:users[randomBetwenn0Andx(seedData.users.length-1)]._id,
      category:Categories[randomBetwenn0Andx(seedData.categories.length-1)]._id
     }
    ))
  )
}
