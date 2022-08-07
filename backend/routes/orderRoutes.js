import express from "express";
const router = express.Router();
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivery,
  getMyOrders,
  deleteOrder,
  getUsersOrdersById,
  getOrders,
} from "../controllers/orderController.js";

import { protect, isAdmin } from "../middleware/authMiddleware.js";

router.route("/").post(protect, addOrderItems).get(protect, isAdmin, getOrders);
router.route("/myorders").get(protect, getMyOrders);
router.route("/:id/:userid:/:isadmin").delete(protect, deleteOrder);
router.route("/:id").get(protect, getOrderById);
router.route("/admin/:id").get(protect, isAdmin, getUsersOrdersById);
router.route("/:id/pay").put(protect, updateOrderToPaid);
router.route("/:id/deliver").put(protect, isAdmin, updateOrderToDelivery);

export default router;
