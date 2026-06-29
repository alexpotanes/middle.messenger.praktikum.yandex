import { TRANSPORT } from "../../system/constant.ts";

interface SignUpData {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  phone: string;
  password: string;
}

interface SignInData {
  login: string;
  password: string;
}

const AuthAPI = {
  signup: (data: SignUpData) => TRANSPORT.post("/auth/signup", { data }),
  signin: (data: SignInData) => TRANSPORT.post("/auth/signin", { data }),
  getUser: () => TRANSPORT.get("/auth/user"),
  logout: () => TRANSPORT.post("/auth/logout"),
};

export default AuthAPI;
