<template>
  <section class="modal-error">
    <div v-if="!player.status" class="modal-error__wrap">
      <!-- <img
        src="/images/close.png"
        alt="close"
        class="modal-error__close"
        @click="closeModal"
      /> -->
      <img src="/images/bankrupt.png" alt="bankrupt" />

      <div class="modal-error__box">
        <button class="modal-error__button bankrupt" @click="isBankrupt">Declare bankruptcy</button>
        <button class="modal-error__button trade" @click="isTrade">Trade</button>
      </div>
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
  items: { type: Array, required: true }
})
const emit = defineEmits(['trade', 'bankrupt'])

const gameOver = ref(false)

function isBankrupt() {
  gameOver.value = true
  emit('bankrupt')
}

function isTrade() {
  emit('trade')
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
}
</style>
