import { get, writable } from "svelte/store";

export const modalState = {
  deleteEntity: writable(false),
  deleteAccount: writable(false),
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

export const closeModal = () => {
  const modal = getActiveModalName();
  toggleModal(modal);
};

export const getActiveModalName = (): keyof typeof modalState => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const activeModal = Object.entries(modalState).find(([_, val]) => get(val));
  if (!activeModal) throw new Error("No modal is open");

  return activeModal[0] as keyof typeof modalState;
};
