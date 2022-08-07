import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import Loader from "../Components/Utils/Loader";
import CheckOutSteps from "../Components/Order/CheckoutSteps";
import { payOrder, createOrder } from "../action/orderAction";
import { removeFromCart } from "../action/cartAction";
import styles from "../styles/payment.module.css";

const Payment = () => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const [sdkReady, setSdkReady] = useState(false);

  const navigate = useNavigate();
  if (!shippingAddress) {
    navigate("/shipping");
  }
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100);

  cart.taxPrice = addDecimals(Number((0.17 * cart.itemsPrice).toFixed(2)));

  cart.totalPrice = Number(
    Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)
  ).toFixed(2);

  const addPaypalScript = async () => {
    const { data: clientId } = await axios.get("/api/config/paypal");
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
    script.async = true;
    script.onload = () => {
      setSdkReady(true);
    };
    document.body.appendChild(script);
  };

  const PlaceOrderHandler = async (paymentResult) => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: "paypal",
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
        isPaid: true,
      })
    ).then(() => {
      for (let i = 0; i < global.orderFull.data.orderItems.length; i++) {
        dispatch(removeFromCart(global.orderFull.data.orderItems[i]._id));
      }
      dispatch(payOrder(global.orderFull.data._id, paymentResult));
      navigate("/orders/" + global.orderFull.data._id);
      global.orderFull = "";
    });
  };

  const successPaymentHandler = (paymentResult) => {
    PlaceOrderHandler(paymentResult);
  };

  useEffect(() => {
    addPaypalScript();
  }, []);

  return (
    <>
      <h1 className={styles.paymentTitle}>Payment Method</h1>
      <CheckOutSteps step1 step2 step3 step4 />

      {!sdkReady ? (
        <Loader />
      ) : (
        <div className={styles.paypal}>
          <PayPalButton
            style={{
              layout: "vertical",

              shape: "rect",
              label: "paypal",
            }}
            amount={cart.totalPrice}
            onSuccess={successPaymentHandler}
          />
        </div>
      )}
    </>
  );
};

export default Payment;
