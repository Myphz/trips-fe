import type { Tables } from "$lib/types/api";
import type { AddTrip } from "$lib/types/forms";
import { capitalize } from "$lib/utils/format";
import { addOptionals } from "$lib/utils/optional";
import { success } from "$lib/utils/toasts";

type CreateParams<T extends keyof Tables> = {
  table: T;
  params: Tables[T]["Insert"];
};

export async function create<T extends keyof Tables>({ table, params }: CreateParams<T>) {
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
