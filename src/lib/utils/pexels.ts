import { SERVER_URL } from "../../constants";

export const getPexelsPhoto = async (query: string) => {
  const params = new URLSearchParams({ query });
  const res = await fetch(`${SERVER_URL}/pexels?${params}`);
  const data = await res.json();
  return data.photos ?? [];
};
