<script setup lang="ts">
import { ref } from 'vue'

definePageMeta({
  layout: false
})

const scrollToSection = () => {
  const section = document.getElementById('beta')
  section?.scrollIntoView({ behavior: 'smooth' })
}

const hoverText = ref(false)
const activeIndex = ref<number | null>(null)
const submitted = ref(false)

const handleBetaSignup = () => {
  submitted.value = true
  // ici tu pourrais envoyer l'email à ton backend ou à une API externe
}

const faqList = ref([
  {
    question: "Quelle est la mission d'Arkadys ?",
    answer: "Proposer une méthode d’apprentissage ludique, conçue avec des orthophonistes, pour accompagner les enfants dyslexiques et tous ceux rencontrant des difficultés en lecture."
  },
  {
    question: "Comment puis-je accéder à Arkadys ?",
    answer: "Inscrivez-vous sur notre site pour recevoir votre accès à la bêta en avant-première, dès sa mise en ligne."
  },
  {
    question: "Est-ce que le service est payant ?",
    answer: "La bêta est entièrement gratuite. Lors de la sortie officielle, Arkadys proposera un abonnement mensuel avec une période d’essai gratuite."
  },
  {
    question: "Arkadys est-il accessible sur mobile ?",
    answer: "Oui, Arkadys sera accessible sur smartphones et tablettes, aussi bien sur iOS que sur Android."
  },
  {
    question: "À partir de quel âge mon enfant peut utiliser Arkadys ?",
    answer: "Arkadys est pensé pour les enfants dès 5 ans, avec des activités ludiques et pédagogiques. Conformément aux recommandations de santé publique, l’usage reste limité dans le temps et toujours encadré par un adulte."
  },
  {
    question: "Mon enfant n’a pas encore été diagnostiqué, peut-il quand même jouer ?",
    answer: "Oui, tout à fait. Arkadys ne remplace pas le suivi d’un orthophoniste, mais peut l’accompagner ou le précéder. Notre plateforme s’adresse aussi aux enfants qui rencontrent des difficultés de lecture, même sans diagnostic. Elle leur offre un premier soutien ludique et bienveillant, notamment lorsqu’ils sont en attente d’un professionnel."
  },
  {
    question: "Est-ce que les jeux conviennent à tous les types de troubles “dys” ?",
    answer: "Nos jeux sont actuellement principalement conçus pour accompagner les enfants dyslexiques. Toutefois, nous sommes conscients des besoins variés des enfants présentant d’autres troubles “dys” (dyspraxie, dysphasie, etc.), et nous travaillons activement à élargir notre approche pour qu’elle soit encore plus inclusive à l’avenir."
  }
])

const toggleAnswer = (index: number) => {
  activeIndex.value = activeIndex.value === index ? null : index
}
</script>

<template>
<div class="bg-[#F6F0D4] min-h-screen">
  <div class="relative w-full min-h-[65vh]">

    <!-- Logo centré en haut -->
    <div class="absolute top-4 left-4 sm:top-12 sm:left-12 z-20 lg:top-[6rem] lg:left-[6rem]">
      <img
        src="/images/logo_officiel.png"
        alt="Logo Arkadys"
        class="h-16 sm:h-20 lg:h-30 w-auto object-contain transition-transform duration-500 ease-in-out lg:hover:scale-110"
      />
    </div>

    <!-- Wrapper -->
    <div class="relative w-full">
      <!-- Image en fond -->
      <img
        src="/images/HeaderP.png"
        alt="Image de fond"
        class="w-full object-contain transition-transform duration-1000 ease-in-out"
        data-aos="fade-up"
        data-aos-duration="1500"
      />

      <!-- Contenu texte -->
      <div class="absolute top-0 left-0 w-full h-full flex items-center justify-start px-4">
        <div
          class="p-4 sm:p-6 md:p-8 text-[#1A3D39] text-left max-w-xl w-full md:ml-64 ml-6 font-[Outfit]"
          :data-aos="isDesktop ? 'fade-up' : null"
          :data-aos-duration="isDesktop ? '1500' : null"
        >
          <!-- Titre seulement sur desktop -->
          <h1 class="hidden sm:block text-4xl lg:text-7xl font-bold leading-tight mb-6 transition-transform duration-300 ease-in-out md:hover:scale-105">
            Bienvenue à Arkadys
          </h1>

          <!-- Texte complet pour desktop -->
          <p class="hidden xl:block text-base xl:text-xl 2xl:text-2xl mb-8 leading-relaxed">
            Une plateforme de jeux éducatifs conçue avec le soutien et les retours de professionnels de l’orthophonie. Arkadys aide les enfants dyslexiques à progresser en lecture et langage, dans un environnement bienveillant, ludique et motivant.
          </p>

