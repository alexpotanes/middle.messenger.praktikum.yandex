export const profileViewFields = [
    { label: 'Почта', value: 'pochta@yandex.ru', type: 'email', editable: false },
    { label: 'Логин', value: 'ivanivanov', type: 'text',  editable: false },
    { label: 'Имя', value: 'Иван', type: 'text',  editable: false },
    { label: 'Фамилия', value: 'Иванов', type: 'text',  editable: false },
    { label: 'Имя в чате', value: 'Иван', type: 'text',  editable: false },
    { label: 'Телефон', value: '+7 (909) 967 30 30', type: 'tel',   editable: false },
];

export const profileEditFields = profileViewFields.map(f => ({ ...f, editable: true }));

export const passwordFields = [
    { label: 'Старый пароль', value: '', type: 'password', editable: true },
    { label: 'Новый пароль', value: '', type: 'password', editable: true },
    { label: 'Повторите новый пароль', value: '', type: 'password', editable: true },
];
