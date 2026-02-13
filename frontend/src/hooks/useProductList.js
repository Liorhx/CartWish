import { useInfiniteQuery } from "@tanstack/react-query";
import apiClient from "../utils/api-client";

const useProductList = (query) => {
  // console.log("Query in useProductList", query);
  const fetchFunction = async ({ pageParam = 1 }) => {
    const res = await apiClient.get("/products", {
      params: { ...query, page: pageParam },
    });

    return res.data;
  };
  return useInfiniteQuery({
    queryKey: ["products", query],
    queryFn: fetchFunction,
    getNextPageParam: (lastPage) => {
      console.log("Last Page", lastPage);
      return lastPage.currentPage < lastPage.totalPages
        ? lastPage.currentPage + 1
        : null;
    },
  });
};

export default useProductList;
