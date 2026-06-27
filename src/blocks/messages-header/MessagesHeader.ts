import Block, { type BlockOwnProps } from "../../../system/Block";

interface MessagesHeaderProps extends BlockOwnProps {
  name: string;
  menuItems: Array<{ icon: string; alt: string; label: string }>;
  avatarUrl?: string;
}

export default class MessagesHeader extends Block<MessagesHeaderProps> {
  static componentName = "MessagesHeader";
  protected template = `
        <header class="messages__header">
            <div class="messages__info">
                <div class="avatar">
                    {{#if avatarUrl}}
                        <img class="avatar__img" src="{{avatarUrl}}" alt="avatar" />
                    {{/if}}
                </div>
                <div class="messages__name">{{name}}</div>
            </div>
            {{DropdownMenu items=menuItems position="top" triggerClass="messages__menu" triggerContent="<span></span>"}}
        </header>
    `;

  protected events = {};
}
