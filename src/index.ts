type NotPromise<T> = T extends Promise<any> ? never : T;

export function catchMe<U, V = undefined>(
  func: () => Promise<U>,
  fallback?: V
): Promise<U | V>;
export function catchMe<U, V = undefined>(
  func: () => NotPromise<U>,
  fallback?: V
): U | V;

export function catchMe<U, V = undefined>(
  func: () => U,
  fallback?: V
): U | V | Promise<U | V> {
  try {
    const ret = func();
    if (ret instanceof Promise) {
      return ret.catch(() => fallback);
    }
    return ret;
  } catch (_) {
    return fallback as V;
  }
}
