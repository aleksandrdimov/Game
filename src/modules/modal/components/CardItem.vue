<template>
  <div class="card" :style="{ '--color-bg-card': item.type === 'teleport' ? '#06021A' : 'white' }">
    <div class="card__line" v-if="null !== item.price"></div>
    <div class="card__body"></div>

    <div class="card__content">
      <p v-if="item.price !== null" class="card__price">
        {{
          item.owner === null
            ? `Price: ${item.price} $`
            : `Owner:
        ${item.owner} `
        }}
      </p>
      <p v-if="item.rent !== null" class="card__rent">Rent: {{ item.rent }}$</p>
      <div class="card__footer">
        <Button
          v-if="item.type !== 'surprise' && item.owner === null"
          :disabled="item.owner && item.type === 'card'"
          :type="'transparent'"
          @click="chooseCard"
        >
          Go to
        </Button>
        <Button
          v-if="item.price !== null && item.owner !== player.name"
          :type="item.owner !== null ? 'rent' : 'buy'"
          @click="buyCard"
        >
          {{ item.owner !== null ? 'Pay rent' : 'Buy' }}
        </Button>
        <Button v-if="item.type === 'surprise'" :type="'surprise'" @click="getSurprise">
          Get Surprise
        </Button>
        <Button v-if="item.owner === player.name" :type="'transparent'" @click="chooseCard">
          Go to
        </Button>
      </div>
    </div>
  </div>

  <p v-if="goTo && index === 0" class="text">OR</p>
</template>

<script setup>
import Button from '@/modules/UIComponents/Button.vue'
import { onMounted, ref } from 'vue'

const props = defineProps({
  item: { type: Object, required: true },
  player: { type: Object, required: true },
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
  --color-bg-card: white;

  position: relative;
  width: 200px;
  height: 340px;

  display: flex;
  flex-direction: column;
  // justify-content: flex-end;

  background-color: var(--color-bg-card);
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
    // position: absolute;
    // z-index: 3;
    // top: 50%;
    transform: translateY(-50%);

    color: black;
    padding-left: 10px;
  }

  &__body {
    width: 100%;
    height: 200px;

    background-image: v-bind(bgCard);
    background-size: cover;
    background-repeat: no-repeat;

    margin: auto;
  }

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;

    color: black;

    gap: 4px;
    padding: 12px;
    // margin: auto 0 0;
  }

  &__price {
    font-style: 14px;
    font-weight: 700;
    line-height: 24px;
  }

  &__rent {
    font-style: 12px;
    font-weight: 400;
    line-height: 24px;
  }

  &__footer {
    width: 100%;

    // display: grid;
    // grid-template-columns: repeat(2, 1fr);
    display: flex;
    gap: 8px;
  }

  &__button {
    cursor: pointer;
    width: 100%;

    font-size: 14px;
    font-weight: 700;
    line-height: 24px;
    color: white;

    border-radius: 4px;
    padding: 8px 12px;

    &.buy {
      background-color: #008309;
    }

    &.rent {
      background-color: #2598a7;
    }

    &.surprise {
      background-color: rgb(126, 197, 245);
      letter-spacing: 1.5px;
    }

    &.go {
      color: #ca5f63;

      background-color: transparent;
      border-color: #ca5f63;

      transition: background-color 0.3s ease-in-out;

      &:hover {
        background-color: #f5e0e1;
      }

      &:active {
        background-color: #f0d1d2;
      }
    }

    &:disabled {
      cursor: auto;

      color: white;
      background-color: #646864;
    }
  }
}

.text {
  font-style: 14px;
  font-weight: 700;
  line-height: 24px;
  color: white;
}
</style>
