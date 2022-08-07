import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NumberFormat from "react-number-format";
import { Link, useNavigate, useParams } from "react-router-dom";
import ErrorMessage from "../Components/Utils/ErrorMessage";
import Loader from "../Components/Utils/Loader";
import { Helmet } from "react-helmet";
import { getUserDetails, updateUser } from "../action/userAction";
import { getUsersOrders, deleteOrder } from "../action/orderAction";
import { USER_UPDATE_RESET } from "../constants/userConstants";
import { TiDelete } from "react-icons/ti";
import { AiFillCheckCircle } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import styles from "../styles/userEdit.module.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const UserEdit = () => {
  const { id: userId } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading: loadingUpdate, error: errorUpdate, success } = userUpdate;

  const getOrders = useSelector((state) => state.getOrders);
  const { orders, loading: loadingOrders } = getOrders;

  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo || (userInfo && !userInfo.isAdmin)) {
      navigate("/");
      return;
    }

    dispatch(getUsersOrders(userId));
    if (success) {
      dispatch({ type: USER_UPDATE_RESET });
      navigate("/admin/user/userlist");
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [dispatch, navigate, success, user, userId, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: userId, name, email, isAdmin }));
  };

  return (
    <>
      <Helmet>
        <title>
          {user ? `ecom | edit user ${user.name}` : "ecom | edit user"}
        </title>
      </Helmet>

      {!loadingOrders && orders.length > 0 ? (
        <>
          <tr className={styles.tablesWrapper}>
            <div>
              <h1>Edit User</h1>

              {loadingUpdate ? (
                <Loader />
              ) : loading ? (
                <Loader />
              ) : error ? (
                toast.error(
                  { error },
                  {
                    position: "top-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  }
                )
              ) : errorUpdate ? (
                toast.error(
                  { errorUpdate },
                  {
                    position: "top-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  }
                )
              ) : (
                <>
                  <form className={styles.form} onSubmit={submitHandler}>
                    <div className={styles.userEditBox}>
                      <label className={styles.userEditLabel}>Name</label>
                      <input
                        className={styles.userEditInput}
                        type="text"
                        name="name"
                        placeholder="Enter Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required=""
                      />
                    </div>
                    <div className={styles.userEditBox}>
                      <label className={styles.userEditLabel}>Email</label>
                      <input
                        className={styles.userEditInput}
                        type="email"
                        name="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required=""
                      />
                    </div>

                    <button className={styles.updateBtn} type="submit">
                      Update
                    </button>
                  </form>
                </>
              )}
            </div>

            <div className={styles.userBox}>
              <h2>orders</h2>
              <table className={styles.table}>
                <thead className={styles.tableHeader}>
                  <tr className={styles.tableRow}>
                    <th className={styles.tableTitle}>Order number</th>
                    <th className={styles.tableTitle}> Order date</th>
                    <th className={styles.tableTitle}>Total</th>
                    <th className={styles.tableTitle}>Payment status</th>
                    <th className={styles.tableTitle}>Payment date</th>
                    <th className={styles.tableTitle}>
                      Delivery status
                      {/* everything that related to the delivery
                      will be added later */}
                    </th>
                    <th className={styles.tableTitle}>
                      Delivery date
                      {/* will be added later */}
                    </th>
                    <th className={styles.tableTitle}> Order details </th>
                    <th className={styles.tableTitle}>Cancel order </th>
                    {/*everything that related to the cancel order will be added later */}
                  </tr>
                </thead>
                <tbody className={styles.tableBody}>
                  {orders.map((order) => (
                    <tr className={styles.tableRow} key={order._id}>
                      <td
                        data-label="ORDER NUMBER"
                        className={styles.tableData}
                      >
                        <Link to={`/orders/${order._id}`}>
                          {order._id.slice(17, 24)}
                        </Link>
                      </td>
                      <td data-label="ORDER DATE" className={styles.tableData}>
                        <Link to={`/orders/${order._id}`}>
                          {new Date(
                            order.createdAt.substring(0, 10)
                          ).toLocaleDateString("en-Us")}
                        </Link>
                      </td>
                      <td
                        data-label="TOTAL
"
                        className={styles.tableData}
                        style={{
                          fontSize:
                            order.totalPrice < 999
                              ? "1rem"
                              : order.totalPrice > 9999
                              ? "0.75rem"
                              : "0.85rem",
                        }}
                      >
                        <Link to={`/orders/${order._id}`}>
                          <NumberFormat
                            value={order.totalPrice}
                            displayType={"text"}
                            thousandSeparator={true}
                          />{" "}
                          $
                        </Link>
                      </td>
                      <td
                        data-label="PAYMENT STATUS
"
                        className={styles.tableData}
                      >
                        {order.isPaid ? (
                          <Link to={`/orders/${order._id}`}>
                            <AiFillCheckCircle className={styles.icon} />
                          </Link>
                        ) : (
                          <Link to={`/orders/${order._id}`}>
                            <TiDelete className={styles.icon} />
                          </Link>
                        )}
                      </td>
                      <td
                        data-label="PAYMENT DATE
"
                        className={styles.tableData}
                      >
                        <Link to={`/orders/${order._id}`}>
                          {order.isPaid &&
                            new Date(
                              order.paidAt.substring(0, 10)
                            ).toLocaleDateString("en-Us")}
                        </Link>
                      </td>
                      <td
                        data-label="DELIVERY STATUS
"
                        className={styles.tableData}
                      >
                        {order.isDelivered ? (
                          <Link to={`/orders/${order._id}`}>
                            <AiFillCheckCircle className={styles.icon} />
                          </Link>
                        ) : (
                          <Link to={`/orders/${order._id}`}>
                            <TiDelete className={styles.icon} />
                          </Link>
                        )}
                      </td>
                      <td
                        data-label="DELIVERY DATE
"
                        className={styles.tableData}
                      >
                        <Link to={`/orders/${order._id}`}>
                          {order.isDelivered &&
                            new Date(
                              order.deliveredAt.substring(0, 10)
                            ).toLocaleDateString("en-Us")}
                        </Link>
                      </td>
                      <td
                        data-label="ORDER DETAILS
"
                        className={styles.tableData}
                      >
                        <Link to={`/orders/${order._id}`}>
                          <button className={styles.userEditBtn}>
                            details
                          </button>
                        </Link>
                      </td>
                      <td
                        data-label="CANCEL ORDER
"
                        className={styles.tableData}
                      >
                        {!order.isPaid && (
                          <BsFillTrashFill
                            className={styles.icon}
                            onClick={() =>
                              dispatch(deleteOrder(order._id, order.user))
                            }
                          />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </tr>
        </>
      ) : (
        <div className={styles.userBox}>
          <h1 style={{ color: "#AAAAAA" }}>edit user</h1>
          {loadingUpdate ? (
            <Loader />
          ) : loading ? (
            <Loader />
          ) : error ? (
            toast.error(
              { error },
              {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              }
            )
          ) : errorUpdate ? (
            toast.error(
              { errorUpdate },
              {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              }
            )
          ) : (
            <>
              <form className={styles.form} onSubmit={submitHandler}>
                <div className={styles.userBox}>
                  <label className={styles.userEditLabel}>full name</label>
                  <input
                    className={`${styles.userEditInput} ${styles.userInputText}`}
                    type="text"
                    placeholder="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  ></input>
                </div>
                <div className={styles.userBox}>
                  <label className={styles.userEditLabel}>Email</label>
                  <input
                    className={styles.userEditInput}
                    type="email"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></input>
                </div>
                <button className={styles.userEditBtn} type="submit">
                  Update
                </button>
              </form>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default UserEdit;
