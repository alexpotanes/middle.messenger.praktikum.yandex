import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import HTTPTransport from "../system/request";

interface MockXHR {
  open: ReturnType<typeof vi.fn>;
  send: ReturnType<typeof vi.fn>;
  setRequestHeader: ReturnType<typeof vi.fn>;
  status: number;
  responseText: string;
  getResponseHeader: ReturnType<typeof vi.fn>;
  withCredentials: boolean;
  timeout: number;
  onload?: ((event: ProgressEvent) => void) | null;
  onerror?: ((event: ProgressEvent) => void) | null;
  onabort?: ((event: ProgressEvent) => void) | null;
  ontimeout?: ((event: ProgressEvent) => void) | null;
}

describe("HTTPTransport", () => {
  let transport: HTTPTransport;

  beforeEach(() => {
    transport = new HTTPTransport("https://test.api.com");
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("GET requests", () => {
    it("should make GET request with query parameters", async () => {
      const mockXHR: MockXHR = {
        open: vi.fn(),
        send: vi.fn(function (this: MockXHR) {
          setTimeout(() => this.onload?.(), 0);
        }),
        setRequestHeader: vi.fn(),
        status: 200,
        responseText: '{"success": true}',
        getResponseHeader: vi.fn(),
        withCredentials: false,
        timeout: 0,
      };

      vi.stubGlobal(
        "XMLHttpRequest",
        vi.fn(function () {
          return mockXHR;
        }),
      );

      const promise = transport.get("/users", {
        data: { id: 1, name: "test" },
      });

      await promise;

      expect(mockXHR.open).toHaveBeenCalledWith(
        "GET",
        "https://test.api.com/users?id=1&name=test",
      );
    });

    it("should set withCredentials to true", async () => {
      const mockXHR: MockXHR = {
        open: vi.fn(),
        send: vi.fn(function (this: MockXHR) {
          setTimeout(() => this.onload?.(), 0);
        }),
        setRequestHeader: vi.fn(),
        status: 200,
        responseText: '{"success": true}',
        getResponseHeader: vi.fn(),
        withCredentials: false,
        timeout: 0,
      };

      vi.stubGlobal(
        "XMLHttpRequest",
        vi.fn(function () {
          return mockXHR;
        }),
      );

      await transport.get("/users");

      expect(mockXHR.withCredentials).toBe(true);
    });
  });

  describe("POST requests", () => {
    it("should make POST request with JSON data", async () => {
      const mockXHR: MockXHR = {
        open: vi.fn(),
        send: vi.fn(function (this: MockXHR) {
          setTimeout(() => this.onload?.(), 0);
        }),
        setRequestHeader: vi.fn(),
        status: 200,
        responseText: '{"success": true}',
        getResponseHeader: vi.fn(),
        withCredentials: false,
        timeout: 0,
      };

      vi.stubGlobal(
        "XMLHttpRequest",
        vi.fn(function () {
          return mockXHR;
        }),
      );

      const data = { username: "test", password: "123" };
      await transport.post("/auth/signin", { data });

      expect(mockXHR.open).toHaveBeenCalledWith(
        "POST",
        "https://test.api.com/auth/signin",
      );
      expect(mockXHR.setRequestHeader).toHaveBeenCalledWith(
        "Content-Type",
        "application/json",
      );
      expect(mockXHR.send).toHaveBeenCalledWith(JSON.stringify(data));
    });
    it("should send FormData without Content-Type header", async () => {
      const mockXHR: MockXHR = {
        open: vi.fn(),
        send: vi.fn(function (this: MockXHR) {
          setTimeout(() => this.onload?.(), 0);
        }),
        setRequestHeader: vi.fn(),
        status: 200,
        responseText: '{"success": true}',
        getResponseHeader: vi.fn(),
        withCredentials: false,
        timeout: 0,
      };

      vi.stubGlobal(
        "XMLHttpRequest",
        vi.fn(function () {
          return mockXHR;
        }),
      );

      const formData = new FormData();
      formData.append("file", "test");

      await transport.post("/upload", { data: formData });

      expect(mockXHR.send).toHaveBeenCalledWith(formData);
    });
  });

  describe("PUT requests", () => {
    it("should make PUT request", async () => {
      const mockXHR: MockXHR = {
        open: vi.fn(),
        send: vi.fn(function (this: MockXHR) {
          setTimeout(() => this.onload?.(), 0);
        }),
        setRequestHeader: vi.fn(),
        status: 200,
        responseText: '{"success": true}',
        getResponseHeader: vi.fn(),
        withCredentials: false,
        timeout: 0,
      };

      vi.stubGlobal(
        "XMLHttpRequest",
        vi.fn(function () {
          return mockXHR;
        }),
      );

      await transport.put("/users/1", { data: { name: "updated" } });

      expect(mockXHR.open).toHaveBeenCalledWith(
        "PUT",
        "https://test.api.com/users/1",
      );
    });
  });

  describe("DELETE requests", () => {
    it("should make DELETE request", async () => {
      const mockXHR: MockXHR = {
        open: vi.fn(),
        send: vi.fn(function (this: MockXHR) {
          setTimeout(() => this.onload?.(), 0);
        }),
        setRequestHeader: vi.fn(),
        status: 200,
        responseText: '{"success": true}',
        getResponseHeader: vi.fn(),
        withCredentials: false,
        timeout: 0,
      };

      vi.stubGlobal(
        "XMLHttpRequest",
        vi.fn(function () {
          return mockXHR;
        }),
      );

      await transport.delete("/users/1");

      expect(mockXHR.open).toHaveBeenCalledWith(
        "DELETE",
        "https://test.api.com/users/1",
      );
    });
  });

  describe("Error handling", () => {
    it("should reject on timeout", async () => {
      const mockXHR: MockXHR = {
        open: vi.fn(),
        send: vi.fn(function (this: MockXHR) {
          setTimeout(() => this.ontimeout?.(), 0);
        }),
        setRequestHeader: vi.fn(),
        status: 200,
        responseText: '{"success": true}',
        getResponseHeader: vi.fn(),
        withCredentials: false,
        timeout: 0,
      };

      vi.stubGlobal(
        "XMLHttpRequest",
        vi.fn(function () {
          return mockXHR;
        }),
      );

      await expect(transport.get("/users", { timeout: 1000 })).rejects.toEqual({
        reason: "Request timeout",
        timeout: 1000,
        request: expect.any(Object),
      });
    });

    it("should reject on abort", async () => {
      const mockXHR: MockXHR = {
        open: vi.fn(),
        send: vi.fn(function (this: MockXHR) {
          setTimeout(() => this.onabort?.(), 0);
        }),
        setRequestHeader: vi.fn(),
        status: 200,
        responseText: '{"success": true}',
        getResponseHeader: vi.fn(),
        withCredentials: false,
        timeout: 0,
      };

      vi.stubGlobal(
        "XMLHttpRequest",
        vi.fn(function () {
          return mockXHR;
        }),
      );

      await expect(transport.get("/users")).rejects.toEqual({
        reason: "Request aborted",
        request: expect.any(Object),
      });
    });

    it("should reject on network error", async () => {
      const mockXHR: MockXHR = {
        open: vi.fn(),
        send: vi.fn(function (this: MockXHR) {
          setTimeout(() => this.onerror?.(), 0);
        }),
        setRequestHeader: vi.fn(),
        status: 200,
        responseText: '{"success": true}',
        getResponseHeader: vi.fn(),
        withCredentials: false,
        timeout: 0,
      };

      vi.stubGlobal(
        "XMLHttpRequest",
        vi.fn(function () {
          return mockXHR;
        }),
      );

      await expect(transport.get("/users")).rejects.toEqual({
        reason: "Network error",
        request: expect.any(Object),
      });
    });
  });

  describe("Response parsing", () => {
    it("should parse JSON response", async () => {
      const mockXHR: MockXHR = {
        open: vi.fn(),
        send: vi.fn(function (this: MockXHR) {
          setTimeout(() => this.onload?.(), 0);
        }),
        setRequestHeader: vi.fn(),
        status: 200,
        responseText: '{"id": 1, "name": "Test"}',
        getResponseHeader: vi.fn((header: string) =>
          header === "Content-Type" ? "application/json" : null,
        ),
        withCredentials: false,
        timeout: 0,
      };

      vi.stubGlobal(
        "XMLHttpRequest",
        vi.fn(function () {
          return mockXHR;
        }),
      );

      const result = await transport.get("/users/1");

      expect(result).toEqual({ id: 1, name: "Test" });
    });

    it("should return text for non-JSON response", async () => {
      const mockXHR: MockXHR = {
        open: vi.fn(),
        send: vi.fn(function (this: MockXHR) {
          setTimeout(() => this.onload?.(), 0);
        }),
        setRequestHeader: vi.fn(),
        status: 200,
        responseText: "Plain text response",
        getResponseHeader: vi.fn(() => "text/plain"),
        withCredentials: false,
        timeout: 0,
      };

      vi.stubGlobal(
        "XMLHttpRequest",
        vi.fn(function () {
          return mockXHR;
        }),
      );

      const result = await transport.get("/text");

      expect(result).toBe("Plain text response");
    });
  });
});
