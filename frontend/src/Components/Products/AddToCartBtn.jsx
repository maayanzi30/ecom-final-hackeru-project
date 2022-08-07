import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { addToCart } from "../../action/cartAction";

const AddToCartBtn = ({ disabled, id, qty }) => {
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    const message =
      qty > 1 ? "The products added to cart" : "The product added to cart";

    dispatch(addToCart(id, qty, message));
  };

  return (
    <button
      className=""
      type="button"
      disabled={disabled}
      onClick={addToCartHandler}
    >
      Add to cart
    </button>
  );
};

AddToCartBtn.defaultProps = {
  qty: 1,
};

AddToCartBtn.propTypes = {
  disabled: PropTypes.bool.isRequired,
  id: PropTypes.string,
};

export default AddToCartBtn;
