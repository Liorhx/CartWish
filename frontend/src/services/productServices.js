import apiClient from "../utils/api-client";

export function getSuggestionsApi(search) {
  return apiClient.get(`/products/suggestions?search=${search}`);
}