<button
  @click="scrollToSection"
  @mouseenter="hoverText = true"
  @mouseleave="hoverText = false"
  class="mt-0 ml-0 md:ml-0 group inline-flex items-center bg-gradient-to-r from-[#C8A7E6] to-[#b38de1] hover:from-[#b38de1] hover:to-[#a877dd] text-white font-semibold py-3 px-6 sm:py-4 sm:px-10 rounded-full text-base sm:text-xl md:text-2xl transition-all duration-300 md:hover:scale-105 shadow-lg md:hover:shadow-2xl"
  aria-label="Rejoindre la bêta Arkadys"
  title="Cliquez pour rejoindre la bêta en juin"
>
  <svg
    class="w-5 h-5 mr-3 transition-transform duration-300 md:group-hover:translate-x-1"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M12 5l7 7-7 7" />
  </svg>
  <span>{{ hoverText ? 'Rejoindre la bêta' : 'La bêta en juin' }}</span>
</button>
        </div>
      </div>

     <div class="hidden 2xl:block absolute bottom-0 right-50 p-5 group transition-transform duration-300 ease-in-out md:hover:scale-110">
      <!-- Poppy normale -->
      <img
        src="/images/Composition_Poppy.png"
        alt="Image de Poppy"
        class="h-[28rem] w-auto object-contain absolute inset-0 transition-opacity duration-500 group-hover:opacity-0"
      />
      <!-- Poppy hover -->
      <img
        src="/images/P_Happy.png"
        alt="Image joyeuse de Poppy"
        class="h-[30rem] w-auto object-contain relative transition-opacity duration-500 opacity-0 group-hover:opacity-100"
      />
    </div>

    </div>



<section class="bg-[#F6F0D4] text-black py-20 px-6">
  <!-- Titre -->
  <h2 class="text-5xl md:text-6xl font-bold text-center mb-6 text-[#1A3D39] transition-all duration-300 hover:scale-105">
    L’expérience Arkadys
  </h2>

  <p class="text-lg md:text-xl text-center max-w-5xl mx-auto mb-16 text-[#1A3D39]">
    Chez Arkadys, chaque jeu est pensé pour accompagner l’enfant dans son apprentissage, étape par étape. Notre objectif : lui permettre de progresser à son rythme, dans un cadre motivant et bienveillant.<br/>Grâce au tableau de bord, parents et accompagnants peuvent suivre les progrès et adapter les contenus selon les besoins de chaque enfant.
  </p>

  <!-- Timeline -->
  <div class="relative max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">

    <!-- Ligne centrale en dégradé -->
    <div class="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-[#C8A7E6] via-[#B38DE1] to-[#C8A7E6] z-0"></div>

    <!-- Étape 1 -->
    <div class="relative z-10 text-center bg-white/70 backdrop-blur-sm p-4 rounded-2xl shadow-md ring-1 ring-[#C8A7E6]/30 w-full md:w-1/3 transition hover:scale-[1.02]" data-aos="fade-up" data-aos-delay="100">
      <!-- Numéro -->
      <div class="absolute -top-6 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-[#C8A7E6] text-white font-bold flex items-center justify-center rounded-full shadow-md">
        1
      </div>

      <img src="/images/IconAmpoule.png" alt="Ampoule" class="mx-auto h-24 mb-4 transition-transform duration-500 group-hover:rotate-3 group-hover:scale-105" />
      <span class="inline-block text-xs uppercase tracking-wide text-white bg-[#B38DE1] px-3 py-1 rounded-full mb-4">
        Expertise adaptée
      </span>
      <h3 class="text-lg font-bold text-[#C8A7E6] mb-2">Construit avec des orthophonistes</h3>
      <p class="text-[#1A3D39]">Leurs retours nous ont permis d’ajuster les jeux et le dashboard pour mieux accompagner les enfants dyslexiques, de façon concrète et adaptée.<br/><br/></p>
    </div>

    <!-- Étape 2 -->
    <div class="relative z-10 text-center bg-white/70 backdrop-blur-sm p-4 rounded-2xl shadow-md ring-1 ring-[#C8A7E6]/30 w-full md:w-1/3 transition hover:scale-[1.02]" data-aos="fade-up" data-aos-delay="200">
      <div class="absolute -top-6 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-[#C8A7E6] text-white font-bold flex items-center justify-center rounded-full shadow-md">
        2
      </div>
      <img src="/images/IconManette.png" alt="Manette" class="mx-auto h-24 mb-4 transition-transform duration-500 group-hover:rotate-3 group-hover:scale-105" />
      <span class="inline-block text-xs uppercase tracking-wide text-white bg-[#B38DE1] px-3 py-1 rounded-full mb-4">
        Plaisir d’apprendre
      </span>
      <h3 class="text-lg font-bold text-[#C8A7E6] mb-2">Apprendre en jouant</h3>
      <p class="text-[#1A3D39]">Nos mini-jeux développent la lecture, la reconnaissance des sons et la motricité fine, dans une approche ludique qui donne envie de progresser.<br/><br/><br/></p>
    </div>

    <!-- Étape 3 -->
    <div class="relative z-10 text-center bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-md ring-1 ring-[#C8A7E6]/30 w-full md:w-1/3 transition hover:scale-[1.02]" data-aos="fade-up" data-aos-delay="300">
      <div class="absolute -top-6 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-[#C8A7E6] text-white font-bold flex items-center justify-center rounded-full shadow-md">
        3
      </div>
      <img src="/images/IconArcenciel.png" alt="Arc-en-ciel" class="mx-auto h-24 mb-4 transition-transform duration-500 group-hover:rotate-3 group-hover:scale-105" />
      <span class="inline-block text-xs uppercase tracking-wide text-white bg-[#B38DE1] px-3 py-1 rounded-full mb-4">
        Bienveillance
      </span>
      <h3 class="text-lg font-bold text-[#C8A7E6] mb-2">Un cadre rassurant</h3>
      <p class="text-[#1A3D39]">Un univers doux et encourageant, conçu pour que chaque enfant apprenne à son rythme, en confiance, et prenne plaisir à progresser.</p><br/>
    </div>

    <!-- Étape 4 -->
    <div class="relative z-10 text-center bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-md ring-1 ring-[#C8A7E6]/30 w-full md:w-1/3 transition hover:scale-[1.02]" data-aos="fade-up" data-aos-delay="300">
      <div class="absolute -top-6 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-[#C8A7E6] text-white font-bold flex items-center justify-center rounded-full shadow-md">
        4
      </div>
      <img src="/images/IconDashboard.png" alt="Arc-en-ciel" class="mx-auto h-24 mb-4 transition-transform duration-500 group-hover:rotate-3 group-hover:scale-105" />
      <span class="inline-block text-xs uppercase tracking-wide text-white bg-[#B38DE1] px-3 py-1 rounded-full mb-4">
        Outil de suivi clair
      </span>
      <h3 class="text-lg font-bold text-[#C8A7E6] mb-2">Suivi des progrès</h3>
      <p class="text-[#1A3D39]">Le tableau de bord permet de personnaliser les jeux, suivre les réussites et repérer les sons ou compétences à renforcer.</p><br/><br/>
    </div>
  </div>
  

