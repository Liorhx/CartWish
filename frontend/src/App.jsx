import React, { useCallback } from "react";

import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Routing from "./components/Routings/Routing";
import { useEffect } from "react";
import { useState } from "react";
import { getJwt, getUser } from "./services/userServices";
import setAuthToken from "./utils/setAuthToken";
import {
  addToCartApi,
  decreaseProductApi,
  getCartApi,
  increaseProductApi,
  removeFromCartApi,
} from "./services/cartService";
import { ToastContainer, toast } from "react-toastify";
import UserContext from "./contexts/UserContext";
import CartContext from "./contexts/CartContext";
import { set } from "react-hook-form";

setAuthToken(getJwt());
const App = () => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    try {
      const jwtUser = getUser();
      if (Date.now() >= jwtUser.exp * 1000) {
        localStorage.removeItem("Token");
        location.reload();
      }
      setUser(jwtUser);
    } catch (err) {}
  }, []);
  // console.log(user);
  const addToCart = useCallback(
    (product, quantity) => {
      const updatedCart = [...cart];
      const productIndex = updatedCart.findIndex(
        (item) => item.product._id === product._id,
      );
      if (productIndex === -1) {
        updatedCart.push({ product: product, quantity: quantity });
      } else {
        updatedCart[productIndex].quantity += quantity;
      }
      setCart(updatedCart);
      addToCartApi(product._id, quantity)
        .then((res) => {
          toast.success("Product added successfully");
        })
        .catch((err) => {
          toast.error("Failed to add product");
          setCart(cart);
        });
    },
    [cart],
  );
  const removeFromCart = useCallback(
    (id) => {
      const oldCart = [...cart];
      const newCart = oldCart.filter((item) => item.product._id !== id);
      setCart(newCart);
      removeFromCartApi(id).catch((err) => {
        toast.error("Failed to remove Product form cart");
        setCart(oldCart);
      });
    },
    [cart],
  );
  const updateCart = useCallback(
    (type, id) => {
      const oldCart = [...cart];
      const updatedCart = [...cart];
      const productIndex = updatedCart.findIndex(
        (item) => item.product._id === id,
      );
      if (type === "increment") {
        // console.log("inc");
        updatedCart[productIndex].quantity += 1;
        setCart(updatedCart);
        increaseProductApi(id).catch((err) => {
          toast.error("Failed to increase Product");
          setCart(oldCart);
        });
      }
      if (type === "decrement") {
        // console.log("dec");

        updatedCart[productIndex].quantity -= 1;
        setCart(updatedCart);
        decreaseProductApi(id).catch((err) => {
          toast.error("Failed to decrease Product");
          setCart(oldCart);
        });
      }
    },
    [cart],
  );
  const getCart = useCallback(() => {
    getCartApi()
      .then((res) => {
        setCart(res.data);
      })
      .catch((err) => {
        toast.error("Failed to load products");
      });
  }, [user]);

  useEffect(() => {
    if (user) {
      getCart();
      // console.log("old", cart);
    }
  }, [user]);
  return (
    <UserContext.Provider value={user}>
      <CartContext.Provider
        value={{ cart, addToCart, removeFromCart, updateCart, setCart }}
      >
        {/* <CartContext.Provider value={{ cart }}> */}
        <div className="app">
          <Navbar />
          <main>
            <ToastContainer position="bottom-right" />
            <Routing />
          </main>
        </div>
      </CartContext.Provider>
    </UserContext.Provider>
  );
};

export default App;
// import React, { useMemo } from "react";
// const expensiveComputation = (num) => {
//   console.log(`Computing...for ${num}...`);
//   for (let i = 0; i < 1000000000; i++) {
//     num += 1;
//   }
//   return num;
// };
// const App = () => {
//   const [count, setCount] = React.useState(0);
//   const [dark, setDark] = React.useState(false);

//   const total = useMemo(() => expensiveComputation(count), [count]);

//   return (
//     <div>
//       <div>
//         <button onClick={() => setCount(count - 1)}>-</button>
//         <span>{count}</span>
//         <button onClick={() => setCount(count + 1)}>+</button>
//       </div>
//       <h3>Total = {total}</h3>
//       <h3>Theme : {dark ? "dark" : "light"}</h3>
//       <button onClick={() => setDark(!dark)}>Change Theme</button>
//     </div>
//   );
// };

// export default App;
