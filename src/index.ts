import './styles/index.scss';
import Handlebars from 'handlebars';

// layouts
import authLayoutTpl from './layouts/auth-layout/auth-layout.hbs?raw';
import profileLayoutTpl from './layouts/profile-layout/profile-layout.hbs?raw';
import chatLayoutTpl from './layouts/chat-layout/chat-layout.hbs?raw';
import errorLayoutTpl from './layouts/error-layout/error-layout.hbs?raw';

// blocks
import formFieldTpl from './blocks/form-field/form-field.hbs?raw';
import modalBlockTpl from './blocks/modal-block/modal-block.hbs?raw';
import modalTpl from './blocks/modal/modal.hbs?raw';
import backButtonTpl from './blocks/back-button/back-button.hbs?raw';
import profileAvatarTpl from './blocks/profile-avatar/profile-avatar.hbs?raw';
import profileListItemTpl from './blocks/profile-list-item/profile-list-item.hbs?raw';
import sidebarTpl from './blocks/sidebar/sidebar.hbs?raw';
import chatItemTpl from './blocks/chat-item/chat-item.hbs?raw';
import chatButtonTpl from './blocks/chat-button/chat-button.hbs?raw';
import messagesHeaderTpl from './blocks/messages-header/messages-header.hbs?raw';
import messageItemTpl from './blocks/message-item/message-item.hbs?raw';
import messageInputTpl from './blocks/message-input/message-input.hbs?raw';
import dropdownMenuTpl from './blocks/dropdown-menu/dropdown-menu.hbs?raw';
import dropdownItemTpl from './blocks/dropdown-menu/__item/dropdown-menu__item.hbs?raw';
import errorPageTpl from './blocks/error-page/error-page.hbs?raw';

// pages
import loginPage from './pages/login.hbs?raw';
import registrationPage from './pages/registration.hbs?raw';
import messengerPage from './pages/messenger.hbs?raw';
import profilePage from './pages/profile.hbs?raw';
import changeProfilePage from './pages/change-profile.hbs?raw';
import changePasswordPage from './pages/change-password.hbs?raw';
import page404 from './pages/404.hbs?raw';
import page500 from './pages/500.hbs?raw';
import navPage from './pages/nav.hbs?raw';

// mocks
import { chats } from './mocks/chats';
import { currentUser } from './mocks/user';
import { profileViewFields, profileEditFields, passwordFields } from './mocks/profile-fields';
import { messages, activeChatName } from './mocks/messages';
import { chatMenuItems, fileMenuItems } from './mocks/dropdown-menu';
import { loginFields, registrationFields } from './mocks/auth-fields';

Handlebars.registerPartial('auth-layout', authLayoutTpl);
Handlebars.registerPartial('profile-layout', profileLayoutTpl);
Handlebars.registerPartial('chat-layout', chatLayoutTpl);
Handlebars.registerPartial('error-layout', errorLayoutTpl);
Handlebars.registerPartial('form-field', formFieldTpl);
Handlebars.registerPartial('modal-block', modalBlockTpl);
Handlebars.registerPartial('modal', modalTpl);
Handlebars.registerPartial('back-button', backButtonTpl);
Handlebars.registerPartial('profile-avatar', profileAvatarTpl);
Handlebars.registerPartial('profile-list-item', profileListItemTpl);
Handlebars.registerPartial('sidebar', sidebarTpl);
Handlebars.registerPartial('chat-item', chatItemTpl);
Handlebars.registerPartial('chat-button', chatButtonTpl);
Handlebars.registerPartial('messages-header', messagesHeaderTpl);
Handlebars.registerPartial('message-item', messageItemTpl);
Handlebars.registerPartial('message-input', messageInputTpl);
Handlebars.registerPartial('dropdown-menu', dropdownMenuTpl);
Handlebars.registerPartial('dropdown-menu__item', dropdownItemTpl);
Handlebars.registerPartial('error-page', errorPageTpl);

