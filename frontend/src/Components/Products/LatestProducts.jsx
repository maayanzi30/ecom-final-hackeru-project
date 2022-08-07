import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Product from "./ProductCard.jsx";
import { productsAction } from "../../action/productAction";
import Loader from "../Utils/Loader";
import ErrorMessage from "../Utils/ErrorMessage";

import styles from "../../styles/latestProduct.module.css";
import { Helmet } from "react-helmet";

const LatestProducts = () => {
  const productList = useSelector((state) => state.productList);
  let { products, loading, error } = productList;

  const [latestProducts, setLatestProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (products.length) {
      const res = products.reduce((acc, currProduct) => {
        if (acc[currProduct.sub_category]) {
        } else {
          acc[currProduct.sub_category] = currProduct;
        }
        return acc;
      }, {});

      const prod = [];
      for (const key in res) {
        prod.push(res[key]);
      }
      setLatestProducts(prod);
    }
  }, [products]);

  useEffect(() => {
    dispatch(productsAction());
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>eCom | The best eCommerce site to buy clothes</title>
      </Helmet>
      <h2 className={styles.subTitleShop}>Best Seller</h2>
      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : (
        <section className={`${styles.main} ${styles.bdGrid}`}>
          {latestProducts.map((product) => (
            <div key={product._id} className={styles.product}>
              {<Product product={product} />}
            </div>
          ))}
        </section>
      )}
    </>
  );
};

export default LatestProducts;
