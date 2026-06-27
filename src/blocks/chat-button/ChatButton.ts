import Block, { type BlockOwnProps } from "../../../system/Block";

interface ChatButtonProps extends BlockOwnProps {
  onClick?: () => void;
}

export default class ChatButton extends Block<ChatButtonProps> {
  static componentName = "ChatButton";
  protected template = `
          <button class="chat-button">
              <img src="/src/assets/cross.svg" alt="Новый чат" />
          </button>
      `;

  protected events = {
    click: () => this.props.onClick?.(),
  };
}
