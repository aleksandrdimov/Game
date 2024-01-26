<template>
  <div
    class="slide"
    :style="{ '--color-bg-slide': item.type === 'teleport' ? '#06021A' : 'white' }"
    @click="chooseItem"
  >
    <div class="slide__line"></div>
    <div class="slide__body"></div>

    <p class="slide__sell">Sell: {{sellCard}}$</p>
    <div v-if="item.sell" class="slide__choose"></div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const props = defineProps({
  item: { type: Object, required: true },
//   index: { type: Number, required: true }
})

const emit = defineEmits(['active'])

// function getSurprise() {
//   emit('surprise')
// }

// function chooseslide() {
//   emit('choose', props.item.id)
// }

// function buyslide() {
//   emit('buy', props.item.id)
// }
const sellCard=ref(0)
const lineColor = ref('')
const bgSlide = ref('white')

function getInit() {
    sellCard.value=Math.floor(props.item.price/2)
  lineColor.value = props.item.color !== 'transparent' ? props.item.color : '#B3B3B3'
  bgSlide.value = `url('../images/${props.item.img}.png')`
}

function chooseItem(){
    props.item.sell=!props.item.sell

    emit('active')
}

onMounted(() => {
  getInit()
})
</script>

<style lang="scss" scoped>
.slide {
  --color-bg-slide: white;
cursor: pointer;
  position: relative;
  //   width: 75px;
  height: 130px;

  display: flex;
  flex-direction: column;

  background-color: var(--color-bg-slide);
  border-radius: 4px;
  border: 2px solid v-bind(lineColor);

  &__line {
    position: relative;
    width: 100%;
    height: 8px;

    background-color: v-bind(lineColor);
    // border-radius: 4px 4px 0 0;
  }

  &__body {
    width: 100%;
    height: 100%;

    background-image: v-bind(bgSlide);
    background-size: cover;
    background-repeat: no-repeat;

    // margin: auto;
  }

  &__sell {
    text-align: center;
    font-style: 14px;
    font-weight: 700;
    line-height: 20px;

    padding:4px 10px;
    // border-radius: 0 4px 4px 0;
  }

  &__choose{
    position: absolute;
    bottom: 0;
    left: 0;

    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.5);
    // border-radius: 4px;
  }
}
</style>
