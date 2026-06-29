import Block, { type BlockOwnProps } from "../../../../system/Block";

interface DropdownMenu__ItemProps extends BlockOwnProps {
  icon: string;
  alt: string;
  label: string;
  onClick?: () => void;
}

export default class DropdownMenu__Item extends Block<DropdownMenu__ItemProps> {
  static componentName = "DropdownMenu__Item";
  protected template = `
        <li class="dropdown-menu__item">
            <img class="dropdown-menu__icon" src="{{icon}}" alt="{{alt}}" />
            <span>{{label}}</span>
        </li>
    `;

  protected events = {
    click: () => this.props.onClick?.(),
  };
}
