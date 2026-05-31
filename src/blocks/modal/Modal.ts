import Block, {type BlockOwnProps} from '../../../system/Block'

interface ModalProps extends BlockOwnProps {
    title: string;
    buttonText: string;
    compact?: boolean;
    fields?: Array<{ id: string; label: string; type: string; value?: string; isFile?: boolean }>;
}

export default class Modal extends Block<ModalProps> {
    static componentName = 'Modal';
    protected template = `
        <div class="modal">
            {{ModalBlock title=title buttonText=buttonText fields=fields compact=true}}
        </div>
    `;
}
