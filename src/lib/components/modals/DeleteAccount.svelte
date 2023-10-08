<script lang="ts">
  import { supabase } from "$lib/stores/api/client";
  import { closeModal } from "$lib/stores/modals";
  import { goBack } from "$utils/guard";
  import { Button } from "../form";

  const onDeleteClick = async () => {
    closeModal();
    await supabase.rpc("delete_user");
    await supabase.auth.signOut();
    goBack();
  };
</script>

<section class="flex flex-col text-center">
  <header class="text-h3">Delete Account</header>
  <div class="text-regular text-gray">This will delete all of your data.</div>

  <div class="mt-4 flex w-full gap-2 [&>*]:flex [&>*]:flex-1 [&>*]:justify-center">
    <Button on:click={closeModal}>Cancel</Button>
    <Button variant="error" on:click={onDeleteClick}>Delete</Button>
  </div>
</section>
