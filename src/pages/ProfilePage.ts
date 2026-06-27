import Block, { type BlockOwnProps } from "../../system/Block";

interface ProfilePageProps extends BlockOwnProps {
  title: string;
}

export default class ProfilePage extends Block<ProfilePageProps> {
  protected template = `
          {{ProfileLayout
              profileName=profileName
              avatarSrc=avatarSrc
              fields=fields
              editable=false
          }}
      `;
}
