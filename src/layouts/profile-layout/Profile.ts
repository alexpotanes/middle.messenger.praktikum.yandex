import Block, { type BlockOwnProps } from "../../../system/Block";
import { connect } from "../../../system/connect";
import AuthAPI from "../../api/auth-api";
import UserAPI from "../../api/user-api";
import Router from "../../../system/Router";
import store from "../../../system/Store";
import type { Indexed } from "../../../utils/types";

interface RawUser {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string | null;
  login: string;
  email: string;
  phone: string;
  avatar: string | null;
}

interface ProfileField {
  name: string;
  label: string;
  value: string;
  type: string;
  editable: boolean;
}

interface ProfileLayoutProps extends BlockOwnProps {
  user?: RawUser | null;
  profileName?: string;
  avatarSrc?: string;
  fields: ProfileField[];
  editable?: boolean;
  mode?: "profile" | "password";
  error?: string;
}

function buildProfileFields(user: RawUser, editable: boolean): ProfileField[] {
  return [
    {
      label: "Почта",
      name: "email",
      value: user.email ?? "",
      type: "email",
      editable,
    },
    {
      label: "Логин",
      name: "login",
      value: user.login ?? "",
      type: "text",
      editable,
    },
    {
      label: "Имя",
      name: "first_name",
      value: user.first_name ?? "",
      type: "text",
      editable,
    },
    {
      label: "Фамилия",
      name: "second_name",
      value: user.second_name ?? "",
      type: "text",
      editable,
    },
    {
      label: "Имя в чате",
      name: "display_name",
      value: user.display_name ?? "",
      type: "text",
      editable,
    },
    {
      label: "Телефон",
      name: "phone",
      value: user.phone ?? "",
      type: "tel",
      editable,
    },
  ];
}

class ProfileLayout extends Block<ProfileLayoutProps> {
  static componentName = "ProfileLayout";
  protected template = `
          <div style="display: contents; width: 100%">
                {{BackButton}}
                <main class="page__content">
                    <section class="profile__wrapper">
                        {{ProfileAvatar src=avatarSrc}}
                        {{#if profileName}}
                            <h2 class="profile__title">{{profileName}}</h2>
                        {{/if}}
                        {{#if editable}}
                            <form ref="form">
                                <ul class="profile__data-list list">
                                    {{#each fields}}
                                        {{ProfileListItem name=name label=label value=value type=type editable=../editable}}
                                    {{/each}}
                                </ul>
                                <button type="submit" class="modal-block__button">Сохранить</button>
                                {{#if error}}
                                    <p class="profile__error">{{error}}</p>
                                {{/if}}
                            </form>
                        {{else}}
                            <ul class="profile__data-list list">
                                {{#each fields}}
                                    {{ProfileListItem name=name label=label value=value type=type editable=../editable}}
                                {{/each}}
                            </ul>
                            <ul class="profile__data-list list">
                                <li class="list__item"><a href="/changeProfile" class="link">Изменить данные</a></li>
                                <li class="list__item"><a href="/changePassword" class="link">Изменить пароль</a></li>
                                <li class="list__item"><button type="button" class="link link--warn logout-button">Выйти</button></li>
                            </ul>
                        {{/if}}
                    </section>
                </main>
            </div>
        `;

  protected events = {
    click: (e: Event) => {
      if ((e.target as HTMLElement).closest(".logout-button")) {
        AuthAPI.logout().finally(() => {
          store.setState("isAuthenticated", false);
          Router.getInstance().go("/login");
        });
      }
    },
    submit: (e: Event) => {
      e.preventDefault();
      const form = this.refs.form as HTMLFormElement;
      if (!form) return;

      const data = Object.fromEntries(new FormData(form)) as Record<
        string,
        string
      >;

      if (this.props.mode === "password") {
        if (data.new_password !== data.repeat_password) {
          this.setProps({
            error: "Пароли не совпадают",
          } as Partial<ProfileLayoutProps>);
          return;
        }

        UserAPI.updatePassword({
          oldPassword: data.password,
          newPassword: data.new_password,
        })
          .then(() => {
            this.setProps({ error: undefined } as Partial<ProfileLayoutProps>);
            Router.getInstance().go("/settings");
          })
          .catch((_err: unknown) => {
            const errorObj = _err as { response?: string };
            const reason = errorObj.response
              ? JSON.parse(errorObj.response)?.reason
              : "Не удалось сменить пароль";
            this.setProps({ error: reason } as Partial<ProfileLayoutProps>);
          });

        return;
      }

      UserAPI.updateProfile({
        first_name: data.first_name,
        second_name: data.second_name,
        display_name: data.display_name,
        login: data.login,
        email: data.email,
        phone: data.phone,
      })
        .then((user: unknown) => {
          store.setState("user", user);
          Router.getInstance().go("/settings");
        })
        .catch((_err: unknown) =>
          console.error("Не удалось сохранить профиль:", _err),
        );
    },
  };

  protected render() {
    if (this.props.user) {
      this.props = {
        ...this.props,
        avatarSrc: this.props.user.avatar
          ? `https://ya-praktikum.tech/api/v2/resources${this.props.user.avatar}`
          : "",
      };

      if (this.props.mode !== "password" && this.props.user) {
        this.props = {
          ...this.props,
          profileName: this.props.user.first_name,
          fields: buildProfileFields(
            this.props.user,
            Boolean(this.props.editable),
          ),
        };
      }
    }
    super.render();
  }
}

function mapStateToProps(state: Indexed) {
  return { user: state.user ?? null };
}

export default connect(mapStateToProps)(ProfileLayout);
