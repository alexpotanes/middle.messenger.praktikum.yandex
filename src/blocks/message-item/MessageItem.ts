import Block, {type BlockOwnProps} from '../../../system/Block'

interface MessageItemProps extends BlockOwnProps {
    text: string;
    time: string;
    direction: 'incoming' | 'outgoing';
    hasCheck?: boolean;
}

export default class MessageItem extends Block<MessageItemProps> {
    static componentName = 'MessageItem';
    protected template = `
        <li class="message-item message-item_{{direction}}">
            <p>{{text}}</p>
            <span class="message-item__time">
              {{#if hasCheck}}
                  <img src="/src/assets/double-check.svg" alt="double-check" />
              {{/if}}
              {{time}}
            </span>
        </li>
    `;
}
