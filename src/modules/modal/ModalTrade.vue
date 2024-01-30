<template>
  <section class="modal-trade">
    <div class="modal-trade__wrap">
      <svg
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
      <h3 class="modal-trade__title">Trade</h3>

      <div class="modal-trade__container">
        <div class="modal-trade__column">
          <h3 class="modal-trade__player">{{active.name}}</h3>
          <div class="modal-trade__slider">
            <VerticalSlider :cards="activeTradeItems" :trade="true" />
          </div>
          <p class="modal-trade__plus">+</p>
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

        <div class="modal-trade__column">
          <div class="modal-trade__header-item">
            <p class="modal-trade__players-number" @click="openDropDown">
                {{ playersName }}
              <span class="modal-trade__arrow"></span>
            </p>
            <Transition name="drop-down">
              <div v-if="showDropDown" class="modal-trade__drop-down">
                <p
                  v-for="(item, index) in tradePlayers"
                  :key="index"
                  class="modal-trade__drop-down-item"
                  @click="chooseplayersName(index)"
                >
                  {{ item.name }}
                </p>
              </div>
            </Transition>
          </div>
          <div class="modal-trade__slider">
            <VerticalSlider v-if="showTradeItems&&tradePlayerItems.length" :cards="tradePlayerItems" :trade="true" />
            <p class="modal-trade__slider-description" v-else>{{playersName==='Choose player'? playersName: `${playersName}  has no cards`}}</p>
          </div>
        </div>
      </div>
      <label class="modal-trade__label">
        Add money:
        <input type="text" />
      </label>
      <button :disabled="true" class="modal-trade__button">Make offer</button>
    </div>
  </section>
</template>

<script setup>
import { onBeforeUpdate, onMounted, ref } from 'vue'
import VerticalSlider from './components/VerticalSlider.vue'

const props = defineProps({
  items: { type: Array, required: true },
  allPlayers: { type: Array, required: false },
  active: { type: Object, required: true },
})
const emit = defineEmits(['close','init','getItems'])

const showDropDown = ref(false)
const showTradeItems=ref(false)
const playersName = ref('Choose player')

// const players = ref([
//   { value: 'Player 2', active: false },
//   { value: 'Player 3', active: false },
//   { value: 'Player 4', active: false }
// ])

const tradePlayers=ref([])
const tradePlayerItems=ref([])
const activeTradeItems=ref([])

function initActiveItems(){
  activeTradeItems.value=props.items.filter(el=>el.owner===props.active.name)
}

function initTradePlayers() {
  tradePlayers.value = []

  const tradePlayer = { name: '', active: false }
  props.allPlayers.forEach((el) => {
    el.name !== props.active.name
      ? (tradePlayers.value = [...tradePlayers.value, { ...tradePlayer, name: el.name }])
      : ''
  })
  // tradePlayers.value=props.allPlayers.filter(el=>el.name!== props.active.name)
}

function initTradeItems(){
  showTradeItems.value=true
  tradePlayerItems.value=props.items.filter(el=>el.owner===playersName.value)
}

function openDropDown() {
  showDropDown.value = !showDropDown.value
  initTradePlayers()
}

function chooseplayersName(index) {
  showTradeItems.value=false
  tradePlayers.value.forEach((el, i) => {
    i === index ? (el.active = true) : (el.active = false)
  })
  playersName.value = tradePlayers.value[index].name
  showDropDown.value = false

  setTimeout(()=>{
    initTradeItems()
  },50)
}

function closeTrade() {
  emit('close')
  playersName.value='Choose player'
}

onMounted(()=>{
  initActiveItems()
})

</script>

<style lang="scss" scoped>
.modal-trade {
  width: 100%;
  height: 100%;

  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;

  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(2px);

  &__wrap {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    width: 510px;
    min-height: 240px;
    // min-height: 404px;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    // padding: 0px 5px;

    background-color: white;
    border-radius: 12px;
    box-shadow: 0px 0px 10px grey;

    padding: 12px 0px;

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
    color: #d50000;
    text-transform: uppercase;
  }

  &__container {
    // width: 100%;

    display: grid;
    grid-template-columns: 1fr 44px 1fr;
    // justify-items: space-between;
    // align-items: center;
    gap: 24px;
    // padding: 44px 24px;
  }

  &__icon {
    align-self: center;
  }

  &__plus{
    // display: inline-block;
    height: 36px;
    font-size: 36px;
    line-height: 36px;
    text-align: center;
    color: green;
    // margin: auto 0;
  }

  &__slider {
    padding: 44px 0;
  }

  &__player {
    text-transform: capitalize;
    text-align: center;
    font-weight: 600;
    font-size: 20px;
    line-height: 34px;
    letter-spacing: 0.5px;
    color: black;
  }

  &__label {
    color: black;
    padding: 0px 44px;
    margin: 0 auto 0 0;

    & input {
      width: 50px;
      border-radius: 4px;
      border: 1px solid black;
      padding: 6px 8px;

      // font-style: 18px;
    }
  }

  &__button {
    cursor: pointer;
    max-width: 425px;
    width: 100%;

    font-size: 14px;
    font-weight: 700;
    line-height: 24px;
    color: white;

    background-color: #008309;
    border-radius: 4px;

    padding: 8px 12px;
    margin: 0 44px;

    &:disabled {
      cursor: auto;

      color: white;
      background-color: #646864;
    }
  }

  &__header-item {
    position: relative;
    max-width: 162px;
    width: 100%;
  }

  &__players-number {
    position: relative;
    cursor: pointer;

    font-weight: 600;
    color: black;

    border-radius: 4px;
    border: 1px solid #d1d1d1;

    padding: 4px 8px;

    transition: border-color 0.3s ease-in-out;
  }

  &__arrow {
    position: absolute;
    z-index: 2;
    top: 10px;
    right:13px;

    border: solid black;
    border-width: 0 1px 1px 0;

    padding: 4px;

    transform: rotate(45deg);
  }

  &__drop-down {
    position: absolute;
    z-index: 10;
    top: 0px;
    left: 0px;

    width: 100%;
  

    background-color: white;
    border-radius: 4px;
    border: 1px solid #d1d1d1;

    overflow: hidden;
  }

  &__drop-down-item {
    cursor: pointer;
    position: relative;
    z-index: 5;

    color: black;
    padding: 4px 8px;

    &:first-of-type {
      padding: 4px 8px;
      border-radius: 3px 3px 0 0;
    }

    &:last-of-type {
      border-radius: 0 0 3px 3px;
    }

    &:hover {
      color: white;
      background-color: #222429;
    }
  }

  &__slider-description{
    max-width: 162px;
    width: 100%;
  }
}


.drop-down-enter-from {
  height: 34px;
}
.drop-down-enter-to {
  height: 97px;
  transition: all 0.3s ease-in-out;
}
.drop-down-leave-to {
  height: 34px;
  opacity: 0;
  transition: all 0.3s ease-in-out;
}
</style>
