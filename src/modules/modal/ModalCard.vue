<template>
  <section class="modal-item">
    <div class="modal-item__wrap">
      <img v-if="items.length===1 && !items[0].owner" src="/images/close.png" alt="close" class="modal-item__close">
      <CardItem v-for="(item, index) in items" :key="index" :item="item" :go-to="items.length>1"/>
    </div>
  </section>
</template>

<script setup>
import CardItem from './components/CardItem.vue'

const props = defineProps({ items: { type: Array, required: true } })

</script>

<style lang="scss" scoped>
.modal-item {
  width: 100%;
  height: 100%;

  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;

  background-color: rgba(0, 0, 0, 0.5);

  &__wrap {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    display: flex;
    flex-direction: row;
    gap: 36px;

    background-color: white;
    padding: 50px 25px;
  }

  &__close{
    cursor: pointer;
    position: absolute;
    z-index: 15;
    top: 5px;
    right:5px;
  }
}
</style>
