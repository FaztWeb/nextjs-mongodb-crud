import { Schema, model, models } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    name: String,
    lastname: String,
    email: String,
    password: String,
  },
  {
    timestamps: true,
  }
);

userSchema.methods.encryptPassword = async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
};

userSchema.statics.comparePassword = async function (password, hash) {
  return await bcrypt.compare(password, hash);
};

userSchema.methods.generateToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET);
};

export default models.User || model("User", userSchema);
