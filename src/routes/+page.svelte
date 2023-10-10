<script lang="ts">
  import { goto } from "$app/navigation";
  import { Button } from "$lib/components/form";
  import { authGuard } from "$utils/guard";
  authGuard(false);
</script>

<section class="flex flex-col gap-4 text-small">
  <h1 class="font-headers text-h1">Explore, Share, Connect!</h1>
  <div>
    Unlock the world of travel with Trips!, the ultimate app for globetrotters and adventure
    seekers. Designed for explorers like you, Trips! is more than just a travel organizer—it's
    your gateway to unforgettable journeys and seamless sharing.
  </div>

  <section class="flex flex-col gap-1">
    <header class="text-regular font-bold">With Trips!, you can:</header>
    <ul class="mb-4 flex flex-col gap-2">
      <li>
        <strong>🌍 Plan Together, Explore Together</strong>
        <br />
        Collaborate with friends to create and share amazing trips. Share photos, activities, and
        tips to make every journey a shared memory.
      </li>

      <li>
        📸 <strong>Capture Every Moment</strong>
        <br />
        Document your adventures with ease. Store and share unlimited photos, so every trip becomes
        a visual story.
      </li>

      <li>
        <strong>🏞️ Personalized Exploration</strong>
        <br />
        Tailor your trips with unique activities and lodging options. Rate and review to curate
        your perfect itinerary.
      </li>

      <li>
        <strong>💰 Budget and Beyond</strong>
        <br />
        Keep track of your expenses effortlessly, ensuring you stick to your budget without missing
        out on a thing.
      </li>
    </ul>

    <div>
      Dive into a world of exploration, connection, and unforgettable memories with Trips! It's
      free, with no ads. It's a personal open source project of mine, shared with the world.
    </div>
  </section>

  <Button on:click={() => goto("/app")}>GET STARTED</Button>
</section>
