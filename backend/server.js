import path from "path";
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import connectDB from "./config/db.js";
import productRoute from "./routes/productRoute.js";
import userRoute from "./routes/userRoute.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import User from "./models/userModel.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
dotenv.config();

connectDB();

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.send("API IS RUNNING");
});

app.use("/api/products", productRoute);
app.use("/api/users", userRoute);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

app.get("/api/forgot-password", async (req, res) => {
  const email = req.query.email;
  const user = await User.findOne({ email });
  res.send({
    user: user,
  });
});

app.get("/api/reset-password", async (req, res) => {
  const password = req.query.password;
  const userId = req.query.id;

  const user = await User.findById(userId);
  if (password) {
    user.password = password;
  }

  const updatedUser = await user.save();
  res.send({
    user: updatedUser,
  });
});

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server is running ${process.env.NODE_ENV} mode on port ${PORT}`)
);
