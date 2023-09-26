import type { Tables } from "$lib/types/api";
import { convertRPCRow } from "$lib/utils/api";
import { addOptionals } from "$lib/utils/optional";
import { get } from "svelte/store";
import { routeParams } from "../route";
import { supabase } from "./client";

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

export async function getAll() {
  const { tripId, parent } = routeParams;
  const { data, error } = await supabase.rpc("get_all", addOptionals({ tripid: get(tripId), parentid: get(parent) }));
  if (error) throw new Error(`Supabase error: ${error.message}\nDetails: ${error.details}`);

  return data.map((row) => convertRPCRow(row));
}
