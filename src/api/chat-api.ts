import { TRANSPORT } from "../../system/constant.ts";

interface AddUsersData {
  users: number[];
  chatId: number;
}

const ChatAPI = {
  getChats: () => TRANSPORT.get("/"),
  createChat: (title: string) => TRANSPORT.post("/", { data: { title } }),
  deleteChat: (chatId: number) => TRANSPORT.delete("/", { data: { chatId } }),
  getChatUsers: (chatId: number) => TRANSPORT.get(`/${chatId}/users`),
  getNewMessagesCount: (chatId: number) => TRANSPORT.get(`/new/${chatId}`),
  updateAvatar: (formData: FormData) =>
      TRANSPORT.put("/avatar", { data: formData }),
  addUsers: (data: AddUsersData) => TRANSPORT.put("/users", { data }),
  removeUsers: (data: AddUsersData) => TRANSPORT.delete("/users", { data }),
  getToken: (chatId: number) => TRANSPORT.post(`/token/${chatId}`),
};

export default ChatAPI;
