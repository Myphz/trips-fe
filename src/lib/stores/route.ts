import { get, writable, type Writable } from "svelte/store";
import { loadSingle, load, card, filter } from "./api/select";
import { goto } from "$app/navigation";
import { moveEntity, routeParams } from "./routeParams";
import { getName } from "$utils/format";
import type { RoutesUnwrapped, UnwrapWritable } from "$lib/types/route";
import { goBack } from "$utils/guard";
import { update } from "./api/update";

export const MAIN_PAGE_TITLE = "My Trips";
export const pageTitle = writable(MAIN_PAGE_TITLE);

export const paramsHistory: Writable<Partial<RoutesUnwrapped>[]> = writable([]);

export const isDarkMode = writable(false);
export const showWarningRedirect = writable(false);

export const undo = () => {
  const last = get(paramsHistory).at(-2);
  paramsHistory.set(get(paramsHistory).slice(0, -2));

  if (!last) {
    setRouteParams({ entityId: 0, parent: 0, tripId: 0 }, { saveParams: false });
    return false;
  }

  setRouteParams(last);
  return true;
};

export const restore = async (
  _routeParams: RoutesUnwrapped,
  _paramsHistory: UnwrapWritable<typeof paramsHistory>,
  _filter: UnwrapWritable<typeof filter>,
) => {
  const { entityId, parent, tripId } = _routeParams;
  routeParams.entityId.set(entityId);
  routeParams.parent.set(parent);
  routeParams.tripId.set(tripId);

  paramsHistory.set(_paramsHistory);
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
  const { title, ...rest } = params;

  Object.entries(rest).map(([key, val]) => {
    routeParams[key as keyof typeof routeParams].set(val);
  });

  if (saveParams)
    paramsHistory.set([...get(paramsHistory), { ...params, title: title ?? get(pageTitle) }]);
  if ("parent" in params || "tripId" in params) load();
  if ("entityId" in params) loadSingle();
  if (window.location.pathname !== "/trip" && paramsRedirect) {
    if (params.tripId) goto("/trip");
    else goto("/");
  }
};

export const setPageTitle = (title: string) => {
  pageTitle.set(title);
};

export const activateMode = () => {
  const entityId = get(routeParams.entityId);
  moveEntity.set({ id: entityId, name: getName(get(card)) });
  goBack();
};

export const move = async () => {
  const moveObj = get(moveEntity);
  if (!moveObj) return console.error("Can't move null!");

  const entityId = get(routeParams.entityId);
  if (!entityId) return console.error("Can't move in null!");

  await update({
    table: "entities",
    id: moveObj.id,
    params: { parent: get(routeParams.parent), trip_id: get(routeParams.tripId) },
  });

  moveEntity.set(null);
};
