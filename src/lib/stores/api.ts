import { createClient } from "@supabase/supabase-js";
import { SUPABASE_KEY, SUPABASE_URL } from "../../constants";
import type { Database } from "$lib/types/supabase";
import type { AddTrip } from "$lib/types/forms";
import { addOptionals } from "$utils/optional";
import { success } from "$utils/toasts";
import { capitalize } from "$utils/format";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_KEY);

type Tables = Database["public"]["Tables"];

type CreateParams<T extends keyof Tables> = {
  table: T;
  params: Tables[T]["Insert"];
};

type SelectParams<T extends keyof Tables> = {
  table: T;
  cond?: Partial<Tables[T]["Row"]>;
};

async function create<T extends keyof Tables>({ table, params }: CreateParams<T>) {
  // @ts-ignore
  const { data, error } = await supabase.from(table).insert([params]).select();
  if (error) throw new Error(`Supabase error: ${error.message}\nDetails: ${error.details}`);
  if (table !== "entities")
    success({ title: "Success", msg: `${capitalize(table.slice(0, -1))} created successfully!` });
  return data[0];
}

export async function select<T extends keyof Tables>({ table, cond }: SelectParams<T>) {
  let query = supabase.from(table).select("*");
  Object.entries(cond ?? {}).forEach(([key, val]) => (query = query.eq(key, val)));

  const { error, data } = await query;
  if (error) throw new Error(`Supabase error: ${error.message}\nDetails: ${error.details}`);
  return data;
}

export async function addTrip({ destination, end_date, start_date }: AddTrip) {
  const entity = await create({ table: "entities", params: {} });
  const tripParams = { id: entity.id, destination, ...addOptionals({ end_date, start_date }) };

  const trip = await create({ table: "trips", params: tripParams });
  return trip;
}
