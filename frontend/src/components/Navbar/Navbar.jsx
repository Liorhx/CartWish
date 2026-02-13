import React, { use, useContext, useEffect, useState } from "react";
import { motion } from "motion/react";

import "./Navbar.css";
import rocket from "../../assets/rocket.png";
import lock from "../../assets/lock.png";
import star from "../../assets/star.png";
import signup from "../../assets/signup.png";
import idbutton from "../../assets/idbutton.png";
import box from "../../assets/box.png";
import LinkWithIcon from "./LinkWithIcon";
import { Link, NavLink, useNavigate } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import CartContext from "../../contexts/CartContext";
import { getSuggestionsApi } from "../../services/productServices";
import { set } from "react-hook-form";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const user = useContext(UserContext);
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();
  const [suggestions, setSuggestions] = useState([]);
  const [selectedItem, setSelectedItem] = useState(-1);
  const handleKeyDown = (e) => {
    // console.log("Key down", e.key);
    if (selectedItem < suggestions.length) {
      if (e.key === "ArrowDown") {
        setSelectedItem((counter) =>
          counter === suggestions.length - 1 ? 0 : counter + 1
        );
      } else if (e.key === "ArrowUp") {
        setSelectedItem((counter) =>
          counter === 0 ? suggestions.length - 1 : counter - 1
        );
      } else if (e.key === "Enter" && selectedItem > -1) {
        const suggestion = suggestions[selectedItem];
        navigate(`/products?search=${suggestion.title}`);
        setSearch("");
        setSuggestions([]);
      }
    } else {
      setSelectedItem(-1);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim() !== "") {
      navigate(`/products?search=${search.trim()}`);
    }
    setSuggestions([]);
  };
  useEffect(() => {
    const delaySuggestion = setTimeout(() => {
      if (search.trim() !== "") {
        getSuggestionsApi(search)
          .then((res) => {
            setSuggestions(res.data);
          })
          .catch((err) => console.log(err));
      } else {
        setSuggestions([]);
      }
    }, 300);
    return () => clearTimeout(delaySuggestion);
  }, [search]);
  // console.log("Suggestions", suggestions);
  return (
    <motion.div
      className="align_center navbar"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      <div className="align_center">
        <NavLink to="/" className="navbar_heading">
          <h3>WishCart</h3>
        </NavLink>
        <form action="" className="navbar_form" onSubmit={handleSubmit}>
          <input
            className="search_input"
            type="text"
            placeholder="Search Products"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className="search_button">Search</button>
          {suggestions.length > 0 && (
            <ul className="search_result">
              {suggestions.map((suggestion, index) => (
                <li
                  className={
                    selectedItem === index
                      ? "search_suggestion_link active"
                      : "search_suggestion_link"
                  }
                  key={suggestion._id}
                >
                  <Link
                    to={`/products?search=${suggestion.title}`}
                    onClick={() => {
                      setSearch("");
                      setSuggestions([]);
                    }}
                  >
                    {suggestion.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </form>
      </div>
      <div className="align_center navbar_links">
        <LinkWithIcon title="Home" link="/" emoji={rocket} />
        <LinkWithIcon title="Products" link="/products" emoji={star} />
        {!user && (
          <>
            <LinkWithIcon title="Login" link="/login" emoji={idbutton} />
            <LinkWithIcon title="Signup" link="/signup" emoji={signup} />{" "}
          </>
        )}
        {user && (
          <>
            <LinkWithIcon title="My Orders" link="/myorders" emoji={box} />
            <LinkWithIcon title="Logout" link="/logout" emoji={lock} />
            <NavLink to="/cart" className="align_center">
              Cart <p className="align_center cart_counts">{cart.length}</p>
            </NavLink>
          </>
        )}
      </div>
      <div></div>
    </motion.div>
  );
};

export default Navbar;
