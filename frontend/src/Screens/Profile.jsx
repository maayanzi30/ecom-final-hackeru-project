import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ErrorMessage from "../Components/Utils/ErrorMessage";
import SuccessMessage from "../Components/Utils/SuccessMessage";
import Loader from "../Components/Utils/Loader";
import { getUserDetails, updateUserProfile } from "../action/userAction";
import { listMyOrders, deleteOrder } from "../action/orderAction";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";
import NumberFormat from "react-number-format";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Button from "../Components/Utils/Button";
import styles from "../styles/profile.module.css";
import Dropdown from "../Components/Utils/Dropdown";
const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [loader, setLoader] = useState(null);
  const [success, setSuccess] = useState(false);

  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails("profile"));
        dispatch(listMyOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
        if (user.address) {
          setPhoneNumber(user.address.phoneNumber);
        }
      }
    }
  }, [navigate, userInfo, dispatch, user, success]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Password don't match");
      setTimeout(() => {
        setMessage(null);
      }, 2500);
    } else {
      dispatch(
        updateUserProfile({
          id: user._id,
          name,
          email,
          address: { phoneNumber },
          password,
        })
      );
      setSuccess(true);

      setTimeout(() => {
        setSuccess(false);
      }, 1500);
    }
  };

  return (
    <>
      <Helmet>
        <title>ecom | profile</title>
      </Helmet>
      <h1>User Profile</h1>
      <div className={styles.wrapMobileProfileMenu}>
        <Dropdown user_info={userInfo} />
      </div>
      <div className={styles.profile}>
        <div className={styles.profileBox}>
          {message &&
            toast.error(
              { message },
              {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              }
            )}
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {success &&
            toast.success("Details Updated!", {
              position: "top-left",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            })}
          {loader && <Loader />}
          <form className={styles.form} onSubmit={submitHandler}>
            <div className={styles.userProfileBox}>
              <label className={styles.profileLabel}>Name</label>
              <input
                className={styles.profileInput}
                type="name"
                name="name"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required=""
              />
            </div>
            <div className={styles.userProfileBox}>
              <label className={styles.profileLabel}>Email</label>
              <input
                className={styles.profileInput}
                type="email"
                name="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required=""
              />
            </div>
            <div className={styles.userProfileBox}>
              <label className={styles.profileLabel}>Password</label>
              <input
                className={styles.profileInput}
                type="password"
                name="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required=""
              />
            </div>
            <div className={styles.userProfileBox}>
              <label className={styles.profileLabel}>Confirm Password</label>
              <input
                className={styles.profileInput}
                type="password"
                name="confirm password"
                placeholder="Enter Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required=""
              />
            </div>

            <div className={styles.userProfileBox}>
              <label className={styles.profileLabel}>Mobile Number</label>
              <input
                className={styles.profileInput}
                type="tel"
                name="tel"
                placeholder="Enter tel"
                value={phoneNumber}
                pattern="[0-9]{10}"
                onChange={(e) => setPhoneNumber(e.target.value)}
                required=""
              />
            </div>
            <div className={styles.profileWrapper}>
              <button
                className={styles.profileBtn}
                onClick={submitHandler}
                disabled={
                  !email ||
                  password.length < 8 ||
                  confirmPassword < 8 ||
                  !phoneNumber
                }
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Profile;
