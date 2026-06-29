export default function isEqual(a: unknown, b: unknown): boolean {
  // Примитивы и ссылочное равенство (NaN === NaN тоже покрыто)
  if (Object.is(a, b)) return true;

  // Если хотя бы одно не объект — примитивы уже проверены выше
  if (typeof a !== "object" || typeof b !== "object") return false;
  if (a === null || b === null) return false;

  // Массивы и объекты не равны друг другу
  if (Array.isArray(a) !== Array.isArray(b)) return false;

  const keysA = Object.keys(a as object);
  const keysB = Object.keys(b as object);

  if (keysA.length !== keysB.length) return false;

  return keysA.every(
    (key) =>
      Object.prototype.hasOwnProperty.call(b, key) &&
      isEqual(
        (a as Record<string, unknown>)[key],
        (b as Record<string, unknown>)[key],
      ),
  );
}
