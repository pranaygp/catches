type NotPromise<T> = T extends Promise<any> ? never : T;

type AsyncFunction = (...args: any[]) => Promise<any>;
type SyncFunction = (...args: any[]) => NotPromise<any>;

export function catches<T extends AsyncFunction>(
  func: T,
  ...args: Parameters<T>
): ReturnType<T> | Promise<undefined> | undefined;
export function catches<T extends SyncFunction>(
  func: T,
  ...args: Parameters<T>
): ReturnType<T> | undefined;

export function catches<T extends (...args: any[]) => any>(
  func: T,
  ...args: Parameters<T>
): ReturnType<T> | Promise<undefined> | undefined {
  try {
    const ret = func(...args);
    if (ret instanceof Promise) {
      return ret.catch(() => {});
    }
    return ret;
  } catch (_) {}
}
