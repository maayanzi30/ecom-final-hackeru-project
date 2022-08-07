import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { TiShoppingCart } from "react-icons/ti";
import { IoMdHeart } from "react-icons/io";
import PropTypes from "prop-types";
import { addToCart } from "../../action/cartAction";
import styles from "../../styles/productCard.module.css";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  const addToCartHandler = () => {
    let checkIfExistInCart = false;
    for (let i = 0; i < cart.cartItems.length; i++) {
      if (cart.cartItems[i].product == product._id) {
        checkIfExistInCart = true;
      }
    }

    if (checkIfExistInCart) {
      toast.info(`${product.name} is already in your cart!`, {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    } else {
      toast.success(`${product.name} is added to your cart!`, {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    dispatch(addToCart(product._id, 1));
  };
  return (
    <>
      <div className={styles.card}>
        <Link to={`/products/${product._id}`} className="link">
          <div className={styles.mainImg}>
            <img
              src={product.src}
              alt={product.title}
              className={styles.imgCard}
            />
          </div>
        </Link>
        <div className={styles.card_name}>
          <h3>{product.name}</h3>
        </div>
        <div className={styles.card__precis}>
          <Link to="" className={styles.card__icon}>
            <IoMdHeart className={`${styles.icons} ${styles.heart}`} />
          </Link>

          <div className={styles.cardPrice}>
            <span className={`${styles.cardPreci} ${styles.cardPreciBefore}`}>
              {product.fullPrice}$
            </span>

            <span className={`${styles.cardPreci} ${styles.cardPreciNow}`}>
              {product.salePrice}$
            </span>
          </div>
          {product.countInStock <= 0 ? (
            <TiShoppingCart
              disabled
              className={`${styles.btnBlock} ${styles.disabled}`}
            />
          ) : (
            <div className={styles.card__icon}>
              <TiShoppingCart
                onClick={addToCartHandler}
                className={styles.icons}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
};
export default ProductCard;
