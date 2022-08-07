import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../Components/Products/ProductCard";
import { productsAction } from "../action/productAction.js";
import Loader from "../Components/Utils/Loader";
import ErrorMessage from "../Components/Utils/ErrorMessage";
import { Helmet } from "react-helmet";

import styles from "../styles/products.module.css";

const Products = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  const params = useParams();

  const keyword = params.keyword;
  const [productListFilter, setProductListFilter] = useState([]);
  const [mainCat, setMainCat] = useState([]);
  const [mainCatSelect, setMainCatSelect] = useState(0);
  const [subCatSelect, setSubCatSelect] = useState("all");
  const [subCat, setSubCat] = useState([]);

  useEffect(() => {
    dispatch(productsAction(keyword));
  }, [dispatch, keyword]);

  useEffect(() => {
    setProductListFilter(products);
    let arrCat = [];
    for (let i = 0; i < productList.products.length; i++) {
      if (!arrCat.includes(productList.products[i].mainCategory)) {
        arrCat.push(productList.products[i].mainCategory);
      }
    }

    setMainCat(arrCat);

    let url_string = window.location.href;
    let url = new URL(url_string);

    if (url.searchParams.get("maincat")) {
      changeMainCat(
        url.searchParams.get("maincat"),
        url.searchParams.get("subcat")
      );
    }
  }, [products]);

  const changeMainCat = (value, subValue) => {
    setMainCatSelect(value);
    setSubCatSelect(subValue);

    var queryParams = new URLSearchParams(window.location.search);
    queryParams.set("maincat", value);
    queryParams.set("subcat", subValue);

    window.history.replaceState(null, null, "?" + queryParams.toString());

    let arrCat = [];
    for (let i = 0; i < productList.products.length; i++) {
      if (!arrCat.includes(productList.products[i].sub_category)) {
        arrCat.push(productList.products[i].sub_category);
      }
    }

    let arrCatFilters = [];
    for (let i = 0; i < arrCat.length; i++) {
      if (value === "woman") {
        if (arrCat[i].includes("woman")) {
          arrCatFilters.push(arrCat[i]);
        }
      } else if (value === "man") {
        if (!arrCat[i].includes("woman")) {
          arrCatFilters.push(arrCat[i]);
        }
      } else {
        if (arrCat[i].includes(value)) {
          arrCatFilters.push(arrCat[i]);
        }
      }
    }
    setSubCat(arrCatFilters);

    let filterProduct = [];
    for (let i = 0; i < productList.products.length; i++) {
      if (productList.products[i].mainCategory === value) {
        filterProduct.push(productList.products[i]);
      }
    }

    if (subValue !== "all") {
      var newArr = filterProduct.filter(function (el) {
        return el.sub_category === subValue;
      });
    } else {
      newArr = filterProduct;
    }
    setProductListFilter(newArr);
  };

  return (
    <>
      <h1 className={styles.titleShop}>Products</h1>
      <div className={styles.filterTop}>
        <select
          className={styles.filterSelect}
          value={mainCatSelect}
          onChange={(e) => changeMainCat(e.target.value, "all")}
        >
          <option disabled value={0}>
            select
          </option>
          {mainCat.map((item) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>

        <select
          className={styles.filterSelect}
          value={subCatSelect}
          onChange={(e) => changeMainCat(mainCatSelect, e.target.value)}
        >
          <option value="all">all</option>
          {subCat.map((item) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : (
        <>
          <main className={`${styles.main} ${styles.bdGrid}`}>
            {productListFilter.map((product) => (
              <div className={styles.product} key={product._id}>
                {<ProductCard product={product} />}
              </div>
            ))}
          </main>
        </>
      )}
    </>
  );
};
export default Products;
