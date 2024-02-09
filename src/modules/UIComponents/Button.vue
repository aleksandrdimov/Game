<template>
  <button
    class="button"
    :class="type"
    @click="clickButton"
  >
    <slot></slot>
  </button>
</template>

<script setup>
const props = defineProps({
  type: { type: String, reqiured: false }
})

const emit=defineEmits(['active'])

function clickButton(){
    emit('active')
}
</script>

<style lang="scss" scoped>
.button {
  cursor: pointer;
  width: 100%;

  font-size: 14px;
  font-weight: 700;
  line-height: 24px;
  color: white;

  background-color: #008309;
  border-radius: 4px;
  padding: 8px 12px;

  transition: all 0.3s ease-in-out;

  &.rent {
    background-color: #2598a7;

    &:hover{
        background-color: #1F818E;
    }

    &:active{
        background-color: #175F68;
    }
  }

  &.surprise {
    background-color: rgb(126, 197, 245);
    letter-spacing: 1.5px;
  }

  &.transparent {
    color: #0D3B10;

    background-color: white;
    border-color: #0D3B10;

   
    &:hover {
      background-color: #F0FAF1;
      border-color: #125417;
      color: #125417;
    }

    &:active {
      background-color: #E0F5E2;
      border-color: #1C7D22;
      color: #1C7D22;
    }
  }

  &.cansel {
    color: #ca5f63;

    background-color:white;
    border-color: #ca5f63;

   
    &:hover {
      background-color: #f5e0e1;
    }

    &:active {
      background-color: #f0d1d2;
    }
  }

  &:hover {
    background-color: #125417;
  }
  &:active {
    background-color: #092A0B;
  }

  &:disabled {
    pointer-events: none;
    cursor: auto;

    color: white;
    background-color: #646864;
  }
}
</style>
