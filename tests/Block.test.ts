import { describe, it, expect, vi } from "vitest";
import Block, { type BlockOwnProps } from "../system/Block";

interface TestBlockProps extends BlockOwnProps {
  text?: string;
  data?: unknown;
}

class TestBlock extends Block<TestBlockProps> {
  protected template = "<div>{{text}}</div>";
}

class TestBlockWithEvents extends Block {
  protected template = "<button>Click me</button>";
  protected events = {
    click: vi.fn(),
  };
}

describe("Block Component", () => {
  describe("Initialization", () => {
    it("should create block with props", () => {
      const block = new TestBlock({ text: "Hello" });

      expect(block).toBeDefined();
    });

    it("should initialize with empty props by default", () => {
      const block = new TestBlock();

      expect(block).toBeDefined();
    });
  });

  describe("Rendering", () => {
    it("should cache element reference", () => {
      const block = new TestBlock({ text: "Test" });

      const element1 = block.element();
      const element2 = block.element();

      expect(element1).toBe(element2);
    });

    it("should re-render on setProps", () => {
      const block = new TestBlock({ text: "Initial" });
      block.element();

      block.setProps({ text: "Updated" });
      const element = block.element();

      expect(element?.textContent).toBe("Updated");
    });
  });
  describe("Props management", () => {
    it("should update props with setProps", () => {
      const block = new TestBlock({ text: "Initial" });

      block.setProps({ text: "Updated" });

      expect(block.element()?.textContent).toBe("Updated");
    });

    it("should merge props on setProps", () => {
      const block = new TestBlock({ text: "Test", data: { id: 1 } });

      block.setProps({ text: "Updated" });

      const element = block.element();
      expect(element?.textContent).toBe("Updated");
    });
  });

  describe("Lifecycle methods", () => {
    it("should call componentDidMount after render", () => {
      class TestLifecycle extends Block {
        protected template = "<div>Test</div>";
        componentDidMount = vi.fn();
      }

      const block = new TestLifecycle();
      block.element();

      expect(block.componentDidMount).toHaveBeenCalled();
    });

    it("should call componentWillUnmount on unmount", () => {
      class TestLifecycle extends Block {
        protected template = "<div>Test</div>";
        componentWillUnmount = vi.fn();
      }

      const block = new TestLifecycle();
      block.element();
      block.setProps({});

      expect(block.componentWillUnmount).toHaveBeenCalled();
    });
  });

  describe("Event handling", () => {
    it("should attach event listeners", () => {
      const block = new TestBlockWithEvents();
      const element = block.element() as HTMLElement;

      element.click();

      expect(block["events"].click).toHaveBeenCalled();
    });

    it("should remove event listeners on unmount", () => {
      const clickHandler = vi.fn();

      class TestBlock extends Block {
        protected template = "<button>Click</button>";
        protected events = { click: clickHandler };
      }

      const block = new TestBlock();
      const element = block.element() as HTMLElement;

      element.click();
      expect(clickHandler).toHaveBeenCalledTimes(1);

      block.setProps({});

      element.click();
      expect(clickHandler).toHaveBeenCalledTimes(1);
    });
  });

  describe("Show/Hide functionality", () => {
    it("should hide element with hide()", () => {
      const block = new TestBlock({ text: "Test" });
      const element = block.element() as HTMLElement;

      block.hide();

      expect(element.style.display).toBe("none");
    });

    it("should show element with show()", () => {
      const block = new TestBlock({ text: "Test" });
      const element = block.element() as HTMLElement;

      block.hide();
      block.show();

      expect(element.style.display).toBe("");
    });
  });
});
