<template>
  <div class="player-token" :class="[`player-token-${player.id}`, player.img]">
    <div></div>
  </div>
</template>

<script setup>
import { onBeforeUpdate, onMounted, onUpdated, ref, watch } from 'vue'

const props = defineProps({
  player: { type: Object, required: false }
})

const playerColor = props.player.color
const playerColumn = ref('')
const playerRow = ref('')

function getPosition() {
  playerColumn.value = props.player.column
  playerRow.value = props.player.row
}


watch(props, () => {
  getPosition()
})

onMounted(() => {
  getPosition()
})

onBeforeUpdate(() => {
  getPosition()
})

</script>

<style lang="scss" scoped>
.player-token {
  position: absolute;
  z-index: 10;

  width: 24px;
  height: 24px;

  grid-column: v-bind(playerColumn);
  grid-row: v-bind(playerRow);

  margin: 10px;

  transition: all 1s linear;

  &.player-token-2 {
    justify-self: start;
    align-self: end;
  }

  &.player-token-3 {
    justify-self: end;
    align-self: start;
  }

  &.player-token-4 {
    justify-self: end;
    align-self: end;
  }

  &.square {
    background-color: v-bind(playerColor);
    // margin: 10px;

  }

  &.circle {
    background-color: v-bind(playerColor);
    border-radius: 50%;
  }

  &.triangle {
    width: 0;
    height: 0;
    border-left: 12px solid transparent;
    border-right: 12px solid transparent;
    background-color: transparent;

    border-bottom: 24px solid v-bind(playerColor);
  }

  &.star {
    position: relative;
    overflow: hidden;

    & div {

      margin:10px 0px;
      
      display: block;
      color: v-bind(playerColor);
      width: 0px;
      height: 0px;
      border-right: 13px solid transparent;
      border-bottom:7px solid v-bind(playerColor);
      border-left: 14px solid transparent;
      transform: rotate(35deg);

      // overflow: hidden;

      &:before {
        border-bottom: 12px solid v-bind(playerColor);
        border-left:4.5px solid transparent;
        border-right:4.5px solid transparent;
        position: absolute;
        height: 0;
        width: 0;
        top: -8px;
        left: -10px;
        display: block;
        content: '';
        transform: rotate(-35deg);
      }

      &:after {
        position: absolute;
        display: block;
        color: v-bind(playerColor);
        top: 1px;
        left: -16px;
        width: 0px;
        height: 0px;
        border-right: 13px solid transparent;
        border-bottom: 7px solid v-bind(playerColor);
        border-left: 14px solid transparent;
        transform: rotate(-70deg);
        content: '';
      }
    }
  }

}
</style>
