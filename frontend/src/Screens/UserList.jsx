import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import ErrorMessage from "../Components/Utils/ErrorMessage";
import SuccessMessage from "../Components/Utils/SuccessMessage";
import Loader from "../Components/Utils/Loader";
import { listUsers, deleteUser } from "../action/userAction";
import { FaTrash, FaTimes } from "react-icons/fa";
import { BsCheckLg } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";
import { AiFillCheckCircle } from "react-icons/ai";
import styles from "../styles/userList.module.css";

const UserList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users, success } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { error: deleteError } = userDelete;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { success: successUpdate } = userUpdate;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate, userInfo]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <>
      <Helmet>
        <title>ecom | user list</title>
      </Helmet>
      <h1>User lists</h1>
      {loading ? (
        <Loader />
      ) : (
        <>
          {success && (
            <SuccessMessage classN="alert-user-list">
              user successfully removed
            </SuccessMessage>
          )}
          {successUpdate && (
            <SuccessMessage classN="alert-user-list">
              user successfully updated
            </SuccessMessage>
          )}
          {error ? (
            <ErrorMessage>{error}</ErrorMessage>
          ) : deleteError ? (
            <ErrorMessage>{deleteError}</ErrorMessage>
          ) : (
            <table className={styles.table}>
              <thead className={styles.tableHeader}>
                <tr className={styles.tableRow}>
                  <th className={styles.tableTitle}>ID</th>
                  <th className={styles.tableTitle}>NAME</th>
                  <th className={styles.tableTitle}>EMAIL</th>
                  <th className={styles.tableTitle}>ADMIN</th>
                  <th className={styles.tableTitle}>available orders</th>
                  <th className={styles.tableTitle}>order paid</th>
                  <th className={styles.tableTitle}>
                    edit/
                    <br />
                    delete
                  </th>
                </tr>
              </thead>
              <tbody className={styles.tableBody}>
                {!loading &&
                  users &&
                  users.map((user) => (
                    <tr key={user._id} className={styles.tableRow}>
                      <td data-label="ID" className={styles.tableData}>
                        {user._id.slice(17, 24)}
                      </td>
                      <td data-label="NAME" className={styles.tableData}>
                        {user.name}
                      </td>
                      <td data-label="EMAIL" className={styles.tableData}>
                        <a
                          className={styles.mailTo}
                          href={`mailto:${user.email}`}
                        >
                          {user.email}
                        </a>
                      </td>
                      <td data-label="IS ADMIN" className={styles.tableData}>
                        {user.isAdmin ? <BsCheckLg /> : <FaTimes />}
                      </td>
                      <td
                        data-label="AVAILABLE ORDERS"
                        className={styles.tableData}
                      >
                        {user.hasOrders ? <AiFillCheckCircle /> : <FaTimes />}
                      </td>
                      <td data-label="HAS PAID" className={styles.tableData}>
                        {user.hasPaidOrders ? (
                          <AiFillCheckCircle />
                        ) : (
                          <FaTimes />
                        )}
                      </td>

                      <td className={styles.btnContainer}>
                        <Link to={`/admin/user/${user._id}/edit`}>
                          <BiEditAlt />
                        </Link>

                        {!user.hasPaidOrders ? (
                          <FaTrash onClick={() => deleteHandler(user._id)} />
                        ) : (
                          <span title="cant delete a customer with paid order">
                            <FaTrash />
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </>
  );
};

export default UserList;
