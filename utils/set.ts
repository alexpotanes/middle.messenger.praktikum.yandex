import type { Indexed } from "./types";

export function set(
  object: Indexed | unknown,
  path: string,
  value: unknown,
): Indexed | unknown {
  if (typeof object !== "object" || object === null) {
    return object;
  }

  if (typeof path !== "string") {
    throw new Error("path must be string");
  }

  const result = path.split(".").reduceRight<Indexed>(
    (acc, key) => ({
      [key]: acc,
    }),
    value as Indexed,
  );
  return merge(object as Indexed, result);
}

export function merge(lhs: Indexed, rhs: Indexed): Indexed {
  const result = { ...lhs };
  for (const key in rhs) {
    if (
      typeof rhs[key] === "object" &&
      rhs[key] !== null &&
      !Array.isArray(rhs[key])
    ) {
      result[key] = merge((result[key] as Indexed) ?? {}, rhs[key] as Indexed);
    } else {
      result[key] = rhs[key];
    }
  }
  return result;
}
