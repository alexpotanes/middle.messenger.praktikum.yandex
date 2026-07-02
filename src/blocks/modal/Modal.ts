import Block, { type BlockOwnProps } from "../../../system/Block";
import store from "../../../system/Store";

interface ModalProps extends BlockOwnProps {
  title: string;
  buttonText: string;
  compact?: boolean;
  fields?: Array<{
    id: string;
    label: string;
    type: string;
    value?: string;
    isFile?: boolean;
  }>;
  onSubmit?: (data: Record<string, FormDataEntryValue>) => Promise<void>;
  onClose?: () => void;
}

export default class Modal extends Block<ModalProps> {
  static componentName = "Modal";
  protected template = `
          <div class="modal">
              {{ModalBlock title=title buttonText=buttonText fields=fields onSubmit=onSubmit onClose=onClose compact=true}}
          </div>
      `;

  private handleKeydown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      store.setState("modal", null);
    }
  };

  protected events = {
    click: (e: Event) => {
      if (e.target === this.domElement) {
        store.setState("modal", null);
      }
    },
  };

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeydown);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeydown);
  }
}
