import Handlebars from "handlebars";
import chatItemTpl from "./blocks/chat-item/chat-item.hbs";
import newChatBtnTpl from "./blocks/new-chat-button/new-chat-button.hbs?raw";
import sidebarTpl from "./layouts/sidebar/sidebar.hbs?raw";
import chatItemMembersAvatarTpl from "./blocks/chat-item/__members-avatar/chat-item__members-avatar.hbs?raw";
import { chats } from "./mocks/chats";
import lt from "./helpers/lt";
import gt from "./helpers/gt";
import subtract from "./helpers/subtract";

Handlebars.registerPartial("chat-item", chatItemTpl);
Handlebars.registerPartial("new-chat-button", newChatBtnTpl);
Handlebars.registerPartial("chat-item__members-avatar", chatItemMembersAvatarTpl);

Handlebars.registerHelper("lt", lt);
Handlebars.registerHelper("gt", gt);
Handlebars.registerHelper("subtract", subtract);

document.body.innerHTML = Handlebars.compile(sidebarTpl)({ chats });