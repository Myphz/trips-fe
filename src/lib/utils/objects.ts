/* eslint-disable @typescript-eslint/no-unused-vars */
export function addOptionals<T extends object>(optionals: T) {
  return Object.fromEntries(Object.entries(optionals).filter(([_, val]) => !!val)) as Partial<T>;
}

export function pick<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  return Object.fromEntries(Object.entries(obj).filter(([key, _]) => keys.includes(key as K))) as Pick<T, K>;
}
