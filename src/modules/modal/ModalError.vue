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
      <svg
        class="modal-error__close"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        style="enable-background: new 0 0 24 24"
        xml:space="preserve"
        width="36px"
        height="36px"
        @click="closeModal"
      >
        <path
          style="fill: #9ad14b"
          d="M477.261 419.64H34.738c-14.258 0-25.816-11.558-25.816-25.816v-168.28c0-14.258 11.558-25.816 25.816-25.816h442.523c14.258 0 25.816 11.558 25.816 25.816v168.28c0 14.258-11.558 25.816-25.816 25.816z"
        />
        <circle style="fill: #f7b239" cx="256.003" cy="114.998" r="22.64" />
        <path
          fill=" #f2f2f2"
          d="M301.3 258.454a8.923 8.923 0 0 0-8.923 8.923v84.615a8.923 8.923 0 0 0 17.846 0v-84.615a8.923 8.923 0 0 0-8.923-8.923zM256.921 259.98a8.922 8.922 0 0 0-12.387 2.404l-21.156 31.348-21.156-31.348a8.92 8.92 0 0 0-12.387-2.404 8.922 8.922 0 0 0-2.404 12.387l25.184 37.317-25.184 37.317a8.922 8.922 0 0 0 2.404 12.387 8.917 8.917 0 0 0 12.388-2.405l21.156-31.348 21.156 31.348a8.915 8.915 0 0 0 7.405 3.933 8.88 8.88 0 0 0 4.983-1.528 8.922 8.922 0 0 0 2.404-12.387l-25.184-37.317 25.184-37.317a8.921 8.921 0 0 0-2.406-12.387zM159.174 276.3a8.923 8.923 0 0 0 0-17.846h-50.041a8.923 8.923 0 0 0-8.923 8.923v84.615a8.923 8.923 0 0 0 8.923 8.923h50.042a8.923 8.923 0 0 0 0-17.846h-41.119v-23.552h16.098a8.923 8.923 0 0 0 0-17.846h-16.098V276.3h41.118zM402.866 258.454h-61.565a8.923 8.923 0 0 0 0 17.846h21.86v75.692a8.923 8.923 0 0 0 17.846 0V276.3h21.86a8.923 8.923 0 1 0-.001-17.846z"
        />
        <path
          style="fill: #333"
          d="M477.261 190.805H367.064l-79.76-79.76C285.353 95.503 272.063 83.436 256 83.436c-16.064 0-29.353 12.066-31.305 27.609l-79.76 79.76H34.738C15.584 190.805 0 206.389 0 225.544v168.28c0 19.156 15.584 34.738 34.738 34.738h442.523c19.156 0 34.738-15.584 34.738-34.738v-168.28c.001-19.155-15.583-34.739-34.738-34.739zm-221.26-89.522c7.562 0 13.715 6.152 13.715 13.715s-6.152 13.715-13.715 13.715-13.715-6.152-13.715-13.715c-.002-7.563 6.152-13.715 13.715-13.715zm-26.746 30.441c5.587 8.901 15.484 14.835 26.746 14.835 11.262 0 21.159-5.933 26.746-14.835l59.081 59.081H170.173l59.082-59.081zm264.899 262.1c0 9.315-7.578 16.893-16.893 16.893H34.738c-9.315 0-16.893-7.578-16.893-16.893v-168.28c0-9.315 7.578-16.893 16.893-16.893h442.523c9.315 0 16.893 7.578 16.893 16.893v168.28z"
        />
      </svg>
      <div class="modal-error__image-wrap">
        <img src="/images/error__icon.png" alt="error" class="modal-error__image" />
      </div>
      <img src="/images/crack_icon.png" alt="crack" class="modal-error__image-crack" />
      <p class="modal-error__title">Not enough money to buy</p>
      <button class="modal-error__button trade no-money" @click="isTrade">Trade</button>
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

const props = defineProps({
  player: { type: Object, required: true },
  items: { type: Array, required: true },
  cardItem: { type: Object, required: true }
})

const emit = defineEmits(['trade', 'bankrupt', 'close'])
const gameOver = ref(false)

function isBankrupt() {
  gameOver.value = true
  emit('bankrupt')
}

function isTrade() {
  emit('trade')
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
    cursor: pointer;
    position: absolute;
    z-index: 20;

    right: 5px;
    top: 0;

    opacity: 0;
    animation: crack 0.4s ease-in-out forwards 2s;

    & path {
      transition: all 0.4s ease-in-out;
    }

    &:hover path {
      fill: red;
    }
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
