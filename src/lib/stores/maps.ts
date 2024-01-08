import { Loader } from "google-maps";
import { GOOGLE_MAPS_API_KEY } from "../../constants";
import { get, writable } from "svelte/store";

const loader = new Loader(GOOGLE_MAPS_API_KEY, { libraries: ["places"] });
loader.load().then((g) => google.set(g));

type Google = Awaited<ReturnType<typeof loader.load>>;

const google = writable<null | Google>(null);
const token = writable<string>("");

export const generateToken = async () => {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    if (get(google)) break;
    await new Promise((res) => setTimeout(res, 100));
  }

  const g = get(google);
  token.set(new g!.maps.places.AutocompleteSessionToken() as string);
};

export const getPredictions = (search: string) => {
  const maps = get(google);
  const tok = get(token);

  return new Promise<google.maps.places.AutocompletePrediction[]>((res, rej) => {
    if (!maps || !tok) return res([]);

    const service = new maps.maps.places.AutocompleteService();
    service.getPlacePredictions(
      { input: search, sessionToken: tok },
      (predictions, status) => {
        if (status !== maps.maps.places.PlacesServiceStatus.OK || !predictions) {
          return rej();
        }
        res(predictions);
      },
    );
  });
};
