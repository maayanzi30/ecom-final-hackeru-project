import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    src: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    mainCategory: {
      type: String,
      required: true,
    },
    sub_category: {
      type: String,
      required: true,
    },

    fullPrice: {
      type: Number,
      required: false,
      default: 59.99,
    },
    salePrice: {
      type: Number,
      required: true,
      default: 0,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);
const Product = mongoose.model("Product", productSchema);
export default Product;
