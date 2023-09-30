import { get, writable } from "svelte/store";

export const modalState = {
  deleteEntity: writable(false),
};

export const modalOpen = writable(false);

const isModalActive = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return Object.entries(modalState).some(([_, v]) => get(v));
};

export const toggleModal = (modal: keyof typeof modalState) => {
  modalState[modal].set(!get(modalState[modal]));
  modalOpen.set(isModalActive());
};
