import { writable } from "svelte/store";

export const pexelSearch = writable("");
export const updatePexelSearchOnInput = (e: Event) => {
  const target = e.target || {};
  const value = "value" in target && target.value;
  if (!value || typeof value !== "string") return;
  pexelSearch.set(value);
};
