<template>
  <div class="player-token" :class="[`player-token-${player.id}`, player.img, { small: small }, { table: table }]">
  </div>
</template>

<script setup>
import { onBeforeUpdate, onMounted, ref, watch } from 'vue'

const props = defineProps({
  player: { type: Object, required: false },
  small: { type: Boolean, required: false },
  table: { type: Boolean, required: false }
})

const playerColor = ref('')
const playerColumn = ref('')
const playerRow = ref('')

function getPosition() {
  playerColumn.value = props.player.column
  playerRow.value = props.player.row
  playerColor.value=props.player.color
}


watch(props, () => {
  getPosition()
})

onMounted(() => {
  getPosition()
})

// onBeforeUpdate(() => {
//   getPosition()
// })

</script>

<style lang="scss" scoped>
.player-token {
  // position: absolute;
  position: relative;
  z-index: 10;
  width: 24px;
  height: 24px;


  grid-column: v-bind(playerColumn);
  grid-row: v-bind(playerRow);

  margin: 10px;

  // transition: all 1s linear;

  &.table {
    grid-column: 1/2;
    grid-row: 1/2;
    justify-self: center;

    margin: 0;

  }

  // &.player-token-2 {
  //   justify-self: start;
  //   align-self: end;
  // }

  // &.player-token-3 {
  //   justify-self: end;
  //   align-self: start;
  // }

  // &.player-token-4 {
  //   justify-self: end;
  //   align-self: end;
  // }

  &.square {
    background-color: v-bind(playerColor);

    &.small{
      width: 16px;
      height: 16px;
    }
  }

  &.circle {
    background-color: v-bind(playerColor);
    border-radius: 50%;

    &.small{
      width: 16px;
      height: 16px;
    }
  }

  &.triangle {
    width: 0;
    height: 0;
    border-left: 12px solid transparent;
    border-right: 12px solid transparent;
    background-color: transparent;

    border-bottom: 24px solid v-bind(playerColor);

    &.small{
      border-left:8px solid transparent;
    border-right: 8px solid transparent;

    border-bottom: 16px solid v-bind(playerColor);
    }
  }

  &.pacman {
    position: relative;
    width: 0px;
    height: 0px;
    border-left: 12px solid transparent;
    border-top: 12px solid v-bind(playerColor);
    border-right: 12px solid v-bind(playerColor);
    border-bottom: 12px solid v-bind(playerColor);
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;

    &::after {
      content: '';
      position: absolute;
      top: -7px;
      left: 0;
      width: 3px;
      height: 3px;
      border-radius: 50%;
      background-color: white;
    }

    &.small {
      border-width: 8px;
      border-radius: 8px;

      &::after {
        top: -5px;
        width: 2px;
        height: 2px;
      }
    }
  }

  &.yin-yang {
    width: 22px;
    box-sizing: content-box;
    height: 11px;
    background: #eee;
    border-color: v-bind(playerColor);
    border-style: solid;
    border-width: 1px 1px 12px 1px;
    border-radius: 100%;
    position: relative;

    &:before {
      content: "";
      position: absolute;
      top: 50%;
      left: 0;
      background: #eee;
      border: 4px solid v-bind(playerColor);
      border-radius: 100%;
      width: 3px;
      height: 3px;
      box-sizing: content-box;
    }

    &:after {
      content: "";
      position: absolute;
      top: 50%;
      right: 0;
      background: v-bind(playerColor);
      border: 4px solid #eee;
      border-radius: 100%;
      width: 3px;
      height: 3px;
      box-sizing: content-box;
    }

    &.small {
      width: 14px;
      height: 7px;
      border-width: 1px 1px 7px 1px;

      &:before,
      &:after {
        content:'';
        border-width: 2.5px;
        width: 2px;
        height: 2px;
      }
    }
  }

  &.burst-8 {
    background: v-bind(playerColor);
    width: 20px;
    height: 20px;
    position: relative;
    text-align: center;
    transform: rotate(20deg);

    &:before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      height: 20px;
      width: 20px;
      background: v-bind(playerColor);
      transform: rotate(135deg);
    }

    &.small {
      width: 12px;
      height: 12px;

      &:before {
        height: 12px;
        width: 12px;
      }
    }
  }

  &.heart {
    position: relative;
    width: 24px;
    height: 24px;

    &:before,
    &:after {
      position: absolute;
      content: "";
      left: 14px;
      top: 0;
      width: 14px;
      height: 24px;
      background: v-bind(playerColor);
      border-radius: 12px 12px 0 0;
      transform: rotate(-45deg);
      transform-origin: 0 100%;
    }

    &:after {
      left: 0;
      transform: rotate(45deg);
      transform-origin: 100% 100%;
    }

    &.small {
      width: 16px;
      height: 16px;

      &:before,
      &:after {
        left: -3px;
        width: 10px;
        height: 16px;

        border-radius: 8px 8px 0 0;
      }

      &:before {
        left: 7px;
      }
    }
  }
}
</style>
