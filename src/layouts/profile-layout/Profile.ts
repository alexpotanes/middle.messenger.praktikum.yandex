import Block, { type BlockOwnProps } from '../../../system/Block';

interface ProfileLayoutProps extends BlockOwnProps {
    profileName?: string;
    avatarSrc?: string;
    fields: Array<{ name: string; label: string; value: string; type: string; editable: boolean }>;
    editable?: boolean;
    modal?: {
        title: string;
        buttonText: string;
        fields?: Array<{ id: string; label: string; type: string; value?: string; isFile?: boolean }>;
    };
}

export default class ProfileLayout extends Block<ProfileLayoutProps> {
    protected template = `
        <div>
              {{BackButton}}
              <main class="page__content">
                  <section class="profile__wrapper">
                      {{ProfileAvatar}}
                      {{#if profileName}}
                          <h2 class="profile__title">{{profileName}}</h2>
                      {{/if}}
                      <ul class="profile__data-list list">
                          {{#each fields}}
                              {{ProfileListItem name=name label=label value=value type=type editable=../editable}}
                          {{/each}}
                      </ul>
                      {{#if editable}}
                          <button class="modal-block__button">Сохранить</button>
                      {{else}}
                          <ul class="profile__data-list list">
                              <li class="list__item"><a href="/?page=changeProfile" class="link">Изменить данные</a></li>
                              <li class="list__item"><a href="/?page=changePassword" class="link">Изменить пароль</a></li>
                              <li class="list__item"><a href="/?page=logout" class="link link--warn">Выйти</a></li>
                          </ul>
                      {{/if}}
                  </section>
              </main>
              {{#if modal}}
                  {{Modal title=modal.title buttonText=modal.buttonText fields=modal.fields}}
              {{/if}}
          </div>
      `;
}
