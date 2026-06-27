import Block from "../../../system/Block";
import Router from "../../../system/Router";

export default class BackButton extends Block {
  static componentName = "BackButton";
  protected template = `
          <div class="page__back">
              <button class="page__back-button"></button>
          </div>
      `;

  protected events = {
    click: () => Router.getInstance().go("/messenger"),
  };
}
