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

categorySchema.set('toJSON',{
  virtuals:true,
  versionKey:false,
  transform:function(doc, ret, options) {
    delete ret._id
  },
})


export const CategoryModel= mongoose.model('Category',categorySchema);