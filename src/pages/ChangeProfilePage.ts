import Block, { type BlockOwnProps } from '../../system/Block';

interface ChangeProfilePageProps extends BlockOwnProps {
    title: string;
}

export default class ChangeProfilePage extends Block<ChangeProfilePageProps> {
    protected template = `
          {{ProfileLayout
              profileName=profileName
              avatarSrc=avatarSrc
              fields=fields
              editable=true
          }}
      `;
}
