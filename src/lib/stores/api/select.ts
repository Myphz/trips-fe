import type { Tables, Trip } from "$lib/types/api";
import { convertRPCRow } from "$lib/utils/api";
import { addOptionals } from "$lib/utils/optional";
import { supabase } from "./client";

type SelectParams<T extends keyof Tables> = {
  table: T;
  cond?: Partial<Tables[T]["Row"]>;
};

type GetAllParams = Partial<{
  tripid: string;
  parentid: string;
}>;

export async function select<T extends keyof Tables>({ table, cond }: SelectParams<T>) {
  let query = supabase.from(table).select("*");
  Object.entries(cond ?? {}).forEach(([key, val]) => (query = query.eq(key, val)));

  const { error, data } = await query;
  if (error) throw new Error(`Supabase error: ${error.message}\nDetails: ${error.details}`);
  return data;
}

export async function getAll(opts: GetAllParams = {}) {
  const { tripid, parentid } = opts;
  const { data, error } = await supabase.rpc("get_all", addOptionals({ tripid, parentid }));
  if (error) throw new Error(`Supabase error: ${error.message}\nDetails: ${error.details}`);

  return data.map((row) => convertRPCRow(row));
}

export async function getMainTrips(): Promise<Trip[]> {
  const data = await getAll();
  if (data.some((row) => row.type !== "trip")) throw new Error("Element with no parent or trip_id is not a trip?");
  return data as Trip[];
}
