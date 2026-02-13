import axios from "axios";
export default axios.create({
  baseURL: "http://localhost:5005/api", // Adjust the base URL as needed
});
