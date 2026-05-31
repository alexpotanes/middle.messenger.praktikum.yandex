import Block, { type BlockOwnProps } from '../../../system/Block';
import { validate } from '../../../system/validator';

interface MessageInputProps extends BlockOwnProps {
    fileItems: Array<{ icon: string; alt: string; label: string }>;
}

export default class MessageInput extends Block<MessageInputProps> {
    static componentName = 'MessageInput';
    protected template = `
        <footer class="messages__footer">
            <form class="send-message">
                <button type="button" class="send-message__file"></button>
                {{DropdownMenu items=fileItems position="bottom"}}
                <input
                    ref="messageInput"
                    type="text"
                    class="send-message__text"
                    placeholder="Сообщение"
                    name="message"
                />
                <button type="submit" class="send-message__button"></button>
            </form>
        </footer>
    `;

    protected events = {
        submit: (e: Event) => {
            e.preventDefault();
            const input = this.refs.messageInput as HTMLInputElement;

            const error = validate('message', input.value);
            if (error) return;

            const message = input.value.trim();
            console.log('Отправка:', message);
            input.value = '';
        }
    };

}
