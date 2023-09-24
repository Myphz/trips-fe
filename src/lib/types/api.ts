import type { Database } from "./supabase";

export type RPCRow = Database["public"]["Functions"]["get_all"]["Returns"][number];

export type Tables = Database["public"]["Tables"];

type EntityCommon = {
  id: number;
  rating: number;
};

export type Trip = EntityCommon & {
  type: "trip";
  destination: string;
};

export type Place = EntityCommon & {
  type: "place";
  name: string;
};

export type Lodging = EntityCommon & {
  type: "lodging";
  name: string;
};

export type Entity = Trip | Place | Lodging;
