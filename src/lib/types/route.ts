import type { routeParams } from "$lib/stores/routeParams";
import type { Writable } from "svelte/store";

type RouteParams = typeof routeParams & {
  title: string;
  currency: string;
  currencyRatio: number;
};

export type UnwrapWritable<T> = T extends Writable<infer R> ? R : T;
export type RoutesUnwrapped = { [K in keyof RouteParams]: UnwrapWritable<RouteParams[K]> };
