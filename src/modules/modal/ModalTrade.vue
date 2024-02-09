<template>
  <section class="modal-trade">
    <div class="modal-trade__wrap">
      <svg
        v-if="!showOffer"
        class="modal-trade__close"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        style="enable-background: new 0 0 24 24"
        xml:space="preserve"
        width="44px"
        height="44px"
        @click="closeTrade"
      >
        <path
          style="fill: #9ad14b"
          d="M477.261 419.64H34.738c-14.258 0-25.816-11.558-25.816-25.816v-168.28c0-14.258 11.558-25.816 25.816-25.816h442.523c14.258 0 25.816 11.558 25.816 25.816v168.28c0 14.258-11.558 25.816-25.816 25.816z"
        />
        <circle style="fill: #f7b239" cx="256.003" cy="114.998" r="22.64" />
        <path
          fill=" #f2f2f2"
          d="M301.3 258.454a8.923 8.923 0 0 0-8.923 8.923v84.615a8.923 8.923 0 0 0 17.846 0v-84.615a8.923 8.923 0 0 0-8.923-8.923zM256.921 259.98a8.922 8.922 0 0 0-12.387 2.404l-21.156 31.348-21.156-31.348a8.92 8.92 0 0 0-12.387-2.404 8.922 8.922 0 0 0-2.404 12.387l25.184 37.317-25.184 37.317a8.922 8.922 0 0 0 2.404 12.387 8.917 8.917 0 0 0 12.388-2.405l21.156-31.348 21.156 31.348a8.915 8.915 0 0 0 7.405 3.933 8.88 8.88 0 0 0 4.983-1.528 8.922 8.922 0 0 0 2.404-12.387l-25.184-37.317 25.184-37.317a8.921 8.921 0 0 0-2.406-12.387zM159.174 276.3a8.923 8.923 0 0 0 0-17.846h-50.041a8.923 8.923 0 0 0-8.923 8.923v84.615a8.923 8.923 0 0 0 8.923 8.923h50.042a8.923 8.923 0 0 0 0-17.846h-41.119v-23.552h16.098a8.923 8.923 0 0 0 0-17.846h-16.098V276.3h41.118zM402.866 258.454h-61.565a8.923 8.923 0 0 0 0 17.846h21.86v75.692a8.923 8.923 0 0 0 17.846 0V276.3h21.86a8.923 8.923 0 1 0-.001-17.846z"
        />
        <path
          style="fill: #333"
          d="M477.261 190.805H367.064l-79.76-79.76C285.353 95.503 272.063 83.436 256 83.436c-16.064 0-29.353 12.066-31.305 27.609l-79.76 79.76H34.738C15.584 190.805 0 206.389 0 225.544v168.28c0 19.156 15.584 34.738 34.738 34.738h442.523c19.156 0 34.738-15.584 34.738-34.738v-168.28c.001-19.155-15.583-34.739-34.738-34.739zm-221.26-89.522c7.562 0 13.715 6.152 13.715 13.715s-6.152 13.715-13.715 13.715-13.715-6.152-13.715-13.715c-.002-7.563 6.152-13.715 13.715-13.715zm-26.746 30.441c5.587 8.901 15.484 14.835 26.746 14.835 11.262 0 21.159-5.933 26.746-14.835l59.081 59.081H170.173l59.082-59.081zm264.899 262.1c0 9.315-7.578 16.893-16.893 16.893H34.738c-9.315 0-16.893-7.578-16.893-16.893v-168.28c0-9.315 7.578-16.893 16.893-16.893h442.523c9.315 0 16.893 7.578 16.893 16.893v168.28z"
        />
      </svg>
      <h3 class="modal-trade__title">{{ !showOffer ? 'Trade' : 'Offer' }}</h3>

      <!-- <div class="modal-trade__header">
        <p>{{ active.name }}</p>
        <p v-if="!showOffer">{{ active.money }}$</p>
      </div> -->
      <div class="modal-trade__container">
        <div class="modal-trade__player">
          <div class="modal-trade__player-content">
            <div class="modal-trade__header">
              <p>{{ active.name }}</p>
              <span class="modal-trade__header-money" v-if="!showOffer">{{ active.money }}$</span>
            </div>
            <div v-if="!showOffer" class="modal-trade__label-wrap">
              <label class="modal-trade__label"> Add money </label>
              <input
                type="text"
                ref="inputGetMoney"
                @change="getMoney"
                :class="[{ error: active.money < offer.getMoney }, { disabled: disabledInputGet }]"
              />
            </div>
            <p v-if="showOffer && offer.getMoney !== 0" class="modal-trade__plus">
              {{ offer.getMoney }}$ +
            </p>
          </div>
          <div class="modal-trade__slider">
            <p v-if="!showOffer" class="modal-trade__slider-discription">
              Select the item you want to give
            </p>
            <Slider
              v-if="activeTradeItems.length"
              :cards="activeTradeItems"
              :trade="true"
              @active="getActivePlayerItem"
            />
          </div>
        </div>

        <svg class="modal-trade__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
          <g data-name="15-Exchange">
            <path style="fill: #ff6d04" d="M39 43v5L27 36v-5l12 12z" />
            <path d="M1 28c0 4 5 9 12 9h14v4H15C7 41 1 35.52 1 30z" style="fill: #fa5f07" />
            <path style="fill: #1c69a1" d="M37 28v5L25 21v-5l12 12z" />
            <path d="M49 23c8 0 14 5.48 14 11v2c0-4-5-9-12-9H37v-4z" style="fill: #2a84c9" />
            <path
              d="M37 27v1L25 16 37 4v5h6a19.994 19.994 0 0 1 20 20v5c0-5.52-6-11-14-11H37z"
              style="fill: #48befd"
            />
            <path
              d="M1 30c0 5.52 6 11 14 11h12v-5l12 12-12 12v-5h-6A19.994 19.994 0 0 1 1 35v-5z"
              style="fill: #fab503"
            />
            <path
              d="M44.666 9.084A4.5 4.5 0 0 0 45.5 18h2.828A14.672 14.672 0 0 1 63 32.672V29A19.985 19.985 0 0 0 44.666 9.084z"
              style="fill: #6bdcff"
            />
            <path
              d="M13.725 47H20a3 3 0 0 0 0-6h-5C7 41 1 35.52 1 30v4.275A12.725 12.725 0 0 0 13.725 47z"
              style="fill: #ffdb02"
            />
            <path
              d="M16 39a1.994 1.994 0 0 1-1.7 1.97c.235.01.465.03.7.03h12v-4H14a2 2 0 0 1 2 2z"
              style="fill: #d65106"
            />
            <path
              d="M48 25a1.994 1.994 0 0 1 1.7-1.97c-.235-.01-.465-.03-.7-.03H37v4h13a2 2 0 0 1-2-2z"
              style="fill: #1c69a1"
            />
            <path
              d="M43 9h-6V4L25 16l12 12v-5h12c8 0 14 5.477 14 11v-5A20 20 0 0 0 43 9z"
              style="fill: none; stroke: #000; stroke-linejoin: round; stroke-width: 2px"
            />
            <path
              style="fill: none; stroke: #000; stroke-linejoin: round; stroke-width: 2px"
              d="M25 16v5l12 12v-5M44 27h7c7 0 12 5 12 9v-3M40 27h2M21 55h6v5l12-12-12-12v5H15C7 41 1 35.523 1 30v5a20 20 0 0 0 20 20z"
            />
            <path
              style="fill: none; stroke: #000; stroke-linejoin: round; stroke-width: 2px"
              d="M39 48v-5L27 31v5M20 37h-7c-7 0-12-5-12-9v3M24 37h-2"
            />
          </g>
        </svg>

        <div class="modal-trade__player">
          <div class="modal-trade__player-content">
            <p v-if="showOffer" class="modal-trade__header">{{ playersName }}</p>

            <div v-if="!showOffer">
              <div class="modal-trade__header-item">
                <p class="modal-trade__players-name" @click="openDropDown">
                  {{ playersName }}
                  <!-- <span class="modal-trade__arrow"></span> -->
                </p>
                <img
                  class="modal-trade__arrow"
                  src="/images/double_arrow.svg"
                  alt="arrow"
                  @click="openDropDown"
                />
                <Transition name="drop-down">
                  <div v-if="showDropDown" class="modal-trade__drop-down">
                    <p
                      v-for="(item, index) in tradePlayers"
                      :key="index"
                      class="modal-trade__drop-down-item"
                      @click="choosePlayersName(index)"
                    >
                      {{ item.name }}
                    </p>
                  </div>
                </Transition>
              </div>
              <span class="modal-trade__header-money" v-if="!showOffer && playersName !== 'Choose'"
                >{{ money }}$</span
              >
            </div>

            <div v-if="!showOffer" class="modal-trade__label-wrap">
              <label class="modal-trade__label"> Add money </label>
              <input
                type="text"
                ref="inputPayMoney"
                @change="payMoney"
                :class="[{ error: money < offer.payMoney }, { disabled: disabledInputPay }]"
              />
            </div>
            <p v-if="showOffer && offer.payMoney !== 0" class="modal-trade__plus pay">
              {{ offer.payMoney }}$ +
            </p>
          </div>

          <div class="modal-trade__slider">
            <p v-if="!showOffer" class="modal-trade__slider-discription">
              Select the item you want to get
            </p>
            <Transition name="slider">
              <Slider
                v-if="showTradeItems && tradePlayerItems.length"
                :cards="tradePlayerItems"
                :trade="true"
                @active="getPlayerItem"
              />
            </Transition>
            <p v-if="!tradePlayerItems.length" class="modal-trade__slider-description">
              {{ playersName === 'Choose player' ? playersName : `${playersName}  has no cards` }}
            </p>
          </div>
        </div>
      </div>

      <Button v-if="!showOffer" :disabled="disabled" class="modal-trade__button" @active="makeOffer"
        >Make offer</Button
      >

      <div v-else class="modal-trade__offer">
        <Button @click="isDisagree" :type="'cansel'">Disagree</Button>
        <Button @click="isAgree">Agree</Button>
      </div>
    </div>
  </section>
