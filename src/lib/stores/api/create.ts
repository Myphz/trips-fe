import type { Tables } from "$lib/types/api";
import { capitalize } from "$utils/format";
import { addOptionals } from "$utils/objects";
import { fail, success } from "$utils/toasts";
import { get } from "svelte/store";
import { supabase } from "./client";
import { card, load, loadPhotos, select } from "./select";
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
}: CreateParams<T>): Promise<Tables[T]["Row"]> {
  // @ts-ignore
  const { data, error } = await supabase.from(table).insert([params]).select();
  if (error) throw new Error(`Supabase error: ${error.message}\nDetails: ${error.details}`);
  if (table !== "entities" && withToast)
    success({
      title: "Success",
      msg: `${capitalize(table.slice(0, -1))} created successfully!`,
    });

  if (table !== "entities") load();
  return data[0] as unknown as Tables[T]["Row"];
}

export async function addEntity<T extends keyof Tables>(
  type: T,
  params: Tables["entities"]["Insert"] & Tables[T]["Insert"],
) {
  const { parent, tripId } = routeParams;
  const { photo, ...rest } = params;

  if (!get(tripId) && type !== "trips")
    throw new Error("Can't create something that's not a trip without a tripid");
  // Create entity
  const entity = await create({
    table: "entities",
    params: addOptionals({ parent: get(parent), trip_id: get(tripId), photo }),
  });

  const rowParams = { id: entity.id, ...addOptionals(rest) };
  // Create trip|lodging|transport|place
  const row = await create({ table: type, params: rowParams });
  // Create group if it's a main trip
  if (!get(tripId) && type === "trips") {
    await create({
      table: "groups",
      params: { trip_id: row.id as number, accepted: true },
      withToast: false,
    });
  }
  return row;
}

export async function createPhotos(ids: string[]) {
  const entityId = get(card)!.id;
  await Promise.all(
    ids.map((id) =>
      create({ table: "photos", params: { id, entity_id: entityId }, withToast: false }),
    ),
  );
  loadPhotos();
  success({ title: "Media uploaded", msg: "Media uploaded successfully!" });
}

export async function inviteUser(username: string, tripId: number) {
  const userId = await select({ table: "profiles", cond: { username } });
  if (!userId.length) return fail({ title: "Can't find user", msg: `Can't find ${username}` });

  await create({
    table: "groups",
    params: { trip_id: tripId, user_id: userId[0].id },
    withToast: false,
  });
}
