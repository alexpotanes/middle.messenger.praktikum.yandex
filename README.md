## Описание

Реактивный скетч из верстки с handlebars используемых в комопнентах TS для приложения-мессенджера.
Макет проекта в figma - https://www.figma.com/design/ltw86cj083JXjVa2gFg8C0/Chat_external_link
Проект развернут в Netlify - https://middle-messenger-practicum.netlify.app/
Просмотреть страницы можно после локального запуска в http://localhost:3000

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
├── system/                           # Ядро фреймворка
  │   ├── Block.ts                    # Базовый класс компонента
  │   ├── ComponentRegistry.ts        # Регистрация компонентов как Handlebars-хелперов
  │   └── validator.ts                # Правила валидации полей
  │
  ├── src/
  │   ├── index.ts                    # Точка входа, роутинг по ?page=                                                                 
  │   ├── types.d.ts                  # Глобальные декларации типов (*.hbs, *.scss)
  │   │
  │   ├── assets/                     # SVG-иконки
  │   │
  │   ├── styles/                     # Глобальные стили
  │   │   ├── _variables.scss
  │   │   ├── _reset.scss
  │   │   ├── _shared.scss
  │   │   ├── nav.scss
  │   │   └── index.scss              # Точка входа стилей, импортирует всё
  │   │
  │   ├── mocks/                      # Статические данные для разработки
  │   │   ├── auth-fields.ts
  │   │   ├── chats.ts
  │   │   ├── messages.ts
  │   │   ├── profile-fields.ts
  │   │   ├── dropdown-menu.ts
  │   │   └── user.ts
  │   │
  │   ├── blocks/                     # UI-компоненты (каждый: .ts + .scss)
  │   │   ├── index.ts                # Регистрация всех компонентов
  │   │   ├── back-button/
  │   │   ├── chat-button/
  │   │   ├── chat-item/
  │   │   ├── dropdown-menu/
  │   │   │   └── __item/             # Вложенный компонент элемента меню
  │   │   ├── error-page/
  │   │   ├── form-field/
  │   │   ├── message-input/
  │   │   ├── message-item/
  │   │   ├── messages-header/
  │   │   ├── modal/
  │   │   ├── modal-block/
  │   │   ├── profile-avatar/
  │   │   ├── profile-list-item/
  │   │   └── sidebar/
  │   │
  │   ├── layouts/                    # Шаблоны страниц (структура + логика)
  │   │   ├── auth-layout/
  │   │   ├── chat-layout/
  │   │   ├── error-layout/
  │   │   └── profile-layout/
  │   │
  │   └── pages/                      # Конкретные страницы
  │       ├── NavPage.ts              # Навигационная страница (dev)
  │       ├── LoginPage.ts
  │       ├── RegistrationPage.ts
  │       ├── MessengerPage.ts
  │       ├── ProfilePage.ts
  │       ├── ChangeProfilePage.ts
  │       ├── ChangePasswordPage.ts
  │       ├── 404.ts
  │       └── 500.ts
  │
  ├── package.json
  ├── vite.config.ts
  ├── tsconfig.json
  ├── eslint.config.ts
  ├── stylelint.config.mjs
  └── .prettierrc
``` 

## Соглашения

- Стили — BEM, модификаторы через _, элементы через __
- Каждый блок хранит TS и SCSS в одной папке
- Элементы BEM выносятся в отдельную папку только если итерируются через {{#each}}
- Основной блок-компонент и его логика находятся в system/Block.ts
- Валидация описана в system/validator.ts
