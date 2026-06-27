import Block, { type BlockOwnProps } from "../../../system/Block";

interface DropdownMenuProps extends BlockOwnProps {
  items: Array<{
    icon: string;
    alt: string;
    label: string;
    onClick?: () => void;
  }>;
  position: "top" | "bottom";
  triggerClass: string;
  triggerContent?: string;
}

export default class DropdownMenu extends Block<DropdownMenuProps> {
  static componentName = "DropdownMenu";

  private isOpen = false;

  protected template = `
          <div class="dropdown-wrapper">
              <button type="button" class="{{triggerClass}}">{{{triggerContent}}}</button>
              <ul class="dropdown-menu dropdown-menu_{{position}}">
                  {{#each items}}
                      {{DropdownMenu__Item icon=icon alt=alt label=label onClick=onClick}}
                  {{/each}}
              </ul>
          </div>
      `;

  private outsideClickHandler = (e: Event) => {
    if (!this.domElement?.contains(e.target as Node)) {
      this.close();
    }
  };

  private open() {
    this.isOpen = true;
    this.domElement
      ?.querySelector(".dropdown-menu")
      ?.classList.add("dropdown-menu_open");
    document.addEventListener("click", this.outsideClickHandler);
  }

  private close() {
    this.isOpen = false;
    this.domElement
      ?.querySelector(".dropdown-menu")
      ?.classList.remove("dropdown-menu_open");
    document.removeEventListener("click", this.outsideClickHandler);
  }

  protected events = {
    click: (e: Event) => {
      const target = e.target as Element;

      if (target.closest("." + this.props.triggerClass)) {
        e.stopPropagation();
        if (this.isOpen) {
          this.close();
        } else {
          this.open();
        }

        return;
      }

      if (target.closest(".dropdown-menu__item")) {
        this.close();
      }
    },
  };

  protected componentWillUnmount() {
    document.removeEventListener("click", this.outsideClickHandler);
  }
}
