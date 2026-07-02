## Описание

Реактивный мессенджер с использованием собственного фреймворка на TypeScript. Приложение использует компонентную архитектуру, роутинг, управление состоянием через Store и подключение к API Яндекс  
Практикума.

Макет проекта в figma - https://www.figma.com/design/ltw86cj083JXjVa2gFg8C0/Chat_external_link
Проект развернут в Netlify - https://middle-messenger-practicum.netlify.app/

## Установка

- `npm install` — установка зависимостей,
- `npm run dev` — запуск версии для разработчика,
- `npm run build` — сборка стабильной версии,
- `npm run lint` — проверка ESLint,
- `npm run lint:fix` — автоисправление ESLint,
- `npm run lint:css` — проверка стилей.

## Стек

- **Vite** — сборка и dev-сервер
- **Handlebars** — шаблонизатор
- **SCSS** — стили
- **TypeScript** — язык разработки
- **WebSocket** — real-time обмен сообщениями

## Файловая структура

```
├── system/                           # Ядро фреймворка
│   ├── Block.ts                      # Базовый класс компонента
│   ├── ComponentRegistry.ts          # Регистрация компонентов как Handlebars-хелперов
│   ├── Router.ts                     # Клиентский роутинг
│   ├── Route.ts                      # Класс маршрута
│   ├── Store.ts                      # Глобальное хранилище состояния
│   ├── connect.ts                    # HOC для подключения компонентов к store
│   ├── renderDOM.ts                  # Рендеринг компонентов в DOM
│   └── request.ts                    # HTTP транспорт (XMLHttpRequest)
│
├── utils/                            # Утилиты
│   ├── validator.ts                  # Правила валидации полей
│   ├── queryStringify.ts             # Преобразование объекта в query-строку
│   ├── set.ts                        # Утилиты для работы с объектами (set, merge)
│   ├── cloneDeep.ts                  # Глубокое клонирование
│   ├── isEqual.ts                    # Глубокое сравнение объектов
│   ├── trim.ts                       # Trim для объектов
│   ├── array.ts                      # Утилиты для массивов
│   ├── sanitize.ts                   # Утилиты для защиты от атак
│   └── types.ts                      # Вспомогательные типы (Indexed, PlainObject)
│
├── src/
│   ├── index.ts                      # Точка входа, инициализация роутера и авторизация
│   ├── types.d.ts                    # Декларации типов для модулей (*.hbs)
│   │
│   ├── api/                          # API слой
│   │   ├── auth-api.ts               # Авторизация (signin, signup, logout, getUser)
│   │   ├── user-api.ts               # Работа с пользователями (profile, avatar, password, search)
│   │   └── chat-api.ts               # Чаты (getChats, createChat, addUsers, removeUsers, getToken)
│   │
│   ├── services/                     # Сервисы
│   │   └── WebSocketService.ts       # WebSocket для обмена сообщениями
│   │
│   ├── assets/                       # SVG-иконки
│   │
│   ├── styles/                       # Глобальные стили
│   │   ├── _variables.scss
│   │   ├── _reset.scss
│   │   ├── _shared.scss
│   │   └── index.scss                # Точка входа стилей
│   │
│   ├── mocks/                        # Статические данные для разработки
│   │   ├── auth-fields.ts
│   │   ├── chats.ts
│   │   ├── profile-fields.ts
│   │   ├── dropdown-menu.ts
│   │   └── user.ts
│   │
│   ├── blocks/                       # UI-компоненты (каждый: .ts + .scss)
│   │   ├── index.ts                  # Регистрация всех компонентов
│   │   ├── back-button/
│   │   ├── chat-button/
│   │   ├── chat-item/
│   │   ├── dropdown-menu/
│   │   │   └── __item/               # Вложенный компонент элемента меню
│   │   ├── error-page/
│   │   ├── form-field/
│   │   ├── message-input/
│   │   ├── message-item/
│   │   ├── messages-header/
│   │   ├── modal/                    # Обертка модального окна
│   │   ├── modal-block/              # Контент модального окна
│   │   ├── modal-root/               # Корневой компонент для модалок (подключен к store)
│   │   ├── profile-avatar/
│   │   ├── profile-list-item/
│   │   └── sidebar/
│   │
│   ├── layouts/                      # Layouts страниц (структура + логика)
│   │   ├── chat-layout/              # Основной чат (список чатов + сообщения)
│   │   ├── error-layout/             # 404/500 ошибки
│   │   └── profile-layout/           # Профиль (просмотр/редактирование/смена пароля)
│   │
│   └── pages/                        # Страницы (легкие обертки над layouts)
│       └── LoginPage.ts              # Страница входа/регистрации
├── tests/
│   ├── Block.test.ts                 # Тесты блока
│   ├── request.test.ts               # Тесты request
│   ├── Router.test.ts                # Тесты роутера
│   ├── Store.test.ts                 # Тесты стора
│   └── queryStringify.test.ts        # Тесты утилиты
│
├── globals.d.ts                      # Глобальные типы (FormDataEntryValue, XMLHttpRequestResponseType)
├── package.json
├── vite.config.ts
├── tsconfig.json
├── .eslintrc.cjs                     # Конфигурация ESLint
├── stylelint.config.mjs
└── .prettierrc
```

## Соглашения

### Стили

- **BEM** — методология именования классов
- Модификаторы через `_` (например: `button_active`)
- Элементы через `__` (например: `form__input`)
- Каждый блок хранит `.ts` и `.scss` в одной папке
- Элементы BEM выносятся в отдельную папку только если итерируются через `{{#each}}`

### Компоненты

- Базовый класс: `system/Block.ts`
- Каждый компонент наследуется от `Block<Props>`
- Обязательное поле `static componentName` для регистрации в Handlebars
- Шаблон описывается в поле `protected template`
- События описываются в поле `protected events`

### Архитектура

- **Store** — глобальное состояние приложения (`system/Store.ts`)
- **connect()** — HOC для подключения компонентов к store (`system/connect.ts`)
- **Router** — клиентский роутинг с защитой приватных маршрутов (`system/Router.ts`)
- Валидация форм через `utils/validator.ts`

### Типизация

- Все компоненты строго типизированы
- Глобальные типы в `globals.d.ts`
- API методы возвращают типизированные ответы
- Используется `Record<string, unknown>` вместо `any`

### API

- Базовый URL: `https://ya-praktikum.tech/api/v2`
- HTTP транспорт: `system/request.ts` (XMLHttpRequest с поддержкой credentials)
- WebSocket для real-time сообщений: `wss://ya-praktikum.tech/ws/chats/{userId}/{chatId}/{token}`

### Оптимизация

- Изображения автоматически сжимаются до 800×800px перед загрузкой
- FormData используется для отправки файлов
- Подписки на store автоматически очищаются при unmount компонента

## Основные возможности

- ✅ Регистрация и авторизация
- ✅ Редактирование профиля и аватара
- ✅ Создание чатов
- ✅ Добавление/удаление пользователей в чат
- ✅ Отправка и получение сообщений в real-time
- ✅ Поиск чатов
- ✅ Модальные окна для действий
- ✅ Валидация форм
- ✅ Защищенные маршруты (приватные/публичные)
- ✅ Автоматическая оптимизация изображений
