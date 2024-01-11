<template>
  <div class="board-item">
      <div
      v-if="null !== item.color"
      class="board-item__label"
      :class="classLabelPosition"
      :style="{ '--color-bg': item.color }"
      ></div>
      <p>{{ item.count }}</p>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const props = defineProps({
  item: { type: Object, required: false },
  column: { type: Boolean, required: false }
})

const bgImage = ref('white')
const classLabelPosition = ref(null);

const positionRow=ref('');
const positionColumn=ref('');

function getSliderValues() {
  bgImage.value = `url('/images/${props.item.img}.png')`;
  positionColumn.value=props.item.column;
  positionRow.value=props.item.row;
  null !== props.item.position ? (classLabelPosition.value = props.item.position) : ''
}

onMounted(() => {
  getSliderValues()
})
</script>

<style lang="scss" scoped>
.board-item {
  width: 100%;
  position: relative;

  border: 1px solid black;
  background-image: v-bind(bgImage);
  background-size: contain;
  background-repeat: no-repeat;

  grid-column: v-bind(positionColumn);
  grid-row: v-bind(positionRow);

  &__picture {
    // object-fit: cover;
    //    min-width: 72px;
    width: 100%;
    // height: 72px;
  }

  &__label {
    --color-bg: white;

    position: absolute;
    z-index: 3;

    width: 100%;
    height: 15px;
    background-color: var(--color-bg);

    &.top {
      top: 0;
    }
    &.bottom {
      bottom: 0;
    }
    &.left {
        width: 15px;
        height: 100%;
      left: 0;
    }
    &.right {
        width: 15px;
        height: 100%;
      right: 0;
    }
  }
}
</style>
