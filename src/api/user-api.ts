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
  updateProfile: (data: ProfileData) => TRANSPORT.put("/profile", { data }),
  updateAvatar: (formData: FormData) =>
      TRANSPORT.put("/profile/avatar", { data: formData }),
  updatePassword: (data: PasswordData) => TRANSPORT.put("/password", { data }),
  getById: (id: number) => TRANSPORT.get(`/${id}`),
  search: (login: string) => TRANSPORT.post("/search", { data: { login } }),
};

export default UserAPI;
