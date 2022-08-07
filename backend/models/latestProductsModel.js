import mongoose from "mongoose";
const latestProductSchema = mongoose.Schema(
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

    mainCategory: {
      type: String,
      required: true,
    },
    sub_category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },

    fullPrice: {
      type: Number,
      required: true,
      default: 0,
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
const LatestProducts = mongoose.model("LatestProducts", latestProductSchema);
export default LatestProducts;
