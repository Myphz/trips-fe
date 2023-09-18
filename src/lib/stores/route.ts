import { writable, type Writable } from "svelte/store";

export const routeParams = {
  a: writable(0),
  b: writable(""),
};

type RouteParams = typeof routeParams;

type UnwrapWritable<T> = T extends Writable<infer R> ? R : never;
export type RoutesUnwrapped = { [K in keyof RouteParams]: UnwrapWritable<RouteParams[K]> };

export const setRouteParams = (params: Partial<RoutesUnwrapped>) => {
  Object.entries(params).map(([key, val]) => {
    // @ts-ignore
    routeParams[key].set(val);
  });
};
