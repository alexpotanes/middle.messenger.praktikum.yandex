import Block, { type BlockOwnProps } from "../../../system/Block";
import chevronIcon from '../../assets/chevron.svg';

interface SidebarProps extends BlockOwnProps {
  chats: Array<{
    title: string;
    lastMessage?: { text: string; time: string };
    unreadCount?: number;
    id?: number;
    avatarUrl?: string;
  }>;
  activeChatId?: number | null;
  onSelectChat: (id?: number) => void;
  onCreateChat?: () => void;
}

export default class Sidebar extends Block<SidebarProps> {
  static componentName = "Sidebar";
  private allChats: SidebarProps["chats"] = [];

  protected template = `
          <aside class="chats">
              <header class="chats__header">
                  <div class="chats__profile">
                      <a href="/settings">Профиль <img src="${chevronIcon}" alt="chevron" /></a>
                  </div>
                  <div class="chats__search">
                     <input ref="searchInput" type="text" id="search" name="search" />
                     <label class="chats__search-placeholder" for="search">Поиск</label>
                  </div>
              </header>
              <section class="chats__body">
                  <ul class="chats__list">
                      {{#each chats}}
                          {{ChatItem
                              title=title
                              unreadCount=unreadCount
                              lastMessage=lastMessage
                              id=id
                              isActive=(eq id ../activeChatId)
                              onClick=../onSelectChat
                              avatarUrl=avatarUrl
                          }}
                      {{/each}}
                  </ul>
                  
                  {{ChatButton onClick=onCreateChat}}
              </section>
          </aside>
      `;

  public setProps(props: Partial<SidebarProps>) {
    if (props.chats) {
      this.allChats = props.chats;
    }
    super.setProps(props);
  }

  protected events = {
    input: () => {
      const input = this.refs.searchInput as HTMLInputElement;
      const query = input.value.toLowerCase();
      const filtered = this.allChats.filter((c) =>
        c.title.toLowerCase().includes(query),
      );
      super.setProps({ chats: filtered } as Partial<SidebarProps>);
    },
  };
}
