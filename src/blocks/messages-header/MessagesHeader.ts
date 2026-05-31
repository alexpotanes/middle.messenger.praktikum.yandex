import Block, {type BlockOwnProps} from '../../../system/Block'

interface MessagesHeaderProps extends BlockOwnProps {
    name: string;
    menuItems: Array<{ icon: string; alt: string; label: string }>;
}

export default class MessagesHeader extends Block<MessagesHeaderProps> {
    static componentName = 'MessagesHeader';
    protected template = `
        <header class="messages__header">
            <div class="messages__info">
                <div class="avatar"></div>
                <div class="messages__name">{{name}}</div>
            </div>
            <div class="messages__menu">
                <span></span>
            </div>
            {{DropdownMenu items=menuItems position="top"}}
        </header>
    `;

    protected events = {
        click: (e: Event) => {
            console.log(e.target);
        }
    };
}
