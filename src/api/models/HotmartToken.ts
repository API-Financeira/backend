import mongoose from "mongoose";

const HotmartTokenModel = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  key: {
    type: String,
    required: true,
  },
});

export default mongoose.model(
  "HotmartToken",
  HotmartTokenModel,
  "hotmart_token",
);
