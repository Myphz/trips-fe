import type { GetRowTypes } from "$lib/types/api";
import { format } from "date-fns";

export function capitalize(text: string) {
  return `${text[0].toUpperCase()}${text.slice(1)}`;
}

export function dateToCard(date: string) {
  if (!date) return "";
  return format(new Date(date), "d MMM u");
}

export function datetimeToCard(date: string) {
  if (!date) return "";
  return format(new Date(date), "d MMM HH:mm");
}

export function datetimeToISO(date: string) {
  if (!date) return "";
  return format(new Date(date), "yyy-MM-dd HH:mm");
}

export function datetimeToDDMMYYYY(date: string) {
  if (!date) return "";
  return format(new Date(date), "dd/MM/yyy HH:mm");
}

export function metadataDateToISODate(metadataDate: string) {
  const [datePart, timePart] = metadataDate.split(" ");
  const [year, month, day] = datePart.split(":");
  const [hour, minute, second] = timePart.split(":");
  return `${year}-${month}-${day}T${hour}:${minute}:${second}.000`;
}

export function differenceBetweenDates(
  date1: string | number,
  date2: string | number,
): string {
  const startDate = new Date(date1);
  const endDate = new Date(date2);

  const timeDifference = endDate.getTime() - startDate.getTime();
  const millisecondsInMinute = 60 * 1000;
  const millisecondsInHour = 60 * millisecondsInMinute;
  const millisecondsInDay = 24 * millisecondsInHour;

  const days = Math.floor(timeDifference / millisecondsInDay);
  const hours = Math.floor((timeDifference % millisecondsInDay) / millisecondsInHour);
  const minutes = Math.floor((timeDifference % millisecondsInHour) / millisecondsInMinute);

  const formattedDifference = [];

  if (days > 0) {
    formattedDifference.push(`${days} day${days > 1 ? "s" : ""}`);
  }
  if (hours > 0) {
    formattedDifference.push(`${hours} hour${hours > 1 ? "s" : ""}`);
  }
  if (minutes > 0) {
    formattedDifference.push(`${minutes} minute${minutes > 1 ? "s" : ""}`);
  }

  return formattedDifference.length > 0 ? formattedDifference.join(", ") : "";
}

export function getName(card: GetRowTypes | null) {
  if (!card) return "";
  if (card.type === "trip") return card.destination;
  if (card.type === "lodging") return card.name;
  if (card.type === "place") return card.name;
  if (card.type === "food") return card.name;
  if (card.type === "transport") return `${card.departurePlace} - ${card.arrivalPlace}`;
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

export function formatPrice(price: number | string) {
  const priceNum = typeof price === "string" ? parseFloat(price) : price;

  if (Number.isInteger(priceNum)) return priceNum.toFixed(0);
  return priceNum.toFixed(2);
}
