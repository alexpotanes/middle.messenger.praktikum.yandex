import HTTPTransport from "../../system/request";

const transport = new HTTPTransport("https://ya-praktikum.tech/api/v2/auth");

// Типы запросов
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
  // POST /auth/signup — тело: SignUpData, ответ: { id: number }
  signup: (data: SignUpData) => transport.post("/signup", { data }),

  // POST /auth/signin — тело: SignInData, ответ: 'OK'
  signin: (data: SignInData) => transport.post("/signin", { data }),

  // GET /auth/user — без тела, ответ: объект пользователя
  getUser: () => transport.get("/user"),

  // POST /auth/logout — без тела, ответ: 'OK'
  logout: () => transport.post("/logout"),
};

export default AuthAPI;
