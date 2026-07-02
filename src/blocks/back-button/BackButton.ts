import Block from "../../../system/Block";

export default class BackButton extends Block {
  static componentName = "BackButton";
  protected template = `
          <div class="page__back">
              <button class="page__back-button"></button>
          </div>
      `;

  protected events = {
    click: () => window.history.back(),
  };
}
