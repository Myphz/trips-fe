import type { EntityType, GetRowTypes, Tables } from "$lib/types/api";
import { convertRPCRow } from "$utils/api";
import { addOptionals } from "$utils/objects";
import { get, writable } from "svelte/store";
import { supabase } from "./client";
import { routeParams } from "../routeParams";
import type { UnwrapWritable } from "$lib/types/route";
import { getStart } from "$utils/format";
import { gotoWithScroll } from "$utils/goto";

export const loading = writable(true);

export const allCards = writable<GetRowTypes[]>([]);
export const cards = writable<Awaited<ReturnType<typeof getAll>>>([]);
export const card = writable<Awaited<ReturnType<typeof getAll>>[number] | null>(null);

export const filter = writable<EntityType | null>(null);

export const photos = writable<Tables["photos"]["Row"][]>([]);

export const myId = writable("");
export const myProfile = writable<Tables["profiles"]["Row"] | null>(null);

export const invitesN = writable(0);

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

export function filterCards({
  filt,
  data,
}: {
  filt?: UnwrapWritable<typeof filter>;
  data?: GetRowTypes[];
} = {}): GetRowTypes[] {
  const rows = data || get(allCards);
  const actualFilter = filt || get(filter);

  const toFilter: EntityType[] = (() => {
    if (actualFilter === "trip") return ["trip", "place"];
    if (!actualFilter) return ["lodging", "place", "transport", "trip"];
    return [actualFilter];
  })();

  return rows.filter((row) => toFilter.includes(row.type));
}

async function getAll() {
  const { tripId, parent } = routeParams;
  const { data, error } = await supabase.rpc(
    "get_all",
    addOptionals({ tripid: get(tripId), parentid: get(parent) }),
  );
  if (error) throw new Error(`Supabase error: ${error.message}\nDetails: ${error.details}`);

  const ret = data
    .map((row) => convertRPCRow(row))
    .filter((val) => !!val)

    // Sort by start date (closest to current)
    .toSorted((card1, card2) => {
      const now = +new Date();

      const time1 = getStart(card1);
      const time2 = getStart(card2);

      // If no times are set, mantain current order.
      if (!time1 && !time2) return 0;

      // If a time is set, but not in the other card
      // always show the card with a time first.
      if (time1 && !time2) return -1;
      if (time2 && !time1) return 1;

      const diff1 = time1 - now;
      const diff2 = time2 - now;

      // If both cards are already passed, sort by latest
      if (diff1 < 0 && diff2 < 0) return diff2 < diff1 ? -1 : 1;

      // If one card is passed, but not the other, always displayed the one not passed first.
      if (diff1 < 0) return 1;
      if (diff2 < 0) return -1;

      // If both cards are future, display the closest one
      return diff2 < diff1 ? 1 : -1;
    })
    .toSorted((card1, card2) => {
      // Always show trips before anything else
      if (card1?.type !== card2?.type) {
        if (card1?.type === "trip") return -1;
        if (card2?.type === "trip") return 1;
      }
      return 0;
    }) as GetRowTypes[];

  allCards.set(ret);
  return filterCards({ data: ret });
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

  photos.set(
    (await select({ table: "photos", cond: { entity_id: cardData.id } })).toSorted(
      (p1, p2) => {
        if (p1.is_thumbnail && !p2.is_thumbnail) return -1;
        if (!p1.is_thumbnail && p2.is_thumbnail) return 1;
        return +new Date(p2.created_at) - +new Date(p1.created_at);
      },
    ),
  );
}

export async function getInvites() {
  // Wait for myId
  while (!get(myId)) {
    await new Promise((res) => setTimeout(res, 100));
  }

  const { data, error } = await supabase
    .from("groups")
    .select(
      "id, trip_id, trips ( destination, entities!trips_id_fkey ( profiles ( displayed, photo ) ) )",
    )
    .eq("user_id", get(myId))
    .eq("accepted", false);

  if (error) throw new Error(`Supabase error: ${error.message}\nDetails: ${error.details}`);
  return data;
}

export async function setMe(id: string, profileParam?: UnwrapWritable<typeof myProfile>) {
  myId.set(id);

  const profile =
    profileParam ??
    (await (async () => {
      const profile = await select({ table: "profiles", cond: { id } });
      if (!profile.length) {
        return false;
      }
      return profile[0];
    })());

  if (!profile) return;
  myProfile.set(profile);
  return true;
}

export async function logout() {
  await supabase.auth.signOut();
  myId.set("");
  myProfile.set(null);
  gotoWithScroll("/old");
}

export async function getTripInfo() {
  const { entityId } = routeParams;
  const tripId = get(entityId);
  if (!tripId) return;

  const data = (await supabase.rpc("get_trip_info", { _trip_id: tripId })).data?.[0];
  if (!data) return;

  return {
    ...data,
    // Load full photos data from id
    favourite_photos: data.favourite_photos?.length
      ? (await supabase.from("photos").select("*").in("id", data.favourite_photos.flat(99)))
          .data || []
      : [],
  };
}
