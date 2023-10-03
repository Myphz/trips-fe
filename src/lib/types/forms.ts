import type { Tables } from "./api";

export type Register = { email: string; password: string; displayed: string };
export type FormParams<T extends keyof Tables> = Tables["entities"]["Insert"] &
  Tables[T]["Insert"];
