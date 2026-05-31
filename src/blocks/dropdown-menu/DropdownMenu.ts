import Block, {type BlockOwnProps} from '../../../system/Block'

interface DropdownMenuProps extends BlockOwnProps {
    items: Array<{ icon: string; alt: string; label: string }>;
    position: 'top' | 'bottom';
}

export default class DropdownMenu extends Block<DropdownMenuProps> {
    static componentName = 'DropdownMenu';
    protected template = `
        <ul class="dropdown-menu dropdown-menu_{{position}}">
            {{#each items}}
                {{DropdownMenu__Item icon=icon alt=alt label=label}}
            {{/each}}
        </ul>
    `;
}
