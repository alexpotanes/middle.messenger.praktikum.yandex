import HTTPTransport from "../../system/request";

const transport = new HTTPTransport("https://ya-praktikum.tech/api/v2/chats");

interface AddUsersData {
  users: number[];
  chatId: number;
}

const ChatAPI = {
  getChats: () => transport.get("/"),

  createChat: (title: string) => transport.post("/", { data: { title } }),

  deleteChat: (chatId: number) => transport.delete("/", { data: { chatId } }),

  getChatUsers: (chatId: number) => transport.get(`/${chatId}/users`),

  getNewMessagesCount: (chatId: number) => transport.get(`/new/${chatId}`),

  updateAvatar: (formData: FormData) =>
    transport.put("/avatar", { data: formData }),

  addUsers: (data: AddUsersData) => transport.put("/users", { data }),

  removeUsers: (data: AddUsersData) => transport.delete("/users", { data }),

  getToken: (chatId: number) => transport.post(`/token/${chatId}`),
};

export default ChatAPI;
