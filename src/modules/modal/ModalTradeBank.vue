<template>
  <section class="modal-trade-bank">
    <div class="modal-trade-bank__wrap">
      <h3 class="modal-trade-bank__player">{{ player.name }}</h3>
      <p class="modal-trade-bank__money">You need {{ needMoney }}$</p>
      <Slider v-if="cards.length" :cards="cards" @active="chooseItem"/>
      <p class="modal-trade-bank__text">
        {{ cards.length ? 'Select the item you want to sell' : 'You don`t have any cards' }}
      </p>
      <div class="modal-trade-bank__box">
        <button class="modal-trade-bank__button bankrupt" @click="isBankrupt">
          Declare bankruptcy
        </button>
        <button
          :disabled="needMoney > getMoney"
          class="modal-trade-bank__button sell"
          @click="sellItems"
        >
          Get {{ getMoney }}$
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import Slider from './components/Slider.vue';
import SlideItem from './components/SlideItem.vue'
import { onMounted, onUpdated, ref } from 'vue'

const props = defineProps({
  cards: { type: Array, required: true },
  player: { type: Object, required: true },
  needMoney: { type: Number, required: true }
})

const emit = defineEmits(['close', 'bankrupt'])

function isBankrupt() {
  emit('bankrupt')
}

const getMoney = ref(0)


function chooseItem() {
  getMoney.value = 0
  props.cards.forEach((el) =>
    el.sell ? (getMoney.value = getMoney.value + Math.floor(el.price / 2)) : ''
  )
}

function sellItems() {
  props.cards.forEach((el) => (el.sell ? (el.owner = null) : ''))
  props.player.money = props.player.money + getMoney.value

  props.cards.forEach((el) => (el.sell === true ? (el.sell = false) : ''))
  emit('close')
}

</script>

<style lang="scss" scoped>
.modal-trade-bank {
  width: 100%;
  height: 100%;

  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;

  // background-color: rgba(0, 0, 0, 0.5);

  &__wrap {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    width: 510px;
    // height: 250px;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;

    background-color: white;
    border-radius: 12px;
    box-shadow: 0px 0px 10px grey;

    padding: 12px 0px;
  }

  &__player {
    font-size: 24px;
    font-weight: 700;
    line-height: 28px;
    color: #000;
  }

  &__money {
    font-size: 14px;
    font-weight: 700;
    line-height: 24px;
    color: #d50000;
  }

  &__text {
    font-size: 14px;
    font-weight: 400;
    line-height: 24px;
    color: #4c4c4c;
  }

  &__box {
    width: 100%;
    display: flex;
    gap: 8px;
    padding: 12px 44px;
  }

  &__button {
    cursor: pointer;
    width: 100%;

    font-size: 14px;
    font-weight: 700;
    line-height: 24px;
    color: white;

    border-radius: 4px;
    padding: 8px 12px;

    &.sell {
      background-color: #008309;
    }

    &.bankrupt {
      color: #ca5f63;

      background-color: transparent;
      border-color: #ca5f63;

      transition: background-color 0.3s ease-in-out;

      &:hover {
        background-color: #f5e0e1;
      }

      &:active {
        background-color: #f0d1d2;
      }
    }

    &:disabled {
      cursor: auto;

      color: white;
      background-color: #646864;
    }
  }
}

// .slider {
//   // position: relative;
//   width: 425px;
//   padding: 5px 0px;

//   overflow: hidden;

//   &__wrapper {
//     width: 100%;

//     display: flex;
//     flex-direction: column;

//     // @include flex-container(column, flex-start);

//     position: relative;

//     gap: 48px;
//   }

//   &__arrow {
//     cursor: pointer;
//     position: absolute;
//     z-index: 3;
//     top: 45%;

//     & rect,
//     & path {
//       transition: all 0.3s ease-in-out;
//     }

//     &.left {
//       left: 0;
//       transform: translateY(-50%) rotate(180deg);
//     }
//     &.right {
//       right: 0;
//       transform: translateY(-50%);
//     }

//     &:hover {
//       & rect {
//         fill: #ebf9ec;
//       }

//       & path {
//         stroke: #125417;
//       }
//     }

//     &:active {
//       & rect {
//         fill: #f0f4f1;
//       }

//       & path {
//         stroke: #1c7d22;
//       }
//     }

//     &.disabled {
//       cursor: auto;
//       pointer-events: none;
//       & rect {
//         fill: transparent;
//       }

//       & path {
//         stroke: #8a8f8a;
//       }
//     }
//   }

//   // &__pagination {
//   //   width: 100%;

//   //   @include flex-container(row, space-between, center);

//   //   position: absolute;
//   //   top: 50%;
//   //   z-index: 80;

//   //   transform: translateY(-50%);

//   //   @include bigMobile {
//   //     @include flex-container(row, center, center);

//   //     position: static;

//   //     gap: 68px;

//   //     transform: translateY(0);
//   //   }
//   // }

//   &__slides {
//     width: 100%;

//     display: flex;
//     justify-content: flex-start;
//     // @include flex-container(row, flex-start);

//     gap: 12px;

//     transition: transform 0.3s ease-in-out;
//     transform: translateX(v-bind(translateXVar));
//   }

//   &__slide {
//     flex: 0 0 75px;
//   }
// }
</style>
