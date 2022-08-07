import React from "react";
import { mainCategories } from "../../data";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import styles from "../../styles/mainCategory.module.css";
import Loader from "../Utils/Loader";
import ErrorMessage from "../Utils/ErrorMessage";
import { useSelector } from "react-redux";
const MainCategory = () => {
  const productList = useSelector((state) => state.productList);
  let { loading, error } = productList;

  return (
    <>
      <Helmet>
        <title>eCom | The best eCommerce site to buy clothes</title>
      </Helmet>
      <h1 className={styles.mainCat}>Categories</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : (
        <section className={`${styles.main} ${styles.bdGrid}`}>
          {mainCategories.map((cat, id) => {
            return (
              <div key={id} className={styles.card}>
                <Link to={cat.link} className={styles.link}>
                  <div className={styles.mainImg}>
                    <img
                      src={cat.src}
                      alt={cat.title}
                      className={styles.imgCard}
                    />
                  </div>
                  <div className={styles.title}>
                    <h3 className={styles.imgTitle}>{cat.title}</h3>
                  </div>
                </Link>
              </div>
            );
          })}
        </section>
      )}
    </>
  );
};

export default MainCategory;
