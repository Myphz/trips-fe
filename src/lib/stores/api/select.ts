import type { EntityType, GetRowTypes, Tables } from "$lib/types/api";
import { convertRPCRow } from "$utils/api";
import { addOptionals } from "$utils/objects";
import { get, writable } from "svelte/store";
import { supabase } from "./client";
import { routeParams } from "../routeParams";

export const loading = writable(true);
export const cards = writable<Awaited<ReturnType<typeof getAll>>>([]);
export const card = writable<Awaited<ReturnType<typeof getAll>>[number] | null>(null);
export const filter = writable<EntityType | null>(null);
export const photos = writable<Tables["photos"]["Row"][]>([]);
export const myId = writable("");

type SelectParams<T extends keyof Tables> = {
  table: T;
  cond?: Partial<Tables[T]["Row"]>;
};

export async function select<T extends keyof Tables>({ table, cond }: SelectParams<T>) {
  let query = supabase.from(table).select("*");
  Object.entries(cond ?? {}).forEach(([key, val]) => (query = query.eq(key, val)));

  const { error, data } = await query;
  if (error)
    throw new Error(
      `Supabase error: ${error.message}\nDetails: ${JSON.stringify(error.details)}`,
    );
  return data;
}

async function getAll() {
  const { tripId, parent } = routeParams;
  const { data, error } = await supabase.rpc(
    "get_all",
    addOptionals({ tripid: get(tripId), parentid: get(parent) }),
  );
  if (error) throw new Error(`Supabase error: ${error.message}\nDetails: ${error.details}`);
  const toFilter: EntityType[] = (() => {
    const filt = get(filter);
    if (filt === "trip") return ["trip", "place"];
    if (!filt) return ["lodging", "place", "transport", "trip"];
    return [filt];
  })();

  return data
    .map((row) => convertRPCRow(row))
    .filter((val) => !!val)
    .filter((row) => toFilter.includes(row!.type))
    .sort((card1, card2) => {
      if (card1?.type !== card2?.type) {
        if (card1?.type === "trip") return -1;
        if (card2?.type === "trip") return 1;
      }
      return 0;
    }) as GetRowTypes[];
}

export async function filterOnly(type: EntityType) {
  filter.set(type);
  load();
}

export async function loadSingle(opts: { setNull?: boolean } = {}) {
  const { setNull = true } = opts;
  setNull && card.set(null);

  const { entityId } = routeParams;
  if (!get(entityId)) return;

  const { data, error } = await supabase.rpc("get_single", { entityid: get(entityId) });
  if (error) throw new Error(`Supabase error: ${error.message}\nDetails: ${error.details}`);
  if (data.length !== 1) throw new Error("Entity not found");

  card.set(convertRPCRow(data[0]));
}

export async function load() {
  loading.set(true);
  cards.set(await getAll());
  loading.set(false);
}

export async function loadPhotos() {
  photos.set([]);

  const cardData = get(card);
  if (!cardData) return;

  photos.set(await select({ table: "photos", cond: { entity_id: cardData.id } }));
}

export async function getInvites() {
  // Wait for myId
  while (!get(myId)) {
    await new Promise((res) => setTimeout(res, 100));
  }

  const { data, error } = await supabase
    .from("groups")
    .select(
      "id, trip_id, trips ( destination, entities!trips_id_fkey ( profiles ( displayed ) ) )",
    )
    .eq("user_id", get(myId))
    .eq("accepted", false);

  if (error) throw new Error(`Supabase error: ${error.message}\nDetails: ${error.details}`);
  return data;
}
