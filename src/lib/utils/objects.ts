import { card } from "$lib/stores/api/select";
import type { EntityType, GetRowType } from "$lib/types/api";
import { get } from "svelte/store";

/* eslint-disable @typescript-eslint/no-unused-vars */
export function addOptionals<T extends object>(optionals: T) {
  return Object.fromEntries(
    Object.entries(optionals).filter(([_, val]) => !!val),
  ) as Partial<T>;
}

type RenameBy<T, U> = {
  [K in keyof U as K extends keyof T
    ? T[K] extends string
      ? T[K]
      : never
    : K]: K extends keyof U ? U[K] : never;
};

export function rename<T extends object, K extends Record<keyof T, string>>(
  obj: T,
  renames: Partial<K>,
): RenameBy<T, K> {
  return Object.fromEntries(
    Object.entries(obj).map(([key, val]) => [renames[key as keyof T] ?? key, val]),
  ) as RenameBy<T, K>;
}

export function pick<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  return Object.fromEntries(
    Object.entries(obj).filter(([key, val]) => val && keys.includes(key as K)),
  ) as Pick<T, K>;
}

export function pickCard<T extends EntityType, K extends keyof GetRowType<T>>(
  type: T,
  keys: K[],
) {
  const cardData = get(card);
  if (cardData?.type !== type) throw new Error("pickCard error type");
  return pick(cardData as unknown as GetRowType<T>, keys);
}

export function emptyToNull<T extends object>(optionals: T) {
  return Object.fromEntries(
    Object.entries(optionals).map(([key, val]) => [key, val ? val : null]),
  ) as T;
}
