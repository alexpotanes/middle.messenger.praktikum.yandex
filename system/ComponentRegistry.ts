import Handlebars from 'handlebars';
import type {HelperOptions} from 'handlebars';
import Block, { type BlockOwnProps } from './Block';

export interface RegisterBlockProps<Props extends BlockOwnProps = BlockOwnProps> {
    new(props?: Props): Block<Props>;
    componentName: string;
}

let uniqueId = 0;

function componentRegistry<T extends BlockOwnProps = BlockOwnProps>(Component: RegisterBlockProps<T>) {
    Handlebars.registerHelper(
        Component.componentName,
        function (this: unknown, { hash, data }: HelperOptions) {
            const id = ++uniqueId;
            const dataAttribute = `data-component-hbs-id="${id}"`;
            const component = new Component(hash as T);

            if ('ref' in hash) {
                (data.root.__refs = data.root.__refs || {})[hash.ref] = component.element();
            }

            (data.root.__children = data.root.__children || []).push({
                component,
                embed(node: DocumentFragment) {
                    const placeholder = node.querySelector(`[${dataAttribute}]`);
                    if (!placeholder) {
                        throw new Error(`Can't find data-id for component ${Component.componentName}`);
                    }

                    const element = component.element();
                    if (!element) {
                        throw new Error('Component element is not created');
                    }

                    placeholder.replaceWith(element);
                }
            });

            return new Handlebars.SafeString(`<div ${dataAttribute}></div>`);
        }
    );
}

export default componentRegistry;