<!-- Titre Aperçu du jeu avec effet -->
<h2 class="text-5xl md:text-6xl font-bold text-center mt-32 mb-6 text-[#1A3D39] transition-all duration-300 ease-in-out transform hover:scale-105">
  Aperçu du jeu
</h2>

<!-- Sous-titre facultatif pour introduire -->
<p class="text-lg md:text-xl text-center text-[#1A3D39] max-w-3xl mx-auto mb-16">
  Voici un avant-goût des mini-jeux Arkadys, conçus pour renforcer les bases du langage écrit et permettre à chaque enfant de progresser en s’amusant.
</p>

<!-- Grille des jeux -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-20 text-center">

  <!-- Carte 1 -->
  <div class="relative group rounded-xl bg-white/80 backdrop-blur-sm overflow-hidden shadow-md hover:shadow-xl transition flex flex-col items-center p-6" data-aos="zoom-in" data-aos-delay="100">
    <span class="absolute top-4 left-4 bg-[#B38DE1] text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md z-10">
      Falling Apples
    </span>
    <div class="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition duration-300 rounded-xl z-0"></div>
    <img src="/images/Capture4.png" alt="Falling Apples" class="w-full h-56 object-cover rounded-xl transition-transform duration-300 group-hover:scale-110 z-0" />
    <p class="mt-4 text-lg font-bold text-[#1A3D39] transition group-hover:scale-105">
      Classe les mots dans le bon panier
    </p>
    <p class="mt-1 text-sm text-[#5D5D5D] max-w-xs mx-auto">
      Trie les mots selon le son qu’ils contiennent (ex. : F, V, P, B…). Un jeu qui stimule l’écoute et la discrimination phonémique à travers des paires de sons proches.
    </p>
  </div>

  <!-- Carte 2 -->
  <div class="relative group rounded-xl bg-white/80 backdrop-blur-sm overflow-hidden shadow-md hover:shadow-xl transition flex flex-col items-center p-6" data-aos="zoom-in" data-aos-delay="200">
    <span class="absolute top-4 left-4 bg-[#B38DE1] text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md z-10">
      Cake Adventure

    </span>
    <div class="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition duration-300 rounded-xl z-0"></div>
    <img src="/images/Capture3.png" alt="Cake Adventure" class="w-full h-56 object-cover rounded-xl transition-transform duration-300 group-hover:scale-110 z-0" />
    <p class="mt-4 text-lg font-bold text-[#1A3D39] transition group-hover:scale-105">
      Suis la recette pas à pas
    </p>
    <p class="mt-1 text-sm text-[#5D5D5D] max-w-xs mx-auto">
      <br/>Choisis les bons ingrédients et aide Poppy à préparer un gâteau réussi ! Un jeu ludique qui renforce l’écoute, l’attention et le vocabulaire en douceur.
    </p>
  </div>

  <!-- Carte 3 -->
  <div class="relative group rounded-xl bg-white/80 backdrop-blur-sm overflow-hidden shadow-md hover:shadow-xl transition flex flex-col items-center p-6" data-aos="zoom-in" data-aos-delay="300">
    <span class="absolute top-4 left-4 bg-[#B38DE1] text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md z-10">
      Pirate Word
    </span>
    <div class="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition duration-300 rounded-xl z-0"></div>
    <img src="/images/Capture2.png" alt="Pirate Word" class="w-full h-56 object-cover rounded-xl transition-transform duration-300 group-hover:scale-110 z-0" />
    <p class="mt-4 text-lg font-bold text-[#1A3D39] transition group-hover:scale-105">
      Complète les mots et trouve le trésor
    </p>
    <p class="mt-1 text-sm text-[#5D5D5D] max-w-xs mx-auto">
      Choisis la bonne syllabe pour compléter le mot affiché. À chaque bonne réponse, le bateau avance vers l’île au trésor ! Un jeu rythmé qui développe la lecture, l’attention et la conscience phonologique.
    </p>
  </div>
