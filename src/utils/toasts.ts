import Toast from "$lib/components/Toast.svelte";
import { toast } from "@zerodevx/svelte-toast";

export function success({ msg, title }: { msg: string; title: string }) {
  toast.push({
    component: {
      src: Toast,
      props: { msg, title, variant: "success" },
    },
  });
}

export function fail({ msg, title }: { msg: string; title: string }) {
  toast.push({
    component: {
      src: Toast,
      props: { msg, title, variant: "error" },
    },
  });
  return false;
}
