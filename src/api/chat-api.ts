import { TRANSPORT } from "../../system/constant.ts";

interface AddUsersData {
  users: number[];
  chatId: number;
}

const ChatAPI = {
  getChats: () => TRANSPORT.get("/chats"),
  createChat: (title: string) => TRANSPORT.post("/chats", { data: { title } }),
  deleteChat: (chatId: number) => TRANSPORT.delete("/chats", { data: { chatId } }),
  getChatUsers: (chatId: number) => TRANSPORT.get(`/chats/${chatId}/users`),
  getNewMessagesCount: (chatId: number) => TRANSPORT.get(`/chats/new/${chatId}`),
  updateAvatar: (formData: FormData) => TRANSPORT.put("/chats/avatar", { data: formData }),
  addUsers: (data: AddUsersData) => TRANSPORT.put("/chats/users", { data }),
  removeUsers: (data: AddUsersData) => TRANSPORT.delete("/chats/users", { data }),
  getToken: (chatId: number) => TRANSPORT.post(`/chats/token/${chatId}`),
};

export default ChatAPI;
