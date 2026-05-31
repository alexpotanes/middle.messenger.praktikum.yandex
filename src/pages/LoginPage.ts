import Block, { type BlockOwnProps } from '../../system/Block';

interface LoginPageProps extends BlockOwnProps {
    title: string;
    buttonText: string;
    linkText?: string;
    linkHref?: string;
    fields: Array<{ id: string; label: string; type: string; value?: string }>;
}

export default class LoginPage extends Block<LoginPageProps> {
    protected template = `
        <main class="wrapper">
            {{ModalBlock title=title buttonText=buttonText linkText=linkText linkHref=linkHref fields=fields}}
        </main>
      `;
}
