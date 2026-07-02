import Block, { type BlockOwnProps } from "../../../system/Block";
import doubleCheckIcon from "../../assets/double-check.svg";

interface MessageItemProps extends BlockOwnProps {
  text: string;
  time: string;
  direction: "incoming" | "outgoing";
  hasCheck?: boolean;
  isImage?: boolean;
}

export default class MessageItem extends Block<MessageItemProps> {
  static componentName = "MessageItem";

  constructor(props?: MessageItemProps) {
    super(props);

    const isValidDataURL = (url: string): boolean => {
      if (!url.startsWith("data:")) return false;

      const safeTypes = [
        "data:image/png",
        "data:image/jpeg",
        "data:image/gif",
        "data:image/webp",
      ];
      return safeTypes.some((type) => url.startsWith(type));
    };

    this.props = {
      ...this.props,
      isImage: this.props.text ? isValidDataURL(this.props.text) : false,
    };
  }

  protected template = `
          <li class="message-item message-item_{{direction}}">
              {{#if isImage}}
                  <img class="message-item__image" src="{{text}}" alt="image" />
              {{else}}
                  <p>{{text}}</p>
              {{/if}}
              <span class="message-item__time">
                  {{#if hasCheck}}
                      <img src="${doubleCheckIcon}" alt="double-check" />
                  {{/if}}
                  {{time}}
              </span>
          </li>
      `;
}
