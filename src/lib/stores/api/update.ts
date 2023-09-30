import type { EntityCommon, Tables } from "$lib/types/api";
import { success } from "$utils/toasts";
import { get } from "svelte/store";
import { supabase } from "./client";
import { card, load, loadSingle } from "./select";

type UpdateParams<T extends keyof Tables> = {
  table: T;
  id: string | number;
  params: Tables[T]["Update"];
  withToast?: boolean;
};

export async function update<T extends keyof Tables>({
  table,
  params,
  id,
  withToast = true,
}: UpdateParams<T>) {
  // @ts-ignore
  const { data, error } = await supabase.from(table).update(params).eq("id", id).select();
  if (error) throw new Error(`Supabase error: ${error.message}\nDetails: ${error.details}`);
  if (withToast) success({ title: "Success", msg: "Entity updated successfully!" });

  load();
  loadSingle();

  return data[0];
}

export async function updateCard(
  params: Partial<EntityCommon>,
  { withToast }: { withToast: boolean },
) {
  const cardData = get(card);
  if (!cardData) return;

  return await update({ id: cardData.id, table: "entities", params, withToast });
}
