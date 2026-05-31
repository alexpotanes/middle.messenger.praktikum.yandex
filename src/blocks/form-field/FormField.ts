import Block, {type BlockOwnProps} from '../../../system/Block'
import { validate } from '../../../system/validator';

interface FormFieldProps extends BlockOwnProps {
    id: string;
    label: string;
    type: string;
    value?: string;
    error?: string;
    isFile?: boolean;
}

export default class FormField extends Block<FormFieldProps> {
    static componentName = 'FormField';
    protected template = `
        <div class="form-field">
            <label class="form-field__label{{#if isFile}} form-field__label_file{{/if}}" for="{{id}}">
                {{label}}
            </label>
            <input
                    class="form-field__input{{#if isFile}} form-field__input_hidden{{/if}}"
                    type="{{type}}"
                    id="{{id}}"
                    name="{{id}}"
                    {{#if value}}value="{{value}}"{{/if}}
            />
            {{#if error}}
                <span class="form-field__error">{{error}}</span>
            {{/if}}
        </div>
    `;

    protected events = {
        input: (e: Event) => {
            const input = e.target as HTMLInputElement;
            if (input.tagName !== 'INPUT' || !this.props.error) return;

            const cursor = input.selectionStart;
            this.setProps({ error: undefined, value: input.value });

            const newInput = this.domElement?.querySelector('input') as HTMLInputElement;
            newInput?.focus();
            newInput?.setSelectionRange(cursor, cursor);
        },
        focusout: (e: Event) => {
            const input = e.target as HTMLInputElement;
            if (input.tagName !== 'INPUT') return;

            const error = validate(this.props.id, input.value);

            this.setProps({ error: error ?? undefined, value: input.value });
        }
    };
}
