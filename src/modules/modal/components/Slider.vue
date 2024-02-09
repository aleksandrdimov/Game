<template>
  <div class="slider" ref="slider">
    <div class="slider__arrow-wrap">
      <div class="slider__wrap">
        <div class="slider__slides" :class="{ trade: cards.length < 5 }" ref="items">
          <SlideItem
            class="slider__slide"
            v-for="(card, index) in cards"
            :key="card.id"
            :item="card"
            :index="index"
            :upgrade="upgrade"
            :trade="trade"
            @active="chooseItem"
          />
        </div>
      </div>

      <svg
        v-if="counter !== 0"
        class="slider__arrow left"
        width="44"
        height="45"
        viewBox="0 0 44 45"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        @click="prevSlide"
      >
        <rect width="44" height="44" rx="22" fill="transparent" />
        <path
          d="M18 28L22 22L18 16"
          stroke="#0B320E"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M22 28L26 22L22 16"
          stroke="#0B320E"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <svg
        v-if="counter !== maxStep && cards.length > 5"
        class="slider__arrow right"
        width="44"
        height="45"
        viewBox="0 0 44 45"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        @click="nextSlide"
      >
        <rect width="44" height="44" rx="22" fill="transparent" />
        <path
          d="M18 28L22 22L18 16"
          stroke="#0B320E"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M22 28L26 22L22 16"
          stroke="#0B320E"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  </div>
</template>

<script setup>
import { onBeforeUpdate, onMounted, onUpdated, ref, watch } from 'vue'
import SlideItem from './SlideItem.vue'

const props = defineProps({
  cards: { type: Array, required: true },
  upgrade: { type: Boolean, required: false },
  trade: { type: Boolean, required: false }
})

const emit = defineEmits(['active'])

const items = ref(null)
const slider = ref(null)

const slideWidth = ref(0)
const spaceSlides = ref(0)
const distance = ref(0)
const translateX = ref(0)
const counter = ref(0)
const translateXVar = ref(0)

const maxStep = ref(null)

// function initValues() {
//   counter.value = 0
//   maxStep.value = null
//   translateX.value = 0
//   translateXVar.value = 0
// }

function getSizeSlide() {
  if (props.cards.length) {
    slideWidth.value = items.value.children[0].offsetWidth
    spaceSlides.value = 12
  }
}

function nextSlide() {
  const sliderWidth = items.value.scrollWidth
  const sliderWindow = slider.value.offsetWidth
  const slidesLength = props.cards.length

  if (slideWidth.value * slidesLength > sliderWindow) {
    maxStep.value = Math.ceil(slidesLength - sliderWindow / slideWidth.value)
    distance.value = sliderWidth - sliderWindow - (translateX.value + slideWidth.value)

    if (distance.value >= 0 && counter.value <= maxStep.value - 1) {
      counter.value++

      translateX.value = (slideWidth.value + spaceSlides.value) * counter.value

      translateXVar.value = `-${translateX.value}px`
    } else {
      translateX.value = sliderWidth + spaceSlides.value - sliderWindow
      counter.value = maxStep.value
      translateXVar.value = `-${translateX.value}px`
    }
  }
  console.log('yes')
}

function prevSlide() {
  const sliderWidth = items.value.scrollWidth
  const sliderWindow = slider.value.offsetWidth
  const startingPosition = 0
  const slidesLength = props.cards.length
  maxStep.value = Math.ceil(slidesLength - sliderWindow / slideWidth.value)
  distance.value = sliderWidth - sliderWindow - (translateX.value - slideWidth.value)

  if (distance.value <= sliderWidth - sliderWindow) {
    counter.value--
    translateX.value = (slideWidth.value + spaceSlides.value) * counter.value
    translateXVar.value = `-${translateX.value}px`
  } else {
    counter.value = 0
    translateX.value = startingPosition
    distance.value = sliderWidth - sliderWindow
    translateXVar.value = `-${translateX.value}px`
  }
}

function chooseItem(data) {
  emit('active', data)
}

// watch(props.cards, () => {
//   props.trade ? initValues() : ''
// })

onMounted(() => {
  getSizeSlide()
  // initValues()
})

// onBeforeUpdate(()=>{
//   getSizeSlide()
// })

onUpdated(() => {
  getSizeSlide()
})
</script>

<style lang="scss" scoped>
.slider {
  max-width: 513px;
  // max-width: max-content;
  // width: 100%;
  // padding: 0px 44px;

  &__arrow-wrap {
    // width: 100%;
    width: max-content;
    position: relative;
    margin: auto;
  }

  &__wrap {
    max-width: 425px;
    // width: 100%;

    display: flex;
    flex-direction: column;

    position: relative;
    overflow: hidden;

    // padding: 0px 44px;

    // gap: 48px;
  }

  &__arrow {
    cursor: pointer;
    position: absolute;
    z-index: 55;
    top: 50%;

    & rect,
    & path {
      transition: all 0.3s ease-in-out;
    }

    &.left {
      left: -43px;
      transform: translateY(-50%) rotate(180deg);
    }
    &.right {
      right: -43px;
      transform: translateY(-50%);
    }

    &:hover {
      & rect {
        fill: #ebf9ec;
      }

      & path {
        stroke: #125417;
      }
    }

    &:active {
      & rect {
        fill: #f0f4f1;
      }

      & path {
        stroke: #1c7d22;
      }
    }

    &.disabled {
      cursor: auto;
      pointer-events: none;
      & rect {
        fill: transparent;
      }

      & path {
        stroke: #8a8f8a;
      }
    }
  }

  &__slides {
    width: 100%;

    display: flex;
    justify-content: flex-start;

    gap: 12px;

    transition: transform 0.3s ease-in-out;
    transform: translateX(v-bind(translateXVar));
    margin: auto;

    &.trade {
      justify-content: center;
    }
  }

  &__slide {
    flex: 0 0 75px;
  }
}
</style>
