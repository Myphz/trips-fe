import type { Database } from "./supabase";

export type RPCRow = Database["public"]["Functions"]["get_all"]["Returns"][number];
export type Tables = Database["public"]["Tables"];

type SnakeToCamel<S extends string> = S extends `${infer Head}_${infer Tail}`
  ? `${Lowercase<Head>}${Capitalize<SnakeToCamel<Tail>>}`
  : S;

type FilterRow<T extends string> = {
  [K in keyof RPCRow as K extends `${T}_${infer Rest}`
    ? SnakeToCamel<Rest>
    : never]: RPCRow[K];
};

export type EntityCommon = {
  id: number;
  description: string;
  photo: string;
  rating: number;
  tripId: number;
  parent: number;
};

export type EntityType = "trip" | "place" | "transport" | "lodging";
export type GetRowType<T extends EntityType> = EntityCommon & { type: T } & FilterRow<T>;

export type GetRowTypes = {
  [K in EntityType]: GetRowType<K>;
}[EntityType];