</template>

<script setup>
import Button from '../UIComponents/Button.vue'
import { onMounted, ref, watch } from 'vue'
import VerticalSlider from './components/VerticalSlider.vue'
import Slider from './components/Slider.vue'
import SlideItem from './components/SlideItem.vue'

const props = defineProps({
  items: { type: Array, required: true },
  allPlayers: { type: Array, required: false },
  active: { type: Object, required: true }
})
const emit = defineEmits(['close', 'init', 'getItems', 'disagree', 'agree'])

const inputPayMoney = ref(null)
const inputGetMoney = ref(null)

const disabledInputGet = ref(false)
const disabledInputPay = ref(false)

const disabled = ref(true)
const showDropDown = ref(false)
const showTradeItems = ref(false)
const playersName = ref('Choose')

const tradePlayers = ref([])
const tradePlayerItems = ref([])
const activeTradeItems = ref([])

const money = ref(0)

const showOffer = ref(false)
const offer = ref({ getMoney: 0, chooseActiveItems: [], chooseItems: [], payMoney: 0 })

function initActiveItems() {
  activeTradeItems.value = props.items.filter((el) => el.owner === props.active.name)
}

function initTradePlayers() {
  tradePlayers.value = []

  const tradePlayer = { name: '', active: false }
  props.allPlayers.forEach((el) => {
    el.name !== props.active.name
      ? (tradePlayers.value = [...tradePlayers.value, { ...tradePlayer, name: el.name }])
      : ''
  })
}

