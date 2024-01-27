<template>
  <section v-if="adminShow" class="admin">
    <div class="admin__wrap">
      <h2 class="admin__title">Welcome to custom Monopoly</h2>

      <div class="admin__header">
        <p class="admin__players">Choose Players number :</p>
        <div class="admin__header-item">
          <p class="admin__players-number" @click="openDropDown">
            {{ playersNumber }}
            <span class="admin__arrow"></span>
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
          :players="dataPlayers"
          :data="initInputs"
          :tokens="tokens"
          
        />
      </div>

      <button class="admin__button" @click="isValid">Start Game</button>
    </div>
  </section>
  <Board v-else :data="dataPlayers" />
</template>

<script setup>
import Board from '../board/Board.vue'
import { onMounted, ref, watch } from 'vue'
import InputPlayer from './components/InputPlayer.vue'


const dataPlayers = ref([])
const activeButton = ref(false)

const adminShow = ref(true)

const players = ref([
  { value: 2, active: true },
  { value: 3, active: false },
  { value: 4, active: false }
])

const tokens = ref([
  { active: false, label: '', name: 'square' },
  { active: false, label: '', name: 'circle' },
  { active: false, label: '', name: 'triangle' },
  { active: false, label: '', name: 'pacman' },
  { active: false, label: '', name: 'yin-yang' },
  { active: false, label: '', name: 'burst-8' },
  { active: false, label: '', name: 'heart' }
])

const initInputs = ref([
  { name: null, color: '#F70000', active: false, label: '', token: '' },
  { name: null, color: '#00DDEB', active: false, label: '', token: '' },
  { name: null, color: '#00CC08', active: false, label: '', token: '' },
  { name: null, color: '#A300CC', active: false, label: '', token: '' }
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
  dataPlayers.value = []

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

  for (let index = 0; index < playersNumber.value; index++) {
    dataPlayers.value = [...dataPlayers.value, { ...player, id: index + 1 }]
  }
}

function isValid() {
  dataPlayers.value.forEach((item) => {
    initInputs.value.forEach((el) => {
      if (el.label === item.id) {
        item.color = el.color
        item.name = el.name
        item.img = el.token
      }
    })
  })

  adminShow.value = false
}


watch( playersNumber, () => {
  initPlayers()
})

onMounted(() => {
  initPlayers()
})

</script>

<style lang="scss" scoped>
.admin {
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  &__wrap {
    max-width: 850px;
    width: 100%;

    display: flex;
    flex-direction: column;

    gap: 16px;

    border-radius: 6px;
    border: 1px solid grey;

    padding: 24px;
  }

  &__title {
    font-size: 26px;
    font-weight: 600;
    line-height: 36px;
    text-align: center;
  }

  &__header {
    display: flex;
    align-items: center;

    gap: 8px;
  }

  &__players {
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.5px;
  }

  &__header-item {
    position: relative;
    width: 50px;
  }

  &__players-number {
    position: relative;
    cursor: pointer;

    border-radius: 4px;
    border: 1px solid #d1d1d1;

    padding: 4px 8px;

    transition: border-color 0.3s ease-in-out;
  }

  &__arrow {
    position: absolute;
    z-index: 2;
    top: 10px;
    right: 6px;

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

  &__players-wrap{
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
    gap: 24px;
  }

  &__button {
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
