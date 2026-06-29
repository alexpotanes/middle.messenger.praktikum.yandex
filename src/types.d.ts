declare module "*.hbs?raw" {
  const content: string;
  export default content;
}

declare module "*.hbs" {
  const content: string;
  export default content;
}

/// <reference lib="dom" />

export {};
