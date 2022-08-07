import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

const getProducts = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};
  const products = await Product.find({ ...keyword });

  res.json(products);
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: "Product Removed" });
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
});

const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: req.name ? req.name : "edit mode",
    salePrice: req.salePrice ? req.salePrice : 9999,
    fullPrice: req.price ? req.price : 9999,
    user: req.user._id,
    src: "/uploads/logo.png",
    sub_category: req.sub_category ? req.sub_category : "edit mode",
    mainCategory: req.mainCategory ? req.mainCategory : "edit mode",
    countInStock: 0,
    description: req.description ? req.description : "edit mode",
  });
  const createProduct = await product.save();
  res.status(201).json(createProduct);
});

const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    salePrice,
    price,
    description,
    src,
    sub_category,
    mainCategory,
    countInStock,
  } = req.body;
  console.log(req.body);

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.fullPrice = price;
    product.salePrice = salePrice;
    product.description = description;
    product.src = src;
    product.sub_category = sub_category;
    product.mainCategory = mainCategory;
    product.countInStock = countInStock;

    const updateProduct = await product.save();

    res.json(updateProduct);
  } else {
    res.status(404);
    throw new Error("product not found");
  }
});

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
