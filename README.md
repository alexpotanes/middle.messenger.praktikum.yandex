## Описание

Скетч из верстки с handlebars для приложения-мессенджера.
Макет проекта в figma - https://www.figma.com/design/ltw86cj083JXjVa2gFg8C0/Chat_external_link
Проект развернут в Netlify - https://middle-messenger-practicum.netlify.app/
Просмотреть страницы можно после локального запуска в http://localhost:3000/nav.html

## Установка

- `npm install` — установка зависимостей,
- `npm run dev` — запуск версии для разработчика,
- `npm run build` — сборка стабильной версии.

## Стек

- **Vite** — сборка и dev-сервер
- **Handlebars (HBS)** — шаблонизатор
- **SCSS** — стили
- **TypeScript** — точка входа и моки данных


## Файловая структура
``` 
src/
├── index.ts                  # Регистрация партиалов
│
├── styles/
│   ├── index.scss            # Импорт всех SCSS-файлов
│   ├── _variables.scss       # Цвета и шрифт
│   ├── _reset.scss           # Сброс стилей
│   └── _shared.scss          # Переиспользуемые классы: .link, .avatar
│
├── layouts/                  # Лэйауты страниц
│   ├── auth-layout/          # Форма входа и регистрации
│   ├── profile-layout/       # Колонка «назад» и контент
│   ├── chat-layout/          # Сайдбар и область переписки
│   └── error-layout/         # Страница ошибки
│
├── blocks/                   # UI-блоки
│   ├── form-field/           # Поле формы: label + input + ошибка
│   ├── modal-block/          # Блок модалки с формой: заголовок, поля, кнопка, ссылка
│   ├── modal/                # Полупрозрачный оверлей под модалкой
│   ├── back-button/          # Кнопка «назад»
│   ├── profile-avatar/       # Круглый аватар с hoverом
│   ├── profile-list-item/    # Строка данных профиля
│   ├── sidebar/              # Панель со списком чатов и поиском
│   ├── chat-item/            # Элемент списка чатов: аватар, имя, последнее сообщение
│   ├── messages-header/      # Шапка диалога: аватар, имя, меню управления
│   ├── message-item/         # Сообщение (входящее или исходящее)
│   ├── message-input/        # Форма отправки сообщения с прикреплением файла
│   ├── dropdown-menu/        # Выпадающее меню
│   │   └── __item/           # Один пункт меню
│   └── error-page/           # Блок с кодом ошибки
│
├── pages/                    # Вызов layout + параметры
│   ├── login.hbs
│   ├── registration.hbs
│   ├── messenger.hbs
│   ├── profile.hbs
│   ├── change-profile.hbs
│   ├── change-password.hbs
│   ├── 404.hbs
│   └── 500.hbs
│
└── mocks/                # Моки для шаблонов
├── chats.ts              # Список чатов
├── messages.ts           # Сообщения открытого диалога
├── profile-fields.ts     # Поля профиля
├── auth-fields.ts        # Поля форм входа и регистрации
└── dropdown-menu.ts      # Пункты меню чата и меню вложений
``` 

## Соглашения

- Стили — BEM, модификаторы через _, элементы через __
- Каждый блок хранит HBS и SCSS в одной папке
- Элементы BEM выносятся в отдельную папку только если итерируются через {{#each}}
- Данные в шаблоны передаются через контекст index.ts, не хардкодятся в HBS
