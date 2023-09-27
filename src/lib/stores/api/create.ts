import type { Tables } from "$lib/types/api";
import type { AddTrip } from "$lib/types/forms";
import { capitalize } from "$lib/utils/format";
import { addOptionals } from "$lib/utils/optional";
import { success } from "$lib/utils/toasts";
import { get } from "svelte/store";
import { routeParams } from "../route";
import { supabase } from "./client";
import { load } from "./select";

type CreateParams<T extends keyof Tables> = {
  table: T;
  params: Tables[T]["Insert"];
  withToast?: boolean;
};

export async function create<T extends keyof Tables>({ table, params, withToast = true }: CreateParams<T>) {
  // @ts-ignore
  const { data, error } = await supabase.from(table).insert([params]).select();
  if (error) throw new Error(`Supabase error: ${error.message}\nDetails: ${error.details}`);
  if (table !== "entities" && withToast)
    success({ title: "Success", msg: `${capitalize(table.slice(0, -1))} created successfully!` });

  load();
  return data[0];
}

export async function addTrip({ destination, end_date, start_date }: AddTrip) {
  const { parent, tripId } = routeParams;
  // Create entity
  const entity = await create({
    table: "entities",
    params: addOptionals({ parent: get(parent), trip_id: get(tripId) }),
  });

  const tripParams = { id: entity.id, destination, ...addOptionals({ end_date, start_date }) };
  // Create trip
  const trip = await create({ table: "trips", params: tripParams });
  // Create group if it's a main trip
  if (!entity.trip_id)
    await create({ table: "groups", params: { trip_id: trip.id, accepted: true }, withToast: false });
  return trip;
}
