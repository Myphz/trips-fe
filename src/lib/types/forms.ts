import type { myProfile } from "$lib/stores/api/select";
import type { UnwrapWritable } from "$lib/stores/route";
import type { Tables } from "./api";

export type Register = { email: string; password: string; displayed: string };
export type FormParams<T extends keyof Tables> = Tables["entities"]["Insert"] &
  Tables[T]["Insert"];

export type SelectedUser = Omit<
  Partial<NonNullable<UnwrapWritable<typeof myProfile>>>,
  "username"
> & {
  username: string;
};
