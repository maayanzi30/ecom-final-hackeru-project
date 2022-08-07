import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import Loader from "../Components/Utils/Loader";
import {
  productsAction,
  deleteProduct,
  createProduct,
} from "../action/productAction";
import { PRODUCT_CREATE_RESET } from "../constants/productConstants";

import { FaTrash } from "react-icons/fa";
import { GrEdit } from "react-icons/gr";
import { MdPostAdd } from "react-icons/md";
import styles from "../styles/productList.module.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, message } = productList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productUpdate = useSelector((state) => state.productUpdate);
  const { error: errorUpdate, success } = productUpdate;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: deleteError,
    success: successDelete,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    product: createdProduct,
    loading: loadingCreate,
    success: successCreate,
    error: errorCreate,
  } = productCreate;

  useEffect(() => {
    dispatch(productsAction());
  }, [dispatch]);

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });
    if (!userInfo || (userInfo && !userInfo.isAdmin)) {
      navigate("/login");
      return;
    }

    if (successCreate) {
      navigate(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(productsAction);
    }
  }, [
    dispatch,
    navigate,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      dispatch(deleteProduct(id));
    }
  };

  const createProductHandler = () => {
    dispatch(createProduct());
  };
  return (
    <>
      <Helmet>
        <title>eCom | Product List</title>
      </Helmet>
      <h1>Products</h1>
      <div className={styles.buttonDiv}>
        <button className={styles.productButton} onClick={createProductHandler}>
          <MdPostAdd className={styles.addProduct} />
          Create Product
        </button>
      </div>
      {loading || loadingCreate ? (
        <Loader />
      ) : (
        <>
          {success &&
            toast.success(
              { message },
              {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              }
            )}
          {deleteError &&
            toast.error(
              { deleteError },
              {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              }
            )}

          {errorUpdate &&
            toast.error(
              { errorUpdate },
              {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              }
            )}

          {errorCreate &&
            toast.error(
              { errorCreate },
              {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              }
            )}

          {error ? (
            toast.error(
              { error },
              {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              }
            )
          ) : loadingDelete ? (
            <Loader />
          ) : (
            <>
              <table className={styles.table}>
                <thead className={styles.tableHeader}>
                  <tr className={styles.tableRow}>
                    <th className={styles.tableTitle}>ID</th>
                    <th className={styles.tableTitle}>IMAGE</th>
                    <th className={styles.tableTitle}>NAME</th>
                    <th className={styles.tableTitle}>PRICE</th>
                    <th className={styles.tableTitle}>SALE PRICE</th>
                    <th className={styles.tableTitle}>MAIN CATEGORY</th>
                    <th className={styles.tableTitle}>SUB CATEGORY</th>
                    <th className={styles.tableTitle}>
                      EDIT
                      <br />
                      /DELETE
                    </th>
                  </tr>
                </thead>
                <tbody className={styles.tableBody}>
                  {!loading &&
                    products &&
                    products.map((product) => (
                      <tr className={styles.tableRow} key={product._id}>
                        <td data-label="ID" className={styles.tableData}>
                          {product._id.slice(17, 24)}
                        </td>
                        <td
                          data-label="IMAGE"
                          className={`${styles.tableData} ${styles.tableImageField}`}
                        >
                          <img
                            style={{ maxWidth: "50px" }}
                            src={product.src}
                            alt={product.name}
                          />
                        </td>
                        <td
                          data-label="NAME"
                          className={`${styles.tableData} ${styles.tableNameField}`}
                        >
                          {product.name}
                        </td>
                        <td data-label="PRICE" className={styles.tableData}>
                          {product.fullPrice}${" "}
                        </td>
                        <td
                          data-label="SALE PRICE"
                          className={styles.tableData}
                        >
                          {product.salePrice}${" "}
                        </td>
                        <td
                          data-label="MAIN CATEGORY"
                          className={styles.tableData}
                        >
                          {product.mainCategory}
                        </td>
                        <td
                          data-label="SUB CATEGORY"
                          className={styles.tableData}
                        >
                          {product.sub_category}
                        </td>
                        <td className={styles.btnContainer}>
                          <Link to={`/admin/product/${product._id}/edit`}>
                            <GrEdit className={styles.icon} />
                          </Link>

                          <FaTrash
                            className={styles.icon}
                            onClick={() => deleteHandler(product._id)}
                          ></FaTrash>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </>
          )}
        </>
      )}
    </>
  );
};

export default ProductList;
