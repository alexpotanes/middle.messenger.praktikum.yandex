import Block from '../../../system/Block'

export default class ProfileAvatar extends Block {
    static componentName = 'ProfileAvatar';
    protected template = `
        <label class="profile__avatar" for="avatar">
            <input ref="fileInput" type="file" id="avatar" name="avatar" />
        </label>
    `;

    private handleChange = (e: Event) => {
        const input = e.target as HTMLInputElement;
        console.log(input.files?.[0]);
    };

    componentDidMount() {
        (this.refs.fileInput as HTMLInputElement).addEventListener('change', this.handleChange);
    }

    componentWillUnmount() {
        (this.refs.fileInput as HTMLInputElement).removeEventListener('change', this.handleChange);
    }
}
