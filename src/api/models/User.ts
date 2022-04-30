import mongoose from "mongoose";
import validator from "validator";

const UserModel = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: [validator.isEmail, "Email invalido."],
  },
  password: {
    type: String,
    required: true,
  },
  passwordResetToken: { type: String, required: false, default: "" },
  subscriberCode: { type: String, required: true },
  subscriptionStatus: { type: String, required: true },
  token: { type: String, default: "" },
  role: { type: String, required: true },
});

export default mongoose.model("User", UserModel);
