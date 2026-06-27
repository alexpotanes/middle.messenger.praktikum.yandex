import type { Indexed } from "./types";

export function cloneDeep<T>(obj: T): T {
  return (function _cloneDeep(item: unknown): unknown {
    if (item === null || typeof item !== "object") {
      return item;
    }

    if (item instanceof Date) {
      return new Date(item.valueOf());
    }

    if (item instanceof Array) {
      return item.map((element) => _cloneDeep(element));
    }

    if (item instanceof Set) {
      const copy = new Set();
      item.forEach((v) => copy.add(_cloneDeep(v)));
      return copy;
    }

    if (item instanceof Map) {
      const copy = new Map();
      item.forEach((v, k) => copy.set(k, _cloneDeep(v)));
      return copy;
    }

    if (item instanceof Object) {
      const copy: Indexed = {};

      Object.getOwnPropertySymbols(item).forEach((s) => {
        const key = s.toString();
        copy[key] = _cloneDeep((item as Indexed)[key]);
      });

      Object.keys(item).forEach((k) => {
        copy[k] = _cloneDeep((item as Indexed)[k]);
      });

      return copy;
    }

    throw new Error(`Unable to copy object: ${item}`);
  })(obj) as T;
}
