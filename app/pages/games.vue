<template>
  <div class="flex flex-col">
    <form class="py-7">
      <SearchInput placeholder="Rechercher..." />
    </form>
    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12"
    >
      <GameCard
        name="Falling Apples"
        thumbnail="/images/games/falling-apples.svg"
        to="/"
      />
      <GameCard
        name="Cake Baking"
        thumbnail="/images/games/cake-baking.jpg"
        to="/"
      />
      <GameCard
        name="Adventure Runner"
        thumbnail="/images/games/runner.jpg"
        to="/"
      />
    </div>
  </div>
</template>
