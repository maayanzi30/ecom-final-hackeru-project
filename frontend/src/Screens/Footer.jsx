import React from "react";
import { Link } from "react-router-dom";
import { BsLinkedin, BsGithub } from "react-icons/bs";
import styles from "../styles/footer.module.css";
const Footer = () => {
  return (
    <>
      <div className={styles.container}></div>
      <footer className={styles.footer}>
        <section className={styles.ftMain}>
          <div className={styles.ftMainItem}>
            <h2 className={styles.ftTitle}>Wanna know more about us?</h2>
            <ul className={styles.footerLinks}>
              <li className={styles.footerList}>
                <Link className={styles.footerLink} to="/about">
                  About us
                </Link>
              </li>
              <li className={styles.footerList}>
                <Link className={styles.footerLink} to="/contactus">
                  Contact Us
                </Link>
              </li>
              <li className={styles.footerList}>
                <a
                  href="https://www.linkedin.com/"
                  className={styles.footerLink}
                >
                  <BsLinkedin />
                </a>
              </li>
              <li className={styles.footerList}>
                <a href="https://github.com/" className={styles.footerLink}>
                  <BsGithub />
                </a>
              </li>
            </ul>
          </div>
        </section>
        <section className={styles.ftLegal}>
          <ul className={styles.ftLegalList}>
            <li className={styles.footerList}>
              &copy; 2022 Copyright eCom Inc.
            </li>
          </ul>
        </section>
      </footer>
    </>
  );
};

export default Footer;
