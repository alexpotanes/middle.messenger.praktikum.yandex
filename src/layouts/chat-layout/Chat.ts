import Block, { type BlockOwnProps } from "../../../system/Block";
import ChatAPI from "../../api/chat-api";
import UserAPI from "../../api/user-api";
import WebSocketService from "../../services/WebSocketService";
import store from "../../../system/Store";

interface ChatMessage {
  text: string;
  time: string;
  direction: string;
  hasCheck?: boolean;
  isImage?: boolean;
}

interface MenuItem {
  icon: string;
  alt: string;
  label: string;
  onClick?: () => void;
  activeChatAvatar?: string;
}

interface ChatLayoutProps extends BlockOwnProps {
  chats: Array<{
    title: string;
    lastMessage?: { text: string; time: string };
    unreadCount?: number;
    id?: number;
    avatarUrl?: string;
  }>;
  messages: ChatMessage[];
  activeChatName?: string;
  activeChatId?: number | null;
  menuItems: MenuItem[];
  fileItems: Array<{ icon: string; alt: string; label: string }>;
  onSelectChat?: (id?: number) => void;
  onCreateChat?: () => void;
  onSend?: (message: string) => void;
  activeChatAvatar?: string;
}

interface RawChat {
  id: number;
  title: string;
  avatar: string | null;
  unread_count: number;
  last_message: {
    time: string;
    content: string;
  } | null;
}

interface User {
  id: number;
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string | null;
}

interface MessageData {
  content: string;
  time: string;
  user_id: number;
}

interface RawMessage {
  content: string;
  time: string;
  user_id: number;
}

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function closeModal() {
  store.setState("modal", null);
}

export default class ChatLayout extends Block<ChatLayoutProps> {
  static componentName = "ChatLayout";
  protected template = `
        <div class="wrapper">
            {{Sidebar chats=chats activeChatId=activeChatId onSelectChat=onSelectChat onCreateChat=onCreateChat}}
            {{#if activeChatName}}
                <main class="messages">
                    {{MessagesHeader name=activeChatName menuItems=menuItems avatarUrl=activeChatAvatar}}
                    <section class="messages__chat">
                        <ul class="messages__list">
                            {{#each messages}}
                                {{MessageItem text=text time=time direction=direction hasCheck=hasCheck}}
                            {{/each}}
                        </ul>
                    </section>
                    {{MessageInput fileItems=fileItems onSend=onSend}}
                </main>
            {{/if}}
        </div>
    `;

  private socket = new WebSocketService();
  private chatsLoaded = false;

  constructor(props?: ChatLayoutProps) {
    super(props);
    this.props = {
      ...this.props,
      onSelectChat: (id?: number) => this.selectChat(id),
      onCreateChat: () => this.openCreateChatModal(),
      onSend: (message: string) => this.socket.send(message),
      menuItems: this.props.menuItems.map((item, index) => ({
        ...item,
        onClick: index === 0 ? this.openAddUserModal : this.openRemoveUserModal,
      })),
    };
  }

  componentDidMount() {
    if (this.chatsLoaded) return;
    this.chatsLoaded = true;
    this.loadChats();
  }

  private loadChats() {
    return ChatAPI.getChats()
      .then((response: unknown) => {
        const list = (response as RawChat[]).map((chat) => ({
          id: chat.id,
          title: chat.title,
          avatarUrl: chat.avatar
            ? `https://ya-praktikum.tech/api/v2/resources${chat.avatar}`
            : "",
          unreadCount: chat.unread_count,
          lastMessage: chat.last_message
            ? {
                text: chat.last_message.content,
                time: formatTime(chat.last_message.time),
              }
            : undefined,
        }));

        this.setProps({ chats: list } as Partial<ChatLayoutProps>);
      })
      .catch((_err: unknown) =>
        console.error("Не удалось получить список чатов:", _err),
      );
  }

  private openCreateChatModal = () => {
    store.setState("modal", {
      title: "Создать чат",
      buttonText: "Создать",
      fields: [
        { id: "title", label: "Название чата", type: "text", value: "" },
      ],
      onSubmit: (data: Record<string, FormDataEntryValue>) =>
        ChatAPI.createChat(data.title as string)
          .then(() => this.loadChats())
          .then(closeModal),
    });
  };

  private selectChat(id?: number) {
    const chat = this.props.chats.find((c) => c.id === id);

    this.setProps({
      activeChatId: id,
      activeChatName: chat?.title,
      activeChatAvatar: chat?.avatarUrl,
      messages: [],
    } as Partial<ChatLayoutProps>);

    if (id === undefined) return;

    const userId = (store.getState().user as User | undefined)?.id;
    if (!userId) {
      console.error("Нет данных текущего пользователя — не могу открыть чат");
      return;
    }

    ChatAPI.getToken(id)
      .then((response: unknown) => {
        const { token } = response as { token: string };

        this.socket.onMessage((data: unknown) => {
          if (Array.isArray(data)) {
            const history: ChatMessage[] = (data as RawMessage[])
              .filter((item: RawMessage) => typeof item?.content === "string")
              .map((item: RawMessage) => ({
                text: item.content,
                time: formatTime(item.time),
                direction: item.user_id === userId ? "outgoing" : "incoming",
                hasCheck: item.user_id === userId,
                isImage:
                  item.content.startsWith("data:image/") ||
                  item.content.startsWith("data:video/"),
              }))
              .reverse();
            this.setProps({
              messages: [...history, ...this.props.messages],
            } as Partial<ChatLayoutProps>);
          } else {
            const item = data as MessageData;
            if (typeof item?.content !== "string") return;
            const msg: ChatMessage = {
              text: item.content,
              time: formatTime(item.time),
              direction: item.user_id === userId ? "outgoing" : "incoming",
              hasCheck: item.user_id === userId,
              isImage:
                item.content.startsWith("data:image/") ||
                item.content.startsWith("data:video/"),
            };
            this.setProps({
              messages: [...this.props.messages, msg],
            } as Partial<ChatLayoutProps>);
          }
        });

        this.socket.connect(userId, id, token);
      })
      .catch((_err: unknown) => console.error("Не удалось открыть чат:", _err));
  }

  private openAddUserModal = () => {
    const chatId = this.props.activeChatId;
    if (!chatId) return;

    store.setState("modal", {
      title: "Добавить пользователя",
      buttonText: "Добавить",
      fields: [{ id: "login", label: "Логин", type: "text", value: "" }],
      onSubmit: (data: Record<string, FormDataEntryValue>) =>
        UserAPI.search(data.login as string)
          .then((users: unknown) => {
            const found = (users as Array<{ id: number }>)[0];
            if (!found) throw new Error("Пользователь не найден");
            return ChatAPI.addUsers({ users: [found.id], chatId });
          })
          .then(closeModal),
    });
  };

  private openRemoveUserModal = () => {
    const chatId = this.props.activeChatId;
    if (!chatId) return;

    store.setState("modal", {
      title: "Удалить пользователя",
      buttonText: "Удалить",
      fields: [{ id: "login", label: "Логин", type: "text", value: "" }],
      onSubmit: (data: Record<string, FormDataEntryValue>) =>
        UserAPI.search(data.login as string)
          .then((users: unknown) => {
            const found = (users as Array<{ id: number }>)[0];
            if (!found) throw new Error("Пользователь не найден");
            return ChatAPI.removeUsers({ users: [found.id], chatId });
          })
          .then(closeModal),
    });
  };
}
