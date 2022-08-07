import React from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/checkoutsteps.module.css";

const CheckOutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <nav className={styles.checkoutNav}>
      <ul className={styles.breadcrumb}>
        <li className={styles.breadcrumb__item}>
          <span className={styles.breadcrumb__inner}>
            {step1 ? (
              <Link to="/login" className={styles.breadcrumb__title}>
                Sign In
              </Link>
            ) : (
              <Link disabled className={styles.linkDisabled}>
                Sign In
              </Link>
            )}
          </span>
        </li>

        <li className={styles.breadcrumb__item}>
          <span className={styles.breadcrumb__inner}>
            {step2 ? (
              <Link to="/shipping" className={styles.breadcrumb__title}>
                Shipping
              </Link>
            ) : (
              <Link to="/" disabled className={styles.linkDisabled}>
                Shipping
              </Link>
            )}
          </span>
        </li>

        <li className={styles.breadcrumb__item}>
          <span className={styles.breadcrumb__inner}>
            {step3 ? (
              <Link to="/placeorder" className={styles.breadcrumb__title}>
                Place Order
              </Link>
            ) : (
              <Link to="/" disabled className={styles.linkDisabled}>
                Place Order
              </Link>
            )}
          </span>
        </li>

        <li className={styles.breadcrumb__item}>
          <span className={styles.breadcrumb__inner}>
            {step4 ? (
              <Link to="/payment" className={styles.breadcrumb__title}>
                Payment
              </Link>
            ) : (
              <Link to="/" disabled className={styles.linkDisabled}>
                Payment
              </Link>
            )}
          </span>
        </li>
      </ul>
    </nav>
  );
};
export default CheckOutSteps;
