<template>
  <div class="card">
    <div class="card__line" v-if="null !== item.price">
      <p class="card__owner">Owner : {{ item.owner ? item.owner : 'No' }}</p>
    </div>
    <div class="card__body"></div>

    <button
      v-if="item.type === 'card'"
      class="card__button"
      :class="item.owner !== null ? 'rent' : 'buy'"
      @click="buyCard"
    >
      {{ item.owner !== null ? `RENT ${item.rent} $` : `BUY ${item.price} $` }}
    </button>

    <!-- <button   class="card__button" :class="item.owner !== null ? 'rent' : 'buy'" @click="buyCard">
        {{ item.owner !== null ? `RENT ${item.rent} $` : `BUY ${item.price} $` }}
      </button> -->
    <button
      v-if="(null === item.owner && goTo) || item.type !== 'card'"
      class="card__button-go"
      :class="item.owner !== null ? 'rent' : 'buy'"
      @click="chooseCard"
    >
      GO TO
    </button>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const props = defineProps({
  item: { type: Object, required: true },
  goTo: { type: Boolean, required: true }
})

const emit = defineEmits(['choose', 'buy'])

function chooseCard() {
  emit('choose', props.item.id)
}

function buyCard() {
  emit('buy', props.item.id)
}

const lineColor = ref('')
const bgCard = ref('white')

function getInit() {
  lineColor.value = props.item.color
  bgCard.value = `url('/images/${props.item.img}.png')`
}

onMounted(() => {
  getInit()
})
</script>

<style lang="scss" scoped>
.card {
  position: relative;
  width: 175px;
  height: 250px;

  display: flex;
  flex-direction: column;
  justify-content: end;

  background-color: white;
  border-radius: 4px;
  box-shadow: 0px 0px 5px;

  &__line {
    position: relative;
    width: 100%;
    height: 35px;

    background-color: v-bind(lineColor);
    border-radius: 4px 4px 0 0;
  }

  &__owner {
    position: absolute;
    z-index: 3;
    top: 50%;
    transform: translateY(-50%);

    color: black;
    padding-left: 10px;
  }

  &__body {
    width: 100%;
    height: 175px;

    background-image: v-bind(bgCard);
    background-size: cover;
    background-repeat: no-repeat;
  }

  &__button-wrap {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  &__button {
    cursor: pointer;
    width: 100%;
    height: 40px;

    border: none;
    border-radius: 0 0 4px 4px;

    &.buy {
      background-color: rgb(47, 206, 47);
      color: white;
    }

    &.rent {
      background-color: rgb(126, 197, 245);
      color: white;
    }
  }

  &__button-go {
    position: absolute;
    z-index: 3;
    bottom: -50px;
    left: 0;

    cursor: pointer;
    width: 100%;
    height: 40px;

    background-color: rgb(47, 206, 47);
    color: white;

    border: none;
    border-radius: 4px;
    box-shadow: 1px 5px 10px solid white;
  }
}
</style>
