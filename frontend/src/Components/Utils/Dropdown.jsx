import React, { useState, useEffect } from "react";
import { NavData, AdminNavData } from "../Header/NavData.jsx";
import { Link } from "react-router-dom";
import styles from "../../styles/dropdown.module.css";

const Dropdown = (user_info) => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  return (
    <>
      {!user_info.user_info.isAdmin && (
        <ul
          onClick={handleClick}
          className={`${styles["dropdownMenu"]} ${click ? "clicked" : ""} ${
            user_info.from_profile ? `{styles.fromProfile}` : ""
          }`}
        >
          {NavData.map((item, index) => {
            return (
              <li key={index} className={styles.dropdownLinkItem}>
                <Link
                  to={item.path}
                  className={`${styles.dropdownItem}`}
                  onClick={() => setClick(false)}
                >
                  {item.title}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
      {user_info.user_info.isAdmin && (
        <ul
          onClick={handleClick}
          className={`${styles["dropdownMenu"]} ${click ? "clicked" : ""}`}
        >
          {AdminNavData.map((item, index) => {
            return (
              <li key={index} className={styles.dropdownLinkItem}>
                <Link
                  to={item.path}
                  className={`${styles.dropdownItem}`}
                  onClick={() => setClick(false)}
                >
                  {item.title}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default Dropdown;
