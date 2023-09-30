<script lang="ts">
  import { Button } from "../form";
</script>

<section class="flex flex-col text-center">
  <header class="text-h3">Delete trip Japan?</header>
  <div class="text-regular text-gray">This will delete all of its contents.</div>

  <div class="mt-4 flex w-full gap-2 [&>*]:flex [&>*]:flex-1 [&>*]:justify-center">
    <Button>Cancel</Button>
    <Button variant="error">Delete</Button>
  </div>
</section>
