import type { Database } from "./supabase";

export type RPCRow = Database["public"]["Functions"]["get_all"]["Returns"][number];
export type Tables = Database["public"]["Tables"];

type SnakeToCamel<S extends string> = S extends `${infer Head}_${infer Tail}`
  ? `${Lowercase<Head>}${Capitalize<SnakeToCamel<Tail>>}`
  : S;

type SnakeToCamelArray<S extends string> = S extends `${infer Head}_${infer Tail}`
  ? `${Lowercase<Head>}${Capitalize<SnakeToCamel<Tail>>}`
  : S;

type StartWith<Filter extends string> = {
  [K in keyof RPCRow]: K extends `${Filter}_${infer Rest}` ? Rest : never;
}[keyof RPCRow];

type FilterRow<T extends string> = {
  [x in SnakeToCamelArray<StartWith<T>>]: RPCRow[Extract<keyof RPCRow, `${T}_${x}`>];
};

type EntityCommon = {
  id: number;
  rating: number;
  tripId: number;
  parent: number;
};

export type EntityType = "trip" | "place" | "transport" | "lodging";
export type GetRowType<T extends EntityType> = EntityCommon & { type: T } & FilterRow<T>;
export type GetRowTypes = {
  [K in EntityType]: GetRowType<K>;
}[EntityType];
