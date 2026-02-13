import React from "react";
import ProductsPage from "./../Products/ProductsPage";
import SingleProductPage from "./../SingleProduct/SingleProductPage";
import SignupPage from "./../Authentication/SignupPage";
import LoginPage from "./../Authentication/LoginPage";
import CartPage from "./../Cart/CartPage";
import MyOrder from "./../MyOrder/MyOrder";
import Home from "../../pages/Home";
import { Route, Routes } from "react-router-dom";
import Logout from "./../Authentication/Logout";
import ProtectedRoutes from "./ProtectedRoutes";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/product/:id" element={<SingleProductPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedRoutes />}>
        <Route path="/cart" element={<CartPage />} />
        <Route path="/myorders" element={<MyOrder />} />
        <Route path="/logout" element={<Logout />} />
      </Route>
    </Routes>
  );
};

export default Routing;
