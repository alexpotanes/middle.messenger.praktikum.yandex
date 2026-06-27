import Block, { type BlockOwnProps } from "../../../system/Block";
import { connect } from "../../../system/connect";
import store from "../../../system/Store";
import type { Indexed } from "../../../utils/types";

interface ModalRootProps extends BlockOwnProps {
  modal?: {
    title: string;
    buttonText: string;
    fields?: Array<{
      id: string;
      label: string;
      type: string;
      value?: string;
      isFile?: boolean;
    }>;
    onSubmit?: (data: Record<string, FormDataEntryValue>) => Promise<void>;
  } | null;
  onClose?: () => void;
}

class ModalRoot extends Block<ModalRootProps> {
  static componentName = "ModalRoot";
  protected template = `
          <div class="modal-root">
              {{#if modal}}
                  {{Modal title=modal.title buttonText=modal.buttonText fields=modal.fields onSubmit=modal.onSubmit onClose=onClose compact=false}}
              {{/if}}
          </div>
      `;

  constructor(props: ModalRootProps = {} as ModalRootProps) {
    super(props);
    this.props = {
      ...this.props,
      onClose: () => store.setState("modal", null),
    };
  }
}

function mapStateToProps(state: Indexed) {
  return { modal: state.modal ?? null };
}

export default connect(mapStateToProps)(ModalRoot);
