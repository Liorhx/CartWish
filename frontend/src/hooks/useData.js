import apiClient from "../utils/api-client";
import { useQuery } from "@tanstack/react-query";

//endpoint is url and customConfig is the params

const useData = (
  endPoint,
  customConfig = {},
  queryKey,
  staleTime = 300_000
) => {
  const fetchFunction = async () => {
    const res = await apiClient.get(endPoint, customConfig);
    return res.data;
  };
  return useQuery({
    queryKey: queryKey,
    queryFn: fetchFunction,
    staleTime: staleTime,
  });
};
// const useData = (endPoint, customConfig, deps) => {
//   const [data, setData] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(
//     () => {
//       setLoading(true);
//       apiClient
//         .get(endPoint, customConfig)
//         .then((res) => {
//           if (
//             endPoint === "/products" &&
//             data &&
//             data.products &&
//             customConfig.params.page !== 1
//           ) {
//             setData((prev) => ({
//               ...prev,
//               products: [...prev.products, ...res.data.products],
//             }));
//           } else {
//             setData(res.data);
//           }
//           setLoading(false);
//         })
//         .catch((err) => {
//           setError(err.message);
//           setLoading(false);
//         });
//     },
//     deps ? deps : []
//   );
//   return { data, error, loading };
//   // console.log("Cateogories", data);
// };

export default useData;