function initTradeItems() {
  showTradeItems.value = true
  tradePlayerItems.value = JSON.parse(
    JSON.stringify(props.items.filter((el) => el.owner === playersName.value))
  )
}

function getActivePlayerItem() {
  offer.value.chooseActiveItems = activeTradeItems.value.filter((el) => el.sell)
}

function getPlayerItem() {
  offer.value.chooseItems = tradePlayerItems.value.filter((el) => el.sell)
}

function getMoney() {
  if (inputGetMoney.value.value !== '') {
    offer.value.getMoney = Number(inputGetMoney.value.value)
    disabledInputPay.value = true
  } else {
    offer.value.getMoney = 0
    disabledInputGet.value = false
    disabledInputPay.value = false
  }
}

function payMoney() {
  if (inputPayMoney.value.value !== '') {
    offer.value.payMoney = Number(inputPayMoney.value.value)
    disabledInputGet.value = true
  } else {
    offer.value.payMoney = 0
    disabledInputPay.value = false
    disabledInputGet.value = false
  }
}

function isValid() {
  if (
    (offer.value.chooseActiveItems.length > 0 && offer.value.chooseItems.length > 0) ||
    (offer.value.getMoney > 0 && offer.value.chooseItems.length > 0)
  ) {
    offer.value.getMoney <= props.active.money && offer.value.payMoney <= money.value
      ? (disabled.value = false)
      : (disabled.value = true)
  } else {
    disabled.value = true
  }

  console.log(offer.value)
}

