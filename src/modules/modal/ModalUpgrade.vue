<template>
  <section class="modal-upgrade">
    <div class="modal-upgrade__wrap">
      <div class="modal-upgrade__header">
        <h3 class="modal-upgrade__title">Upgrade :</h3>
        <p class="modal-upgrade__name">{{ player.name }}</p>
        <p class="modal-upgrade__money">{{ player.money }}$</p>
      </div>
      <div class="modal-upgrade__content">
        <div
          class="modal-upgrade__group"
          v-for="(group, index) in groups"
          :key="index"
        >
          <div
            class="modal-upgrade__group-item"
            v-for="(item, idx) in group.items"
            :key="idx"
            :style="{ '--color': item.color === 'transparent' ? 'black' : item.color }"
          >
            <div
              class="modal-upgrade__group-owner"
              :style="{ '--color-bg': item.color === 'transparent' ? 'black' : item.color }"
            >
              <p class="modal-upgrade__group-owner-line"></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const props = defineProps({ groups: { type: Array, required: true }, player: { type: Object, required: true }, })

const playerColor = ref(props.player.color)

</script>

<style lang="scss" scoped>
.modal-upgrade {
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

    width: 400px;
    height: max-content;

  
    // padding: 0px 5px;
    

    background-color: white;
    border-radius: 15px;
    box-shadow: 0px 0px 10px grey;

    padding: 25px;
  }

  &__header{
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 16px;
  }

  &__title{
    font-weight: 600;
    color: rgb(241, 84, 84);
    text-transform: uppercase;
  }

  &__name {
    justify-self: start;

    text-transform: uppercase;
    font-weight: 600;
    color: v-bind(playerColor);
  }

  &__money {
    font-weight: 700;
    color: green;
  }

  &__content{
    display: flex;
   flex-wrap: wrap;
   gap:15px 30px;
  }

  &__group {
    height: 55px;

    display: flex;
    flex-direction: row;
    justify-content: space-between;

    gap: 7px;
  }

  &__group-item {
    cursor: pointer;
    --color: black;

    width: 30px;
    height: 55px;

    border: 1px solid var(--color);
    border-radius: 2px;

    padding: 2px;
  }

  &__group-owner {
    --color-bg: black;

    height: 100%;
    position: relative;

    background-color: var(--color-bg);
    border-radius: 1px;
  }

  &__group-owner-line {
    width: 18px;
    height: 4px;

    position: absolute;
    z-index: 3;
    top: 4px;
    left: 50%;
    transform: translate(-50%);

    background-color: white;
  }
}
</style>
