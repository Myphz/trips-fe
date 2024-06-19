import { derived, get, writable, type Writable } from "svelte/store";
import { loadSingle, load, card, filter } from "./api/select";
import { goto } from "$app/navigation";
import { moveEntity, routeParams } from "./routeParams";
import { getName } from "$utils/format";
import type { RoutesUnwrapped, UnwrapWritable } from "$lib/types/route";
import { goBack } from "$utils/guard";

export const MAIN_PAGE_TITLE = "My Trips";
export const pageTitle = writable(MAIN_PAGE_TITLE);

export const paramsHistory: Writable<Partial<RoutesUnwrapped>[]> = writable([]);
export const history = derived(paramsHistory, ($paramsHistory) =>
  $paramsHistory.slice($paramsHistory.findLastIndex((history) => history.entityId === 0) + 1),
);
export const tripCurrency = writable("");
export const tripCurrencyRatio = writable(0);

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
  _tripCurrency: UnwrapWritable<typeof tripCurrency>,
  _tripCurrencyRatio: string,
) => {
  const { entityId, parent, tripId } = _routeParams;
  routeParams.entityId.set(entityId);
  routeParams.parent.set(parent);
  routeParams.tripId.set(tripId);

  paramsHistory.set(_paramsHistory);
  filter.set(_filter);
  tripCurrency.set(_tripCurrency);
  tripCurrencyRatio.set(parseFloat(_tripCurrencyRatio));

  load();
  await loadSingle();

  getName(get(card)) && setPageTitle(getName(get(card)));
};

export const setRouteParams = (
  params: Partial<RoutesUnwrapped>,
  opts?: { saveParams?: boolean; paramsRedirect?: boolean },
) => {
  const { saveParams = true, paramsRedirect = true } = opts ?? {};
  const { title, currency, currencyRatio, ...rest } = params;

  Object.entries(rest).map(([key, val]) => {
    routeParams[key as keyof typeof routeParams].set(val);
  });

  if (currency || !get(routeParams.tripId)) tripCurrency.set(currency || "");
  if (currencyRatio || !get(routeParams.tripId)) tripCurrencyRatio.set(currencyRatio || 0);

  if (saveParams) {
    paramsHistory.set([...get(paramsHistory), { ...params, title: title ?? get(pageTitle) }]);
  } else {
    paramsHistory.set([]);
  }
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
