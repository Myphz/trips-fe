import type { Tables } from "$lib/types/api";
import { convertRPCRow } from "$utils/api";
import { addOptionals } from "$utils/objects";
import { get, writable } from "svelte/store";
import { supabase } from "./client";
import { routeParams } from "../routeParams";

export const loading = writable(true);
export const cards = writable<Awaited<ReturnType<typeof getAll>>>([]);
export const card = writable<Awaited<ReturnType<typeof getAll>>[number] | null>(null);

type SelectParams<T extends keyof Tables> = {
  table: T;
  cond?: Partial<Tables[T]["Row"]>;
};

export async function select<T extends keyof Tables>({ table, cond }: SelectParams<T>) {
  let query = supabase.from(table).select("*");
  Object.entries(cond ?? {}).forEach(([key, val]) => (query = query.eq(key, val)));

  const { error, data } = await query;
  if (error) throw new Error(`Supabase error: ${error.message}\nDetails: ${error.details}`);
  return data;
}

async function getAll() {
  const { tripId, parent } = routeParams;
  const { data, error } = await supabase.rpc(
    "get_all",
    addOptionals({ tripid: get(tripId), parentid: get(parent) }),
  );
  if (error) throw new Error(`Supabase error: ${error.message}\nDetails: ${error.details}`);

  return data.map((row) => convertRPCRow(row));
}

export async function loadSingle(opts: { setNull?: boolean } = {}) {
  const { setNull = true } = opts;
  setNull && card.set(null);

  const { entityId } = routeParams;
  if (!get(entityId)) return;

  const { data, error } = await supabase.rpc("get_single", { entityid: get(entityId) });
  if (error) throw new Error(`Supabase error: ${error.message}\nDetails: ${error.details}`);
  if (data.length !== 1) throw new Error("Entity not found");

  card.set(convertRPCRow(data[0]));
}

export async function load() {
  loading.set(true);
  cards.set(await getAll());
  loading.set(false);
}
