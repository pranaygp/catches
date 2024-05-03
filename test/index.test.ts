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

    it("should pass arguments to the function", () => {
      const result = catches(
        (a: number, b: number): number => {
          return a + b;
        },
        1,
        2
      );

      expect(result).toEqual(3);
    });

    it("should return undefined if the function throws", () => {
      const result = catches((): string => {
        throw new Error();
      });

      expect(result).toBeUndefined();
    });

    it("should return the fallback value if the function throws", () => {
      const fallbackValue = "bar";
      const result =
        catches((): string => {
          throw new Error();
        }) ?? fallbackValue;

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

    it("should pass arguments to the function", async () => {
      const result = await catches(
        (a: number, b: number): Promise<number> => {
          return Promise.resolve(a + b);
        },
        1,
        2
      );

      expect(result).toEqual(3);
    });

    it("should return undefined if the function itself throws", async () => {
      const result = await catches((): Promise<string> => {
        throw new Error();
      });

      expect(result).toBeUndefined();
    });

    it("should return the fallback value if the function itself throws", async () => {
      const fallbackValue = "bar";
      const result =
        (await catches((): Promise<string> => {
          throw new Error();
        })) ?? fallbackValue;

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
      const result =
        (await catches((): Promise<string> => {
          return Promise.reject();
        })) ?? fallbackValue;

      expect(result).toEqual(fallbackValue);
    });
  });
});
