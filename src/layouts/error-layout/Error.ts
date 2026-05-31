import Block, { type BlockOwnProps } from '../../../system/Block';

interface ErrorLayoutProps extends BlockOwnProps {
    code: number | string;
    text: string;
    backUrl?: string;
}

export default class ErrorLayout extends Block<ErrorLayoutProps> {
    protected template = `
          {{ErrorPage code=code text=text backUrl=backUrl}}
      `;
}
