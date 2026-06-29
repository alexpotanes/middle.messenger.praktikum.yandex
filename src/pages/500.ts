import Block from "../../system/Block";

export default class Page404 extends Block {
  protected template = `
          {{ErrorLayout code="500" text="Мы уже фиксим"}}
      `;
}
