import type { GetRowTypes } from "$lib/types/api";
import { format } from "date-fns";

export function capitalize(text: string) {
  return `${text[0].toUpperCase()}${text.slice(1)}`;
}

export function dateToCard(date: string) {
  return format(new Date(date), "d MMM u");
}

export function datetimeToCard(date: string) {
  return format(new Date(date), "d MMM HH:mm");
}

export function datetimeToISO(date: string) {
  return format(new Date(date), "yyy-MM-dd HH:mm");
}

export function getName(card: GetRowTypes | null) {
  if (!card) return "";
  if (card.type === "trip") return card.destination;
  if (card.type === "lodging") return card.name;
  if (card.type === "place") return card.name;
  if (card.type === "transport") return `${card.arrivalPlace} - ${card.departurePlace}`;
  return "";
}

export const toISOStringWithTimezone = (date: Date) => {
  const tzOffset = -date.getTimezoneOffset();
  const diff = tzOffset >= 0 ? "+" : "-";
  const pad = (n: number) => `${Math.floor(Math.abs(n))}`.padStart(2, "0");
  return (
    date.getFullYear() +
    "-" +
    pad(date.getMonth() + 1) +
    "-" +
    pad(date.getDate()) +
    "T" +
    pad(date.getHours()) +
    ":" +
    pad(date.getMinutes()) +
    ":" +
    pad(date.getSeconds()) +
    diff +
    pad(tzOffset / 60) +
    ":" +
    pad(tzOffset % 60)
  );
};
