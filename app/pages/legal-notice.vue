<template>
  <div class="bg-background -mt-32">
    <section class="pt-12 pb-20 space-y-16">
      <div class="mx-auto max-w-3xl mt-32">
        <h2 class="text-center text-5xl text-foreground font-semibold">
          Mentions légales
        </h2>
      </div>
      <div class="max-w-3xl mx-auto px-6 space-y-8">
        <div class="flex flex-col gap-2">
          <span class="text-foreground font-bold whitespace-nowrap"
            >Éditeur</span
          >
          <p class="text-foreground">
            Ce site est édité dans le cadre d'un projet étudiant réalisé à
            Epitech dans le cadre d'un Epitech Innovative Project (EIP).
          </p>
        </div>
        <div class="flex flex-col gap-2">
          <span class="text-foreground font-bold whitespace-nowrap"
            >Responsable du projet</span
          >
          <p class="text-foreground">
            L'équipe Arkadys -
            <NuxtLink
              to="mailto:arkadysgame.project@gmail.com"
              class="text-violet-400 underline"
            >
              arkadysgame.project@gmail.com
            </NuxtLink>
          </p>
        </div>
        <div class="flex flex-col gap-2">
          <span class="text-foreground font-bold whitespace-nowrap"
            >Nature du site</span
          >
          <p class="text-foreground">
            Ce site présente un projet en cours de développement à but éducatif
            et pré-commercial. Il est destiné à recueillir des retours de
            bêta-testeurs avant lancement public.
          </p>
        </div>
        <div class="flex flex-col gap-2">
          <span class="text-foreground font-bold whitespace-nowrap"
            >Hébergement</span
          >
          <p class="text-foreground">
            Le site est hébergé par Netlify.
          </p>
        </div>
        <div class="flex flex-col gap-2">
          <span class="text-foreground font-bold whitespace-nowrap">
            Propriété intellectuelle
          </span>
          <p class="text-foreground">
            L'ensemble des contenus de ce site (textes, visuels, illustrations,
            logo, interface) est la propriété exclusive du projet Arkadys, sauf
            mention contraire. Toute reproduction non autorisée est interdite.
          </p>
        </div>
        <div class="flex flex-col gap-2">
          <span class="text-foreground font-bold whitespace-nowrap"
            >Données personnelles</span
          >
          <p class="text-foreground">
            Les données collectées (notamment l'e-mail pour la bêta) sont
            utilisées uniquement dans le cadre du projet Arkadys. Elles ne sont
            ni revendues ni transmises à des tiers. Conformément au RGPD, vous
            pouvez demander à consulter, modifier ou supprimer vos données à
            tout moment en nous contactant à
            <NuxtLink
              to="mailto:arkadysgame.project@gmail.com"
              class="text-violet-400 underline"
            >
              arkadysgame.project@gmail.com </NuxtLink
            >.
          </p>
        </div>
      </div>
      <p class="italic text-gray-400 text-center">
        Dernière mise à jour : 20/05/2025
      </p>
    </section>
  </div>
</template>
