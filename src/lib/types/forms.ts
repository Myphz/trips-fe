export type AddTrip = {
  destination: string;
  start_date: string;
  end_date: string;
  currency: string;
  people: string[];
  photo: string;
};

export type Register = { email: string; password: string; displayed: string };
