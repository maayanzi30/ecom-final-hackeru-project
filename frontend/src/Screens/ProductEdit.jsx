import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import ErrorMessage from "../Components/Utils/ErrorMessage";
import Loader from "../Components/Utils/Loader";
import {
  productsAction,
  updateProduct,
  deleteProduct,
} from "../action/productAction";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../styles/productEdit.module.css";

const ProductEdit = () => {
  const { id: productId } = useParams();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [salePrice, setSalePrice] = useState(0);
  const [src, setSrc] = useState("");

  const [sub_category, setSubCategory] = useState("");
  const [mainCategory, setMainCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productDelete = useSelector((state) => state.productDelete);
  const { error: deleteError } = productDelete;

  const productUpdate = useSelector((state) => state.productUpdate);
  const { loading: loadingUpdate, error: errorUpdate, success } = productUpdate;

  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo || (userInfo && !userInfo.isAdmin)) {
      navigate("/");
      return;
    }
    if (success) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      navigate("/admin/productlist");
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(productsAction(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setSrc(product.src);
        setSubCategory(product.subCategory);
        setMainCategory(product.mainCategory);
        setCountInStock(product.countInStock);
        setDescription(product.description);
      }
    }
  }, [dispatch, navigate, product, productId, success, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (!description) {
      toast.error("description is required", {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    if (!src) {
      toast.error("img is requierd", {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    if (!sub_category) {
      toast.error("sub category", {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      return;
    }
    if (!mainCategory) {
      toast.error("main category", {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      return;
    }
    if (name.length < 2) {
      toast.error("name is reqiured", {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    if (salePrice >= price) {
      toast.error("sale price cant be higher than full price", {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        src,
        salePrice,
        mainCategory,
        sub_category,
        description,
        countInStock,
      })
    );
  };
  const deleteHandler = () => {
    if (window.confirm("Are you sure you want to delete?")) {
      dispatch(deleteProduct(productId));
      navigate("/admin/productlist");
    }
  };
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);

      setSrc(data);

      setTimeout(() => {
        setUploaded(true);
        setUploading(false);
      }, 2000);
    } catch (error) {
      setUploading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>eCom | edit product {!product ? "" : `"${product.name}"`}</title>
      </Helmet>

      <Link to="/admin/productlist">Go Back</Link>

      {errorUpdate && <ErrorMessage>{errorUpdate}</ErrorMessage>}
      {deleteError && <ErrorMessage>{deleteError}</ErrorMessage>}
      {loadingUpdate ? (
        <Loader />
      ) : loading ? (
        <Loader />
      ) : error ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : (
        <>
          <h1>Edit Product</h1>
          <table className={styles.table} onSubmit={submitHandler}>
            <thead className={styles.tableHeader}>
              <tr className={styles.tableRow}>
                <th className={styles.tableTitle}>Name</th>
                <th className={styles.tableTitle}>Price</th>
                <th className={styles.tableTitle}>Sale Price</th>
                <th className={styles.tableTitle}>Image</th>
                <th className={styles.tableTitle}>Main Category</th>
                <th className={styles.tableTitle}>Sub Category</th>
                <th className={styles.tableTitle}>count In Stock</th>
                <th className={styles.tableTitle}>Description</th>
              </tr>
            </thead>
            <tbody className={styles.tableBody}>
              <tr className={styles.tableRow}>
                <td className={styles.tableData}>
                  <label className={styles.productEditLabel}>NAME: </label>
                  <input
                    className={styles.productInput}
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required=""
                  />
                </td>
                <td className={styles.tableData}>
                  <label className={styles.productEditLabel}>
                    FULL PRICE:{" "}
                  </label>
                  <input
                    className={styles.productInput}
                    type="number"
                    name="price"
                    placeholder="Enter Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required=""
                  />
                </td>

                <td className={styles.tableData}>
                  <label className={styles.productEditLabel}>
                    SALE PRICE:{" "}
                  </label>
                  <input
                    className={styles.productInput}
                    type="number"
                    name="sale_price"
                    placeholder="Enter sale Price"
                    value={salePrice}
                    onChange={(e) => setSalePrice(e.target.value)}
                    required=""
                  />
                </td>

                <td className={styles.tableData}>
                  <label
                    className={`${styles.productEditLabel} ${styles.inputUpload}`}
                  >
                    <div className={styles.btnUpload}>Upload</div>
                    <input
                      className={`${styles.productInput} ${styles.borderImage}`}
                      type="file"
                      name="images"
                      id="images"
                      required="required"
                      onChange={uploadFileHandler}
                    />
                  </label>
                  {src}
                </td>

                <td className={styles.tableData}>
                  <label className={styles.productEditLabel}>
                    MAIN CATEGORY:{" "}
                  </label>
                  <select onChange={(e) => setMainCategory(e.target.value)}>
                    <option value="">all</option>
                    <option value="man">man</option>
                    <option value="woman">woman</option>
                  </select>
                  {mainCategory}
                </td>
                <td className={styles.tableData}>
                  <label className={styles.productEditLabel}>
                    SUB CATEGORY:{" "}
                  </label>
                  <select
                    onChange={(e) => setSubCategory(e.target.value)}
                    required=""
                  >
                    <option value="">all</option>
                    <option value="man jacket">man jacket</option>
                    <option value="man shirt">man shirt</option>
                    <option value="man jeans">man jeans</option>
                    <option value="woman jacket">woman jacket</option>
                    <option value="woman shirt">woman shirt</option>
                    <option value="woman jeans">woman jeans</option>
                    <option value="other">other</option>
                  </select>
                  {sub_category}
                </td>

                <td className={styles.tableData}>
                  <label className={styles.productEditLabel}>
                    COUNT IN STOCK:{" "}
                  </label>
                  <input
                    className={styles.productInput}
                    type="number"
                    name="countInStock"
                    label="count In Stock"
                    checked={countInStock}
                    onChange={(e) => setCountInStock(e.target.checked)}
                    required=""
                  />
                </td>
                <td className={styles.tableData}>
                  <label className={styles.productEditLabel}>
                    DESCRIPTION:{" "}
                  </label>
                  <input
                    className={styles.productInput}
                    type="text"
                    name="description"
                    label="Description"
                    onChange={(e) => setDescription(e.target.value)}
                    required=""
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div className={styles.buttonWrapper}>
            <button
              type="button"
              className={styles.editProductBtn}
              onClick={submitHandler}
            >
              Update
            </button>
            <button
              type="button"
              className={styles.editProductBtn}
              onClick={deleteHandler}
            >
              Delete
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default ProductEdit;
