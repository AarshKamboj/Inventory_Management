/**
 * Axios instance
 * All API calls will use this
 */

import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export default API;