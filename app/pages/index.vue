<script setup lang="ts">
const accordionItems = [
  {
    value: 'item-1',
    title: "Quelle est la mission d'Arkadys ?",
    content:
      "Proposer une méthode d'apprentissage ludique, conçue avec des orthophonistes, pour accompagner les enfants dyslexiques et tous ceux rencontrant des difficultés en lecture."
  },
  {
    value: 'item-2',
    title: 'Comment puis-je accéder à Arkadys ?',
    content:
      'Inscrivez-vous sur notre site pour recevoir votre accès à la bêta en avant-première, dès sa mise en ligne.'
  },
  {
    value: 'item-3',
    title: 'Est-ce que le service est payant ?',
    content:
      "La bêta est entièrement gratuite. Lors de la sortie officielle, Arkadys proposera un abonnement mensuel avec une période d'essai gratuite."
  },
  {
    value: 'item-4',
    title: 'Arkadys est-il accessible sur mobile ?',
    content:
      'Oui, Arkadys sera accessible sur smartphones et tablettes, aussi bien sur iOS que sur Android.'
  },
  {
    value: 'item-5',
    title: 'À partir de quel âge mon enfant peut utiliser Arkadys ?',
    content:
      "Arkadys est pensé pour les enfants dès 5 ans, avec des activités ludiques et pédagogiques. Conformément aux recommandations de santé publique, l'usage reste limité dans le temps et toujours encadré par un adulte."
  },
  {
    value: 'item-6',
    title:
      "Mon enfant n'a pas encore été diagnostiqué, peut-il quand même jouer ?",
    content:
      "Oui, tout à fait. Arkadys ne remplace pas le suivi d'un orthophoniste, mais peut l'accompagner ou le précéder. Notre plateforme s'adresse aussi aux enfants qui rencontrent des difficultés de lecture, même sans diagnostic. Elle leur offre un premier soutien ludique et bienveillant, notamment lorsqu'ils sont en attente d'un professionnel."
  },
  {
    value: 'item-7',
    title:
      'Est-ce que les jeux conviennent à tous les types de troubles "dys" ?',
    content:
      "Nos jeux sont actuellement principalement conçus pour accompagner les enfants dyslexiques. Toutefois, nous sommes conscients des besoins variés des enfants présentant d'autres troubles \"dys\" (dyspraxie, dysphasie, etc.), et nous travaillons activement à élargir notre approche pour qu'elle soit encore plus inclusive à l'avenir."
  }
]
</script>

