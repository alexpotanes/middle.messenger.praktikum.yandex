import Block, {type BlockOwnProps} from '../../../system/Block';

interface ModalBlockProps extends BlockOwnProps {
    title: string;
    buttonText: string;
    fields?: Array<{ id: string; label: string; type: string; value?: string; isFile?: boolean }>;
    linkText?: string;
    linkHref?: string;
    compact?: boolean;
}

export default class ModalBlock extends Block<ModalBlockProps> {
    static componentName = 'ModalBlock';
    protected template = `
      <section class="modal-block">
          <h2 class="modal-block__title">{{title}}</h2>
          <form class="modal-block__form {{#if compact}}modal-block__form_compact{{/if}}" ref="form">
              <div class="modal-block__body">
                  {{#each fields}}
                      {{FormField id=id label=label type=type value=value}}
                  {{/each}}
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
            form.querySelectorAll('input').forEach(input => {
                input.dispatchEvent(new Event('focusout', { bubbles: true }));
            });
            if (form.querySelector('.form-field__error')) return;

            const data = Object.fromEntries(new FormData(form));
            console.log('Данные формы:', data);
        }
    };
}
