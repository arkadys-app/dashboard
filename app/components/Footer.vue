<template>
  <footer class="bg-zinc-800 py-14">
    <div class="flex max-w-6xl mx-auto px-6">
      <div class="flex flex-col">
        <NuxtLink to="/" class="group/link">
          <NuxtImg
            src="https://vnncfscpgbjplhvlxxdl.supabase.co/storage/v1/object/public/media/logo.png"
            width="176"
            class="group-hover/link:scale-105 transition-transform duration-300"
          />
        </NuxtLink>
        <p class="mt-4 text-gray-200 text-sm">
          Apprendre en s'amusant, avec bienveillance 🎓✨
        </p>
      </div>
      <div class="grid grid-cols-2 ml-10 flex-1">
        <div>
          <span class="text-gray-200 font-medium">Suivez-nous</span>
          <ul class="flex gap-2 mt-4">
            <li>
              <NuxtLink to="https://instagram.com/arkadysgame">
                <Icon
                  name="ri:instagram-fill"
                  size="24"
                  class="text-gray-200 hover:text-violet-300"
                />
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="mailto:arkadysgame.project@gmail.com">
                <Icon
                  name="material-symbols:mail"
                  size="24"
                  class="text-gray-200 hover:text-violet-300"
                />
              </NuxtLink>
            </li>
          </ul>
        </div>
        <div>
          <span class="text-gray-200 font-medium">Informations</span>
          <ul class="flex flex-col gap-2 mt-4">
            <li>
              <NuxtLink
                to="/#join-beta"
                class="text-sm text-gray-200 hover:text-violet-300"
              >
                Rejoindre la bêta
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/legal-notice"
                class="text-sm text-gray-200 hover:text-violet-300"
              >
                Mentions légales
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="mailto:arkadysgame.project@gmail.com"
                class="text-sm text-gray-200 hover:text-violet-300"
              >
                Contact
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <p class="text-center text-gray-400 text-xs mt-8">
      © 2025 Arkadys. Tous droits réservés.
    </p>
  </footer>
</template>
