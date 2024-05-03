import { describe, it, expect } from "bun:test";
import { catches } from "../src/index";

describe("catchMe", () => {
  describe("sync", () => {
    it("should return the callback value if the function does not throw", () => {
      const result = catches((): string => {
        return "foo";
      });

      expect(result).toEqual("foo");
    });

    it("should return undefined if the function throws", () => {
      const result = catches((): string => {
        throw new Error();
      });

      expect(result).toBeUndefined();
    });

    it("should return the fallback value if the function throws", () => {
      const fallbackValue = "bar";
      const result = catches((): string => {
        throw new Error();
      }, fallbackValue);

      expect(result).toEqual(fallbackValue);
    });
  });

  describe("async", () => {
    it("should return the callback value if the function does not throw", async () => {
      const result = await catches((): Promise<string> => {
        return Promise.resolve("foo");
      });

      expect(result).toEqual("foo");
    });

    it("should return undefined if the function itself throws", async () => {
      const result = await catches((): Promise<string> => {
        throw new Error();
      });

      expect(result).toBeUndefined();
    });

    it("should return the fallback value if the function itself throws", async () => {
      const fallbackValue = "bar";
      const result = await catches((): Promise<string> => {
        throw new Error();
      }, fallbackValue);

      expect(result).toEqual(fallbackValue);
    });

    it("should return undefined if the promise is rejected", async () => {
      const result = await catches((): Promise<string> => {
        return Promise.reject();
      });

      expect(result).toBeUndefined();
    });

    it("should return the fallback value if the promise is rejected", async () => {
      const fallbackValue = "bar";
      const result = await catches((): Promise<string> => {
        return Promise.reject();
      }, fallbackValue);

      expect(result).toEqual(fallbackValue);
    });
  });
});
