import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ErrorMessage from "../Components/Utils/ErrorMessage";
import Loader from "../Components/Utils/Loader";
import { login, register } from "../action/userAction";
import { toast } from "react-toastify";
import styles from "../styles/login.module.css";
import { Helmet } from "react-helmet";
import "react-toastify/dist/ReactToastify.css";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);

  const [googleName, setGoogleName] = useState("");
  const [googleEmail, setGoogleEmail] = useState("");
  const [googleId, setGoogleId] = useState("");
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
    if (error === "email or password is not correct" && googleName !== "") {
      dispatch(register(googleName, googleEmail, googleId));
      setLoginSuccess(true);
      navigate("/");
    }
  }, [
    userInfo,
    redirect,
    error,
    dispatch,
    googleName,
    googleEmail,
    googleId,
    navigate,
  ]);
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const submitHandler = (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      toast.error("email in not correct", {
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

    if (password.length < 8) {
      toast.error("password length need to be at least 8 charter", {
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

    dispatch(login(email, password));
  };

  const googleLogin = (response) => {
    // not ready for now

    const {
      profileObj: { name, email },
      googleId,
    } = response;

    setGoogleEmail(email);
    setGoogleName(name);
    setGoogleId(googleId);

    if (email) {
      dispatch(login(email, googleId));
    } else {
      setMessage("an error accord, please try again");
      setTimeout(() => {
        setMessage(null);
      }, 2500);
    }
  };

  return (
    <>
      <Helmet>eCom | login</Helmet>
      <h1>Sign In</h1>
      <div className={styles.loginBox}>
        <h3 className={styles.editDetails}>Please fill your details</h3>

        {message && <ErrorMessage>{message}</ErrorMessage>}

        {!loginSuccess && error && <ErrorMessage>{error}</ErrorMessage>}

        {loading && <Loader />}
        <form className={styles.form} onSubmit={submitHandler}>
          <div className={styles.userBox}>
            <label className={styles.loginLabel}>Email: </label>
            <input
              className={styles.loginInput}
              type="email"
              name="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={styles.userBox}>
            <label className={styles.loginLabel}>Password: </label>
            <input
              className={styles.loginInput}
              type="password"
              name="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className={styles.loginWrapper}>
            <button className={styles.loginBtn} type="submit">
              Login
            </button>

            <Link
              className={styles.forgotPass}
              to={
                redirect
                  ? `/forgotpassword?redirect=${redirect}`
                  : "/forgotpassword/"
              }
            >
              Forgot Password?{" "}
            </Link>

            <div className={styles.loginNewCust}>
              New Customer?
              <Link
                className={styles.newCustLink}
                to={redirect ? `/register?redirect=${redirect}` : "/register/"}
              >
                Register
              </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
