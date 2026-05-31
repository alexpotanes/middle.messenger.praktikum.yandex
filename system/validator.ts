type ValidationRule = RegExp | ((value: string) => boolean);

const rules: Record<string, ValidationRule> = {
    first_name:  /^[А-ЯA-ZЁ][а-яa-zА-ЯA-ZЁёa-zA-Z-]*$/,
    second_name: /^[А-ЯA-ZЁ][а-яa-zА-ЯA-ZЁёa-zA-Z-]*$/,
    login:    /^(?=.*[a-zA-Z])[a-zA-Z\d_-]{3,20}$/,
    email:    /^[a-zA-Z\d._%+-]+@[a-zA-Z][a-zA-Z\d-]*\.[a-zA-Z]{2,}$/,
    password: /^(?=.*[A-Z])(?=.*\d).{8,40}$/,
    phone:    /^\+?\d{10,15}$/,
    message:  (v) => v.trim().length > 0,
};

const messages: Record<string, string> = {
    first_name:  'Первая буква заглавная, только буквы и дефис',
    second_name: 'Первая буква заглавная, только буквы и дефис',
    login:    '3–20 символов, латиница, допустимы цифры, дефис и подчёркивание',
    email:    'Некорректный формат email',
    password: '8–40 символов, минимум одна заглавная буква и одна цифра',
    phone:    '10–15 цифр, может начинаться с +',
    message:  'Сообщение не может быть пустым',
};

export function validate(field: string, value: string): string | null {
    const rule = rules[field];
    if (!rule) return null;
    const isValid = typeof rule === 'function' ? rule(value) : rule.test(value);
    return isValid ? null : (messages[field] ?? 'Некорректное значение');
}
