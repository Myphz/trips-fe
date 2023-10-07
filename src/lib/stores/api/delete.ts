import type { Tables } from "$lib/types/api";
import { fail, success } from "$utils/toasts";
import { get } from "svelte/store";
import { routeParams } from "../routeParams";
import { supabase } from "./client";

type DeleteParams<T extends keyof Tables> = {
  table: T;
  id?: string | number;
  withToast?: boolean;
};

export async function del<T extends keyof Tables>({
  table,
  id,
  withToast = true,
}: DeleteParams<T>) {
  const idToDelete = id ?? get(routeParams.entityId);

  const { error } = await supabase.from(table).delete().eq("id", idToDelete).single();
  if (error) return fail({ title: "Error", msg: "You can't do that!" });

  if (!withToast) return;
  success({ title: "Deleted", msg: "Entity successfully deleted!" });
}

export async function deletePhoto(photo: string) {
  return await del({ table: "photos", id: photo });
}
