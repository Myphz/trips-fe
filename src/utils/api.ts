import type { Entity, Lodging, Place, RPCRow, Trip } from "$lib/types/api";

export function generateUsername(displayed: string) {
  const rand = Math.floor(Math.random() * 10001);
  return `${displayed.split(" ")[0]}#${rand}`;
}

function toTrip(row: RPCRow): Trip {
  return {
    type: "trip",
    rating: row.rating,
    id: row.id,
    destination: row.trip_destination,
  };
}

function toPlace(row: RPCRow): Place {
  return {
    type: "place",
    rating: row.rating,
    id: row.id,
    name: row.place_name,
  };
}

function toLodging(row: RPCRow): Lodging {
  return {
    type: "lodging",
    rating: row.rating,
    id: row.id,
    name: row.lodging_name,
  };
}

export function convertRPCRow(row: RPCRow): Entity {
  if (row.place_name) return toPlace(row);
  if (row.trip_destination) return toTrip(row);
  if (row.lodging_name) return toLodging(row);
  throw new Error("Couldn't determine entity role?");
}
