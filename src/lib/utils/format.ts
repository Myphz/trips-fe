import type { GetRowTypes } from "$lib/types/api";
import { format } from "date-fns";

export function capitalize(text: string) {
  return `${text[0].toUpperCase()}${text.slice(1)}`;
}

export function dateToCard(date: string) {
  return format(new Date(date), "d MMM u");
}

export function getName(card: GetRowTypes | null) {
  if (!card) return "";
  if (card.type === "trip") return card.destination;
  if (card.type === "lodging") return card.name;
  if (card.type === "place") return card.name;
  if (card.type === "transport") return "";
  return "";
}
