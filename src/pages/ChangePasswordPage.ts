import Block, { type BlockOwnProps } from "../../system/Block";

interface ChangePasswordPageProps extends BlockOwnProps {
  title: string;
}

export default class ChangePasswordPage extends Block<ChangePasswordPageProps> {
  protected template = `
          {{ProfileLayout
              profileName=profileName
              avatarSrc=avatarSrc
              fields=fields
              editable=true
          }}
      `;
}
