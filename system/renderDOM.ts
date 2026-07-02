import Block from "./Block";

export function render(query: string, block: Block): Element {
  const root = document.querySelector(query);
  if (!root) {
    throw new Error(`Элемент "${query}" не найден`);
  }
  const el = block.element();
  if (el) {
    root.appendChild(el);
  }
  return root;
}
