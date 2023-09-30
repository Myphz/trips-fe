import { writable, type Writable } from "svelte/store";
import { load } from "./api/select";
import { goto } from "$app/navigation";

export const routeParams = {
  entityId: writable(0),
  parent: writable(0),
  tripId: writable(0),
};

export const MAIN_PAGE_TITLE = "My Trips";
export const pageTitle = writable(MAIN_PAGE_TITLE);

type RouteParams = typeof routeParams;

type UnwrapWritable<T> = T extends Writable<infer R> ? R : never;
export type RoutesUnwrapped = { [K in keyof RouteParams]: UnwrapWritable<RouteParams[K]> };

const paramsHistory: Partial<RoutesUnwrapped>[] = [];

export const undo = () => {
  paramsHistory.pop();
  const last = paramsHistory.pop();

  if (!last) {
    setRouteParams({ entityId: 0, parent: 0, tripId: 0 }, { saveParams: false });
    return false;
  }

  setRouteParams(last);
  return true;
};

export const setRouteParams = (params: Partial<RoutesUnwrapped>, opts?: { saveParams: boolean }) => {
  const { saveParams = true } = opts ?? {};

  Object.entries(params).map(([key, val]) => {
    routeParams[key as keyof RouteParams].set(val);
  });

  if (saveParams) paramsHistory.push(params);
  if ("parent" in params || "tripId" in params) load();
  if (window.location.pathname !== "/app/trip") {
    if (params.tripId) goto("/app/trip");
    else goto("/app");
  }
};

export const setPageTitle = (title: string) => {
  pageTitle.set(title);
};