<template>
  <NuxtImg
    class="absolute top-0 left-0 right-0 w-full -z-1 min-h-screen object-cover"
    src="https://vnncfscpgbjplhvlxxdl.supabase.co/storage/v1/object/public/media/header.png"
  />
  <div>
    <section class="py-6 min-h-[calc(100vh-6rem)]">
      <div class="-z-2 absolute w-full bg-background h-[calc(100vh-6rem)]" />
      <div class="max-w-6xl mx-auto px-6 pt-8">
        <div class="max-w-lg space-y-12">
          <h1 class="text-6xl font-black text-foreground">
            Bienvenue à Arkadys
          </h1>
          <p class="text-xl text-foreground">
            La plateforme de jeux éducatifs pensée avec les orthophonistes, pour
            accompagner les enfants dyslexiques dans leur progression en lecture
            et langage. Un univers bienveillant, ludique et motivant pour
            apprendre en s'amusant.
          </p>
          <BetaButton />
        </div>
      </div>
    </section>
    <section class="py-20 space-y-16 bg-background">
      <div class="mx-auto max-w-3xl">
        <h2 class="text-center text-5xl text-foreground font-semibold">
          L'expérience Arkadys
        </h2>
        <p class="text-center text-foreground mt-10">
          Chez Arkadys, chaque jeu guide l'enfant pas à pas, pour progresser à
          son rythme dans un cadre bienveillant et motivant. Le tableau de bord
          permet aux parents et accompagnants de suivre ses progrès et d'adapter
          les contenus.
        </p>
      </div>
      <div
        class="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-fit max-w-6xl px-6"
      >
        <div
          class="flex flex-col items-center bg-white p-8 rounded-2xl shadow-xl space-y-4 border border-violet-200"
        >
          <span
            class="flex items-center justify-center size-20 bg-amber-400 rounded-full"
          >
            <Icon name="lucide:lightbulb" size="36" class="text-white" />
          </span>
          <UiBadge class="uppercase text-xs">Expertise adaptée</UiBadge>
          <h3 class="text-center text-lg text-violet-500 font-semibold">
            Construit avec des orthophonistes
          </h3>
          <p class="text-sm text-foreground text-center">
            La collaboration avec les professionnels nous ont permis d'ajuster
            les jeux et le tableau de bord pour mieux accompagner les enfants
            dyslexiques, de façon concrète et adaptée.
          </p>
        </div>
        <div
          class="flex flex-col items-center bg-white p-8 rounded-2xl shadow-xl space-y-4 border border-violet-200"
        >
          <span
            class="flex items-center justify-center size-20 bg-red-400 rounded-full"
          >
            <Icon name="lucide:gamepad-2" size="36" class="text-white" />
          </span>
          <UiBadge class="uppercase text-xs">Plaisir d'apprendre</UiBadge>
          <h3 class="text-center text-lg text-violet-500 font-semibold">
            Apprendre en jouant
          </h3>
          <p class="text-sm text-foreground text-center">
            Nos mini-jeux développent la lecture, la reconnaissance des sons et
            la motricité fine, dans une approche ludique qui donne envie de
            progresser.
          </p>
        </div>
        <div
          class="flex flex-col items-center bg-white p-8 rounded-2xl shadow-xl space-y-4 border border-violet-200"
        >
          <span
            class="flex items-center justify-center size-20 bg-emerald-400 rounded-full"
          >
            <Icon name="lucide:rainbow" size="36" class="text-white" />
          </span>
          <UiBadge class="uppercase text-xs">Bienveillance</UiBadge>
          <h3 class="text-center text-lg text-violet-500 font-semibold">
            Un cadre rassurant
          </h3>
          <p class="text-sm text-foreground text-center">
            Un univers doux et encourageant, conçu pour que chaque enfant
            apprenne à son rythme, en confiance, et prenne plaisir à progresser.
          </p>
        </div>
        <div
          class="flex flex-col items-center bg-white p-8 rounded-2xl shadow-xl space-y-4 border border-violet-200"
        >
          <span
            class="flex items-center justify-center size-20 bg-purple-400 rounded-full"
          >
            <Icon name="lucide:circle-gauge" size="36" class="text-white" />
          </span>
          <UiBadge class="uppercase text-xs">Outil de suivi</UiBadge>
          <h3 class="text-center text-lg text-violet-500 font-semibold">
            Suivi des progrès
          </h3>
          <p class="text-sm text-foreground text-center">
            Le tableau de bord permet de personnaliser les jeux, suivre les
            réussites et repérer les sons ou compétences à renforcer.
          </p>
        </div>
      </div>
    </section>
    <section class="py-20 space-y-16 bg-background">
      <div class="mx-auto max-w-3xl">
        <h2 class="text-center text-5xl text-foreground font-semibold">
          Aperçu des jeux
        </h2>
        <p class="text-center text-foreground mt-10">
          Voici un avant-goût des mini-jeux Arkadys, conçus pour renforcer les
          bases du langage écrit et permettre à chaque enfant de progresser en
          s'amusant.
        </p>
      </div>
      <div
        class="mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 w-fit max-w-6xl px-6"
      >
        <div
          class="group/card flex flex-col items-center bg-white p-6 rounded-2xl shadow-xl space-y-4 border border-violet-200"
        >
          <AspectRatio
            :ratio="4 / 3"
            class="relative overflow-hidden rounded-lg"
          >
            <NuxtImg
              src="https://vnncfscpgbjplhvlxxdl.supabase.co/storage/v1/object/public/media/capture-falling-apples.png"
              class="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-300"
            />
          </AspectRatio>
          <h3 class="font-semibold text-lg text-foreground text-center">
            Chute de Pommes
          </h3>
          <p class="text-sm text-foreground text-center">
            Trie les mots selon le son qu'ils contiennent (ex. : F, V, P, B…).
            Un jeu qui stimule l'écoute et la discrimination phonémique à
            travers des paires de sons proches.
          </p>
        </div>
        <div
          class="group/card flex flex-col items-center bg-white p-6 rounded-2xl shadow-xl space-y-4 border border-violet-200"
        >
          <AspectRatio
            :ratio="4 / 3"
            class="relative overflow-hidden rounded-lg"
          >
            <NuxtImg
              src="https://vnncfscpgbjplhvlxxdl.supabase.co/storage/v1/object/public/media/capture-cake-baking.png"
              class="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-300"
            />
          </AspectRatio>
          <h3 class="font-semibold text-lg text-foreground text-center">
            Petit Chef
          </h3>
          <p class="text-sm text-foreground text-center">
            Choisis les bons ingrédients et aide Poppy à préparer un gâteau
            réussi ! Un jeu ludique qui renforce l'écoute, l'attention et le
            vocabulaire en douceur.
          </p>
        </div>
        <div
          class="group/card flex flex-col items-center bg-white p-6 rounded-2xl shadow-xl space-y-4 border border-violet-200"
        >
          <AspectRatio
            :ratio="4 / 3"
            class="relative overflow-hidden rounded-lg"
          >
            <NuxtImg
              src="https://vnncfscpgbjplhvlxxdl.supabase.co/storage/v1/object/public/media/capture-pirate-word.png"
              class="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-300"
            />
          </AspectRatio>
          <h3 class="font-semibold text-lg text-foreground text-center">
            Mot Pirate
          </h3>
          <p class="text-sm text-foreground text-center">
            Choisis la bonne syllabe pour compléter le mot affiché. À chaque
            bonne réponse, le bateau avance vers l'île au trésor ! Un jeu rythmé
            qui développe la lecture, l'attention et la conscience phonologique.
          </p>
        </div>
      </div>
    </section>
    <section class="pt-20 pb-32 space-y-16 bg-background">
      <Testimonial />
    </section>
    <section id="join-beta" class="py-20 space-y-16 bg-violet-300">
      <div class="flex flex-col items-center mx-auto max-w-3xl space-y-10">
        <span class="uppercase text-white">Accès anticipé</span>
        <h2 class="text-4xl text-white font-bold">
          Rejoignez la bêta d'Arkadys
        </h2>
        <p class="text-center text-white">
          Soyez parmi les premiers à tester nos mini-jeux éducatifs. En
          partageant vos retours, vous nous aidez à créer une expérience encore
          plus adaptée, ludique et efficace.
        </p>
      </div>
      <div class="space-y-4">
        <BetaForm />
        <small class="block text-center text-white">
          Aucun spam, juste un accès en avant-première
        </small>
      </div>
    </section>
    <section class="py-20 space-y-16 bg-background">
      <div class="mx-auto max-w-3xl">
        <h2 class="text-center text-5xl text-foreground font-semibold">
          F.A.Q
        </h2>
        <p class="text-center text-foreground mt-10">Questions fréquentes</p>
      </div>
      <div class="max-w-3xl mx-auto">
        <AccordionRoot type="single" collapsible>
          <AccordionItem
            v-for="item of accordionItems"
            :value="item.value"
            class="bg-white p-4 rounded-xl border border-violet-200 shadow-xl mb-4"
          >
            <AccordionHeader>
              <AccordionTrigger class="flex items-center w-full group">
                <span
                  class="flex size-8 bg-violet-100 rounded-full items-center justify-center mr-4"
                >
                  <Icon
                    name="material-symbols:kid-star"
                    size="16"
                    class="text-violet-400"
                  />
                </span>
                <span
                  class="text-xl font-semibold text-foreground group-hover:underline decoration-violet-400 underline-offset-4"
                >
                  {{ item.title }}
                </span>
                <Icon
                  name="material-symbols:add-2-rounded"
                  size="16"
                  class="text-gray-400 group-data-[state=open]:text-violet-400 ml-auto transition-transform duration-300 group-data-[state=open]:rotate-45"
                />
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent
              class="data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up overflow-hidden"
            >
              <p class="text-sm text-foreground mt-2">
                {{ item.content }}
              </p>
            </AccordionContent>
          </AccordionItem>
        </AccordionRoot>
      </div>
      <p class="text-gray-400 text-center">
        Une autre question ? Écrivez-nous à
        <NuxtLink
          to="mailto:arkadysgame.project@gmail.com"
          class="italic underline text-violet-400"
        >
          arkadysgame.project@gmail.com
        </NuxtLink>
      </p>
    </section>
  </div>
</template>
