<script lang="ts">
import type {
  EmblaCarouselType,
  EmblaOptionsType,
  EmblaPluginType
} from 'embla-carousel'
import type { AutoplayOptionsType } from 'embla-carousel-autoplay'
import type { AcceptableValue } from 'reka-ui'

type CarouselValue = Exclude<AcceptableValue, Record<string, any>>
export type CarouselItem =
  | CarouselValue
  | {
      class?: any
      [key: string]: any
    }

interface CarouselProps<T extends CarouselItem = CarouselItem> extends Omit<
  EmblaOptionsType,
  'axis' | 'container' | 'slides' | 'direction'
> {
  as?: any
  items: T[]
  autoplay?: boolean | AutoplayOptionsType
  class?: any
}
</script>

<script setup lang="ts" generic="T extends CarouselItem">
import emblaCarouselVue from 'embla-carousel-vue'
import { useForwardProps } from 'reka-ui'

const props = withDefaults(defineProps<CarouselProps<T>>(), {
  active: true,
  align: 'center',
  breakpoints: () => ({}),
  containScroll: 'trimSnaps',
  dragFree: false,
  dragThreshold: 10,
  duration: 25,
  inViewThreshold: 0,
  loop: false,
  skipSnaps: false,
  slidesToScroll: 1,
  startIndex: 0,
  watchDrag: true,
  watchResize: true,
  watchSlides: true,
  watchFocus: true,
  autoplay: false
})
const slots = defineSlots<{
  default: (props: { item: T; index: number }) => any
  thumbnail: (props: { item: T; index: number }) => any
}>()
const emits = defineEmits<{
  select: [selectedIndex: number]
}>()

const rootProps = useForwardProps(
  reactivePick(
    props,
    'active',
    'align',
    'breakpoints',
    'containScroll',
    'dragFree',
    'dragThreshold',
    'duration',
    'inViewThreshold',
    'loop',
    'skipSnaps',
    'slidesToScroll',
    'startIndex',
    'watchDrag',
    'watchResize',
    'watchSlides',
    'watchFocus'
  )
)

const options = computed<EmblaOptionsType>(() => ({
  ...rootProps.value,
  axis: 'x',
  direction: 'ltr'
}))

const plugins = ref<EmblaPluginType[]>([])

const loadPlugins = async () => {
  const emblaPlugins: EmblaPluginType[] = []

  if (props.autoplay) {
    const AutoplayPlugin = await import('embla-carousel-autoplay').then(
      (r) => r.default
    )

    emblaPlugins.push(
      AutoplayPlugin(typeof props.autoplay === 'boolean' ? {} : props.autoplay)
    )
  }

  plugins.value = emblaPlugins
}

watch(
  () => [props.autoplay],
  async () => {
    await loadPlugins()

    emblaApi.value?.reInit(options.value, plugins.value)
  },
  { immediate: true }
)

const [emblaRef, emblaApi] = emblaCarouselVue(options, plugins)

watch(
  options,
  () => {
    emblaApi.value?.reInit(options.value, plugins.value)
  },
  { flush: 'post' }
)

const scrollPrev = () => {
  emblaApi.value?.scrollPrev()
}

const scrollNext = () => {
  emblaApi.value?.scrollNext()
}

const scrollTo = (index: number) => {
  emblaApi.value?.scrollTo(index)
}

const onKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'ArrowLeft') {
    event.preventDefault()
    scrollPrev()

    return
  }

  if (event.key === 'ArrowRight') {
    event.preventDefault()
    scrollNext()
  }
}

const canScrollPrev = ref(false)
const canScrollNext = ref(false)
const selectedIndex = ref(0)
const scrollSnaps = ref<number[]>([])

const onInit = (api: EmblaCarouselType) => {
  scrollSnaps.value = api.scrollSnapList() || []
}

const onSelect = (api: EmblaCarouselType) => {
  canScrollPrev.value = api.canScrollPrev() || false
  canScrollNext.value = api.canScrollNext() || false
  selectedIndex.value = api.selectedScrollSnap() || 0

  emits('select', selectedIndex.value)
}

const isCarouselItem = (
  item: CarouselItem
): item is Exclude<CarouselItem, CarouselValue> => {
  return typeof item === 'object' && item !== null
}

onMounted(() => {
  if (!emblaApi.value) return

  emblaApi.value.on('init', onInit)
  emblaApi.value.on('init', onSelect)
  emblaApi.value.on('reInit', onInit)
  emblaApi.value.on('reInit', onSelect)
  emblaApi.value.on('select', onSelect)
})

onBeforeUnmount(() => {
  if (!emblaApi.value) return

  emblaApi.value.off('init', onInit)
  emblaApi.value.off('init', onSelect)
  emblaApi.value.off('reInit', onInit)
  emblaApi.value.off('reInit', onSelect)
  emblaApi.value.off('select', onSelect)
})
</script>

<template>
  <Primitive
    :as="props.as"
    role="region"
    aria-roledescription="carousel"
    data-orientation="horizontal"
    tabindex="0"
    :class="cn('relative focus:outline-none', props.class)"
    @keydown="onKeyDown"
  >
    <div ref="emblaRef" class="overflow-hidden">
      <div class="flex items-start -ms-6">
        <div
          v-for="(item, index) in props.items"
          :key="index"
          :class="
            cn(
              'min-w-0 shrink-0 basis-full ps-6',
              isCarouselItem(item) && item.class
            )
          "
        >
          <slot :item="item" :index="index" />
        </div>
      </div>
    </div>

    <div>
      <div
        role="tablist"
        class="absolute inset-x-0 -bottom-18 flex flex-wrap items-center justify-center gap-4"
      >
        <template v-for="(_, index) in scrollSnaps" :key="index">
          <button
            type="button"
            role="tab"
            :aria-selected="index === selectedIndex"
            :data-state="index === selectedIndex ? 'active' : undefined"
            class="cursor-pointer rounded-lg overflow-hidden brightness-80 hover:brightness-100 focus:outline-none ring-offset-2 ring-slate-300 ring-offset-white data-[state=active]:ring-2 data-[state=active]:brightness-100 transition-all"
            @click="scrollTo(index)"
          >
            <slot name="thumbnail" :item="props.items[index]!" :index="index" />
          </button>
        </template>
      </div>
    </div>
  </Primitive>
</template>
