import { goto } from "$app/navigation";

export const gotoWithScroll = (to: string) => goto(to, { noScroll: true });
