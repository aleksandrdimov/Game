<template>
  <section class="modal-item">
    <div class="modal-item__wrap" :class="{ go: items.length > 1 }">
      <CardItem
        v-for="(item, index) in items"
        :key="index"
        :item="item"
        :index="index"
        :player="player"
        :go-to="items.length > 1"
        @choose="chooseCard"
        @buy="buyCard"
        @surprise="getSurprise"
      />
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import CardItem from './components/CardItem.vue'

const props = defineProps({
  items: { type: Array, required: true },
  player: { type: Object, required: true }
})

const emit = defineEmits(['close', 'choose', 'buy','surprise'])

// function closeModal() {
//   emit('close')
// }

function chooseCard(data) {
  emit('choose', data)
}

function getSurprise(data) {
  emit('surprise',data)
}

function buyCard(data) {
  emit('buy', data)
}
</script>

<style lang="scss" scoped>
.modal-item {
  width: 100%;
  height: 100%;

  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;

  // background-color: rgba(0, 0, 0, 0.5);

  &__wrap {
    position: absolute;
 top: 50%;
 left: 50%;
    transform: translate(-50% ,-50%);

    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    gap: 36px;

    // background-color: white;
    background-color: rgba(4, 17, 5, 0.3);
    border-radius: 5px;

    backdrop-filter: blur(5px);

    padding: 32px;

    // &.go{
    //   padding-bottom: 100px;
    // }
  }

  &__close {
    cursor: pointer;
    position: absolute;
    z-index: 15;
    top: 5px;
    right: 5px;
  }
}
</style>
