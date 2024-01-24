<template>
  <div v-if="item.color === 'transparent'" class="board-item">
    <div v-if="stand" class="board-item__shadow"></div>
    <div v-if="null !== item.color" class="board-item__label" :class="classLabelPosition"
      :style="{ '--color-bg': item.color }"></div>
    <PlayerToken :player="players[indexPlayerOwner]" :small="true" v-if="item.owner && indexPlayerOwner !== null"
      class="board-item__owner" :class="classLabelPosition" />
  </div>

  <div v-else class="board-item" :style="{ '--color-border': item.color }">
    <div v-if="stand" class="board-item__shadow"></div>

    <div v-if="null !== item.color" class="board-item__label" :class="classLabelPosition"
      :style="{ '--color-bg': item.color }"></div>
    <PlayerToken :player="players[indexPlayerOwner]" :small="true" v-if="item.owner && indexPlayerOwner !== null"
      class="board-item__owner" :class="classLabelPosition" />
  </div>
</template>

<script setup>
import PlayerToken from '@/modules/player/components/PlayerToken.vue'
import { onMounted, onUpdated, ref, watch } from 'vue'

const props = defineProps({
  item: { type: Object, required: false },
  players: { type: Array, required: false },
  column: { type: Boolean, required: false }
})

const bgImage = ref('white')
const classLabelPosition = ref(null)
const indexPlayerOwner = ref(null)

const stand = ref(false)

const positionRow = ref('')
const positionColumn = ref('')

function getSliderValues() {
  bgImage.value = `url('../images/${props.item.img}.png')`
  positionColumn.value = props.item.column
  positionRow.value = props.item.row
  null !== props.item.position ? (classLabelPosition.value = props.item.position) : ''

  if (props.item.owner) {
    props.players.forEach((el) => {
      el.name === props.item.owner ? (indexPlayerOwner.value = el.id - 1) : ''
    })
  }
}

function isPlayerStand() {
  stand.value=false
  props.players.forEach((el) => {
    el.row === props.item.row && el.column === props.item.column ?
      stand.value = true : ''

  })
}

watch(props.players,()=>{
  isPlayerStand()
})

onMounted(() => {
  getSliderValues()
  isPlayerStand()
})

onUpdated(() => {
  getSliderValues()
})
</script>

<style lang="scss" scoped>
.board-item {
  --color-border: #B3B3B3;
  position: relative;
  width: 100%;

  background-image: v-bind(bgImage);
  background-size: contain;
  background-repeat: no-repeat;

  border-radius: 4px;
  border: 1px solid var(--color-border);

  grid-column: v-bind(positionColumn);
  grid-row: v-bind(positionRow);

  &__shadow {
    position: absolute;
    z-index: 2;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;
    
    background-color: rgba(0, 0, 0, .5);
    border-radius: 4px;
  }

  &__label {
    --color-bg: white;

    position: absolute;
    z-index: 3;

    width: 100%;
    height: 8px;

    background-color: var(--color-bg);

    &.top {
      top: 0;
      border-radius: 3px 3px 0 0;
    }

    &.bottom {
      bottom: 0;
      border-radius: 0 0 3px 3px;

    }

    &.left {
      width: 8px;
      height: 100%;
      left: 0;

      border-radius: 3px 0 0 3px;

    }

    &.right {
      width: 8px;
      height: 100%;
      right: 0;

      border-radius: 0 3px 3px 0;

    }
  }

  &__owner {
    position: absolute;
    z-index: 10;

    width: 24px;
    height: 24px;
    margin: 0px;

    &.top {
      top: -18px;
      left: 50%;
      transform: translateX(-50%);
    }

    &.bottom {
      top: 77px;
      left: 50%;
      transform: translateX(-50%);
    }

    &.left {
      left: -18px;
      top: 50%;
      transform: translateY(-50%);
    }

    &.right {
      right: -77px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>
