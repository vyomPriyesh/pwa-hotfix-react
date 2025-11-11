import axios from "axios";
import config from "./config";

const BASE_URL = config.baseApi;

const customAxios = axios.create({
  baseURL: BASE_URL,
});

const requestHandler = (request) => {
  const user = localStorage.getItem("admin_store");

  if (user) {
    const token = user;
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
};

const responseHandler = (response) => {
  if (response.status === 401 || response.status === 403) {
    localStorage.clear();
    window.location.replace("/login");
  }
  return response;
};

const requestErrorHandler = (error) => {
  return Promise.reject(error);
};

const responseErrorHandler = (error) => {
  if (error.response) {
    if (error.response.status === 401 || error.response.status === 403) {
      localStorage.clear();
      window.location.replace("/login");
      return Promise.reject(error);
    }
  }
  return Promise.reject(error);
};

customAxios.interceptors.request.use(
  (request) => requestHandler(request),
  (error) => requestErrorHandler(error)
);

customAxios.interceptors.response.use(
  (response) => responseHandler(response),
  responseErrorHandler
);

export default customAxios;
