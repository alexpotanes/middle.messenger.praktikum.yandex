import './styles/index.scss';

import './blocks/index';

import LoginPage from './pages/LoginPage';
import NavPage from './pages/NavPage';

import ChatLayout from './layouts/chat-layout/Chat';
import ProfileLayout from './layouts/profile-layout/Profile';
import ErrorLayout from './layouts/error-layout/Error';

import { chats } from './mocks/chats';
import { currentUser } from './mocks/user';
import { profileViewFields, profileEditFields, passwordFields } from './mocks/profile-fields';
import { messages, activeChatName } from './mocks/messages';
import { chatMenuItems, fileMenuItems } from './mocks/dropdown-menu';
import { loginFields, registrationFields } from './mocks/auth-fields';

import type Block from '../system/Block';

type PageFactory = () => Block;

const pages: Record<string, PageFactory> = {
    nav: () => new NavPage(),

    login: () => new LoginPage({
        title: 'Вход',
        buttonText: 'Авторизоваться',
        linkText: 'Нет аккаунта?',
        linkHref: '/?page=registration',
        fields: loginFields,
    }),

    registration: () => new LoginPage({
        title: 'Регистрация',
        buttonText: 'Зарегистрироваться',
        linkText: 'Войти',
        linkHref: '/?page=login',
        fields: registrationFields,
    }),

    messenger: () => new ChatLayout({
        chats,
        messages,
        activeChatName,
        menuItems: chatMenuItems,
        fileItems: fileMenuItems,
    }),

    messengerAddUser: () => new ChatLayout({
        chats,
        messages,
        activeChatName,
        menuItems: chatMenuItems,
        fileItems: fileMenuItems,
        modal: {
            title: 'Добавить пользователя',
            buttonText: 'Добавить',
            fields: [{ id: 'login', label: 'Логин', type: 'text', value: '' }],
        },
    }),

    messengerRemoveUser: () => new ChatLayout({
        chats,
        messages,
        activeChatName,
        menuItems: chatMenuItems,
        fileItems: fileMenuItems,
        modal: {
            title: 'Удалить пользователя',
            buttonText: 'Удалить',
            fields: [{ id: 'login', label: 'Логин', type: 'text', value: '' }],
        },
    }),

    profile: () => new ProfileLayout({
        profileName: currentUser.firstName,
        avatarSrc: currentUser.avatarSrc,
        fields: profileViewFields,
        editable: false,
    }),

    changeProfile: () => new ProfileLayout({
        profileName: currentUser.firstName,
        avatarSrc: currentUser.avatarSrc,
        fields: profileEditFields,
        editable: true,
    }),

    changePassword: () => new ProfileLayout({
        avatarSrc: currentUser.avatarSrc,
        fields: passwordFields,
        editable: true,
    }),

    changeProfileUpload: () => new ProfileLayout({
        profileName: currentUser.firstName,
        avatarSrc: currentUser.avatarSrc,
        fields: profileEditFields,
        editable: true,
        modal: {
            title: 'Загрузите файл',
            buttonText: 'Поменять',
            fields: [{
                id: 'upload',
                label: 'Выбрать файл на компьютере',
                type: 'file',
                isFile: true,
                value: '',
            }],
        },
    }),

    '404': () => new ErrorLayout({ code: '404', text: 'Не туда попали' }),
    '500': () => new ErrorLayout({ code: '500', text: 'Мы уже фиксим' }),
};

const pageBodyClasses: Record<string, string> = {
    nav: 'nav-page',
    login: '',
    registration: '',
    messenger: 'page-chat',
    messengerAddUser: 'page-chat',
    messengerRemoveUser: 'page-chat',
    profile: 'page page-profile',
    changeProfile: 'page page-profile',
    changePassword: 'page page-profile',
    changeProfileUpload: 'page page-profile',
    '404': 'page',
    '500': 'page',
};

const pageTitles: Record<string, string> = {
    login: 'Вход',
    registration: 'Регистрация',
    messenger: 'Мессенджер',
    messengerAddUser: 'Мессенджер',
    messengerRemoveUser: 'Мессенджер',
    profile: 'Профиль',
    changeProfile: 'Редактирование профиля',
    changePassword: 'Изменение пароля',
    changeProfileUpload: 'Редактирование профиля',
    '404': '404',
    '500': '500',
};

const pageKey = new URLSearchParams(window.location.search).get('page') ?? 'nav';
const factory = pages[pageKey] ?? pages['404'];

document.title = pageTitles[pageKey] ?? '';
document.body.className = pageBodyClasses[pageKey] ?? '';

document.body.innerHTML = '';
const el = factory().element();
if (el) document.body.appendChild(el);
