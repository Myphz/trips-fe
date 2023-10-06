<script>
  import { ChevronRight, EnvelopeOpen } from "svelte-heros";
</script>

<section class="flex flex-col gap-8">
  <section class="flex flex-col items-center justify-center gap-4">
    <div class="relative flex aspect-square w-[100px] items-center justify-center">
      <img src="/user.svg" alt="user" class="aspect-square w-24 rounded-full" />
      <div class="absolute -z-10 h-full w-full rounded-full bg-gradient"></div>
    </div>

    <!-- <img src="/user.svg" alt="user" class="aspect-square w-24 rounded-full" /> -->

    <header class="font-headers text-h1">Alice Johnson</header>
  </section>

  <section class="flex flex-col gap-4">
    <header class="font-headers text-h3">Notifications</header>
    <div class="flex justify-between">
      <div class="flex items-center gap-2">
        <div class="relative text-primary">
          <EnvelopeOpen variation="solid" size="1.5rem" />
          <div
            class="absolute -right-[2px] -top-[2px] flex aspect-square w-3 justify-center rounded-full bg-error text-[7px] leading-none text-white"
          >
            <span class="pt-[2px]">2</span>
          </div>
        </div>

        <div>Invites</div>
      </div>

      <ChevronRight />
    </div>
  </section>

  <section>settings</section>
  <section>theme</section>
  <section>deletre</section>
</section>
