import { del } from "$lib/stores/api/delete";
import type { EntityType, GetRowType, GetRowTypes, RPCRow } from "$lib/types/api";

export function generateUsername(displayed: string) {
  const rand = Math.floor(Math.random() * 10001);
  return `${displayed.split(" ")[0]}#${rand}`;
}

const snakeToCamel = (str: string) =>
  str
    .toLowerCase()
    .replace(/([-_][a-z])/g, (group) => group.toUpperCase().replace("-", "").replace("_", ""));

function filterObject<T extends EntityType>(startsWith: T, row: RPCRow): GetRowType<T> {
  const rest = Object.fromEntries(
    Object.entries(row)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .filter(([key, _]) => key.startsWith(startsWith))
      .map(([key, val]) => [snakeToCamel(key.split(`${startsWith}_`)[1]), val]),
  );

  return {
    type: startsWith,
    id: row.id,
    description: row.description,
    tripId: row.main_id,
    rating: row.rating,
    parent: row.parent,
    photo: row.photo,
    ...rest,
  } as GetRowType<T>;
}

const toTrip = (row: RPCRow) => filterObject("trip", row);
const toPlace = (row: RPCRow) => filterObject("place", row);
const toLodging = (row: RPCRow) => filterObject("lodging", row);
const toTransport = (row: RPCRow) => filterObject("transport", row);

export function convertRPCRow(row: RPCRow): GetRowTypes | null {
  if (row.place_name) return toPlace(row);
  if (row.trip_destination) return toTrip(row);
  if (row.lodging_name) return toLodging(row);
  if (row.transport_departure_place) return toTransport(row);
  console.warn(`Couldn't determine entity role? ${JSON.stringify(row)}`);
  del({ table: "entities", id: row.id, withToast: false });
  return null;
}
