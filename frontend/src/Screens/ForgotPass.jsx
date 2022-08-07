import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import ErrorMessage from "../Components/Utils/ErrorMessage";
import Loader from "../Components/Utils/Loader";
import { register } from "../action/userAction";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet";
import axios from "axios";
import emailjs from "@emailjs/browser";

import styles from "../styles/forgotPassword.module.css";
const ForgotPass = () => {
  const [email, setEmail] = useState("");

  const [message, setMessage] = useState(null);
  const [url, setUrl] = useState("");
  const form = useRef();
  const [loginSuccess, setLoginSuccess] = useState(false);

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
      navigate("/");
    }
  }, [userInfo, redirect, error, dispatch, navigate]);
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const submitHandler = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      toast.error("invalid email", {
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
      "/api/forgot-password/?email=" + email,
      config
    );

    if (!data.user) {
      toast.error("email does not exist", {
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

    setUrl(window.location.origin + `/reset-password/${data.user._id}`);

    setTimeout(function () {
      emailjs
        .sendForm(
          "service_ld7cz3l",
          "template_fsp288u",
          form.current,
          "0iCKnbEsBrCYpOz4b"
        )
        .then(
          (result) => {
            toast.info("reset password link has been send to your email", {
              position: "top-left",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          },
          (error) => {
            console.log(error.text);
          }
        );
    }, 2000);
  };

  return (
    <>
      <Helmet>eCom | forgot password</Helmet>
      <h1>forgot password</h1>
      <div className={styles.loginBox}>
        {message && <ErrorMessage>{message}</ErrorMessage>}
        {!loginSuccess && error && <ErrorMessage>{error}</ErrorMessage>}

        {loading && <Loader />}
        <form className={styles.form} ref={form} onSubmit={submitHandler}>
          <div className={styles.userBox}>
            <label className={styles.loginLabel}>Email</label>
            <input
              className={styles.loginInput}
              type="email"
              name="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <input
            className={styles.loginInput}
            type="hidden"
            name="url"
            value={url}
          ></input>

          <button className={styles.loginBtn} type="submit" disabled={!email}>
            send
          </button>
        </form>
      </div>
    </>
  );
};

export default ForgotPass;
