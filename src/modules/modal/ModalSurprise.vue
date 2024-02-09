<template>
  <section class="modal-surprise">
    <div class="modal-surprise__wrap">
      <div class="modal-surprise__item">
        <div class="modal-surprise__body"></div>

        <h3 class="modal-surprise__discription">{{ item.text }}</h3>
        <Button :type="itemType[item.type].class" @click="clickButton">
          {{ itemType[item.type].text }}
        </Button>
      </div>
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

  // background-color: rgba(0, 0, 0, 0.2);

  &__wrap {
  //   width: 200px;
  // height: 340px;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    // background-color: white;
    background-color: rgba(4, 17, 5, 0.3);
    border-radius: 5px;
    backdrop-filter: blur(5px);


    padding: 32px;
  }

  &__item{
    width: 224px;
  min-height: 340px;

  display: flex;
  flex-direction: column;
  // justify-content: flex-end;

  background-color: white;
  border-radius: 4px;
  box-shadow: 0px 0px 5px grey;

  padding: 12px;
  }

  &__body {
    width: 100%;
    height: 200px;

    background-image: url('../images/surprise_img.png');
    background-size: cover;
    background-repeat: no-repeat;

    // margin: auto;
    margin-bottom: 24px;
  }

  &__discription{
    font-style: 24px;
    font-weight: 600;
    line-height: 34px;
    text-align: center;

    padding-bottom: 12px;
  }

}
</style>