function makeOffer() {
  activeTradeItems.value = offer.value.chooseActiveItems
  tradePlayerItems.value = offer.value.chooseItems

  showOffer.value = true
}

function openDropDown() {
  showDropDown.value = !showDropDown.value
  initTradePlayers()
}

function choosePlayersName(index) {
  tradePlayers.value.forEach((el, i) => {
    i === index ? (el.active = true) : (el.active = false)
  })
  playersName.value = tradePlayers.value[index].name
  showDropDown.value = false

  props.allPlayers.forEach((el) => (el.name === playersName.value ? (money.value = el.money) : ''))
  initTradeItems()
}

function closeTrade() {
  emit('close')
  playersName.value = 'Choose'
  activeTradeItems.value.forEach((el) => (el.sell = false))
}

function isDisagree() {
  emit('disagree')
  playersName.value = 'Choose'
  activeTradeItems.value.forEach((el) => (el.sell = false))
}

function isAgree() {
  emit('agree')

  if (offer.value.getMoney > 0) {
    props.allPlayers.forEach((el) => {
      el.name === props.active.name
        ? (el.money = el.money - offer.value.getMoney)
        : el.name === playersName.value
          ? (el.money = el.money + offer.value.getMoney)
          : ''
    })
  }

  if (offer.value.payMoney > 0) {
    props.allPlayers.forEach((el) => {
      el.name === playersName.value
        ? (el.money = el.money - offer.value.payMoney)
        : el.name === props.active.name
          ? (el.money = el.money + offer.value.payMoney)
          : ''
    })
  }

  props.items.forEach((item) => {
    if (offer.value.chooseActiveItems.length > 0) {
      offer.value.chooseActiveItems.forEach((el) => {
        item.id == el.id ? (item.owner = playersName.value) : ''
      })
    }
    offer.value.chooseItems.forEach((el) => {
      item.id == el.id ? (item.owner = props.active.name) : ''
    })
  })
}

watch(offer.value, () => {
  isValid()
})

onMounted(() => {
  initActiveItems()
})
</script>

