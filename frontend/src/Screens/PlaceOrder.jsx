import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import ErrorMessage from "../Components/Utils/ErrorMessage";
import CheckOutSteps from "../Components/Order/CheckoutSteps";
import { FaTrash } from "react-icons/fa";
import { addToCart, removeFromCart } from "../action/cartAction";
import styles from "../styles/placeorder.module.css";

const PlaceOrder = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const navigate = useNavigate();

  if (!cart.shippingAddress.address) {
    navigate("/shipping");
  } else if (!cart.paymentMethod) {
  }

  const addDecimals = (num) => {
    return Number((Math.round(num * 100) / 100).toFixed(2));
  };

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100);

  cart.taxPrice = addDecimals(Number((0.17 * cart.itemsPrice).toFixed(2)));

  cart.totalPrice = Number(
    Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)
  ).toFixed(2);

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  useEffect(() => {
    if (success) {
      navigate("/payment");
    }
  }, [navigate, order, success]);

  const PlaceOrderHandler = () => {
    navigate("/payment");
  };

  return (
    <div>
      <h1>Place Order</h1>
      <CheckOutSteps step1 step2 step3 />
      <table className={styles.table}>
        <thead className={styles.tableHeader}>
          <tr className={styles.tableRow}>
            <th className={styles.tableTitle}>Shipping Address:</th>
          </tr>
        </thead>
        <tbody>
          <tr className={styles.tableRow}>
            <td className={styles.tableData}>
              {cart.shippingAddress.address},{cart.shippingAddress.city},
              {cart.shippingAddress.address},{cart.shippingAddress.postalCode}
            </td>
          </tr>
        </tbody>
      </table>

      {cart.cartItems.length === 0 ? (
        <ErrorMessage>
          Your Cart Is Empty.
          <Link to="/products">
            <br />
            Go To Products
          </Link>
        </ErrorMessage>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr className={styles.tableRow}>
              <th className={styles.tableTitle}>Image:</th>
              <th className={styles.tableTitle}>Product Name:</th>
              <th className={styles.tableTitle}>Item Price:</th>
              <th className={styles.tableTitle}>Quantity:</th>
              <th className={styles.tableTitle}>Total:</th>
              <th className={styles.tableTitle}>Delete product:</th>
            </tr>
          </thead>
          <tbody>
            {cart.cartItems.map((item, index) => (
              <tr key={index} className={styles.tableRow}>
                <td className={styles.tableData}>
                  <img
                    className={styles.orderImg}
                    src={item.image}
                    alt={item.name}
                  />
                </td>
                <td className={styles.tableData}>
                  <Link to={`/products/${item.product}`}>{item.name}</Link>
                </td>
                <td className={styles.tableData}>{item.price}</td>
                <td>
                  {item.countInStock > 0 ? (
                    <select
                      className={styles.tableData}
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option
                          className={styles.optionCart}
                          key={x + 1}
                          value={x + 1}
                        >
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <p>out of stock</p>
                  )}
                </td>

                <td className={styles.tableData}>${item.qty * item.price}</td>
                <td>
                  <button
                    onClick={() => removeFromCartHandler(item.product)}
                    className={styles.btnArea}
                  >
                    <i
                      aria-hidden="true"
                      className={`${styles.fa} ${styles.faTrash}`}
                    ></i>
                    <span className={styles.btn2}>
                      <FaTrash />
                    </span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <h2 className={styles.orderSubHeader}>Order Summary</h2>
      <table className={styles.table}>
        <thead className={styles.tableHeader}>
          <tr className={styles.tableRow}>
            <th className={styles.tableTitle}>Items</th>
            <th className={styles.tableTitle}>Shipping</th>
            <th className={styles.tableTitle}>Tax</th>
            <th className={styles.tableTitle}>Total Price</th>
          </tr>
        </thead>
        <tbody>
          <tr className={styles.tableRow}>
            <td className={styles.tableData}>${cart.itemsPrice}</td>
            <td className={styles.tableData}>${cart.shippingPrice}</td>
            <td className={styles.tableData}>${cart.taxPrice}</td>
            <td className={styles.tableData}> ${cart.totalPrice}</td>

            <td className={styles.tableData}>
              <button
                type="button"
                className={styles.btnBlock}
                disabled={cart.cartItems === 0}
                onClick={PlaceOrderHandler}
              >
                Place Order
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <li>{error && <ErrorMessage>{error}</ErrorMessage>}</li>
    </div>
  );
};

export default PlaceOrder;
