import mongoose, { Schema } from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "name is requiered"],
    unique:true
  },

  available: {
    type: Boolean,
    default: false,
  },
  price: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,

  },
  user:{
    type:Schema.Types.ObjectId,// obliga cuando insertemos que tiene que ser un id de mong
    ref:'User',
    required:true
  },
  category:{
    type:Schema.Types.ObjectId,// obliga cuando insertemos que tiene que ser un id de mong
    ref:'Category',
    required:true
  }

});

ProductSchema.set('toJSON',{
  virtuals:true,//no quiero estos datos virtuales
  versionKey:false,//quita el __v
  transform:function(doc, ret, options) {
    delete ret._id
  },
})


export const productModel= mongoose.model('Product',ProductSchema);