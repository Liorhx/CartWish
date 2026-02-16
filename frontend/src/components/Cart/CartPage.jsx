import React, { memo, useContext, useMemo } from "react";
import "./CartPage.css";

import Table from "../Common/Table";
import QuantityInput from "./../SingleProduct/QuantityInput";
import remove from "../../assets/remove.png";
import UserContext from "../../contexts/UserContext";
import CartContext from "../../contexts/CartContext";
import { set } from "react-hook-form";
import { toast } from "react-toastify";
import { checkoutApi } from "../../services/orderServices";

const CartPage = () => {
  const { cart, removeFromCart, updateCart, setCart } = useContext(CartContext);
  // console.log("cart", cart);
  const user = useContext(UserContext);
  // console.log("userpic", user?.profilePic);
  const checkout = () => {
    const oldCart = [...cart];
    setCart([]);
    checkoutApi()
      .then(() => {
        toast.success("Order placed successfully");
      })
      .catch(() => {
        toast.error("Failed to place order");
        setCart(oldCart);
      });
  };
  const subtotal = useMemo(() => {
    let total = 0;
    cart.forEach((item) => {
      total += item.product.price * item.quantity;
    });
    return total;
  }, [cart]);
  return (
    <section className="align_center cart_page">
      <div className="align_center user_info">
        <img
          className="user_profile"
          src={`https://cartwish-k8yo.onrender.com/profile/${user?.profilePic}`}
          alt="user profile"
        />
        <div>
          <p className="user_name">Name: {user?.name}</p>
          <p className="user_email">Email: {user?.email}</p>
        </div>
      </div>
      <Table headings={["Item", "Price", "Quantity", "Total", "Remove"]}>
        <tbody>
          {cart?.map(({ product, quantity }, index) => (
            <tr key={index}>
              <td>{product.title}</td>
              <td>${product.price}</td>
              <div className="align_center table_quantity_input">
                <QuantityInput
                  quantity={quantity}
                  stock={product.stock}
                  setQuantity={updateCart}
                  cartPage={true}
                  productId={product._id}
                />
              </div>
              <td>${quantity * product.price}</td>
              <td>
                <img
                  src={remove}
                  className="table_remove_icon"
                  alt=""
                  onClick={() => removeFromCart(product._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <table className="cart_bill">
        <tbody>
          <tr>
            <td>Subtotal</td>
            <td>${subtotal}</td>
          </tr>
          <tr>
            <td>Shipping Charges</td>
            <td>$5</td>
          </tr>
          <tr className="cart_bill_final">
            <td>Total</td>
            <td>${subtotal + 5}</td>
          </tr>
        </tbody>
      </table>
      <button className="search_button checkout_button" onClick={checkout}>
        Checkout
      </button>
    </section>
  );
};

export default memo(CartPage);
