<template>
  <section
    class="bg-[#F6F0D4] text-[#1A3D39] py-20 px-6 max-w-4xl mx-auto min-h-screen flex flex-col justify-center leading-relaxed rounded-xl shadow-lg transition-all duration-300"
    data-aos="fade-up"
  >
    <!-- Titre -->
    <h1 class="text-4xl md:text-5xl font-bold text-center mb-8 text-[#1A3D39]">
      Mentions légales
    </h1>

    <hr class="border-[#C8A7E6]/40 mb-8" />

    <div class="space-y-6 text-base md:text-lg">
      <p><strong class="text-[#1A3D39]">Éditeur :</strong><br>
        Ce site est édité dans le cadre d’un projet étudiant réalisé à Epitech dans le cadre d’un Epitech Innovative Project (EIP).
      </p>

      <p><strong class="text-[#1A3D39]">Responsable du projet :</strong><br>
        L’équipe Arkadys – <a href="mailto:arkadysgame.project@gmail.com" class="text-[#B38DE1] underline">arkadysgame.project@gmail.com</a>
      </p>

      <p><strong class="text-[#1A3D39]">Nature du site :</strong><br>
        Ce site présente un projet en cours de développement à but éducatif et pré-commercial. Il est destiné à recueillir des retours de bêta-testeurs avant lancement public.
      </p>

      <p><strong class="text-[#1A3D39]">Hébergement :</strong><br>
        Le site est hébergé par [Netlify / Vercel / autre].<br>
        [Ajouter une URL ou une adresse si vous le souhaitez]
      </p>

      <p><strong class="text-[#1A3D39]">Propriété intellectuelle :</strong><br>
        L’ensemble des contenus de ce site (textes, visuels, illustrations, logo, interface) est la propriété exclusive du projet Arkadys, sauf mention contraire. Toute reproduction non autorisée est interdite.
      </p>

      <p><strong class="text-[#1A3D39]">Données personnelles :</strong><br>
        Les données collectées (notamment l’e-mail pour la bêta) sont utilisées uniquement dans le cadre du projet Arkadys. Elles ne sont ni revendues ni transmises à des tiers.<br>
        Conformément au RGPD, vous pouvez demander à consulter, modifier ou supprimer vos données à tout moment en nous contactant à <a href="mailto:arkadysgame.project@gmail.com" class="text-[#B38DE1] underline">arkadysgame.project@gmail.com</a>.
      </p>
    </div>

    <p class="mt-10 text-sm text-center text-gray-500 italic">
      Dernière mise à jour : {{ new Date().toLocaleDateString('fr-FR') }}
    </p>
  </section>
<footer class="bg-[#292929] text-white pt-12 pb-8 px-6 mt-20 border-t border-[#B38DE1]/20">
  <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">

    <!-- Bloc branding -->
<!-- Bloc branding avec logo -->
<div class="flex flex-col items-center md:items-start">
<a href="/">
  <img src="/images/logo_officiel.png" alt="Logo Arkadys" class="h-12 mb-3" />
</a>
  <p class="text-sm text-[#D1D5DB]">
    Apprendre en s’amusant, avec bienveillance 🎓✨
  </p>
</div>

    <!-- Réseaux sociaux -->
    <div>
      <h4 class="text-lg font-semibold mb-3">Suivez-nous</h4>
      <div class="flex justify-center md:justify-start gap-4">
        <a href="https://instagram.com/arkadysgame" target="_blank" aria-label="Instagram" class="hover:text-[#B38DE1] transition">
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M7 2C4.8 2 3 3.8 3 6v12c0 2.2 1.8 4 4 4h10c2.2 0 4-1.8 4-4V6c0-2.2-1.8-4-4-4H7zm10 2c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H7c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2h10zm-5 3a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm4.5-.5a1 1 0 110 2 1 1 0 010-2z" />
          </svg>
        </a>
        <a href="mailto:arkadysgame.project@gmail.com" aria-label="E-mail" class="hover:text-[#B38DE1] transition">
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M2 6a2 2 0 012-2h16a2 2 0 012 2v1.5l-10 6-10-6V6zm0 3.25l8.8 5.28a2 2 0 002.4 0L22 9.25V18a2 2 0 01-2 2H4a2 2 0 01-2-2V9.25z" />
          </svg>
        </a>
      </div>
    </div>

    <!-- Mentions -->
    <div>
      <h4 class="text-lg font-semibold mb-3">Infos</h4>
      <ul class="space-y-1 text-sm text-[#D1D5DB]">
        <li><a href="/#beta" class="hover:text-[#B38DE1] transition">Rejoindre la bêta</a></li>
        <li><a href="/mentions-legales" class="hover:text-[#B38DE1] transition">Mentions légales</a></li>
        <li><a href="mailto:arkadysgame.project@gmail.com" class="hover:text-[#B38DE1] transition">Contact</a></li>
      </ul>
    </div>
  </div>

  <!-- Bas de page -->
  <div class="text-center mt-10 text-xs text-[#BBB]">
    &copy; {{ new Date().getFullYear() }} Arkadys. Tous droits réservés.
  </div>
</footer>
</template>


<script setup>
definePageMeta({
  layout: false
})

useHead({
  title: 'Mentions légales - Arkadys',
  meta: [{ name: 'robots', content: 'noindex' }]
})
</script>
