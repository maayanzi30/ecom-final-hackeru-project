import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../action/cartAction";
import Button from "../Components/Utils/Button";
import CheckOutSteps from "../Components/Order/CheckoutSteps";
import { Helmet } from "react-helmet";

import styles from "../styles/shipping.module.css";

const Shipping = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress, cartItems } = cart;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    if (!userInfo) {
      navigate("/cart");
    }

    if (cartItems.length === 0) {
      navigate("/");
    }

    if (shippingAddress !== null) {
      setAddress(shippingAddress.address);
      setCity(shippingAddress.city);
      setPostalCode(shippingAddress.postalCode);
      setPhoneNumber(shippingAddress.phoneNumber);
    } else if (userInfo) {
      setAddress(userInfo.address.address);
      setCity(userInfo.address.city);
      setPostalCode(userInfo.address.postalCode);
      setPhoneNumber(userInfo.address.phoneNumber);
    }
  }, [userInfo, shippingAddress, cartItems, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (address.length < 3 || city.length < 3) {
      alert("to short");
      return;
    }
    dispatch(saveShippingAddress({ address, city, postalCode, phoneNumber }));
    navigate("/placeorder");
  };
  return (
    <>
      <Helmet>
        <title> eCom | shipping address</title>
      </Helmet>
      <h1 className={styles.cardTitle}>Shipping</h1>
      <CheckOutSteps step1 step2 />
      <div className={styles.stepCard}>
        <div className={styles.cardImage}></div>
        <form onSubmit={submitHandler} className={styles.cardForm}>
          <div className={styles.userBox}>
            <label className={styles.inputLabel}>Address:</label>

            <input
              type="text"
              name="address"
              placeholder="Enter Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className={styles.inputField}
            />
          </div>
          <div className={styles.userBox}>
            <label className={styles.inputLabel}>City:</label>

            <input
              type="text"
              name="city"
              placeholder="Enter City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
              className={styles.inputField}
            />
          </div>
          <div className={styles.userBox}>
            <label className={styles.inputLabel}>Postal Code:</label>
            <input
              type="text"
              name="postalCode"
              placeholder="Enter Postal Code"
              value={postalCode}
              pattern="[0-9]{7}"
              onChange={(e) => setPostalCode(e.target.value)}
              required
              className={styles.inputField}
            />
          </div>
          <div className={styles.userBox}>
            <label className={styles.inputLabel}>Phone Number</label>

            <input
              type="number"
              name="phoneNumber"
              placeholder="Enter Mobile Number"
              value={phoneNumber}
              pattern="[0-9]{10}"
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              className={styles.inputField}
            />
          </div>
          <Button type="submit">Continue</Button>
        </form>
        <div className={styles.error}></div>
      </div>
    </>
  );
};

export default Shipping;
