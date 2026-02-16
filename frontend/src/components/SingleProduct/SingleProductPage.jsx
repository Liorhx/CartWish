import React, { memo, useContext, useState } from "react";
import "./SingleProductPage.css";
import QuantityInput from "./QuantityInput";
import { useParams } from "react-router-dom";
import useData from "./../../hooks/useData";
import Loader from "./../Common/Loader";
import CartContext from "../../contexts/CartContext";
import UserContext from "../../contexts/UserContext";

const SingleProductPage = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const {
    data: product,
    error,
    isLoading,
  } = useData(`/products/${id}`, null, ["products", id]);
  // console.log("SingleProductPage Data", product);
  const { addToCart } = useContext(CartContext);
  const user = useContext(UserContext);
  return (
    <section className="align_center single_product">
      {isLoading ? (
        <Loader />
      ) : error ? (
        <em className="form_error">{error}</em>
      ) : !product ? (
        <p>No product found.</p>
      ) : (
        <>
          {product && (
            <>
              <div className="align_center">
                <div className="single_product_thumbnail">
                  {product.images.map((image, index) => (
                    <img
                      key={index}
                      className={
                        selectedImage === index ? "selected_image" : ""
                      }
                      onClick={() => setSelectedImage(index)}
                      src={`https://cartwish-k8yo.onrender.com/products/${image}`}
                      alt={product.title}
                    />
                  ))}
                </div>
                <div className="single_product_display">
                  <img
                    src={`https://cartwish-k8yo.onrender.com/products/${product.images[selectedImage]}`}
                    alt={product.title}
                  />
                </div>
              </div>
              <div className=" single_product_details">
                <h1 className="single_product_title">{product.title}</h1>
                <p className="single_product_description">
                  {product.description}
                </p>
                <p className="single_product_price">
                  ${product.price.toFixed(2)}
                </p>
                {user && (
                  <>
                    <h2 className="quantity_title">Quantity:</h2>
                    <div className="align_center quantity_input">
                      <QuantityInput
                        quantity={quantity}
                        setQuantity={setQuantity}
                        stock={product.stock}
                      />
                    </div>
                    <button
                      className="search_button add_cart"
                      onClick={() => addToCart(product, quantity)}
                    >
                      Add to Cart
                    </button>
                  </>
                )}
              </div>
            </>
          )}
        </>
      )}
    </section>
  );
};

export default memo(SingleProductPage);
