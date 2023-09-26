import { writable, type Writable } from "svelte/store";

export const routeParams = {
  entityId: writable(0),
};

export const MAIN_PAGE_TITLE = "My Trips";
export const pageTitle = writable(MAIN_PAGE_TITLE);

type RouteParams = typeof routeParams;

type UnwrapWritable<T> = T extends Writable<infer R> ? R : never;
export type RoutesUnwrapped = { [K in keyof RouteParams]: UnwrapWritable<RouteParams[K]> };

export const setRouteParams = (params: Partial<RoutesUnwrapped>) => {
  Object.entries(params).map(([key, val]) => {
    routeParams[key as keyof RouteParams].set(val);
  });
};

export const setPageTitle = (title: string) => {
  pageTitle.set(title);
};
