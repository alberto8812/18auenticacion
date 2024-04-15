import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "name is requiered"],
  },

  email: {
    type: String,
    require: [true, "email is requiered"],
    unique: true,
  },
  emailValidate: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    require: [true, "password is requiered"],
  },
  img: {
    type: String,
  },
  role: {
    type: [String],
    default: ["USER_ROLE"],
    enum: ["ADMIND_ROLE", "USER_ROLE"],
  },
});


export const ueserModer= mongoose.model('User',userSchema);