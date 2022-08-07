import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ErrorMessage from "./ErrorMessage";
import Loader from "./Loader";
import { register } from "../../action/userAction";
import { Helmet } from "react-helmet";
import styles from "../../styles/userRegister.module.css";

const UserRegister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

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
  }, [navigate, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Password don't match");
      setTimeout(() => {
        setMessage(null);
      }, 2500);
    } else {
      dispatch(register(name, email, password));
    }
  };

  return (
    <>
      <div className={styles.loginBox}>
        <Helmet>
          <title> ecom | login</title>
        </Helmet>
        {message && (
          <ErrorMessage classN="alert-register">{message}</ErrorMessage>
        )}
        {error && <ErrorMessage classN="alert-register">{error}</ErrorMessage>}
        {loading && <Loader />}
        <h1>Sign Up</h1>
        <form onSubmit={submitHandler}>
          <div className={styles.userBox}>
            <label>Name</label>
            <input
              type="name"
              name="name"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required=""
              message="Please input your name!"
            />
          </div>
          <div className={styles.userBox}>
            <label>Email</label>
            <input
              type="text"
              name="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={styles.userBox}>
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required=""
              message="Please input your name!"
            />
          </div>
          <div className={styles.userBox}>
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirm password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required=""
            />
          </div>
          <button type="submit"> Register</button>
          <div className="row">
            <div className="col">
              Have an account?
              <Link to={redirect ? `/login?redirect=${redirect}` : "/login/"}>
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
