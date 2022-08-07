import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ErrorMessage from "../Components/Utils/ErrorMessage";
import Loader from "../Components/Utils/Loader";
import { listMyOrders } from "../action/orderAction";
import { FaTimes } from "react-icons/fa";
import Button from "../Components/Utils/Button";
import styles from "../styles/myOrders.module.css";

const MyOrders = () => {
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const orderMyList = useSelector((state) => state.orderMyList);
  const { loading: loadingOrders, error: errorOrders, orders } = orderMyList;

  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !user.name || success) {
      dispatch(listMyOrders());
    } else {
    }
  }, [dispatch, navigate, success, user, userInfo]);

  return (
    <>
      <div className={styles.myOrder}>
        <div className={styles.myOrderBox}>
          <h1 className={styles.title}>My Orders</h1>
          {loadingOrders ? (
            <Loader />
          ) : errorOrders ? (
            <ErrorMessage>{errorOrders}</ErrorMessage>
          ) : orders.length === 0 ? (
            <ErrorMessage>Order is empty</ErrorMessage>
          ) : (
            <table className={styles.table}>
              <thead className={styles.tableHeader}>
                <tr className={styles.tableRow}>
                  <th className={styles.tableTitle}>ID</th>
                  <th className={styles.tableTitle}>TOTAL</th>
                  <th className={styles.tableTitle}>PAID AT</th>
                  <th className={styles.tableTitle}>DELIVERED</th>
                  <th className={styles.tableTitle}>DETAILS </th>
                </tr>
              </thead>
              <tbody className={styles.tableHover}>
                {orders.map((order, index) => (
                  <tr key={index} className={styles.tableRow}>
                    <>
                      <td
                        key={order._id}
                        data-label="ID"
                        className={styles.tableData}
                      >
                        {order._id.slice(17, 24)}
                      </td>
                      <td data-label="TOTAL PRICE" className={styles.tableData}>
                        ${order.totalPrice}
                      </td>
                      <td data-label="PAID AT" className={styles.tableData}>
                        {order.isPaid ? (
                          order.paidAt.substring(0, 10)
                        ) : (
                          <FaTimes />
                        )}
                      </td>
                      <td
                        data-label="IS DELIVERED"
                        className={styles.tableData}
                      >
                        {order.isDelivered ? (
                          order.deliveredAt.substring(0, 10)
                        ) : (
                          <FaTimes />
                        )}
                      </td>
                      <td
                        data-label="ORDER DETAILS"
                        className={styles.tableData}
                      >
                        <Link to={`/orders/${order._id}`}>
                          <button className={styles.userEditBtn}>
                            details
                          </button>
                        </Link>
                      </td>
                    </>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default MyOrders;
