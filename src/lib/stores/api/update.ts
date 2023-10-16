import type { EntityCommon, Tables } from "$lib/types/api";
import { fail, success } from "$utils/toasts";
import { get } from "svelte/store";
import { supabase } from "./client";
import { card, load, loadSingle } from "./select";
import { moveEntity, routeParams } from "../routeParams";

type UpdateParams<T extends keyof Tables> = {
  table: T;
  id: string | number;
  params: Tables[T]["Update"];
  withToast?: boolean;
  setNull?: boolean;
};

export async function update<T extends keyof Tables>({
  table,
  params,
  id,
  withToast = true,
  setNull = true,
}: UpdateParams<T>) {
  // @ts-ignore
  const { data, error } = await supabase.from(table).update(params).eq("id", id).select();
  if (error) {
    fail({ title: "Error", msg: "You don't have permissions to do that!" });
    throw new Error(`Supabase error: ${error.message}\nDetails: ${error.details}`);
  }
  if (withToast) success({ title: "Success", msg: "Entity updated successfully!" });

  load();
  loadSingle({ setNull });

  return data[0];
}

export async function updateCard(
  params: Partial<EntityCommon>,
  { withToast }: { withToast: boolean },
) {
  const cardData = get(card);
  if (!cardData) return;

  return await update({
    id: cardData.id,
    table: "entities",
    params,
    withToast,
    setNull: false,
  });
}

export const move = async () => {
  const moveObj = get(moveEntity);
  if (!moveObj) return console.error("Can't move null!");

  const entityId = get(routeParams.entityId);
  if (!entityId) return console.error("Can't move in null!");

  await supabase.rpc("move", { moveid: moveObj.id, tripid: get(routeParams.tripId) });
  await update({
    table: "entities",
    id: moveObj.id,
    params: { parent: get(routeParams.parent), trip_id: get(routeParams.tripId) },
  });

  moveEntity.set(null);
};
