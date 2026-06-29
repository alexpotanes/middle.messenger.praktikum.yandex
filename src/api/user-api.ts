import { TRANSPORT } from "../../system/constant.ts";

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
  updateProfile: (data: ProfileData) => TRANSPORT.put("/user/profile", { data }),
  updateAvatar: (formData: FormData) =>
      TRANSPORT.put("/user/profile/avatar", { data: formData }),
  updatePassword: (data: PasswordData) => TRANSPORT.put("/user/password", { data }),
  getById: (id: number) => TRANSPORT.get(`/user/${id}`),
  search: (login: string) => TRANSPORT.post("/user/search", { data: { login } }),
};

export default UserAPI;
