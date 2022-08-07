import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Dropdown from "../Utils/Dropdown";
import { TiShoppingCart } from "react-icons/ti";
import { FaBars, FaTimes } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { logout } from "../../action/userAction.js";
import { useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";

import styles from "../../styles/header.module.css";

const Header = () => {
  const navRef = useRef();
  const navigate = useNavigate();

  const [click, setClick] = useState(false);
  const [openMobile, setOpenMobile] = useState(true);
  const [dropdown, setDropdown] = useState(false);
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const [keyword, setKeyword] = useState("");
  const [isSearch, setIsSearch] = useState(false);

  const triggerSearch = () => {
    if (isSearch) {
      setIsSearch(false);
    } else {
      setIsSearch(true);
    }
  };
  const searchHandler = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
      setKeyword(" ");
    } else {
      navigate("/");
    }
  };

  const handleClick = () => {
    setClick(!click);
    setOpenMobile(!openMobile);
  };
  const closeMobileMenu = () => {
    setClick(true);
    if (window.innerWidth < 960) {
      setOpenMobile(false);
    }
  };

  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  };
  useEffect(() => {
    if (window.innerWidth < 960) {
      setOpenMobile(false);
      setClick(true);
    } else {
      setOpenMobile(true);
    }
  }, []);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav} ref={navRef}>
        <div className={styles.menuCon}>
          <div className={styles.menuIcon} onClick={handleClick}>
            {click ? (
              <FaBars className={styles.fabars} />
            ) : (
              <FaTimes className={styles.fatimes} />
            )}
          </div>
          <ul className={styles.navTitle}>
            <Link
              to="/"
              className={styles.navbarLogo}
              onClick={closeMobileMenu}
            >
              eCom
            </Link>
          </ul>
        </div>
        {openMobile && (
          <ul
            className={`${styles["navMenu"]} ${click ? "styles.active" : ""}`}
          >
            <li className={styles.navItem}>
              <Link
                to="/"
                className={styles.navLinks}
                onClick={closeMobileMenu}
              >
                Home
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link
                to="/about"
                className={styles.navLinks}
                onClick={closeMobileMenu}
              >
                About
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link
                to="/contactus"
                className={styles.navLinks}
                onClick={closeMobileMenu}
              >
                Contact Us
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link
                to="/products"
                className={styles.navLinks}
                onClick={closeMobileMenu}
              >
                Products
              </Link>
            </li>
            {userInfo && (
              <li className={styles.navItem} onClick={logoutHandler}>
                <Link
                  to="/products"
                  className={`${styles.navLinks} ${styles.navLinksMobile}`}
                  onClick={closeMobileMenu}
                >
                  LogOut
                </Link>
              </li>
            )}
          </ul>
        )}

        <ul className={styles.navIcons}>
          {userInfo ? (
            <>
              <li className={styles.liSearch}>
                <div
                  className={`${styles.icon} ${styles.wrapSearch}`}
                  onClick={triggerSearch}
                >
                  <BsSearch
                    className={`${styles.navIcons} ${styles.navSearch}`}
                    size="26"
                  />
                </div>
                {isSearch && (
                  <form onSubmit={searchHandler} className={styles.searchForm}>
                    <div className={styles.userBox}>
                      <input
                        type="text"
                        id="searchField"
                        name="q"
                        onChange={(e) => setKeyword(e.target.value)}
                        placeholder="Search Products..."
                        className={styles.inputField}
                      />
                    </div>
                  </form>
                )}
              </li>
              <li
                className={styles.icon}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
              >
                <Link
                  to="/profile"
                  className={styles.navLinks}
                  onClick={closeMobileMenu}
                >
                  <CgProfile
                    className={styles.navIcons}
                    size="26"
                    title={userInfo.name}
                  />
                </Link>

                {dropdown && <Dropdown user_info={userInfo} />}
              </li>
              <li className={styles.logOutIcon} onClick={logoutHandler}>
                <Link to="/" className={styles.navLinks}>
                  Logout
                </Link>
              </li>
              <li className={`${styles.icon} ${styles.end}`}>
                <Link to="/cart" className={styles.navLinks}>
                  <div className={styles.cartWrapper}>{cartItems.length}</div>
                  <TiShoppingCart className={styles.navIcons} size="26" />
                </Link>
              </li>
            </>
          ) : (
            <li className="icon">
              <Link to="/login" className={styles.navLinks}>
                Login
              </Link>
            </li>
          )}
          <ul>{userInfo && userInfo.isAdmin}</ul>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
