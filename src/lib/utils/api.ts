import type { EntityType, GetRowType, GetRowTypes, RPCRow } from "$lib/types/api";

export function generateUsername(displayed: string) {
  const rand = Math.floor(Math.random() * 10001);
  return `${displayed.split(" ")[0]}#${rand}`;
}

function filterObject<T extends EntityType>(startsWith: T, row: RPCRow): GetRowType<T> {
  const rest = Object.fromEntries(
    Object.entries(row)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .filter(([key, _]) => key.startsWith(startsWith))
      .map(([key, val]) => [key.split(`${startsWith}_`)[1], val]),
  );

  return {
    type: startsWith,
    id: row.id,
    tripId: row.main_id,
    rating: row.rating,
    parent: row.parent,
    ...rest,
  } as GetRowType<T>;
}

const toTrip = (row: RPCRow) => filterObject("trip", row);
const toPlace = (row: RPCRow) => filterObject("place", row);
const toLodging = (row: RPCRow) => filterObject("lodging", row);
const toTransport = (row: RPCRow) => filterObject("transport", row);

export function convertRPCRow(row: RPCRow): GetRowTypes {
  if (row.place_name) return toPlace(row);
  if (row.trip_destination) return toTrip(row);
  if (row.lodging_name) return toLodging(row);
  if (row.transport_mean) return toTransport(row);
  throw new Error("Couldn't determine entity role?");
}
