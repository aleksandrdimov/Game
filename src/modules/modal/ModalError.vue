<template>
  <section class="modal-error">
    <div class="modal-error__wrap" v-if="cardItem.owner && !player.status">
      <img src="/images/bankrupt.png" alt="bankrupt" />

      <div class="modal-error__box">
        <button class="modal-error__button bankrupt" @click="isBankrupt">Declare bankruptcy</button>
        <button class="modal-error__button trade" @click="isTrade">Trade</button>
      </div>
    </div>

    <div v-else-if="!cardItem.owner && !player.status" class="modal-error__wrap crack">
      <IconClose @close="closeModal" class="modal-error__close"/>
      <div class="modal-error__image-wrap">
        <img src="/images/error__icon.png" alt="error" class="modal-error__image" />
      </div>
      <img src="/images/crack_icon.png" alt="crack" class="modal-error__image-crack" />
      <p class="modal-error__title">Not enough money to buy</p>
      <button class="modal-error__button trade no-money" @click="isSell">Trade</button>
    </div>

    <div v-else class="modal-error__wrap">
      <img src="/images/game_over.png" alt="game over" />

      <div class="modal-error__box">
        {{ player.name }}
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import IconClose from '../UIComponents/IconClose.vue';

const props = defineProps({
  player: { type: Object, required: true },
  items: { type: Array, required: true },
  cardItem: { type: Object, required: true }
})

const emit = defineEmits(['trade','sell', 'bankrupt', 'close'])
const gameOver = ref(false)

function isBankrupt() {
  gameOver.value = true
  emit('bankrupt')
}

function isTrade() {
  emit('trade')
}

function isSell() {
  emit('sell',true)
}

function closeModal() {
  emit('close')
}
</script>

<style lang="scss" scoped>
.modal-error {
  width: 100%;
  height: 100%;

  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;

  &__wrap {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    display: flex;
    flex-direction: column;

    background-color: white;
    border-radius: 15px;
    box-shadow: 0px 0px 10px grey;

    &.crack {
      width: 300px;
      height: 250px;

      gap: 36px;

      padding: 70px 25px 30px;
    }
  }

  &__box {
    width: 100%;
    display: flex;
    justify-content: center;

    font-size: 24px;
    font-weight: 700;
    line-height: 44px;

    gap: 20px;
    padding: 24px;
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

    transition: background-color 0.3s ease-in-out;

    &.trade {
      background-color: #008309;

      &:hover {
        background-color: #125417;
      }

      &:active {
        background-color: #092a0b;
      }
    }

    &.bankrupt {
      color: #ca5f63;

      background-color: transparent;
      border-color: #ca5f63;

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

  &__image-wrap {
    position: absolute;
    z-index: 10;
    top: 60%;
    left: 50%;

    background-color: #dd1c1c;
    border-radius: 17px;

    transform: rotate(20deg) scale(0);
    animation: error 0.5s ease-in-out forwards 0.4s;
  }

  &__image {
    width: 200px;
    display: inline;
  }

  &__image-crack {
    position: relative;
    z-index: 2;

    opacity: 0;
    animation: crack 0.4s ease-in-out forwards 0.8s;
  }

  &__title {
    position: absolute;
    z-index: 15;
    top: 20px;
    left: 50%;
    transform: translateX(-50%) scale(0);

    width: 210px;

    text-align: center;
    font-size: 22px;
    font-weight: 600;
    color: black;

    animation: title 0.4s ease-in-out forwards 1.2s;
  }

  &__close {
    width: 36px;
    height: 36px;

    opacity: 0;
    animation: crack 0.4s ease-in-out forwards 2s;
  }
}

.no-money {
  position: absolute;
  z-index: 30;
  bottom: 5px;
  right: 5px;

  width: max-content;

  border-bottom-right-radius: 15px;
  border-top-left-radius: 15px;

  opacity: 0;
  animation: crack 0.4s ease-in-out forwards 2s;
}

@keyframes error {
  0% {
    transform: translate(0%, 100%) rotate(-20deg) scale(0);
  }
  80% {
    transform: translate(-10%, 50%) rotate(-20deg) scale(0.3);
  }
  100% {
    transform: translate(-50%, -50%) rotate(-20deg) scale(1);
    box-shadow: 0px 0px 10px grey;
  }
}

@keyframes crack {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes title {
  0% {
    transform: translateX(-50%) scale(0);
  }
  100% {
    transform: translateX(-50%) scale(1);
  }
}
</style>
