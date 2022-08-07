import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import Home from "./Screens/Home";
import About from "./Screens/About";
import ContactUs from "./Screens/ContactUs";
import Products from "./Screens/Products";
import ProductPage from "./Screens/ProductPage";
import Profile from "./Screens/Profile";
import UserRegister from "./Screens/UserRegister";
import Cart from "./Screens/Cart.jsx";
import Login from "./Screens/Login";
import Shipping from "./Screens/Shipping";
import Payment from "./Screens/Payment";
import PlaceOrder from "./Screens/PlaceOrder";
import Orders from "./Screens/Orders";
import UserList from "./Screens/UserList";
import UserEdit from "./Screens/UserEdit";
import ProductList from "./Screens/ProductList";
import ProductEdit from "./Screens/ProductEdit";
import OrderList from "./Screens/OrderList";
import MyOrders from "./Screens/MyOrders";
import PageNotFound from "./Screens/PageNotFound";
import Footer from "./Screens/Footer.jsx";
import Form from "./Components/Utils/Form";
import { ToastContainer } from "react-toastify";
import ForgotPass from "./Screens/ForgotPass";
import ResetPassword from "./Screens/ResetPassword";

const App = () => {
  return (
    <>
      <Header />
      <ToastContainer />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgotpassword" element={<ForgotPass />} />
          <Route path="/reset-password/:id" element={<ResetPassword />} />
          <Route path="/register" element={<UserRegister />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<About />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/cart/:id" element={<Cart />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/placeorder" element={<PlaceOrder />} />
          <Route path="/myorders" element={<MyOrders />} />
          <Route path="/orders/:id" element={<Orders />} />
          <Route path="/admin/user/userlist" element={<UserList />} />
          <Route path="/admin/user/:id/edit" element={<UserEdit />} />
          <Route path="/admin/productlist" element={<ProductList />} />
          <Route path="/admin/product/:id/edit" element={<ProductEdit />} />
          <Route path="/admin/orderlist" element={<OrderList />} />
          <Route path="/admin/users" element={<UserList />} />
          <Route exact path="/search/:keyword" element={<Products />}></Route>
          <Route path="*" element={<PageNotFound />} />
          <Route
            exact
            path="/admin/products/:pagenumber"
            element={<ProductList />}
          />
          <Route path="/form" element={<Form />} />
        </Routes>
      </main>
      <Footer className="footer" />
    </>
  );
};

export default App;
