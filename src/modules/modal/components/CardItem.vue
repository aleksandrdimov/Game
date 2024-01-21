<template>
  <div class="card">
    <div class="card__line" v-if="null !== item.price">
      <p class="card__owner">Owner : {{ item.owner ? item.owner : 'No' }}</p>
    </div>
    <div class="card__body"></div>

    <div class="card__content">

      <p class="card__price">Price: {{ item.price }}$</p>
      <p class="card__rent">Rent: {{ item.rent }}$</p>
      <div class="card__footer">
        <button v-if="goTo && item.type === 'card'" class="card__button go" :class="item.owner !== null ? 'rent' : 'buy'"
          @click="chooseCard">
          Go to
        </button>
        <button v-if="item.type === 'card'" class="card__button" :class="item.owner !== null ? 'rent' : 'buy'"
          @click="buyCard">
          {{ item.owner !== null ? 'Rent' :'Buy' }}
        </button>

      </div>
    </div>
    <!-- <button v-if="item.type === 'surprise'" class="card__button surprise" @click="getSurprise">Get surprise</button>
    <button
      v-if="item.type === 'card'"
      class="card__button"
      :class="item.owner !== null ? 'rent' : 'buy'"
      @click="buyCard"
    >
      {{ item.owner !== null ? `RENT ${item.rent} $` : `BUY ${item.price} $` }}
    </button>

    <button
      v-if="goTo&&item.type === 'card'"
      class="card__button-go"
      :class="item.owner !== null ? 'rent' : 'buy'"
      @click="chooseCard"
    >
      GO TO
    </button>

    <button
      v-if=" item.type === 'jail'|| item.type === 'teleport'"
      class="card__button"
      :class="item.owner !== null ? 'rent' : 'buy'"
      @click="chooseCard"
    >
      GO TO
    </button> -->
  </div>

  <p v-if="goTo && index===0"  class="text">OR</p>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const props = defineProps({
  item: { type: Object, required: true },
  goTo: { type: Boolean, required: true },
  index: { type: Number, required: true }
})

const emit = defineEmits(['choose', 'buy', 'surprise'])

function getSurprise() {
  emit('surprise')
}

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
  bgCard.value = `url('../images/${props.item.img}.png')`
}

onMounted(() => {
  getInit()
})
</script>

<style lang="scss" scoped>
.card {
  position: relative;
  width: 200px;
  height: max-content;

  display: flex;
  flex-direction: column;
  justify-content: end;

  background-color: white;
  border-radius: 4px;
  box-shadow: 0px 0px 5px grey;

  &__line {
    position: relative;
    width: 100%;
    height: 24px;

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

  &__content{
    display: flex;
    flex-direction: column;
    align-items: center;

    color:black;

    gap: 4px;
    padding: 12px;

  }

  &__price{
    font-style: 14px;
    font-weight: 700;
    line-height: 24px;
  }
  &__rent{
    font-style: 12px;
    font-weight: 400;
    line-height: 24px;
  }

  &__footer{
    width: 100%;

    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
  }


  &__button {
    cursor: pointer;
    width: 100%;
   
    font-size: 14px;
    font-weight: 700;
    line-height: 24px;

    border-radius:  4px;
    padding: 8px 12px;

    &.buy {
      background-color: #008309;
      color: white;
    }

    &.rent {
      background-color: #2598A7;
      color: white;
    }

    &.surprise {
      background-color: rgb(126, 197, 245);
      color: white;
      letter-spacing: 1.5px;
    }

    &.go{
      color: #CA5F63;

      background-color: transparent;
      border-color: #CA5F63;
    }
  }

 
}

.text{
      font-style: 14px;
      font-weight: 700;
      line-height: 24px;
      color:white;

  }
</style>
