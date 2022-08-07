import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ErrorMessage from "../Components/Utils/ErrorMessage";
import Loader from "../Components/Utils/Loader";
import { register } from "../action/userAction";
import { toast } from "react-toastify";
import styles from "../styles/login.module.css";
import { Helmet } from "react-helmet";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);

  const form = useRef();
  const [loginSuccess, setLoginSuccess] = useState(false);
  const { id: userId } = useParams();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const { search } = useLocation();

  const navigate = useNavigate();

  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
    if (error === "email or password is not correct") {
      dispatch(register);
      setLoginSuccess(true);
      navigate("/");
    }
  }, [userInfo, redirect, error, dispatch, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password.length < 8) {
      toast.error("password in not correct", {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      return;
    }

    const config = {
      headers: {
        "content-Type": "application/json",
      },
    };
    const { data } = await axios.get(
      "/api/reset-password/?password=" + password + "&id=" + userId,
      config
    );

    if (data.user) {
      toast.info("its update", {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate("/login");
      return;
    } else {
      toast.error("error in the server, try later", {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <>
      <Helmet>eCom | reset password</Helmet>
      <div className={styles.loginBox}>
        <h1>reset password</h1>
        {message && <ErrorMessage>{message}</ErrorMessage>}
        {!loginSuccess && error && <ErrorMessage>{error}</ErrorMessage>}

        {loading && <Loader />}
        <form ref={form} onSubmit={submitHandler}>
          <div className={styles.userBox}>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>new password</label>
          </div>

          <button type="submit">send</button>
        </form>
      </div>
    </>
  );
};

export default ResetPassword;
