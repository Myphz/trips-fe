import type { Tables } from "$lib/types/api";
import { success } from "$utils/toasts";
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
  await supabase.from(table).delete().eq("id", idToDelete);
  if (!withToast) return;

  success({ title: "Deleted", msg: "Entity successfully deleted!" });
}
