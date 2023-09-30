<div class="rounded-xl bg-off"><article class="skeleton h-52 w-full overflow-hidden" /></div>

<style>
  .skeleton {
    background: linear-gradient(
      100deg,
      rgba(255, 255, 255, 0) 45%,
      rgba(255, 255, 255, 0.5) 50%,
      rgba(255, 255, 255, 0) 60%
    );

    background-size: 200% 100%;
    background-position-x: 180%;
    animation: shine 1.5s ease-in-out infinite;
  }

  @keyframes shine {
    to {
      background-position-x: -20%;
    }
  }
</style>
