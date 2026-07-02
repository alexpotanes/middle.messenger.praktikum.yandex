import "./styles/index.scss";

import "./blocks/index";

import { render } from "../system/renderDOM";
import Router from "../system/Router";
import store from "../system/Store";

import LoginPage from "./pages/LoginPage";
import ModalRoot from "./blocks/modal-root/ModalRoot";

import ChatLayout from "./layouts/chat-layout/Chat";
import ProfileLayout from "./layouts/profile-layout/Profile";
import ErrorLayout from "./layouts/error-layout/Error";

import AuthAPI from "./api/auth-api";

import { passwordFields } from "./mocks/profile-fields";
import { chatMenuItems, fileMenuItems } from "./mocks/dropdown-menu";
import { loginFields, registrationFields } from "./mocks/auth-fields";

const handleSignin = (data: Record<string, FormDataEntryValue>) =>
  AuthAPI.signin({
    login: data.login as string,
    password: data.password as string,
  })
    .then(() => AuthAPI.getUser())
    .then((user) => {
      store.setState("isAuthenticated", true);
      store.setState("user", user);
      Router.getInstance().go("/messenger");
    });

const handleSignup = (data: Record<string, FormDataEntryValue>) =>
  AuthAPI.signup({
    first_name: data.first_name as string,
    second_name: data.second_name as string,
    login: data.login as string,
    email: data.email as string,
    phone: data.phone as string,
    password: data.password as string,
  })
    .then(() => AuthAPI.getUser())
    .then((user) => {
      store.setState("isAuthenticated", true);
      store.setState("user", user);
      Router.getInstance().go("/messenger");
    });

render("#modal-root", new ModalRoot());

Router.use(
  "/",
  LoginPage,
  {
    title: "Вход",
    buttonText: "Авторизоваться",
    linkText: "Нет аккаунта?",
    linkHref: "/sign-up",
    fields: loginFields,
    onSubmit: handleSignin,
  },
  { title: "Вход", bodyClass: "", guestOnly: true },
)
  .use(
    "/login",
    LoginPage,
    {
      title: "Вход",
      buttonText: "Авторизоваться",
      linkText: "Нет аккаунта?",
      linkHref: "/sign-up",
      fields: loginFields,
      onSubmit: handleSignin,
    },
    { title: "Вход", bodyClass: "", guestOnly: true },
  )
  .use(
    "/sign-up",
    LoginPage,
    {
      title: "Регистрация",
      buttonText: "Зарегистрироваться",
      linkText: "Войти",
      linkHref: "/login",
      fields: registrationFields,
      onSubmit: handleSignup,
    },
    { title: "Регистрация", bodyClass: "", guestOnly: true },
  )
  .use(
    "/messenger",
    ChatLayout,
    {
      chats: [],
      messages: [],
      menuItems: chatMenuItems,
      fileItems: fileMenuItems,
    },
    { title: "Мессенджер", bodyClass: "page-chat", private: true },
  )
  .use(
    "/settings",
    ProfileLayout,
    {
      fields: [],
      editable: false,
    },
    { title: "Профиль", bodyClass: "page page-profile", private: true },
  )
  .use(
    "/changeProfile",
    ProfileLayout,
    {
      fields: [],
      editable: true,
      mode: "profile",
    },
    {
      title: "Редактирование профиля",
      bodyClass: "page page-profile",
      private: true,
    },
  )
  .use(
    "/changePassword",
    ProfileLayout,
    {
      fields: passwordFields,
      editable: true,
      mode: "password",
    },
    {
      title: "Изменение пароля",
      bodyClass: "page page-profile",
      private: true,
    },
  )
  .use(
    "/404",
    ErrorLayout,
    { code: "404", text: "Не туда попали" },
    { title: "404", bodyClass: "page" },
  )
  .use(
    "/500",
    ErrorLayout,
    { code: "500", text: "Мы уже фиксим" },
    { title: "500", bodyClass: "page" },
  );

AuthAPI.getUser()
  .then((user) => {
    store.setState("isAuthenticated", true);
    store.setState("user", user);
  })
  .catch(() => {
    store.setState("isAuthenticated", false);
  })
  .finally(() => {
    Router.start();
  });
