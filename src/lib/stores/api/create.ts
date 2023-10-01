import type { Tables } from "$lib/types/api";
import type { AddTrip } from "$lib/types/forms";
import { capitalize } from "$utils/format";
import { addOptionals } from "$utils/objects";
import { success } from "$utils/toasts";
import { get } from "svelte/store";
import { supabase } from "./client";
import { load } from "./select";
import { routeParams } from "../routeParams";

type CreateParams<T extends keyof Tables> = {
  table: T;
  params: Tables[T]["Insert"];
  withToast?: boolean;
};

export async function create<T extends keyof Tables>({
  table,
  params,
  withToast = true,
}: CreateParams<T>) {
  // @ts-ignore
  const { data, error } = await supabase.from(table).insert([params]).select();
  if (error) throw new Error(`Supabase error: ${error.message}\nDetails: ${error.details}`);
  if (table !== "entities" && withToast)
    success({
      title: "Success",
      msg: `${capitalize(table.slice(0, -1))} created successfully!`,
    });

  if (table !== "entities") load();
  return data[0];
}

export async function addTrip({ destination, end_date, start_date, photo }: AddTrip) {
  const { parent, tripId } = routeParams;
  // Create entity
  const entity = await create({
    table: "entities",
    params: addOptionals({ parent: get(parent), trip_id: get(tripId), photo }),
  });

  const tripParams = { id: entity.id, destination, ...addOptionals({ end_date, start_date }) };
  // Create trip
  const trip = await create({ table: "trips", params: tripParams });
  // Create group if it's a main trip
  if (!entity.trip_id)
    await create({
      table: "groups",
      params: { trip_id: trip.id, accepted: true },
      withToast: false,
    });
  return trip;
}
