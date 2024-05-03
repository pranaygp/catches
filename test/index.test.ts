import { describe, it, expect } from "bun:test";
import { catchMe } from "../src/index";

describe("catchMe", () => {
  describe("sync", () => {
    it("should return the callback value if the function does not throw", () => {
      const result = catchMe((): string => {
        return "foo";
      });

      expect(result).toEqual("foo");
    });

    it("should return undefined if the function throws", () => {
      const result = catchMe((): string => {
        throw new Error();
      });

      expect(result).toBeUndefined();
    });

    it("should return the fallback value if the function throws", () => {
      const fallbackValue = "bar";
      const result = catchMe((): string => {
        throw new Error();
      }, fallbackValue);

      expect(result).toEqual(fallbackValue);
    });
  });

  describe("async", () => {
    it("should return the callback value if the function does not throw", async () => {
      const result = await catchMe((): Promise<string> => {
        return Promise.resolve("foo");
      });

      expect(result).toEqual("foo");
    });

    it("should return undefined if the function itself throws", async () => {
      const result = await catchMe((): Promise<string> => {
        throw new Error();
      });

      expect(result).toBeUndefined();
    });

    it("should return the fallback value if the function itself throws", async () => {
      const fallbackValue = "bar";
      const result = await catchMe((): Promise<string> => {
        throw new Error();
      }, fallbackValue);

      expect(result).toEqual(fallbackValue);
    });

    it("should return undefined if the promise is rejected", async () => {
      const result = await catchMe((): Promise<string> => {
        return Promise.reject();
      });

      expect(result).toBeUndefined();
    });

    it("should return the fallback value if the promise is rejected", async () => {
      const fallbackValue = "bar";
      const result = await catchMe((): Promise<string> => {
        return Promise.reject();
      }, fallbackValue);

      expect(result).toEqual(fallbackValue);
    });
  });
});
