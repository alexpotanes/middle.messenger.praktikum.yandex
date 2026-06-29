export type Indexed<T = unknown> = {
  [key: string]: T;
} & {
  [key: symbol]: T;
};

export type PlainObject<T = unknown> = {
  [key: string]: T;
};
