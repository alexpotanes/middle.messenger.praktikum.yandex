import Block, { type BlockOwnProps } from "../../../system/Block";
import Router from "../../../system/Router";
import store from "../../../system/Store";

interface ModalBlockProps extends BlockOwnProps {
  title: string;
  buttonText: string;
  fields?: Array<{
    id: string;
    label: string;
    type: string;
    value?: string;
    isFile?: boolean;
  }>;
  linkText?: string;
  linkHref?: string;
  compact?: boolean;
  onSubmit: (data: Record<string, FormDataEntryValue>) => Promise<void>;
  onClose?: () => void;
  error?: string;
}

export default class ModalBlock extends Block<ModalBlockProps> {
  static componentName = "ModalBlock";
  protected template = `
        <section class="modal-block">
            <h2 class="modal-block__title">{{title}}</h2>
            <form class="modal-block__form {{#if compact}}modal-block__form_compact{{/if}}" ref="form">
                <div class="modal-block__body">
                    {{#each fields}}
                        {{FormField id=id label=label type=type value=value}}
                    {{/each}}
                    {{#if error}}
                        <p class="modal-block__error">{{error}}</p>
                    {{/if}}
                </div>
                <footer class="modal-block__footer">
                    <button class="modal-block__button">{{buttonText}}</button>
                    {{#if linkText}}
                        <a href="{{linkHref}}" class="modal-block__link">{{linkText}}</a>
                    {{/if}}
                </footer>
            </form>
            <button type="button" class="modal-block__close">×</button>
        </section>
    `;
  protected events = {
    submit: (e: Event) => {
      e.preventDefault();
      const form = this.refs.form as HTMLFormElement;
      const data = Object.fromEntries(new FormData(form));

      const result = this.props.onSubmit(data);
      result
        ?.then(() => Router.getInstance().go("/messenger"))
        .catch((_err: unknown) => {
          const errorObj = _err as { response?: string };
          const reason = errorObj.response
            ? JSON.parse(errorObj.response)?.reason
            : "Произошла ошибка";
          this.setProps({ error: reason } as Partial<ModalBlockProps>);
        });

      form.querySelectorAll("input").forEach((input) => {
        input.dispatchEvent(new Event("focusout", { bubbles: true }));
      });
      if (form.querySelector(".form-field__error")) return;
    },
    click: (e: Event) => {
      e.stopPropagation();
      if ((e.target as HTMLElement).closest(".modal-block__close")) {
        store.setState("modal", null);
      }
    },
  };
}
