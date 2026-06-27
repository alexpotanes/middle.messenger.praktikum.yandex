import HTTPTransport from "../../system/request";

const transport = new HTTPTransport("https://ya-praktikum.tech/api/v2/user");

interface ProfileData {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  [key: string]: string;
}

interface PasswordData {
  oldPassword: string;
  newPassword: string;
}

const UserAPI = {
  updateProfile: (data: ProfileData) => transport.put("/settings", { data }),

  updateAvatar: (formData: FormData) =>
    transport.put("/profile/avatar", { data: formData }),

  updatePassword: (data: PasswordData) => transport.put("/password", { data }),

  getById: (id: number) => transport.get(`/${id}`),

  search: (login: string) => transport.post("/search", { data: { login } }),
};

export default UserAPI;
