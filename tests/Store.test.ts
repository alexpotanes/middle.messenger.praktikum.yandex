import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import store from "../system/Store";

interface StoreWithPrivates {
  state: Record<string, unknown>;
  listeners: Set<() => void>;
}

describe("Store", () => {
  beforeEach(() => {
    (store as unknown as StoreWithPrivates).state = {};
    (store as unknown as StoreWithPrivates).listeners = new Set();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("State management", () => {
    it("should initialize with empty state", () => {
      expect(store.getState()).toEqual({});
    });

    it("should set state value", () => {
      store.setState("user", { name: "John" });

      expect(store.getState().user).toEqual({ name: "John" });
    });

    it("should set nested state value", () => {
      store.setState("user.profile.name", "Jane");

      expect(store.getState()).toEqual({
        user: {
          profile: {
            name: "Jane",
          },
        },
      });
    });

    it("should overwrite existing value", () => {
      store.setState("count", 5);
      store.setState("count", 10);

      expect(store.getState().count).toBe(10);
    });
  });
  describe("Subscriptions", () => {
    it("should notify subscribers on state change", () => {
      const listener = vi.fn();
      store.subscribe(listener);

      store.setState("value", 42);

      expect(listener).toHaveBeenCalled();
    });

    it("should notify all subscribers", () => {
      const listener1 = vi.fn();
      const listener2 = vi.fn();

      store.subscribe(listener1);
      store.subscribe(listener2);

      store.setState("value", 100);

      expect(listener1).toHaveBeenCalled();
      expect(listener2).toHaveBeenCalled();
    });

    it("should unsubscribe listener", () => {
      const listener = vi.fn();
      const unsubscribe = store.subscribe(listener);

      unsubscribe();
      store.setState("value", 1);

      expect(listener).not.toHaveBeenCalled();
    });

    it("should not call unsubscribed listener", () => {
      const listener1 = vi.fn();
      const listener2 = vi.fn();

      const unsub1 = store.subscribe(listener1);
      store.subscribe(listener2);

      unsub1();
      store.setState("value", "test");

      expect(listener1).not.toHaveBeenCalled();
      expect(listener2).toHaveBeenCalled();
    });
  });
  describe("Complex state updates", () => {
    it("should handle multiple nested updates", () => {
      store.setState("app.user.profile", { name: "Alice", age: 30 });
      store.setState("app.settings.theme", "dark");

      const state = store.getState();

      if (
        "app" in state &&
        typeof state.app === "object" &&
        state.app !== null
      ) {
        const app = state.app as Record<string, unknown>;
        expect(app.user).toEqual({ profile: { name: "Alice", age: 30 } });
        expect(app.settings).toEqual({ theme: "dark" });
      }
    });

    it("should merge nested objects correctly", () => {
      store.setState("config", { a: 1, b: 2 });
      store.setState("config.c", 3);

      const state = store.getState();
      expect(state.config).toEqual({ a: 1, b: 2, c: 3 });
    });
  });
});
