import Block from '../../../system/Block'

export default class ChatButton extends Block {
    static componentName = 'ChatButton';
    protected template = `
        <button class="chat-button">
            <img src="/src/assets/cross.svg" alt="Новый чат" />
        </button>
    `;
}
