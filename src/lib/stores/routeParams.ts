import { writable } from "svelte/store";

export const routeParams = {
  entityId: writable(0),
  parent: writable(0),
  tripId: writable(0),
};

export const moveEntity = writable<{ name: string; id: number } | null>(null);
