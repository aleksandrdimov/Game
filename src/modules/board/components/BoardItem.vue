<template>
  <div v-if="item.color === 'transparent'" class="board-item">
    <div
      v-if="null !== item.color"
      class="board-item__label"
      :class="classLabelPosition"
      :style="{ '--color-bg': item.color }"
    ></div>
    <!-- <p>{{ item.count }}</p> -->
    <PlayerToken
      :player="players[indexPlayerOwner]"
      v-if="item.owner && indexPlayerOwner !== null"
      class="board-item__owner"
      :class="classLabelPosition"
    />
  </div>

  <div v-else class="board-item" :style="{ '--color-border': item.color }">
    <div
      v-if="null !== item.color"
      class="board-item__label"
      :class="classLabelPosition"
      :style="{ '--color-bg': item.color }"
    ></div>
    <PlayerToken
      :player="players[indexPlayerOwner]"
      v-if="item.owner && indexPlayerOwner !== null"
      class="board-item__owner"
      :class="classLabelPosition"
    />
  </div>
</template>

<script setup>
import PlayerToken from '@/modules/player/components/PlayerToken.vue'
import { onMounted, onUpdated, ref } from 'vue'

const props = defineProps({
  item: { type: Object, required: false },
  players: { type: Array, required: false },
  column: { type: Boolean, required: false }
})

const bgImage = ref('white')
const classLabelPosition = ref(null)
const indexPlayerOwner = ref(null)

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

onMounted(() => {
  getSliderValues()
})

onUpdated(() => {
  getSliderValues()
})
</script>

<style lang="scss" scoped>
.board-item {
  --color-border: #B3B3B3;
  width: 100%;
  position: relative;

  background-image: v-bind(bgImage);
  background-size: contain;
  background-repeat: no-repeat;

  border-radius: 4px;
  border: 1px solid var(--color-border);

  grid-column: v-bind(positionColumn);
  grid-row: v-bind(positionRow);

  // overflow: hidden;

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

    width: 20px;
    height: 20px;
    margin:0px;

    &.top{
      top: -25px;
      left: 50%;
      transform: translateX(-50%);
    }

    &.bottom{
      bottom: -25px;
      left: 50%;
      transform: translateX(-50%);
    }

    &.left{
      left: -25px;
      top: 50%;
      transform: translateY(-50%);
    }

    &.right{
      right: -25px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>
