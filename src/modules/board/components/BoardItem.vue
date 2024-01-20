<template>
  <div class="board-item"  :style="{ '--color-border': item.color }">
      <div
      v-if="null !== item.color"
      class="board-item__label"
      :class="classLabelPosition"
      :style="{ '--color-bg': item.color }"
      ></div>
      <!-- <p>{{ item.count }}</p> -->
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
  bgImage.value = `url('../images/${props.item.img}.png')`;
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
  --color-border: #B3B3B3;
  width: 100%;
  position: relative;

  background-image: v-bind(bgImage);
  background-size: contain;
  background-repeat: no-repeat;

  border-radius: 4px;
  border: 1px solid  var(--color-border);

  grid-column: v-bind(positionColumn);
  grid-row: v-bind(positionRow);

  overflow: hidden;

  &__label {
    --color-bg: white;

    position: absolute;
    z-index: 3;

    width: 100%;
    height: 8px;

    background-color: var(--color-bg);

    &.top {
      top: 0;
      border-radius:3px 3px 0 0;
    }
    &.bottom {
      bottom: 0;
      border-radius:0 0 3px 3px;

    }
    &.left {
        width: 8px;
        height: 100%;
      left: 0;

      border-radius: 3px 0 0 3px  ;

    }
    &.right {
        width:8px;
        height: 100%;
      right: 0;

      border-radius:0 3px 3px  0;

    }
  }
}
</style>
