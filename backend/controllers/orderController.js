import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import User from "../models/userModel.js";

const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    salePrice,
    totalPrice,
    countInStock,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No Orders");
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      salePrice,
      countInStock,
    });

    const createdOrder = await order.save();

    const user = await User.findById(order.user);

    user.hasOrders = true;

    await user.save();

    res.status(201).json(createdOrder);
  }
});

const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    const user = await User.findById(order.user);

    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    user.hasPaidOrders = true;

    await user.save();

    const updateOrder = await order.save();

    res.json(updateOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

const updateOrderToDelivery = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updateOrder = await order.save();

    res.json(updateOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

const deleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    if (order.user === req.params.userid || req.params.isadmin) {
      const user = await User.findById(order.user);

      await order.remove();

      res.send("The order was successfully cancelled");

      const orders = await Order.find({ user: user._id });

      if (orders.length === 0) {
        user.hasOrders = false;

        await user.save();
      }
    } else {
      res.status(404);
      throw new Error("no permission");
    }
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

const getUsersOrdersById = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.params.id });

  res.json(orders);
});

const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "id name");
  res.json(orders);
});

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivery,
  getMyOrders,
  deleteOrder,
  getUsersOrdersById,
  getOrders,
};
