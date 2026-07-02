import Block, { type BlockOwnProps } from "../../../system/Block";
import { validate } from "../../../utils/validator.ts";

interface ProfileListItemProps extends BlockOwnProps {
  name: string;
  label: string;
  value: string;
  type: string;
  editable?: boolean;
  error?: string;
}

export default class ProfileListItem extends Block<ProfileListItemProps> {
  static componentName = "ProfileListItem";
  protected template = `
        <li class="list__item">
            {{#if editable}}
                <label class="list__item-label" for="{{name}}">{{label}}</label>
                <div class="list__item-wrap">
                    <input
                        class="list__item-input"
                        type="{{type}}"
                        value="{{value}}"
                        name="{{name}}"
                        id="{{name}}"
                    />
                    {{#if error}}
                        <span class="list__item-error">{{error}}</span>
                    {{/if}}
                </div>
            {{else}}
                <span class="list__item-label">{{label}}</span>
                <span class="list__item-value">{{value}}</span>
            {{/if}}
        </li>
    `;

  protected events = {
    focusout: (e: Event) => {
      const input = e.target as HTMLInputElement;
      if (input.tagName !== "INPUT") return;

      const error = validate(this.props.name, input.value);
      this.setProps({ error: error ?? undefined, value: input.value });
    },
  };
}
