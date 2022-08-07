import mongoose from "mongoose";

const categoriesSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    src: {
      type: String,
      required: true,
    },
    mainCategory: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Category = mongoose.model("Category", categoriesSchema);
export default Category;
