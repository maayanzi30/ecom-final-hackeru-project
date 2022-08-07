import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_CLEAR_SHIPPING_ADDRESS,
  CART_CLEAR_ITEMS,
} from "../constants/cartConstants";

export const cartReducer = (
  state = {
    cartItems: [],
    message: "",
    shippingAddress: null,
    paymentMethod: "PayPal",
  },
  action
) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;

      const existItem = state.cartItems.find((i) => i.product === item.product);

      if (existItem) {
        return {
          ...state,
          message: action.payload.message,
          cartItems: state.cartItems.map((i) =>
            i.product === existItem.product ? item : i
          ),
        };
      } else {
        return {
          ...state,
          message: action.payload.message,
          cartItems: [...state.cartItems, item],
        };
      }

    case CART_REMOVE_ITEM:
      return {
        ...state,
        message: action.payload.message,
        cartItems: state.cartItems.filter((i) => i.product !== action.payload),
      };

    case CART_CLEAR_ITEMS:
      return {
        ...state,
        cartItems: [],
        message: "",
      };

    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };

    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };

    case CART_CLEAR_SHIPPING_ADDRESS:
      return {
        ...state,
        message: "",
        shippingAddress: null,
      };
    default:
      return state;
  }
};
