import type { myProfile } from "$lib/stores/api/select";
import type { Tables } from "./api";
import type { UnwrapWritable } from "./route";

export type Register = { email: string; password: string; displayed: string };
export type CreateProfile = { displayed: string; id: string };
export type FormParams<T extends keyof Tables> = Tables["entities"]["Insert"] &
  Tables[T]["Insert"];

export type SelectedUser = Omit<
  Partial<NonNullable<UnwrapWritable<typeof myProfile>>>,
  "username"
> & {
  username: string;
};
