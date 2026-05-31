import Block, { type BlockOwnProps } from '../../../system/Block';
import { type ChatItemProps } from '../../blocks/chat-item/ChatItem';

interface ChatLayoutProps extends BlockOwnProps {
    chats: ChatItemProps[];
    messages: Array<{ text: string; time: string; direction: 'incoming' | 'outgoing'; hasCheck?: boolean }>;
    activeChatName?: string;
    menuItems: Array<{ icon: string; alt: string; label: string }>;
    fileItems: Array<{ icon: string; alt: string; label: string }>;
    modal?: {
        title: string;
        buttonText: string;
        fields?: Array<{ id: string; label: string; type: string; value?: string; isFile?: boolean }>;
    };
}

export default class ChatLayout extends Block<ChatLayoutProps> {
    protected template = `
          <div class="wrapper">
              {{Sidebar chats=chats}}
              {{#if activeChatName}}
                  <main class="messages">
                      {{MessagesHeader name=activeChatName menuItems=menuItems}}
                      <section class="messages__chat">
                          <ul class="messages__list">
                              {{#each messages}}
                                  {{MessageItem text=text time=time direction=direction hasCheck=hasCheck}}
                              {{/each}}
                          </ul>
                      </section>
                      {{MessageInput fileItems=fileItems}}
                  </main>
              {{/if}}
              {{#if modal}}
                  {{Modal title=modal.title buttonText=modal.buttonText fields=modal.fields}}
              {{/if}}
          </div>
      `;
}
