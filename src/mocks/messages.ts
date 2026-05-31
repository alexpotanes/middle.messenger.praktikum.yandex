export const messages: Array<{
    id: number;
    text: string;
    time: string;
    direction: 'incoming' | 'outgoing';
    hasCheck: boolean;
}> = [
    {
        id: 1,
        text: 'Привет! Смотри, тут всплыл интересный кусок лунной космической истории...',
        time: '11:56',
        direction: 'incoming',
        hasCheck: false,
    },
    {
        id: 2,
        text: 'Круто!',
        time: '11:56',
        direction: 'outgoing',
        hasCheck: true,
    },
];

export const activeChatName = 'Вадим';
