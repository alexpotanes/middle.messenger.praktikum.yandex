import Block, {type BlockOwnProps} from '../../../system/Block'

export interface ChatItemProps extends BlockOwnProps {
    title: string;
    lastMessage?: { text: string; time: string };
    unreadCount?: number;
    isActive?: boolean;
    onClick?: () => void;
    id?: number;
    avatarUrl?: string;
}

export default class ChatItem extends Block<ChatItemProps> {
    static componentName = 'ChatItem';
    protected template = `
        <li class="chat__item{{#if isActive}} chat__item_active{{/if}}">
            <div class="avatar"></div>
            <div class="chat__data">
                <h3 class="chat__name">{{title}}</h3>
                {{#if lastMessage}}
                    <p class="chat__message">{{lastMessage.text}}</p>
                {{/if}}
            </div>
            <div class="chat__info">
                {{#if lastMessage}}
                    <span class="chat__time">{{lastMessage.time}}</span>
                {{/if}}
                {{#if unreadCount}}
                    <span class="chat__unread-counter">{{unreadCount}}</span>
                {{/if}}
            </div>
        </li>
    `;

    protected events = {
        click: () => this.props.onClick?.()
    };
}
