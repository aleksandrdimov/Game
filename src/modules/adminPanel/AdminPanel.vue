<template>
  <section v-if="adminShow" class="admin">
    <div class="admin__wrap">
      <h2 class="admin__title">Welcome to custom Monopoly</h2>

      <div class="admin__header">
        <p class="admin__players">Select the number of players</p>
        <div class="admin__header-item">
          <p class="admin__players-number" @click="openDropDown">
            {{ playersNumber }}
            <img class="admin__arrow" src="/images/arrow_slider.svg" alt="arrow" />
          </p>
          <Transition name="drop-down">
            <div v-if="showDropDown" class="admin__drop-down">
              <p
                v-for="(item, index) in players"
                :key="index"
                class="admin__drop-down-item"
                @click="choosePlayersNumber(index)"
              >
                {{ item.value }}
              </p>
            </div>
          </Transition>
        </div>
      </div>
      <div class="admin__players-wrap">
        <InputPlayer
          v-for="player in dataPlayers"
          :key="player.id"
          :player="player"
          :data="initInputs"
          :tokens="tokens"
        />
      </div>

      <button class="admin__button" :disabled="!activeButton" @click="startGame">Start</button>
    </div>
  </section>
  <Board v-else :data="dataPlayers" />
</template>

<script setup>
import Board from '../board/Board.vue'
import { onBeforeUpdate, onMounted, onUpdated, ref, watch } from 'vue'
import InputPlayer from './components/InputPlayer.vue'

const dataPlayers = ref([])
const activeButton = ref(false)

const adminShow = ref(false)

const players = ref([
  { value: 2, active: true },
  { value: 3, active: false },
  { value: 4, active: false }
])

const tokens = ref([
  { active: false, label: null, name: 'square' },
  { active: false, label: null, name: 'circle' },
  // { active: false, label: null, name: 'triangle' },
  { active: false, label: null, name: 'pacman' },
  // { active: false, label: null, name: 'yin-yang' },
  // { active: false, label: null, name: 'burst-8' },
  { active: false, label: null, name: 'heart' }
])

const initInputs = ref([
  { name: null, color: '#F70000', active: false, label: null, token: null },
  { name: null, color: '#00DDEB', active: false, label: null, token: null },
  { name: null, color: '#00CC08', active: false, label: null, token: null },
  { name: null, color: '#A300CC', active: false, label: null, token: null }
  // { name: null, color: '#100CFD', active: false, label: null, token: null },
  // { name: null, color: '#DDDD00', active: false, label: null, token: null },
  // { name: null, color: '#FF9900', active: false, label: null, token: null }
])
const playersNumber = ref(2)
const showDropDown = ref(false)

function openDropDown() {
  showDropDown.value = !showDropDown.value
}

function choosePlayersNumber(index) {
  players.value.forEach((el, i) => {
    i === index ? (el.active = true) : (el.active = false)
  })
  playersNumber.value = players.value[index].value
  showDropDown.value = false
}

function initPlayers() {
  const player = {
    id: null,
    name: null,
    color: null,
    img: null,
    money: 1500,
    row: '11/12',
    column: '11/12',
    positionStart: 0,
    positionGoTo: 0,
    direction: 'main',
    active: false,
    details: false,
    skipMove: false,
    status: null,
    doubleMove: 0
  }

  if (dataPlayers.value.length !== playersNumber.value) {
    if (playersNumber.value > dataPlayers.value.length) {
      const iterationNumber = playersNumber.value - dataPlayers.value.length
      for (let index = 0; index < iterationNumber; index++) {
        dataPlayers.value = [...dataPlayers.value, { ...player, id: playersNumber.value - index }]
      }
      dataPlayers.value.sort((a, b) => a.id - b.id)
    } else {
      const iterationNumber = dataPlayers.value.length - playersNumber.value
      dataPlayers.value.splice(dataPlayers.value.length - iterationNumber, dataPlayers.value.length)
    }

    isValid()
  }
}

function startGame() {
  dataPlayers.value.forEach((el) => {
    if (el.name === '') return (el.name = `Player ${el.id}`)
  })

  adminShow.value = false
}

function isValid() {
  let result = 0
  dataPlayers.value.forEach((el) => {
    el.img !== null && el.name !== null && el.color !== null ? result++ : ''
  })
  result === playersNumber.value ? (activeButton.value = true) : (activeButton.value = false)
}

watch(initInputs.value, () => {
  isValid()
})

onMounted(() => {
  initPlayers()
})

onBeforeUpdate(() => {
  initPlayers()
})
</script>

<style lang="scss" scoped>
.admin {
  width: 100vw;
  height: 100vh;
  // height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 24px;

  &__wrap {
    max-width: 1100px;
    // width: 100%;

    display: flex;
    flex-direction: column;

    gap: 24px;

    border-radius: 6px;
    background-color: #eef2ee;
    // border: 1px solid grey;

    padding: 40px;
  }

  &__title {
    font-size: 32px;
    font-weight: 700;
    line-height: 36px;
    text-align: center;
    color: black;
  }

  &__header {
    display: flex;
    flex-direction: column;
    align-items: center;

    gap: 4px;
  }

  &__players {
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.5px;
  }

  &__header-item {
    position: relative;
    width: 100px;
  }

  &__players-number {
    cursor: pointer;
    position: relative;

    font-size: 20px;
    font-weight: 700;
    line-height: 24px;

    border-radius: 4px;
    border: 2px solid #6f906f;

    padding: 10px 26px;

    transition: border-color 0.3s ease-in-out;

    &:hover{
      border-color: #125417;
    }
  }

  &__arrow {
    position: absolute;
    z-index: 2;
    top: 0;
    right: 0;

    transform: rotate(-90deg);
  }

  &__drop-down {
    position: absolute;
    z-index: 10;
    top: 0px;
    left: 0px;

    width: 100%;

    background-color: white;
    border-radius: 4px;
    border: 2px solid #125417;

    overflow: hidden;
  }

  &__drop-down-item {
    cursor: pointer;
    position: relative;
    z-index: 5;

    font-size: 20px;
    font-weight: 700;
    line-height: 24px;
    color: black;

    padding: 10px 26px;

    &:first-of-type {
      padding: 10px 26px;
      border-radius: 3px 3px 0 0;
    }

    &:last-of-type {
      border-radius: 0 0 3px 3px;
    }

    &:hover {
      background-color: #E2E9E2;
    }
  }

  &__players-wrap {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;

    gap: 20px;
  }

  &__button {
    cursor: pointer;
    width: 200px;

    font-size: 14px;
    font-weight: 700;
    line-height: 24px;
    color: white;

    background-color: #008309;
    border-radius: 6px;

    padding: 8px 12px;
    margin: auto;

    &:disabled {
      cursor: auto;

      color: white;
      background-color: #646864;
    }
  }
}

.drop-down-enter-from {
  height: 44px;
}
.drop-down-enter-to {
  height: 136px;
  transition: all 0.3s ease-in-out;
}

.drop-down-leave-from {
  height: 136px;
}
.drop-down-leave-to {
  height: 44px;
  transition: all 0.2s ease-in-out;
}
</style>
