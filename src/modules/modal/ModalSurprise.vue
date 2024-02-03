<template>
  <section class="modal-surprise">
    <div class="modal-surprise__wrap">
      <h3 class="modal-surprise__discription">{{ item.text }}</h3>
      <Button :type="itemType[item.type].class" @click="clickButton">
        {{ itemType[item.type].text }}
      </Button>
    </div>
  </section>
</template>

<script setup>
import Button from '../UIComponents/Button.vue'
const props = defineProps({ item: { type: Object, required: true } })

const emit = defineEmits(['button'])

const allTypes = {
  profitable: 'profitable',
  unprofitable: 'unprofitable',
  go: 'go'
}

const itemType = {
  [allTypes.profitable]: {
    class: null,
    text: 'Get money'
  },
  [allTypes.unprofitable]: {
    class: 'rent',
    text: 'Pay money'
  },
  [allTypes.go]: {
    class: 'transparent',
    text: 'Go to'
  }
}

function clickButton() {
  emit('button')
}
</script>

<style lang="scss" scoped>
.modal-surprise {
  width: 100%;
  height: 100%;

  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;

  background-color: rgba(0, 0, 0, 0.2);

  &__wrap {
    width: 400px;
    // height: 300px;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    background-color: white;
    border-radius: 5px;

    padding: 32px;
  }

  &__discription{
    font-style: 24px;
    font-weight: 600;
    line-height: 34px;

    padding-bottom: 12px;
  }

}
</style>
