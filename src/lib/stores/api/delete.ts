import type { Tables } from "$lib/types/api";
import { fail, success } from "$utils/toasts";
import { get } from "svelte/store";
import { routeParams } from "../routeParams";
import { supabase } from "./client";
import { myId } from "./select";

type DeleteParams<T extends keyof Tables> = {
  table: T;
  id?: string | number;
  withToast?: boolean;
  withErrorToast?: boolean;
};

export async function del<T extends keyof Tables>({
  table,
  id,
  withToast = true,
  withErrorToast = true,
}: DeleteParams<T>) {
  const idToDelete = id ?? get(routeParams.entityId);

  const { error } = await supabase.from(table).delete().eq("id", idToDelete).single();
  if (error) {
    if (withErrorToast) fail({ title: "Error", msg: "You can't do that!" });
    return false;
  }

  if (!withToast || !withErrorToast) return true;
  success({ title: "Deleted", msg: "Entity successfully deleted!" });
  return true;
}

export async function deletePhoto(photo: string) {
  return await del({ table: "photos", id: photo });
}

export async function deleteGroup(tripId: number) {
  return await supabase
    .from("groups")
    .delete()
    .eq("user_id", get(myId))
    .eq("trip_id", tripId)
    .single();
}
