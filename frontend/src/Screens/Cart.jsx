import React, { useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../action/cartAction";
import { Helmet } from "react-helmet";
import ErrorMessage from "../Components/Utils/ErrorMessage";
import { FaTrash } from "react-icons/fa";
import styles from "../styles/cart.module.css";

const Cart = () => {
  const location = useLocation();
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const { cartItems } = cart;

  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id, qty) => {
    const message =
      qty === 1
        ? "the product successfully removed"
        : "the products successfully removed";

    dispatch(removeFromCart(id, message));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <>
      <Helmet>
        <title>eCom | cart</title>
      </Helmet>
      <div>
        <h1 className={styles.cartTitle}>Shopping Cart</h1>

        <div className={styles.wrapperContainer}>
          {cartItems.length === 0 ? (
            <div className={styles.emptyCartMessage}>
              Your Cart Is Empty <br />
              <Link to="/products">Go To Products</Link>
            </div>
          ) : (
            <>
              <div className={styles.cart}>
                {cartItems.map((item) => (
                  <div className={styles.products} key={item.product}>
                    <div className={styles.imgWrapper}>
                      <img
                        className={styles.imgCo}
                        src={item.image}
                        alt={item.name}
                      />
                    </div>
                    <div className={styles.prodContent}>
                      <h3 className={styles.productsName}>{item.name}</h3>
                    </div>
                    <div className={styles.cartWrapper}>
                      <div className={styles.cartContent}>
                        <footer className={styles.fooContent}>
                          <h4 className={styles.price}> ${item.price}</h4>
                          <p>
                            {item.countInStock > 0 ? (
                              <select
                                className={styles.unit}
                                value={item.qty}
                                onChange={(e) => {
                                  dispatch(
                                    addToCart(
                                      item.product,
                                      Number(e.target.value),
                                      <ErrorMessage>
                                        "your cart successfully updated"
                                      </ErrorMessage>
                                    )
                                  );
                                }}
                              >
                                {[...Array(item.countInStock).keys()].map(
                                  (x) => (
                                    <option key={x + 1} value={x + 1}>
                                      {x + 1}
                                    </option>
                                  )
                                )}
                              </select>
                            ) : (
                              <p>out of stock</p>
                            )}
                          </p>
                        </footer>
                      </div>
                      <div className={styles.buttonWrapper}>
                        <button
                          onClick={() =>
                            removeFromCartHandler(item.product, item.qty)
                          }
                          className={styles.btnArea}
                        >
                          <span className={styles.btn2}>
                            <FaTrash />
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <footer className={styles.siteFooter}>
                <div className={styles.containerClearfix}>
                  <div className={styles.left}>
                    <h2 className={styles.subtotal}>
                      Subtotal (
                      {cartItems.reduce(
                        (acc, item) => acc + Number(item.qty),
                        0
                      )}
                      ) items
                    </h2>
                  </div>
                  <div className={styles.right}>
                    <p className={styles.total}>
                      <span>Total: </span>
                      <span>
                        $
                        {cartItems
                          .reduce((acc, item) => acc + item.qty * item.price, 0)
                          .toFixed(2)}
                      </span>
                    </p>
                    <button
                      className={styles.checkOutBtn}
                      disabled={cartItems.length === 0}
                      onClick={checkoutHandler}
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              </footer>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
