<template>
  <div class="player-token" :class="`player-token-${player.id}`"></div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  player: { type: Object, required: true }
})

const playerColor = props.player.color
const playerColumn = ref(props.player.column)
const playerRow = ref(props.player.row)
</script>

<style lang="scss" scoped>
.player-token {
  position: absolute;
  z-index: 10;

  width: 20px;
  height: 20px;
  background-color: v-bind(playerColor);
  border-radius: 50%;

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


}
</style>
