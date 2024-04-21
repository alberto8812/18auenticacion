import mongoose, { Schema } from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "name is requiered"],
    unique:true
  },
  available: {
    type: Boolean,
    default: false,
  },

  user:{
    type:Schema.Types.ObjectId,// obliga cuando insertemos que tiene que ser un id de mong
    ref:'User',
    required:true
  }

});


export const CategoryModel= mongoose.model('Category',categorySchema);