import Block, { type BlockOwnProps } from "../../system/Block";

interface MessengerPageProps extends BlockOwnProps {
  title: string;
}

export default class MessengerPage extends Block<MessengerPageProps> {
  protected template = `
          {{ChatLayout
              chats=chats
              messages=messages
              activeChatName=activeChatName
              menuItems=menuItems
              fileItems=fileItems
              modal=modal
          }}
      `;
}
