import { get } from "lodash";
import serverCall from "../serverCall";

const login = (body) => {
  try {
    const response = serverCall.post(`auth/admin/login`, body);

    const data = get(response, "data", null);

    if (data) {
      setDataToLocal(data);
    }
    return response;
  } catch (error) {
    throw error;
  }
};

const setDataToLocal = (data) => {
  const id = data.apiresponse.data.id;
  const email = data.apiresponse.data.email;
  const token = data.apiresponse.data.token;
  const username = data.apiresponse.data.username;
  const role = data.apiresponse.data.role;

  const userProfile = {
    token,
    email,
    username,
    id,
    role,
  };
  localStorage.setItem("admin_store", JSON.stringify(userProfile));
};

const AuthService = {
  login,
};

export default AuthService;