</div>

<!-- Citation animée améliorée -->
<blockquote
  class="relative bg-white/80 backdrop-blur-sm text-center text-xl md:text-2xl italic font-semibold text-[#1A3D39] max-w-2xl mx-auto mb-20 p-8 rounded-2xl shadow-xl transition-all duration-500 hover:scale-[1.015] hover:shadow-2xl ring-1 ring-[#1A3D39]/10"
  data-aos="fade-up"
  data-aos-duration="1200"
>
  <!-- Icône citation décorative -->
  <svg class="w-10 h-10 mx-auto mb-4 text-[#C8A7E6]" fill="currentColor" viewBox="0 0 24 24">
    <path d="M7.17 4A5.17 5.17 0 002 9.17v5.66A5.17 5.17 0 007.17 20H8a1 1 0 001-1v-7H6V9.17A3.17 3.17 0 019.17 6H10V4zm10 0A5.17 5.17 0 0012 9.17v5.66A5.17 5.17 0 0017.17 20H18a1 1 0 001-1v-7h-3V9.17A3.17 3.17 0 0119.17 6H20V4z"/>
  </svg>

  <!-- Citation avec guillemets et gradient -->
  <p class="bg-gradient-to-r from-[#1A3D39] to-[#123834] bg-clip-text text-transparent inline-block">
    “Apprendre en s’amusant, c’est la meilleure façon de progresser.”
  </p>

  <!-- Signature -->
  <footer class="mt-4 text-sm text-[#5D5D5D]">— L’équipe Arkadys</footer>

  <!-- Contexte optionnel -->
  <p class="text-sm text-[#7c7c7c] mt-2">
    Une conviction partagée par tous nos partenaires éducatifs.
  </p>
</blockquote>
</section>

<section
  id="beta"
  class="bg-gradient-to-br from-[#C8A7E6] to-[#b38de1] text-white py-20 px-6"
  data-aos="fade-up"
  data-aos-duration="1200"
