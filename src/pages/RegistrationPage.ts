import Block, { type BlockOwnProps } from "../../system/Block";

interface RegistrationPageProps extends BlockOwnProps {
  title: string;
  buttonText: string;
  linkText: string;
  linkHref: string;
}

export default class RegistrationPage extends Block<RegistrationPageProps> {
  protected template = `
          <main class="wrapper">
              {{ModalBlock
                  title=title
                  buttonText=buttonText
                  linkText=linkText
                  linkHref=linkHref
                  fields=fields
              }}
          </main>
      `;
}
