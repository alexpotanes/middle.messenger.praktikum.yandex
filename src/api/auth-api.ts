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
  signup: (data: SignUpData) => TRANSPORT.post("/signup", { data }),
  signin: (data: SignInData) => TRANSPORT.post("/signin", { data }),
  getUser: () => TRANSPORT.get("/user"),
  logout: () => TRANSPORT.post("/logout"),
};

export default AuthAPI;
