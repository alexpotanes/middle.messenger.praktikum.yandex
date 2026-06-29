import Route from "./Route";
import Block from "./Block";
import store from "./Store";
import type { RouteMeta } from "./Route";

type BlockConstructor = new () => Block;

class Router {
  static __instance: Router;

  private routes: Route[] = [];
  private history: History = window.history;
  private _currentRoute: Route | null = null;
  private _rootQuery: string = "#root";

  constructor(rootQuery: string = "#root") {
    if (Router.__instance) {
      return Router.__instance;
    }
    this._rootQuery = rootQuery;
    Router.__instance = this;
  }

  init(rootQuery: string): Router {
    if (!Router.__instance) {
      Router.__instance = new Router(rootQuery);
    }
    return Router.__instance;
  }

  getInstance(): Router {
    return Router.__instance;
  }

  use(
    pathname: string,
    block: BlockConstructor,
    props: object = {},
    meta: RouteMeta = {},
  ): this {
    const route = new Route(pathname, block, props, this._rootQuery, meta);
    this.routes.push(route);
    return this;
  }

  start(): void {
    document.addEventListener("click", (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
        return;

      const link = (event.target as HTMLElement).closest("a");
      if (!link) return;

      const href = link.getAttribute("href");
      if (
        !href ||
        href.startsWith("http") ||
        href.startsWith("//") ||
        link.target === "_blank"
      )
        return;

      event.preventDefault();
      this.go(href);
    });

    window.onpopstate = (event: PopStateEvent) => {
      const target = event.currentTarget as Window;
      this._onRoute(target.location.pathname);
    };
    this._onRoute(window.location.pathname);
  }

  private _onRoute(pathname: string): void {
    const route = this.getRoute(pathname);
    if (!route) {
      this.replace("/404");
      return;
    }

    const {
      title = "",
      bodyClass = "",
      private: isPrivate,
      guestOnly,
    } = route.getMeta();
    const isAuthenticated = Boolean(store.getState().isAuthenticated);

    if (isPrivate && !isAuthenticated) {
      this.replace("/login");
      return;
    }

    if (guestOnly && isAuthenticated) {
      this.replace("/messenger");
      return;
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;

    document.title = title;

    const rootElement = document.querySelector(this._rootQuery);
    if (rootElement) {
      rootElement.className = bodyClass;
    }

    route.render();
  }

  go(pathname: string): void {
    this.history.pushState({}, "", pathname);
    this._onRoute(pathname);
  }

  replace(pathname: string): void {
    this.history.replaceState({}, "", pathname);
    this._onRoute(pathname);
  }

  back(): void {
    this.history.back();
  }

  forward(): void {
    this.history.forward();
  }

  getRoute(pathname: string): Route | undefined {
    return this.routes.find((route) => route.match(pathname));
  }
}

export default new Router();
