export const profileViewFields = [
    { label: 'Почта', name: 'email', value: 'pochta@yandex.ru', type: 'email', editable: false },
    { label: 'Логин', name: 'login', value: 'ivanivanov', type: 'text',  editable: false },
    { label: 'Имя', name: 'first_name', value: 'Иван', type: 'text',  editable: false },
    { label: 'Фамилия', name: 'second_name', value: 'Иванов', type: 'text',  editable: false },
    { label: 'Имя в чате', name: 'display_name', value: 'Иван', type: 'text',  editable: false },
    { label: 'Телефон', name: 'phone', value: '+7 (909) 967 30 30', type: 'tel',   editable: false },
];

export const profileEditFields = profileViewFields.map(f => ({ ...f, editable: true }));

export const passwordFields = [
    { label: 'Старый пароль', name: 'password', value: '', type: 'password', editable: true },
    { label: 'Новый пароль', name: 'new_password', value: '', type: 'password', editable: true },
    { label: 'Повторите новый пароль', name: 'repeat_password', value: '', type: 'password', editable: true },
];
