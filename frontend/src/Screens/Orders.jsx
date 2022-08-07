import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import ErrorMessage from "../Components/Utils/ErrorMessage";
import Loader from "../Components/Utils/Loader";
import { getOrderDetails, deliverOrder } from "../action/orderAction";
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from "../constants/orderConstants";
import styles from "../styles/orders.module.css";

const Orders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sdkReady, setSdkReady] = useState(false);

  const { id: orderId } = useParams();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  if (!loading) {
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
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

    if (!order || order._id !== orderId || successPay || successDeliver) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPaypalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [
    dispatch,
    navigate,
    order,
    orderId,
    successDeliver,
    successPay,
    userInfo,
  ]);

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <ErrorMessage>{error}</ErrorMessage>
  ) : (
    <>
      <h1>Order {order._id.slice(17, 24)}</h1>
      <table className={styles.table}>
        <thead className={styles.tableHeader}>
          <tr className={styles.tableRow}>
            <th className={`${styles.tableTitle} ${styles.firstTableTitle}`}>
              Name:
            </th>
            <th className={`${styles.tableTitle}  ${styles.firstTableTitle}`}>
              Email:
            </th>
            <th className={`${styles.tableTitle} ${styles.firstTableTitle}`}>
              Shipping Address:
            </th>
            <th className={`${styles.tableTitle} ${styles.firstTableTitle}`}>
              Payment Method:
            </th>
            <th className={`${styles.tableTitle} ${styles.firstTableTitle}`}>
              PAYMENT STATUS:
            </th>
            <th className={`${styles.tableTitle} ${styles.firstTableTitle}`}>
              Is Delivered:
            </th>
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          <tr className={styles.tableRow}>
            <td data-label="NAME" className={styles.tableData}>
              {order.user.name}
            </td>
            <td
              data-label="EMAIL"
              className={`${styles.tableData} ${styles.mailTo}`}
            >
              <Link to={`mailto:${order.user.email}`}>{order.user.email}</Link>
            </td>
            <td data-label="SHIPPING ADDRESS" className={styles.tableData}>
              {order.shippingAddress.country},{order.shippingAddress.city},
              <br />
              {order.shippingAddress.address},
              <br />
              {order.shippingAddress.postalCode}
            </td>
            <td data-label="PAYMENT METHOD" className={styles.tableData}>
              {order.paymentMethod}
            </td>
            {order.isPaid ? (
              <td data-label="PAYMENT STATUS" className={styles.tableData}>
                Paid On {order.paidAt.substring(0, 10)}
              </td>
            ) : (
              <td data-label="PAYMENT STATUS" className={styles.tableData}>
                Not Paid
              </td>
            )}
            {order.isDelivered ? (
              <td data-label="DELIVERED ON" className={styles.tableData}>
                Delivered On {order.deliverOrder}
              </td>
            ) : (
              <td data-label="PAYMENT METHOD" className={styles.tableData}>
                NOT DELIVERED
              </td>
            )}
          </tr>
        </tbody>
      </table>
      <table className={styles.table}>
        <thead className={styles.tableHeader}>
          <tr className={styles.tableRow}>
            <th className={`${styles.tableTitle} ${styles.secondTableTitle}`}>
              Image:
            </th>
            <th className={styles.tableTitle}>Product Name:</th>
            <th className={styles.tableTitle}>Item Price:</th>
            <th className={styles.tableTitle}>Quantity:</th>
            <th className={styles.tableTitle}>Total:</th>
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          {order.orderItems.length === 0 ? (
            <ErrorMessage>Order is empty</ErrorMessage>
          ) : (
            <>
              {!loading &&
                order &&
                order.orderItems.map((item, index) => (
                  <tr key={index} className={styles.tableRow}>
                    <td data-label="IMAGE" className={styles.tableData}>
                      <img
                        className={styles.orderImg}
                        src={item.image}
                        alt={item.name}
                      />
                    </td>
                    <td data-label="PRODUCT NAME" className={styles.tableData}>
                      <Link to={`/products/${item.product}`}>{item.name}</Link>
                    </td>
                    <td data-label="ITEM PRICE" className={styles.tableData}>
                      {item.price}
                    </td>
                    <td data-label="QUANTITY" className={styles.tableData}>
                      {item.qty}
                    </td>
                    <td data-label="TOTAL" className={styles.tableData}>
                      ${item.qty * item.price}
                    </td>
                  </tr>
                ))}
            </>
          )}
        </tbody>
      </table>
      <h2 className={styles.orderSubHeader}>Order Summary</h2>
      <table className={styles.table}>
        <thead className={styles.tableHeader}>
          <tr className={styles.tableRow}>
            <th className={styles.tableTitle}>Items</th>
            <th className={styles.tableTitle}>Shipping</th>
            <th className={styles.tableTitle}>Tax</th>
            <th className={styles.tableTitle}>Total</th>
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          <tr className={styles.tableRow}>
            <td data-label="ITEM PRICE" className={styles.tableData}>
              ${order.itemsPrice}
            </td>
            <td data-label="SHIPPING PRICE" className={styles.tableData}>
              ${order.shippingPrice}
            </td>
            <td data-label="TAX PRICE" className={styles.tableData}>
              ${order.taxPrice}
            </td>
            <td data-label="TOTAL PRICE" className={styles.tableData}>
              ${order.totalPrice}
            </td>
          </tr>
        </tbody>
      </table>
      <div>
        {!order.isPaid && (
          <div>
            {loadingDeliver && <Loader />}
            {userInfo &&
              userInfo.isAdmin &&
              order.isPaid &&
              !order.isDelivered && (
                <div>
                  <button onClick={deliverHandler}>Mark As Delivered</button>
                </div>
              )}
          </div>
        )}
      </div>
    </>
  );
};

export default Orders;
