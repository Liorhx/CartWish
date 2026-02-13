import apiClient from "../utils/api-client";

export function checkoutApi() {
  return apiClient.post("/order/checkout");
}
// export function getOrderApi() {
//   return apiClient.get("/order");
// }
