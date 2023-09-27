import { isModalOpen } from "$lib/stores/ui";
import { get } from "svelte/store";

export function modal(node: HTMLButtonElement) {
  const toggleModal = () => {
    isModalOpen.set(!get(isModalOpen));
  };

  node.addEventListener("click", toggleModal);

  return {
    destroy: () => {
      node.removeEventListener("click", toggleModal);
    },
  };
}
