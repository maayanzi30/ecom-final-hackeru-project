import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ErrorMessage from "../Components/Utils/ErrorMessage";
import Loader from "../Components/Utils/Loader";
import { register, login } from "../action/userAction";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import styles from "../styles/userRegister.module.css";

const UserRegister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const [googleEmail, setGoogleEmail] = useState("");
  const [googleId, setGoogleId] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error } = userRegister;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const { search } = useLocation();

  const navigate = useNavigate();

  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
    if (error === "user exist" && googleEmail !== "") {
      setLoginSuccess(true);
      dispatch(login(googleEmail, googleId));
      navigate("/");
    }
  }, [navigate, userInfo, redirect, error, googleEmail, dispatch, googleId]);

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

    if (name.length < 2) {
      toast.error(" Name is required", {
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

    if (password !== confirmPassword) {
      toast.error("Password don't match", {
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
      toast.error("Password too short, must be at least 8 characters", {
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
    dispatch(register(name, email, password));
  };
  const googleLogin = (response) => {
    //not finish yet. will be in the next version of this site. this is just the base.
    const {
      profileObj: { email, name },
      googleId,
    } = response;

    setGoogleEmail(email);
    setGoogleId(googleId);

    if (email) {
      setLoginSuccess(true);
      dispatch(register(name, email, googleId));
    } else {
      setMessage("an error accord, please try again");
      setTimeout(() => {
        setMessage(null);
      }, 2500);
    }
  };
  return (
    <>
      <Helmet>
        <title> eCom | login</title>
      </Helmet>
      <h1>Sign Up</h1>
      <div className={styles.loginBox}>
        {message && <ErrorMessage>{message}</ErrorMessage>}
        {!loginSuccess && error && <ErrorMessage>{error}</ErrorMessage>}

        {loading && <Loader />}

        <form className={styles.form} onSubmit={submitHandler}>
          <div className={styles.userBox}>
            <label className={styles.loginLabel}>Name</label>
            <input
              className={styles.loginInput}
              type="name"
              name="name"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              minLength="2"
              message="Please enter your name!"
            />
          </div>
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
          <div className={styles.userBox}>
            <label className={styles.loginLabel}>Password</label>
            <input
              className={styles.loginInput}
              type="password"
              name="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              message="Please input your name!"
            />
          </div>
          <div className={styles.userBox}>
            <label className={styles.loginLabel}>Confirm Password</label>
            <input
              className={styles.loginInput}
              type="password"
              name="confirm password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <div className={styles.loginWrapper}>
            <button className={styles.loginBtn} type="submit">
              Register
            </button>

            <div className={styles.loginNewCust}>
              Have an account?
              <Link
                className={styles.newCustLink}
                to={redirect ? `/login?redirect=${redirect}` : "/login/"}
              >
                Login
              </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default UserRegister;
