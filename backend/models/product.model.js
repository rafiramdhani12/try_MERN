import mongoose from "mongoose";
const productSechema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // createdAt,updatedAt
  }
);

const Product = mongoose.model("Product", productSechema);

export default Product;
