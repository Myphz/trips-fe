import { createClient } from "@supabase/supabase-js";
import { SUPABASE_KEY, SUPABASE_URL } from "../../constants";
import type { Database } from "$lib/types/supabase";
import type { AddTrip } from "$lib/types/forms";
import { addOptionals } from "$utils/optional";
import { success } from "$utils/toasts";
import { capitalize } from "$utils/format";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_KEY);

type CreateParams<T extends keyof Database["public"]["Tables"]> = {
  table: T;
  params: Database["public"]["Tables"][T]["Insert"];
};

async function create<T extends keyof Database["public"]["Tables"]>({ table, params }: CreateParams<T>) {
  // @ts-ignore
  const { data, error } = await supabase.from(table).insert([params]).select();
  if (error) throw new Error(`Supabase error: ${error.message}\nDetails: ${error.details}`);
  if (table !== "entities")
    success({ title: "Success", msg: `${capitalize(table.slice(0, -1))} created successfully!` });
  return data[0];
}

export async function addTrip({ destination, end_date, start_date }: AddTrip) {
  const entity = await create({ table: "entities", params: {} });
  const tripParams = { id: entity.id, destination, ...addOptionals({ end_date, start_date }) };

  const trip = await create({ table: "trips", params: tripParams });
  return trip;
}
