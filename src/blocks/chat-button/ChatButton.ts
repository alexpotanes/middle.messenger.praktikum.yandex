import Block, { type BlockOwnProps } from "../../../system/Block";
import crossIcon from '../../assets/cross.svg';

interface ChatButtonProps extends BlockOwnProps {
  onClick?: () => void;
}

export default class ChatButton extends Block<ChatButtonProps> {
  static componentName = "ChatButton";
  protected template = `
          <button class="chat-button">
              <img src="${crossIcon}" alt="Новый чат" />
          </button>
      `;

  protected events = {
    click: () => this.props.onClick?.(),
  };
}
