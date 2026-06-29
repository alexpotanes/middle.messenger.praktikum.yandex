import Block, { type BlockOwnProps } from "../../../system/Block";

interface ErrorPageProps extends BlockOwnProps {
  code: number | string;
  text: string;
  backUrl?: string;
}

export default class ErrorPage extends Block<ErrorPageProps> {
  static componentName = "ErrorPage";
  protected template = `
        <main class="error">
            <h1 class="error__title">{{code}}</h1>
            <h2 class="error__text">{{text}}</h2>
            <a href="{{#if backUrl}}{{backUrl}}{{else}}/{{/if}}" class="error__link">Назад к чатам</a>
        </main>
    `;
}