const pages: Record<string, { tpl: string; bodyClass: string; ctx: object }> = {
    nav: {
        tpl: navPage,
        bodyClass: 'nav-page',
        ctx: {}
    },
    login: {
        tpl: loginPage,
        bodyClass: '',
        ctx: {
            title: 'Вход',
            fields: loginFields,
            buttonText: 'Авторизоваться',
            linkText: 'Нет аккаунта?',
            linkHref: '/?page=registration'
        }
    },
    registration: {
        tpl: registrationPage,
        bodyClass: '',
        ctx: {
            title: 'Регистрация',
            fields: registrationFields,
            buttonText: 'Зарегистрироваться',
            linkText: 'Войти',
            linkHref: '/?page=login'
        }
    },
    messenger: {
        tpl: messengerPage,
        bodyClass: 'page-chat',
        ctx: {
            title: 'Мессенджер',
            chats,
            messages,
            activeChatName,
            menuItems: chatMenuItems,
            fileItems: fileMenuItems
        }
    },
    profile: {
        tpl: profilePage,
        bodyClass: 'page page--profile',
        ctx: {
            title: 'Профиль',
            fields: profileViewFields,
            avatarSrc: currentUser.avatarSrc,
            profileName: currentUser.firstName
        }
    },
    changeProfile: {
        tpl: changeProfilePage,
        bodyClass: 'page page--profile',
        ctx: {
            title: 'Редактирование',
            fields: profileEditFields,
            avatarSrc: currentUser.avatarSrc
        }
    },
    changePassword: {
        tpl: changePasswordPage,
        bodyClass: 'page page--profile',
        ctx: {
            title: 'Изменение пароля',
            fields: passwordFields,
            avatarSrc: currentUser.avatarSrc
        }
    },
    messengerAddUser: {
        tpl: messengerPage,
        bodyClass: 'page-chat',
        ctx: {
            title: 'Мессенджер',
            chats,
            messages,
            activeChatName,
            menuItems: chatMenuItems,
            fileItems: fileMenuItems,
            modal: {
                title: 'Добавить пользователя',
                fields: [{ id: 'login', label: 'Логин', type: 'text', value: '' }],
                buttonText: 'Добавить',
            },
        },
    },
    messengerRemoveUser: {
        tpl: messengerPage,
        bodyClass: 'page-chat',
        ctx: {
            title: 'Мессенджер',
            chats,
            messages,
            activeChatName,
            menuItems: chatMenuItems,
            fileItems: fileMenuItems,
            modal: {
                title: 'Удалить пользователя',
                fields: [{ id: 'login', label: 'Логин', type: 'text', value: '' }],
                buttonText: 'Удалить',
            },
        },
    },
    changeProfileUpload: {
        tpl: changeProfilePage,
        bodyClass: 'page page--profile',
        ctx: {
            title: 'Редактирование профиля',
            fields: profileEditFields,
            avatarSrc: currentUser.avatarSrc,
            editable: true,
            modal: {
                title: 'Загрузите файл',
                fields: [
                    {
                        id: 'upload',
                        label: 'Выбрать файл на компьютере',
                        type: 'file',
                        isFile: true,
                        value: ''
                    }
                ],
                buttonText: 'Поменять',
            },
        },
    },
    '404': {
        tpl: page404,
        bodyClass: 'page',
        ctx: { title: '404', code: '404', text: 'Не туда попали' }
    },
    '500': {
        tpl: page500,
        bodyClass: 'page',
        ctx: { title: '500', code: '500', text: 'Мы уже фиксим' }
    },
};

const pageKey = new URLSearchParams(window.location.search).get('page') ?? 'nav';
const current = pages[pageKey] ?? pages['404'];

document.title = (current.ctx as Record<string, string>).title ?? '';
document.body.className = current.bodyClass;
document.body.innerHTML = Handlebars.compile(current.tpl)(current.ctx);