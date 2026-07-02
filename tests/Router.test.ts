import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import router from "../system/Router";
import Block from "../system/Block";
import store from "../system/Store";
import Route from "../system/Route";

class TestPage extends Block {
  protected template = "<div>Test Page</div>";
}

interface RouterWithPrivates {
  routes: Route[];
  _currentRoute: Route | null;
  _rootQuery: string;
  getInstance: () => typeof router;
  _onRoute: (pathname: string) => void;
}

describe("Router", () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="root"></div>';

    const routerPrivate = router as unknown as RouterWithPrivates;
    routerPrivate.routes = [];
    routerPrivate._currentRoute = null;

    vi.spyOn(store, "getState").mockReturnValue({ isAuthenticated: false });
  });

  afterEach(() => {
    vi.clearAllMocks();
    document.body.innerHTML = "";
  });

  describe("Initialization", () => {
    it("should create singleton instance", () => {
      const routerPrivate = router as unknown as RouterWithPrivates;
      const router1 = routerPrivate.getInstance();
      const router2 = routerPrivate.getInstance();

      expect(router1).toBe(router2);
    });

    it("should use root query", () => {
      const routerPrivate = router as unknown as RouterWithPrivates;
      expect(routerPrivate._rootQuery).toBe("#root");
    });
  });

  describe("Route registration", () => {
    it("should register route with use()", () => {
      const result = router.use("/test", TestPage, {}, {});

      expect(result).toBe(router);
      const routerPrivate = router as unknown as RouterWithPrivates;
      expect(routerPrivate.routes.length).toBe(1);
    });
  });

  describe("Navigation", () => {
    beforeEach(() => {
      router.use("/home", TestPage, {}, {});
      router.use("/about", TestPage, {}, {});
    });

    it("should navigate to route with go()", () => {
      const pushStateSpy = vi.spyOn(window.history, "pushState");

      router.go("/home");

      expect(pushStateSpy).toHaveBeenCalledWith({}, "", "/home");
    });

    it("should replace route with replace()", () => {
      const replaceStateSpy = vi.spyOn(window.history, "replaceState");

      router.replace("/about");

      expect(replaceStateSpy).toHaveBeenCalledWith({}, "", "/about");
    });

    it("should navigate back", () => {
      const backSpy = vi.spyOn(window.history, "back");

      router.back();

      expect(backSpy).toHaveBeenCalled();
    });

    it("should navigate forward", () => {
      const forwardSpy = vi.spyOn(window.history, "forward");

      router.forward();

      expect(forwardSpy).toHaveBeenCalled();
    });
  });

  describe("Route matching", () => {
    beforeEach(() => {
      router.use("/users", TestPage, {}, {});
      router.use("/posts", TestPage, {}, {});
    });

    it("should find route by pathname", () => {
      const route = router.getRoute("/users");

      expect(route).toBeDefined();
    });

    it("should return undefined for non-existent route", () => {
      const route = router.getRoute("/nonexistent");

      expect(route).toBeUndefined();
    });
  });

  describe("Authentication guards", () => {
    beforeEach(() => {
      router.use("/login", TestPage, {}, { guestOnly: true });
      router.use("/profile", TestPage, {}, { private: true });
      router.use("/messenger", TestPage, {}, {});
    });

    it("should redirect to /login for private route when not authenticated", () => {
      vi.spyOn(store, "getState").mockReturnValue({ isAuthenticated: false });
      const routerPrivate = router as unknown as RouterWithPrivates;
      const onRouteSpy = vi.spyOn(routerPrivate, "_onRoute");

      router.go("/profile");

      expect(onRouteSpy).toHaveBeenCalledWith("/login");
    });
  });

  describe("404 handling", () => {
    beforeEach(() => {
      router.use("/home", TestPage, {}, {});
      router.use("/404", TestPage, {}, {});
    });

    it("should redirect to /404 for unknown route", () => {
      const replaceSpy = vi.spyOn(router, "replace");

      router.go("/unknown");

      expect(replaceSpy).toHaveBeenCalledWith("/404");
    });
  });

  describe("Meta handling", () => {
    it("should set document title from meta", () => {
      router.use("/test", TestPage, {}, { title: "Test Page Title" });

      router.go("/test");

      expect(document.title).toBe("Test Page Title");
    });

    it("should set body class from meta", () => {
      router.use(
        "/test",
        TestPage,
        {},
        { bodyClass: "page-test custom-class" },
      );

      router.go("/test");

      const root = document.querySelector("#root");
      expect(root?.className).toBe("page-test custom-class");
    });
  });
});
