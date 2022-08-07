import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productDetailsAction } from "../action/productAction.js";
import Loader from "../Components/Utils/Loader";
import ErrorMessage from "../Components/Utils/ErrorMessage";
import styles from "../styles/productPage.module.css";
import { Helmet } from "react-helmet";

const ProductPage = () => {
  const { id } = useParams();
  const [qty, setQty] = useState(1);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(productDetailsAction(id));
  }, [dispatch, id]);

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };

  return (
    <>
      <Helmet>
        <title>
          {!product ? `eCom - the best place to buy` : `eCom | ${product.name}`}
        </title>
      </Helmet>
      <div className={styles.productHead}>
        {loading ? (
          <Loader />
        ) : error ? (
          <ErrorMessage>{error}</ErrorMessage>
        ) : (
          <>
            <h1 className={styles.productTitle}>{product.name} </h1>
            <br />
            <div className={styles.parDet}>
              <span className={styles.par}>
                Category:
                <Link to={`/categories/${product.mainCategory}`}>
                  <span className={styles.spar}> {product.sub_category}</span>
                </Link>
              </span>
              <div className={styles.productContainer}>
                <span className={styles.par}>
                  Count In Stock:
                  {product.countInStock > 0
                    ? ` ${product.countInStock}`
                    : "Out of Stock"}
                  <br />
                </span>
              </div>

              <div className={styles.detailsCon}>
                <div className={styles.imgBx}>
                  <img
                    src={product.src}
                    alt={product.name}
                    className={styles.productImg}
                  />
                </div>
                <div className={styles.details}>
                  <div className={styles.productContent}>
                    <p className={styles.paragraph}>{product.description}</p>
                  </div>
                  <div className={styles.qtyPriceDetails}>
                    <div className={styles.qua}>
                      Quantity:
                      <select
                        name="qty"
                        id="q"
                        className={`${styles.formSelect} ${styles.formControl}`}
                        value={product.qty}
                        onChange={(e) => setQty(e.target.value)}
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </div>

                    <h3 className={styles.productCount}>
                      {product.salePrice}$
                    </h3>
                  </div>
                  {product.countInStock <= 0 ? (
                    <button
                      disabled
                      className={`${styles.btnBlock} ${styles.disabled}`}
                    >
                      Out of Stock
                    </button>
                  ) : (
                    <button
                      onClick={addToCartHandler}
                      className={styles.buyProduct}
                    >
                      Add To Cart
                    </button>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ProductPage;
