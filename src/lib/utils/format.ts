import { format } from "date-fns";

export function capitalize(text: string) {
  return `${text[0].toUpperCase()}${text.slice(1)}`;
}

export function dateToCard(date: string) {
  return format(new Date(date), "d MMM u");
}