>
  <div class="max-w-2xl mx-auto text-center">
    <!-- Badge -->
    <p class="uppercase text-sm tracking-widest text-white/80 mb-2">
      Accès anticipé
    </p>

    <!-- Titre -->
    <h2 class="text-4xl md:text-5xl font-bold mb-4">
      Rejoignez la bêta Arkadys
    </h2>

    <!-- Sous-titre -->
    <p class="text-lg md:text-xl mb-8">
      Soyez parmi les premiers à tester nos mini-jeux éducatifs. En partageant vos retours, vous nous aidez à créer une expérience encore plus adaptée, ludique et efficace.
    </p>

    <!-- Formulaire stylisé -->
    <form
      @submit.prevent="handleBetaSignup"
      class="flex flex-col md:flex-row items-center justify-center gap-4 bg-white/10 p-4 rounded-2xl shadow-md backdrop-blur-sm"
    >
      <!-- Champ avec icône -->
      <div class="relative w-full md:w-auto flex-1">
        <input
          type="email"
          required
          placeholder="Votre adresse e-mail"
          class="pl-12 pr-5 py-3 w-full rounded-full text-[#1A3D39] bg-white placeholder:text-[#888] focus:outline-none focus:ring-2 focus:ring-white"
        />
        <svg
          class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#B38DE1]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <!-- Flèche vers la droite -->
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </div>

      <!-- Bouton -->
<button
  type="submit"
  class="relative bg-white text-[#B38DE1] font-semibold px-8 py-3 rounded-full transition-all duration-300 flex items-center justify-center hover:bg-[#F6F0D4] shadow-lg hover:shadow-2xl hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-white animate-[pulse-scale_2s_ease-in-out_infinite]"
>
  <span class="flex items-center gap-2">
    Je m’inscris
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  </span>
</button>
    </form>

    <!-- Message rassurant -->
    <p class="text-sm opacity-90 mt-4">
      Aucun spam, juste un accès en avant-première
    </p>

    <!-- Message de succès (optionnel) -->
    <p v-if="submitted" class="text-sm mt-4 text-green-100">
      Merci ! Vous recevrez bientôt nos nouvelles 🌟
    </p>
  </div>
</section>

<section id="faq" class="bg-[#F6F0D4] text-[#1A3D39] py-20 px-6">
<h2 class="text-5xl md:text-6xl font-bold text-center mt-32 mb-6 text-[#1A3D39] transition-all duration-300 ease-in-out transform hover:scale-105">
  F.A.Q
</h2>

<!-- Sous-titre facultatif pour introduire -->
<p class="text-lg md:text-xl text-center text-[#1A3D39] max-w-3xl mx-auto mb-16">
  Questions fréquentes
</p>
  <div class="max-w-3xl mx-auto space-y-6">
    <div
      v-for="(item, index) in faqList"
      :key="index"
      class="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-[0_8px_20px_rgba(200,167,230,0.2)]"
      data-aos="fade-up"
      :data-aos-delay="index * 100"
    >
      <!-- Question -->
      <button
        class="w-full flex items-center justify-between text-left text-xl font-semibold relative group"
        @click="toggleAnswer(index)"
      >
        <span class="flex items-center gap-3">
          <!-- Icône avec fond pastel -->
          <span class="p-2 rounded-full bg-[#C8A7E6]/10">
            <svg class="w-5 h-5 text-[#C8A7E6]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21l-1.63-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.45 4.73L5.82 21z"/>
            </svg>
          </span>
          <!-- Texte avec soulignement animé -->
          <span class="relative after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-[#C8A7E6] group-hover:after:w-full after:transition-all after:duration-300">
            {{ item.question }}
          </span>
        </span>

        <!-- Chevron animé -->
        <svg
          class="w-6 h-6 transition-transform duration-300"
          :class="activeIndex === index ? 'rotate-45 text-[#B38DE1]' : 'rotate-0 text-[#1A3D39]'"
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
      </button>

      <!-- Réponse -->
      <transition name="fade">
        <div
          v-if="activeIndex === index"
          class="pt-4 text-base md:text-lg text-[#4B5563]"
        >
          {{ item.answer }}
        </div>
      </transition>
    </div>
  </div>

  <!-- Pied de section -->
  <p class="text-center text-sm text-[#888] mt-12 italic">
    Une autre question ? Écrivez-nous à
    <a href="mailto:arkadysgame.project@gmail.com" class="text-[#B38DE1] underline hover:opacity-80">arkadysgame.project@gmail.com</a>
  </p>
</section>
<footer class="bg-[#292929] text-white pt-12 pb-8 px-6 mt-20 border-t border-[#B38DE1]/20">
  <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">

    <!-- Bloc branding -->
<!-- Bloc branding avec logo -->
<div class="flex flex-col items-center md:items-start">
<a href="/test">
  <img src="/images/logo_officiel.png" alt="Logo Arkadys" class="h-12 mb-3" />
</a>
  <p class="text-sm text-[#D1D5DB]">
    Apprendre en s’amusant, avec bienveillance !
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
        <li><a href="/test/#beta" class="hover:text-[#B38DE1] transition">Rejoindre la bêta</a></li>
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
  </div>
  </div>
</template>
