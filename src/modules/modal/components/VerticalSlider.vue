<template>
    <div class="slider" ref="slider">
      <div class="slider__arrow-wrap">
        <div class="slider__wrap">
          <div class="slider__slides" ref="items">
            <SlideItem
              class="slider__slide"
              v-for="(card, index) in cards"
              :key="index"
              :item="card"
              :index="index"
              :trade="trade"
              @active="chooseItem"
            />
          </div>
        </div>
  
        <svg
          class="slider__arrow top"
          :class="{ disabled: counter === 0 }"
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
          class="slider__arrow bottom"
          :class="{ disabled: counter === maxStep||cards.length<5 }"
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
  import { onMounted, onUpdated, ref } from 'vue'
  import SlideItem from './SlideItem.vue'
  
  const props = defineProps({
    cards: { type: Array, required: true },
    trade: { type: Boolean, required: false }
  })
  
  const emit = defineEmits(['active'])
  
  const items = ref(null)
  const slider = ref(null)
  
  const slideHeight = ref(0)
  const spaceSlides = ref(0)
  const distance = ref(0)
  const translateY = ref(0)
  const counter = ref(0)
  const translateYVar = ref(0)
  
  const maxStep = ref(null)
  
  function getSizeSlide() {
    if (props.cards.length) {
      slideHeight.value = items.value.children[0].offsetHeight
      spaceSlides.value = 27
    }
  }
  
  function nextSlide() {
    const sliderHeight = items.value.scrollHeight
    const sliderWindow = slider.value.offsetHeight
    const slidesLength = props.cards.length
  
    if (slideHeight.value * slidesLength > sliderWindow) {
      maxStep.value = Math.ceil(slidesLength/2 - sliderWindow / slideHeight.value)
      distance.value = sliderHeight - sliderWindow - (translateY.value + slideHeight.value)
  
      console.log(maxStep.value)
      if (distance.value >= 0 && counter.value <= maxStep.value - 1) {
        counter.value++
  
        translateY.value = (slideHeight.value + spaceSlides.value) * counter.value
  
        translateYVar.value = `-${translateY.value}px`
      } else {
        translateY.value = sliderHeight + spaceSlides.value - sliderWindow
        counter.value = maxStep.value
        translateYVar.value = `-${translateY.value}px`
      }
    }
  }
  
  function prevSlide() {
    const sliderHeight = items.value.scrollHeight
    const sliderWindow = slider.value.offsetHeight
    const startingPosition = 0
    const slidesLength = props.cards.length
    maxStep.value = Math.ceil(slidesLength - sliderWindow / slideHeight.value)
    distance.value = sliderHeight - sliderWindow - (translateY.value - slideHeight.value)
  
    if (distance.value <= sliderHeight - sliderWindow) {
      counter.value--
      translateY.value = (slideHeight.value + spaceSlides.value) * counter.value
      translateYVar.value = `-${translateY.value}px`
    } else {
      counter.value = 0
      translateY.value = startingPosition
      distance.value = sliderHeight - sliderWindow
      translateYVar.value = `-${translateY.value}px`
    }
  }
  
  function chooseItem(data) {
    emit('active', data)
  }
  
  onMounted(() => {
    getSizeSlide()
  })
  
  onUpdated(() => {
    getSizeSlide()
  })
  </script>
  
  <style lang="scss" scoped>
  .slider {
    width: 162px;
    // padding: 44px 0px;
  
    &__arrow-wrap {
      width: 100%;
      position: relative;
    }
  
    &__wrap {
      width: 100%;
      height: 302px;
  
      display: flex;
      flex-direction: column;
  
      position: relative;
      overflow: hidden;
  
    //   gap: 48;
    //   padding-top: 15px;
    }
  
    &__arrow {
      cursor: pointer;
      position: absolute;
      z-index: 3;
      left: 50%;
  
      & rect,
      & path {
        transition: all 0.3s ease-in-out;
      }
  
      &.top {
        top: -43px;
        transform: translateX(-50%) rotate(270deg);
      }
      &.bottom {
        bottom: -43px;
        transform: translateX(-50%) rotate(90deg);
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
    //   flex-direction: column;
      justify-content: flex-start;

      flex-wrap: wrap;
  
      gap: 12px;
  
      transition: transform 0.3s ease-in-out;
      transform: translateY(v-bind(translateYVar));
    }
  
    &__slide {
      flex:0 1 75px;
    }
  }
  </style>
  