<style lang="scss" scoped>
.modal-trade {
  width: 100%;
  height: 100%;

  position: absolute;
  z-index: 50;
  top: 0;
  left: 0;

  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(2px);

  &__wrap {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    // max-width: 510px;
    min-height: 240px;
    // min-height: 404px;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;

    background-color: white;
    border-radius: 12px;
    box-shadow: 0px 0px 10px grey;

    padding: 40px;

    transition: all 0.4s ease-in-out;
  }

  &__close {
    cursor: pointer;
    position: absolute;
    z-index: 10;
    right: 10px;
    top: 0;

    & path {
      transition: all 0.4s ease-in-out;
    }

    &:hover path {
      fill: red;
    }
  }

  &__title {
    font-weight: 600;
    color: #2598a7;
  }

  &__header {
    color: black;
    font-size: 14px;
    line-height: 24px;
    font-weight: 700;

    & p {
      font-weight: 700;
    }
  }

  &__header-money {
    color: #008309;
    font-weight: 700;
  }

  &__container {
    display: flex;
    flex-direction: column;

    gap: 16px;
  }

  // &__cards{
  //   width: max-content;
  //   display: flex;
  //   justify-content: center;
  //   gap: 12px;
  // }

  // &__card{
  //   flex: 0 0 75px;
  // }

  &__player {
    // display: flex;
    // flex-direction: row;
    display: grid;
    grid-template-columns: 120px 1fr;
    gap: 20px;
  }

  &__player-content {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  &__plus {
    height: 24px;
    font-size: 24px;
    line-height: 24px;
    // text-align: center;
    color: green;

    &.pay {
      color: #ca5f63;
    }
  }

  &__icon {
    align-self: center;
    width: 44px;
    height: 44px;
    transform: rotate(270deg);
  }

  &__label-wrap {
    display: flex;
    flex-direction: column;

    color: #4c4c4c;

    & input {
      width: 75px;
      height: 44px;
      border-radius: 4px;
      border: 1px solid #a8bda8;

      padding: 6px 8px;

      &:focus-visible {
        outline: none;
        border-color: #125417;
      }
      &.error {
        border-color: red;
      }

      &.disabled {
        cursor: auto;
        pointer-events: none;

        border-color: #646864;
        background-color: #bdbdbd;
      }

      // font-style: 18px;
    }
  }

  &__label {
    font-size: 14px;
    line-height: 24px;
  }

  &__slider {
    background-color: #f7f7f7;
    border-radius: 8px;
    padding: 12px 44px;
  }

  &__slider-discription {
    text-align: center;
  }

  &__header-item {
    position: relative;
    cursor: pointer;

    display: flex;
    align-items: center;

    border-radius: 4px;
    border: 1px inset #6f906f;

    transition: border-color 0.3s ease-in-out;
    // margin: 0 auto;

    &:hover {
      border-color: #125417;
    }
  }

  &__players-name {
    font-weight: 700;
    color: black;
    padding: 4px 8px;
  }

  &__arrow {
    // position: absolute;
    // z-index: 2;
    // top: 10px;
    // right: 13px;

    // border: solid black;
    // border-width: 0 1px 1px 0;

    // padding: 4px;

    // transform: rotate(45deg);
  }

  &__drop-down {
    position: absolute;
    z-index: 10;
    top: -1px;
    left: -1px;

    width: 120px;

    background-color: white;
    border-radius: 4px;
    border: 1px solid #125417;

    overflow: hidden;
  }

  &__drop-down-item {
    cursor: pointer;
    position: relative;
    z-index: 5;

    color: black;
    font-weight: 700;

    padding: 4px 8px;

    // padding: 10px 8px;

    &:first-of-type {
      padding: 10px 8px;
      border-radius: 3px 3px 0 0;
    }

    &:last-of-type {
      border-radius: 0 0 3px 3px;
    }

    &:hover {
      // color: white;
      background-color: #e2e9e2;
    }
  }

  // &__button-wrap {
  //   width: 100%;
  //   // padding: 0 44px;
  // }

  &__button {
    cursor: pointer;

    // max-width: 425px;
    width: 100%;

    font-size: 14px;
    font-weight: 700;
    line-height: 24px;
    color: white;

    background-color: #008309;
    border-radius: 4px;

    padding: 8px 12px;

    &.go {
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

  &__offer {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 4px;

    // padding: 0 44px;
  }
}

.drop-down-enter-from {
  height: 44px;
}
.drop-down-enter-to {
  height: 97px;
  transition: all 0.3s ease-in-out;
}
.drop-down-leave-to {
  height: 44px;
  opacity: 0;
  transition: all 0.3s ease-in-out;
}

.slider-enter-from {
  height: 28px;
  overflow: hidden;
}
.slider-enter-to {
  height: 145px;
  overflow: hidden;
  transition: height 0.3s ease-in-out;
}

.slider-leave-from {
  height: 121px;
}
.slider-leave-to {
  height: 0px;
  overflow: hidden;
  transition: height 0.3s ease-in-out;
}
</style>
