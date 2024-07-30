import { card } from "$lib/stores/api/select";
import type { EntityType, GetRowType } from "$lib/types/api";
import { get } from "svelte/store";

/* eslint-disable @typescript-eslint/no-unused-vars */
export function addOptionals<T extends object>(optionals: T) {
  return Object.fromEntries(Object.entries(optionals).filter(([_, val]) => !!val)) as Partial<
    Required<T>
  >;
}

export function rename<
  T extends Record<string, unknown>,
  K extends Partial<Record<keyof T, string>>,
>(obj: T, renames: K) {
  return Object.fromEntries(
    Object.entries(obj).map(([key, val]) => [renames[key as keyof T] ?? key, val]),
  ) as Omit<T, keyof K> & { [P in NonNullable<K[keyof K]>]: T[K[P] & keyof T] };
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
  if (cardData?.type !== type) return {};
  return pick(cardData as unknown as GetRowType<T>, keys);
}

export function emptyToNull<T extends object>(optionals: T) {
  return Object.fromEntries(
    Object.entries(optionals).map(([key, val]) => [key, val ? val : null]),
  ) as T;
}

export function splitArrayIntoChunks<T>(arr: T[], chunkSize: number): T[][] {
  if (chunkSize <= 0) {
    throw new Error("Chunk size must be greater than 0");
  }

  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    result.push(arr.slice(i, i + chunkSize));
  }

  return result;
}
