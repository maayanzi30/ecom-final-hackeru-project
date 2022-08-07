import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ErrorMessage from "../Components/Utils/ErrorMessage";
import Loader from "../Components/Utils/Loader";
import { FaTimes } from "react-icons/fa";
import { listOrders } from "../action/orderAction";
import styles from "../styles/orderList.module.css";

const OrderList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const order = useSelector((state) => state.order);
  const { loading, error, orders } = order;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate, userInfo]);

  return (
    <>
      <h1>Orders</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : (
        <table className={styles.table}>
          <thead className={styles.tableHeader}>
            <tr className={styles.tableRow}>
              <th className={styles.tableTitle}>ID</th>
              <th className={styles.tableTitle}>USER</th>
              <th className={styles.tableTitle}>DATE</th>
              <th className={styles.tableTitle}>TOTAL</th>
              <th className={styles.tableTitle}>PAID</th>
              <th className={styles.tableTitle}>DELIVERED</th>
              <th className={styles.tableTitle}>DETAILS</th>
            </tr>
          </thead>
          <tbody className={styles.tableBody}>
            {!loading &&
              orders &&
              orders.map((order) => (
                <tr key={order._id} className={styles.tableRow}>
                  <td data-label="ID" className={styles.tableData}>
                    {order._id.slice(17, 24)}
                  </td>
                  <td data-label="USER" className={styles.tableData}>
                    {order.user && order.user.name}
                  </td>
                  <td data-label="DATE" className={styles.tableData}>
                    {order.createdAt.substring(0, 10)}
                  </td>
                  <td data-label="TOTAL" className={styles.tableData}>
                    ${order.totalPrice}
                  </td>
                  <td data-label="PAID" className={styles.tableData}>
                    {order.isPaid ? order.paidAt.substring(0, 10) : <FaTimes />}
                  </td>
                  <td data-label="DELIVERED" className={styles.tableData}>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <FaTimes />
                    )}
                  </td>

                  <button className={styles.ordersButton}>
                    <Link to={`/orders/${order._id}`}>Details</Link>
                  </button>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default OrderList;
