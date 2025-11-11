import { get } from "lodash";
import serverCall from "../serverCall";

const login = async (body) => {
  try {
    const response = await serverCall.post('/login', body);

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

  const token = data?.data?.token;


  // const userProfile = {
  //   token
  // };
  
  localStorage.setItem("admin_store", token);
};

const AuthService = {
  login,
};

export default AuthService;
