import React, { useEffect, useState } from "react";
import ProductCard from "./../Home/ProductCard";
import "./ProductList.css";
import apiClient from "../../utils/api-client";
import useData from "../../hooks/useData";
import ProductCardSkeleton from "./ProductCardSkeleton";
import { useSearchParams } from "react-router-dom";
import Pagination from "./../Common/Pagination";
import useProductList from "../../hooks/useProductList";

const ProductList = () => {
  const [search, setSearch] = useSearchParams();
  const category = search.get("category");
  const searchQuery = search.get("search");
  // const [page, setPage] = useState(1);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [sortBy, setSortBy] = useState("");

  const { data, error, isFetching, hasNextPage, fetchNextPage } =
    useProductList({
      search: searchQuery,
      category,
      perPage: 10,
    });

  console.log("Data in Product List", data);
  let Skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  // console.log("Data", data.totalPages);
  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;

      const lastPage = data?.pages?.[data.pages.length - 1];

      if (
        scrollTop + clientHeight >= scrollHeight - 5 &&
        !isFetching &&
        hasNextPage &&
        lastPage &&
        lastPage.currentPage < lastPage.totalPages
      ) {
        fetchNextPage();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll); // cleanup on unmount
  }, [data, isFetching, fetchNextPage]);

  useEffect(() => {
    if (!data?.pages?.length) return; // exit if data.pages is empty or undefined

    // Flatten all products from every page
    const products = data.pages.flatMap((page) => page.products || []);
    // console.log("Flattened products:", products);

    let sorted = [...products]; // create a copy before sorting

    switch (sortBy) {
      case "price desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "price asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "rate desc":
        sorted.sort((a, b) => (b.reviews?.rate ?? 0) - (a.reviews?.rate ?? 0));
        break;
      case "rate asc":
        sorted.sort((a, b) => (a.reviews?.rate ?? 0) - (b.reviews?.rate ?? 0));
        break;
      default:
        // no sorting
        break;
    }

    setSortedProducts(sorted);
  }, [sortBy, data]);

  // console.log("Sorted Products", sortedProducts);
  return (
    <section className="products_list_section">
      <header className="align_center product_list_header">
        <h2>Products</h2>
        <select
          name="sort"
          id=""
          className="product_sorting"
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="">Relevance</option>
          <option value="price desc">Price HIGH to LOW</option>
          <option value="price asc">Price LOW to HIGH</option>
          <option value="rate desc">Rate HIGH to LOW</option>
          <option value="rate asc">Rate LOW to HIGH</option>
        </select>
      </header>

      <div className="product_list">
        {error && <p className="error_message">{error}</p>}
        {sortedProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}

        {isFetching &&
          Skeletons.map((item) => <ProductCardSkeleton key={item} />)}

        {/* <button onClick={() => handlePageChange(2)}>page 2</button> */}
      </div>
      {/* {data && (
        <Pagination
          totalProducts={data.totalProducts}
          productsPerPage={8}
          onClick={handlePageChange}
          currentPage={page}
        />
      )} */}
    </section>
  );
};

export default ProductList;
