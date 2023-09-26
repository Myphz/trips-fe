import { get, writable, type Writable } from "svelte/store";

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

const unwrapParams = () => {
  return Object.fromEntries(Object.entries(routeParams).map(([_, val]) => [_, get(val)])) as RoutesUnwrapped;
};

export const undo = () => {
  const last = paramsHistory.pop();
  if (!last) {
    setRouteParams({ entityId: 0, parent: 0, tripId: 0 }, { saveParams: false });
    return false;
  }
  setRouteParams(last, { saveParams: false });
  return true;
};

export const setRouteParams = (params: Partial<RoutesUnwrapped>, opts?: { saveParams: boolean }) => {
  const { saveParams = true } = opts ?? {};
  const lastParams = unwrapParams();
  if (saveParams && (lastParams.tripId || lastParams.parent || lastParams.entityId)) paramsHistory.push(lastParams);

  Object.entries(params).map(([key, val]) => {
    routeParams[key as keyof RouteParams].set(val);
  });
};

export const setPageTitle = (title: string) => {
  pageTitle.set(title);
};
