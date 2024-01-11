<template>
  <div class="card">
      <div class="card__line">
        <p class="card__owner">Owner : {{ item.owner ? item.owner : 'No' }}</p>
      </div>
      <div class="card__body"></div>
      <button v-if="goTo" class="card__button" :class="item.owner !== null ? 'rent' : 'buy'">
        GO TO {{ item.owner !== null ? `and RENT ${item.rent}$` : `or BUY ${item.price}$` }}
      </button>
      <button v-else class="card__button" :class="item.owner !== null ? 'rent' : 'buy'">
        {{ item.owner !== null ? `RENT ${item.rent}$` : `BUY ${item.price}$` }}
      </button>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const props = defineProps({ item: { type: Object, required: true },goTo: { type: Boolean, required: true } })

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
    width: 175px;
    height: 250px;

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

  &__button {
    cursor: pointer;
    width: 100%;
    height: 40px;

    border: none;
    border-radius:0 0 4px 4px;

    &.buy {
      background-color: rgb(47, 206, 47);
      color: white;
    }

    &.rent {
      background-color: rgb(126, 197, 245);
      color: white;
    }
  }
}
</style>
