import Block, {type BlockOwnProps} from '../../../system/Block'

interface SidebarProps extends BlockOwnProps {
    chats: Array<{
        title: string;
        lastMessage?: { text: string; time: string };
        unreadCount?: number;
        id?: number;
        avatarUrl?: string;
    }>;
}

export default class Sidebar extends Block<SidebarProps> {
    static componentName = 'Sidebar';
    protected template = `
        <aside class="chats">
            <header class="chats__header">
                <div class="chats__profile">
                    <a href="/profile">Профиль <img src="/src/assets/chevron.svg" alt="chevron" /></a>
                </div>
                <div class="chats__search">
                   <input ref="searchInput" type="text" id="search" name="search" />
                   <label class="chats__search-placeholder" for="search">Поиск</label>
                </div>
            </header>
            <section class="chats__body">
                <ul class="chats__list">
                    {{#each chats}}
                        {{ChatItem title=title unreadCount=unreadCount lastMessage=lastMessage isActive=isActive}}
                    {{/each}}
                </ul>
            </section>
        </aside>
    `;

    protected events = {
        input: () => {
            const input = this.refs.searchInput as HTMLInputElement;
            console.log(input.value);
        }
    };
}
