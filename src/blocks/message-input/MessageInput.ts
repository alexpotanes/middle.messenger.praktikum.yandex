import Block, { type BlockOwnProps } from "../../../system/Block";
import { validate } from "../../../utils/validator.ts";

interface MessageInputProps extends BlockOwnProps {
  _message?: string;
  fileItems: Array<{ icon: string; alt: string; label: string }>;
  onSend: (message: string) => void;
}

export default class MessageInput extends Block<MessageInputProps> {
  static componentName = "MessageInput";
  protected template = `
        <footer class="messages__footer">
            <form class="send-message">
                {{DropdownMenu items=fileItems position="bottom" triggerClass="send-message__file"}}
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

  constructor(props?: MessageInputProps) {
    super(props);
    this.props = {
      ...this?.props,
      fileItems: (props?.fileItems ?? []).map((item) => ({
        ...item,
        onClick:
          item.alt === "image"
            ? () => this.openFilePicker("image/*,video/*")
            : item.alt === "upload"
              ? () => this.openFilePicker("*")
              : undefined,
      })),
    };
  }

  private openFilePicker(accept: string) {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = accept;
    input.onchange = () => {
      const file = input.files?.[0];
      if (!file) return;

      if (file.type.startsWith("image/") || file.type.startsWith("video/")) {
        const reader = new FileReader();
        reader.onload = () => {
          this.props.onSend(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        this.props.onSend(`${file.name}`);
      }
    };
    input.click();
  }

  protected events = {
    submit: (e: Event) => {
      e.preventDefault();
      const input = this.refs.messageInput as HTMLInputElement;

      const error = validate("message", input.value);
      if (error) return;

      const message = input.value.trim();
      this.props.onSend?.(message);
      input.value = "";
    },
  };
}
