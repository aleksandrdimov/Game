<template>
  <div class="player">
    <div class="player__wrap">
      <div class="player__header">
        <h3 class="player__name">{{ player.name }}</h3>
        <span class="player__money">{{ player.money }} $</span>
        <img v-if="player.active" src="/images/game_dice.png" alt="dice" class="player__active" />
        <div class="player__arrow" :class="{ active: player.details }" @click="clickArrow">
          <img src="/images/arrow.svg" alt="arrow" />
        </div>
      </div>
      <Transition name="details">
        <div v-if="player.details" class="player__content">
          <div
            class="player__group"
            :class="`player__group-${index + 1}`"
            v-for="(group, index) in groups"
            :key="index"
          >
            <div
              class="player__group-item"
              v-for="(item, idx) in group.items"
              :key="idx"
              :style="{ '--color': item.color === 'transparent' ? 'black' : item.color }"
            >
              <div
              v-if="item.owner===player.name"
                class="player__group-owner"
                :style="{ '--color-bg': item.color === 'transparent' ? 'black' : item.color }"
              >
                <p class="player__group-owner-line"></p>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUpdated, ref } from 'vue'

const props = defineProps({
  player: { type: Object, required: true },
  groups: { type: Array, required: true }
})

console.log(props.groups)

const emit = defineEmits('open')

const playerColor = ref(props.player.color)
const moneyColor = ref('')

function getColor() {
  if (props.player.money > 700) {
    moneyColor.value = 'rgb(33, 158, 33)'
  } else if (props.player.money <= 700 && props.player.money > 250) {
    moneyColor.value = 'orange'
  } else moneyColor.value = 'rgb(240, 24, 24)'
}

function clickArrow() {
  emit('open', props.player.id)
}

onMounted(() => {
  getColor()
})

onUpdated(() => {
  getColor()
})
</script>

<style lang="scss" scoped>
.player {
  &__wrap {
    border: 1px solid grey;
  }

  &__header {
    display: grid;
    grid-template-columns: repeat(3, 1fr) 30px;
    align-items: center;
    justify-items: center;
    gap: 12px;

    padding: 3px 10px;
  }

  &__name {
    justify-self: start;

    text-transform: uppercase;
    font-size: 12px;
    font-weight: 600;
    color: v-bind(playerColor);
  }

  &__money {
    font-size: 12px;
    font-weight: 700;
    color: v-bind(moneyColor);
  }

  &__active {
    grid-column: 3/4;

    width: 24px;
  }

  &__arrow {
    cursor: pointer;
    width: 24px;
    height: 24px;

    grid-column: 4/5;

    display: flex;
    justify-content: center;
    align-items: center;

    & img {
      width: 16px;
      height: 16px;

      transition: transform 0.3s ease-in-out;
    }

    &.active img {
      transform: rotate(180deg);
    }
  }

  &__content {
    width: 100%;
    height: 230px;
    overflow: hidden;

    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(5, 1fr);

    padding: 0 2px;
    gap: 5px 30px;
  }

  &__group {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  &__group-2 {
    grid-column: 2/4;

    justify-self: start;
    gap: 7px;
  }

  &__group-item {
    --color: black;

    width: 20px;
    height: 35px;

    border: 1px solid var(--color);
    border-radius: 2px;

    padding: 2px;
  }

  &__group-owner {
    --color-bg: black;

    height: 100%;
    position: relative;

    background-color: var(--color-bg);
  }

  &__group-owner-line {
    width: 10px;
    height: 3px;

    position: absolute;
    z-index: 3;
    top: 4px;
    left: 50%;
    transform: translate(-50%);

    background-color: white;
  }
}

.details-enter-from {
  height: 0px;
}
.details-enter-to {
  height: 230px;
  transition: all 0.4s ease-in;
}
.details-leave-to {
  height: 0px;
  transition: all 0.4s ease-in;
}
</style>
