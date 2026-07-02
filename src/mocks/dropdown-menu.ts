import imageIcon from '../assets/image.svg';
import uploadIcon from '../assets/upload.svg';
import dotIcon from '../assets/dot.svg';
import crossIcon from '../assets/cross.svg';

export const chatMenuItems = [
  { icon: crossIcon, label: "Добавить пользователя", alt: "add" },
  {
    icon: crossIcon,
    label: "Удалить пользователя",
    alt: "delete",
  },
];

export const fileMenuItems = [
  { icon: imageIcon, label: "Фото или Видео", alt: "image" },
  { icon: uploadIcon, label: "Файл", alt: "upload" },
  { icon: dotIcon, label: "Локация", alt: "dot" },
];
