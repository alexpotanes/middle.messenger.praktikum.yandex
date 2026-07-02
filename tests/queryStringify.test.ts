import { describe, it, expect } from "vitest";
import { queryStringify } from "../utils/queryStringify";

describe("queryStringify", () => {
  it("should convert simple object to query string", () => {
    const result = queryStringify({ name: "John", age: 30 });

    expect(result).toBe("name=John&age=30");
  });

  it("should handle empty object", () => {
    const result = queryStringify({});

    expect(result).toBe("");
  });

  it("should handle nested objects", () => {
    const result = queryStringify({
      user: { name: "Alice", profile: { age: 25 } },
    });

    expect(result).toContain("user[name]=Alice");
    expect(result).toContain("user[profile][age]=25");
  });

  it("should handle arrays", () => {
    const result = queryStringify({ ids: [1, 2, 3] });

    expect(result).toContain("ids[0]=1");
    expect(result).toContain("ids[1]=2");
    expect(result).toContain("ids[2]=3");
  });

  it("should not encode special characters", () => {
    const result = queryStringify({ text: "hello world", symbol: "@#$" });

    // Текущая реализация НЕ делает URL encoding
    expect(result).toBe("text=hello world&symbol=@#$");
  });

  it("should handle boolean values", () => {
    const result = queryStringify({ active: true, disabled: false });

    expect(result).toBe("active=true&disabled=false");
  });

  it("should convert null and undefined to strings", () => {
    const result = queryStringify({ a: null, b: undefined, c: "test" });

    // Текущая реализация конвертирует null/undefined в строки
    expect(result).toBe("a=null&b=undefined&c=test");
  });
});
