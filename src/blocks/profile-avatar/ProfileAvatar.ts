import Block, { type BlockOwnProps } from "../../../system/Block";
import UserAPI from "../../api/user-api.ts";
import store from "../../../system/Store";

interface ProfileAvatarProps extends BlockOwnProps {
  src?: string;
}

export default class ProfileAvatar extends Block<ProfileAvatarProps> {
  static componentName = "ProfileAvatar";
  protected template = `
            <label class="profile__avatar" for="avatar">
                {{#if src}}
                    <img class="profile__avatar-img" src="{{src}}" alt="avatar" />
                {{/if}}
                <input ref="fileInput" type="file" id="avatar" name="avatar" accept="image/*" />
            </label>
        `;

  private compressImage(file: File): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          if (!ctx) {
            reject(new Error("Canvas not supported"));
            return;
          }

          const MAX_SIZE = 800;
          let width = img.width;
          let height = img.height;

          if (width > height && width > MAX_SIZE) {
            height = (height * MAX_SIZE) / width;
            width = MAX_SIZE;
          } else if (height > MAX_SIZE) {
            width = (width * MAX_SIZE) / height;
            height = MAX_SIZE;
          }

          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);

          canvas.toBlob(
            (blob) => {
              if (blob) {
                resolve(blob);
              } else {
                reject(new Error("Failed to compress image"));
              }
            },
            "image/jpeg",
            0.8, // Качество 80%
          );
        };
        img.onerror = () => reject(new Error("Failed to load image"));
        img.src = e.target?.result as string;
      };

      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsDataURL(file);
    });
  }

  private handleChange = async (e: Event) => {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      console.error("Можно загружать только изображения");
      alert("Выберите файл изображения");
      return;
    }

    const MAX_FILE_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_FILE_SIZE) {
      alert("Файл слишком большой. Максимальный размер: 5 МБ");
      return;
    }

    try {
      const compressedBlob = await this.compressImage(file);

      const formData = new FormData();
      formData.append("avatar", compressedBlob, file.name);

      UserAPI.updateAvatar(formData)
        .then((user: unknown) => {
          store.setState("user", user);
        })
        .catch(console.error);
    } catch {
      alert("Не удалось обработать изображение");
    }
  };

  componentDidMount() {
    (this.refs.fileInput as HTMLInputElement).addEventListener(
      "change",
      this.handleChange,
    );
  }

  componentWillUnmount() {
    (this.refs.fileInput as HTMLInputElement).removeEventListener(
      "change",
      this.handleChange,
    );
  }
}
