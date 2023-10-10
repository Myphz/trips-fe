import { get, writable, type Writable } from "svelte/store";
import { loadSingle, load, card, filter } from "./api/select";
import { goto } from "$app/navigation";
import { routeParams } from "./routeParams";
import { getName } from "$utils/format";

export const MAIN_PAGE_TITLE = "My Trips";
export const pageTitle = writable(MAIN_PAGE_TITLE);

type RouteParams = typeof routeParams;

export type UnwrapWritable<T> = T extends Writable<infer R> ? R : never;
export type RoutesUnwrapped = { [K in keyof RouteParams]: UnwrapWritable<RouteParams[K]> };

export let paramsHistory: Partial<RoutesUnwrapped>[] = [];

export const isDarkMode = writable(false);

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

export const restore = async (
  _routeParams: RoutesUnwrapped,
  _paramsHistory: typeof paramsHistory,
  _filter: UnwrapWritable<typeof filter>,
) => {
  const { entityId, parent, tripId } = _routeParams;
  routeParams.entityId.set(entityId);
  routeParams.parent.set(parent);
  routeParams.tripId.set(tripId);

  paramsHistory = _paramsHistory;
  filter.set(_filter);

  load();
  await loadSingle();

  getName(get(card)) && setPageTitle(getName(get(card)));
};

export const setRouteParams = (
  params: Partial<RoutesUnwrapped>,
  opts?: { saveParams?: boolean; paramsRedirect?: boolean },
) => {
  const { saveParams = true, paramsRedirect = true } = opts ?? {};

  Object.entries(params).map(([key, val]) => {
    routeParams[key as keyof RouteParams].set(val);
  });

  if (saveParams) paramsHistory.push(params);
  if ("parent" in params || "tripId" in params) load();
  if ("entityId" in params) loadSingle();
  if (window.location.pathname !== "/app/trip" && paramsRedirect) {
    if (params.tripId) goto("/app/trip");
    else goto("/app");
  }
};

export const setPageTitle = (title: string) => {
  pageTitle.set(title);
};
