<template>
  <section class="modal-trade">
    <div class="modal-trade__wrap">
      <IconClose v-if="!showOffer" @click="closeTrade"/>
    
      <h3 class="modal-trade__title">{{ !showOffer ? 'Trade' : 'Offer' }}</h3>

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
                  v-if="tradePlayers.length > 1"
                  class="modal-trade__arrow"
                  src="/images/double_arrow.svg"
                  alt="arrow"
                  @click="openDropDown"
                />
                <Transition name="drop-down">
                  <div
                    v-if="showDropDown && tradePlayers.length > 1"
                    class="modal-trade__drop-down"
                    :style="{ '--height-drop-down': heightDropDown }"
                  >
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
            <p v-if="!showOffer" class="modal-trade__slider-description">
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
            <p
              v-if="!tradePlayerItems.length && playersName !== 'Choose'"
              class="modal-trade__slider-description"
            >
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
import IconClose from '../UIComponents/IconClose.vue'
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
const emit = defineEmits(['close', 'init', 'getItems', 'disabled'])

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
const heightDropDown = ref(`0px`)

const showOffer = ref(false)
const offer = ref({ getMoney: 0, chooseActiveItems: [], chooseItems: [], payMoney: 0 })

function initActiveItems() {
  activeTradeItems.value = props.items.filter((el) => el.owner === props.active.name)

  initTradePlayers()
  tradePlayers.value.length === 1 ? (playersName.value = tradePlayers.value[0].name) : ''
  // choosePlayersName()
  initTradeItems()

  props.allPlayers.forEach((el) => (el.name === playersName.value ? (money.value = el.money) : ''))
  heightDropDown.value= `${46+32*tradePlayers.length-1}px`
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
  emit('disabled')
  playersName.value = 'Choose'
  activeTradeItems.value.forEach((el) => (el.sell = false))
}

function isAgree() {
  emit('disabled')

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

  activeTradeItems.value.forEach((el) => (el.sell = false))
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
    grid-template-columns: 130px 1fr;
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

  &__slider-description {
    text-align: center;
  }

  &__header-item {
    position: relative;
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: space-between;

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

  &__drop-down {
    position: absolute;
    z-index: 10;
    top: -1px;
    left: -1px;

    width: 130px;

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
  height: 46px;
}
.drop-down-enter-to {
  height: v-bind(heightDropDown);
  transition: all 0.3s ease-in-out;
}

.drop-down-leave-to {
  height: v-bind(heightDropDown);
}

.drop-down-leave-to {
  height: 46px;
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
