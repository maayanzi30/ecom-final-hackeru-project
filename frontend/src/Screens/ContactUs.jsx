import React from "react";
import { BsFillTelephoneFill } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import Button from "../Components/Utils/Button";
import styles from "../styles/contactus.module.css";

const ContactUs = () => {
  return (
    <section className={styles.contact}>
      <div className={styles.imgContact}></div>
      <div className={styles.content}>
        <h1>
          Cont<span>@</span>ct Us
        </h1>
        <p className={styles.contactPar}>
          Welcome to our site and hope you are enjoying your shopping. If you
          have any problem you can contact us via various contact information
          that appears below:
        </p>
      </div>
      <div className={styles.container}>
        <div className={styles.contactInfo}>
          <div className={`${styles.box} ${styles.addressBox}`}>
            <div className={styles.icon}>
              <AiFillHome size="26" />
            </div>

            <div className={`${styles.text} ${styles.addressText}`}>
              <h3 className={styles.addressTitle}>Address</h3>
              <p className={`${styles.addressPar} ${styles.contentPar}`}>
                Hasharon,Israel
              </p>
            </div>
          </div>
          <div className={styles.box}>
            <div className={styles.icon}>
              <BsFillTelephoneFill size="26" />
            </div>
            <div className={styles.text}>
              <h3>Phone</h3>
              <p className={styles.contentPar}>
                11111111111
                <br />
              </p>
            </div>
          </div>
          <div className={`${styles.box} ${styles.finalBox}`}>
            <div className={styles.icon}>
              <MdEmail size="26" />
            </div>
            <div className={styles.text}>
              <h3>Email</h3>
              <p className={styles.contentPar}>
                ecoms@bla.com
                <br />
              </p>
            </div>
          </div>
        </div>
        <div className={styles.contactForm}>
          <form action="">
            <h2 className={styles.contactSubTitle}>Send Message </h2>
            <div className={styles.inputBox}>
              <span className={styles.contactSpan}>Full Name:</span>
              <textarea
                className={styles.textArea}
                type="text"
                name=""
                require="required"
              />
            </div>
            <div className={styles.inputBox}>
              <span className={styles.contactSpan}>Type Your Message:</span>

              <textarea
                className={styles.textArea}
                name=""
                id=""
                cols="10"
                rows="5"
                require="required"
              ></textarea>
            </div>
            <div className={styles.button}>
              <Button className={styles.inputBox}>Submit</Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
