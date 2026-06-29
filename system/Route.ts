import Block from "./Block";
import isEqual from "../utils/isEqual.ts";
import { render } from "./renderDOM";

type BlockConstructor<P extends object = object> = new (props: P) => Block;

export interface RouteMeta {
  title?: string;
  bodyClass?: string;
  private?: boolean;
  guestOnly?: boolean;
}

export default class Route<P extends object = object> {
  private _pathname: string;
  private _blockClass: BlockConstructor<P>;
  private _block: Block | null;
  private _props: P;
  private _rootQuery: string;
  private _meta: RouteMeta;

  constructor(
    pathname: string,
    view: BlockConstructor<P>,
    props: P,
    rootQuery: string,
    meta: RouteMeta,
  ) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
    this._rootQuery = rootQuery;
    this._meta = meta;
  }

  leave(): void {
    if (this._block) {
      this._block.element()?.remove();
    }
  }

  match(pathname: string): boolean {
    return isEqual(pathname, this._pathname);
  }

  render(): void {
    if (!this._block) {
      this._block = new this._blockClass(this._props);
    }
    render(this._rootQuery, this._block);
  }

  getMeta(): RouteMeta {
    return this._meta;
  }
}
