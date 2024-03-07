<template>
  <section class="board">
    <div class="board__wrap">
      <BoardItem
        v-for="(item, index) in dataItem"
        :key="index"
        :players="players"
        class="cell"
        :item="item"
        :active-player="players[playerActiveIndex]"
        :class="`board__item-${index}`"
        :items-choose="itemsChoose"
      />
      <PlayerToken v-for="player in players" :key="player.id" :player="player"></PlayerToken>

      <div class="board__dice-wrap">
        <BoardDice :dice="dice1" :roll="rollAnim" />
        <BoardDice :dice="dice2" :roll="rollAnim" />
      </div>
      <div class="board__rules-wrap" @click="toggleRules">
        <p class="board__rules-icon">!</p>
        <p class="board__rules-text">Rules</p>
      </div>
      <TransitionGroup name="button-roll">
        <button v-if="buttonRoll" class="board__button" @click="rollDice">Roll Dice</button>
        <button v-else class="board__button finished" @click="finishedRound">Finished Round</button>
      </TransitionGroup>

      <TransitionGroup name="card">
        <ModalCard
          v-if="showChoose && itemsChoose[0].type !== 'corner'"
          :items="itemsChoose"
          :player="players[playerActiveIndex]"
          @close="closeModal"
          @choose="isChooseCard"
          @buy="buyCard"
          @surprise="getSurprise"
        />

        <ModalError
          v-if="enoughMoney"
          @trade="getTradeItems"
          @bankrupt="isGameOver"
          @close="closeError"
          @sell="getSell"
          :player="players[playerActiveIndex]"
          :items="itemsChoose"
          :card-item="cardItem"
        />

        <ModalSurprise v-if="surpriseItem !== null" :item="surpriseItem" @button="performAction" />
        <ModalJail v-if="jail" @pay="payMoney" @skip="skipMove" />
        <ModalTeleport v-if="teleport" :player="players[playerActiveIndex]" />
        <ModalTradeBank
          v-if="tradeBank"
          :cards="tradeItems"
          :player="players[playerActiveIndex]"
          :need-money="needMoney"
          :sell="sell"
          @close="closeTradeBank"
          @bankrupt="isBankrupt"
        />
        <ModalWinner v-if="winner" :player="winnerPlayer" />
        <svg
          v-if="itemsChoose.length > 1"
          class="direction-arrow__gorizontal"
          :class="{ top: directionTop }"
          xmlns="http://www.w3.org/2000/svg"
          width="82"
          height="18"
          viewBox="0 0 82 18"
          fill="none"
        >
          <path
            d="M0 9L15 17.6603V0.339746L0 9ZM80 10.5C80.8284 10.5 81.5 9.82843 81.5 9C81.5 8.17157 80.8284 7.5 80 7.5V10.5ZM13.5 10.5H80V7.5H13.5V10.5Z"
            fill="#0A6F7D"
          />
        </svg>
        <svg
          v-if="itemsChoose.length > 1"
          class="direction-arrow__vertical"
          :class="{ top: directionTop }"
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="82"
          viewBox="0 0 18 82"
          fill="none"
        >
          <path
            d="M7.5 80C7.5 80.8284 8.17157 81.5 9 81.5C9.82843 81.5 10.5 80.8284 10.5 80H7.5ZM9 0L0.339746 15H17.6603L9 0ZM10.5 80L10.5 13.5H7.5L7.5 80H10.5Z"
            fill="#0A6F7D"
          />
        </svg>
      </TransitionGroup>
    </div>

    <Players
      class="board__players"
      :class="{ disabled: disabled }"
      :players="players"
      :groups="sortGroupItems"
      :upgradeItems="upgradeItems"
      :active="players[playerActiveIndex]"
      :items="dataItem"
      @open="openDetails"
      @upgrade="isUpgrade"
    />

    <Transition name="card">
      <ModalRules v-if="rules" @close="toggleRules" />
    </Transition>
  </section>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import BoardDice from './components/BoardDice.vue'
import BoardItem from './components/BoardItem.vue'
import ModalCard from '../modal/ModalCard.vue'
import ModalError from '../modal/ModalError.vue'
import ModalJail from '../modal/ModalJail.vue'
import ModalTeleport from '../modal/ModalTeleport.vue'
import ModalSurprise from '../modal/ModalSurprise.vue'
import ModalTradeBank from '../modal/ModalTradeBank.vue'
import ModalWinner from '../modal/ModalWinner.vue'
import ModalRules from '../modal/ModalRules.vue'
import Players from '../player/Players.vue'
import PlayerToken from '../player/components/PlayerToken.vue'
import { surprise } from '../../data/surprise'
import { cards } from '../../data/cards'

const props = defineProps({ data: { type: Array, required: true } })

const dataItem = ref(cards)

// const players = ref([
//   {
//     id: 1,
//     name: 'Player 1',
//     money: 5,
//     color: '#F70000',
//     img: 'pacman',
//     row: '11/12',
//     column: '11/12',
//     positionStart: 0,
//     positionGoTo: 0,
//     direction: 'main',
//     active: true,
//     details: true,
//     skipMove: false,
//     status: null,
//     doubleMove: 0
//   },
//   {
//     id: 2,
//     name: 'Player 2',
//     money: 1500,
//     color: '#00DDEB',
//     img: 'burst-8',
//     row: '11/12',
//     column: '11/12',
//     positionStart: 0,
//     positionGoTo: 0,
//     direction: 'main',
//     active: false,
//     details: false,
//     skipMove: false,
//     status: null,
//     doubleMove: 0
//   }
//   // {
//   //   id: 3,
//   //   name: 'Player 3',
//   //   money: 1500,
//   //   color: '#00CC08',
//   //   img: 'yin-yang',
//   //   row: '11/12',
//   //   column: '11/12',
//   //   positionStart: 0,
//   //   positionGoTo: 0,
//   //   direction: 'main',
//   //   active: false,
//   //   details: false,
//   //   skipMove: false,
//   //   status: null,
//   //   doubleMove: 0
//   // },
//   // {
//   //   id: 4,
//   //   name: 'Player 4',
//   //   money: 1500,
//   //   color: '#A300CC',
//   //   img: 'heart',
//   //   row: '11/12',
//   //   column: '11/12',
//   //   positionStart: 0,
//   //   positionGoTo: 0,
//   //   direction: 'main',
//   //   active: false,
//   //   details: false,
//   //   skipMove: false,
//   //   status: null,
//   //   doubleMove: 0
//   // }
// ])

const players = ref(props.data)

const rollAnim = ref(false)
const buttonRoll = ref(true)
const enoughMoney = ref(false)
const jail = ref(false)
const teleport = ref(false)
const directionTop = ref(false)
const tradeBank = ref(false)

const playerActiveIndex = ref(0)
const dice1 = ref(0)
const dice2 = ref(0)

const needMoney = ref(0)

const itemsChoose = ref([])
const showChoose = ref(false)

const sortGroupItems = ref([])
const tradeItems = ref([])
const upgradeItems = ref([])
const surpriseItem = ref(null)
const cardItem = ref()
const disabled = ref(false)
const winner = ref(false)
const winnerPlayer = ref()
const rules = ref(false)
const sell = ref(false)

function rollDice() {
  rollAnim.value = true
  directionTop.value = false
  disabled.value = true

  dice1.value = Math.floor(Math.random() * 6) + 1
  dice2.value = Math.floor(Math.random() * 6) + 1
  const total = dice1.value + dice2.value

  setTimeout(() => {
    rollAnim.value = false
    players.value[playerActiveIndex.value].positionStart =
      players.value[playerActiveIndex.value].positionGoTo

    if (players.value[playerActiveIndex.value].positionGoTo + total >= 40) {
      players.value[playerActiveIndex.value].positionGoTo =
        players.value[playerActiveIndex.value].positionGoTo + total - 40

      players.value[playerActiveIndex.value].money =
        players.value[playerActiveIndex.value].money + 200
    } else {
      players.value[playerActiveIndex.value].positionGoTo =
        players.value[playerActiveIndex.value].positionGoTo + total
    }

    if (dice1.value === dice2.value) {
      players.value[playerActiveIndex.value].doubleMove++
      if (players.value[playerActiveIndex.value].doubleMove !== 2) {
        buttonRoll.value = true
        filterItem()

        showChoose.value = true
      } else {
        goToJail()
        isJail()
      }
    } else {
      buttonRoll.value = false
      players.value[playerActiveIndex.value].finishedRound = true
      showChoose.value = true
      filterItem()
    }
  }, 1500)
}

function finishedRound() {
  playerActiveIndex.value < players.value.length - 1
    ? playerActiveIndex.value++
    : (playerActiveIndex.value = 0)

  players.value[playerActiveIndex.value].doubleMove = 0

  if (!players.value[playerActiveIndex.value].status) {
    players.value[playerActiveIndex.value].skipMove
      ? (buttonRoll.value = false)
      : (buttonRoll.value = true)

    players.value[playerActiveIndex.value].skipMove = false
  } else {
    playerActiveIndex.value < players.value.length - 1
      ? playerActiveIndex.value++
      : (playerActiveIndex.value = 0)
    buttonRoll.value = true
  }
  players.value.forEach((el) => {
    el.id === playerActiveIndex.value + 1 ? (el.active = true) : (el.active = false)
    el.id === playerActiveIndex.value + 1 ? (el.details = true) : (el.details = false)
    el.finishedRound = false
  })
}

function checkItemValue(el, array) {
  const checkItem = (x) => x.items[0].color === el.color
  const resultIndex = array.findIndex(checkItem)

  resultIndex >= 0 ? array[resultIndex].items.push(el) : ''
}

function sortItems() {
  sortGroupItems.value = []
  const array = dataItem.value.filter((el) => el.color !== null)

  array.forEach((el) => {
    const newItem = {
      items: [{ ...el }]
    }

    const result = sortGroupItems.value.find((item) => item.items[0].color == el.color)

    result
      ? checkItemValue(el, sortGroupItems.value)
      : (sortGroupItems.value = [...sortGroupItems.value, { ...newItem }])
  })

  sortGroupItems.value.sort((a, b) => a.items.length - b.items.length)
}

function goTo() {
  if (itemsChoose.value[0].type === 'start') {
    showChoose.value = false
    disabled.value = false
  }

  itemsChoose.value[0].type === 'corner' ? (disabled.value = false) : ''
  // showChoose.value=true
  itemsChoose.value[0].type === 'jail' ? isJail() : ''
  players.value[playerActiveIndex.value].row = itemsChoose.value[0].row
  players.value[playerActiveIndex.value].column = itemsChoose.value[0].column
  players.value[playerActiveIndex.value].direction = itemsChoose.value[0].direction

  if (itemsChoose.value[0].type === 'police') {
    goToJail()
    isJail()
  }

  if (itemsChoose.value[0].type === 'go') {
    showChoose.value = false
    disabled.value = false

    setTimeout(() => {
      goToCasino()
    }, 300)
  }

  isTeleport()
}

function filterItem() {
  itemsChoose.value = dataItem.value.filter(
    (el) => el.count == players.value[playerActiveIndex.value].positionGoTo
  )

  if (itemsChoose.value.length > 1) {
    if (
      (players.value[playerActiveIndex.value].positionStart > 5 &&
        players.value[playerActiveIndex.value].positionStart < 14) ||
      (players.value[playerActiveIndex.value].positionStart > 25 &&
        players.value[playerActiveIndex.value].positionStart < 34)
    ) {
      itemsChoose.value = itemsChoose.value.filter(
        (el) => el.direction === players.value[playerActiveIndex.value].direction
      )

      goTo()
    }

    if (
      players.value[playerActiveIndex.value].positionStart >= 15 &&
      players.value[playerActiveIndex.value].positionStart <= 26
    ) {
      directionTop.value = true
    }
  } else {
    goTo()
  }
}

function getCardById(id) {
  itemsChoose.value = dataItem.value.filter((el) => el.id === id)
  showChoose.value = true
  disabled.value = true
}

function isJail() {
  showChoose.value = false
  disabled.value = true

  jail.value = true
}

function goToJail() {
  players.value[playerActiveIndex.value].row = '11/12'
  players.value[playerActiveIndex.value].column = '1/2'
  players.value[playerActiveIndex.value].direction = 'main'
  players.value[playerActiveIndex.value].positionGoTo = 10
}

function isTeleport() {
  if (itemsChoose.value[0].type === 'teleport') {
    showChoose.value = false
    teleport.value = true

    setTimeout(() => {
      if (itemsChoose.value[0].id === 21) {
        players.value[playerActiveIndex.value].row = '7/8'
        players.value[playerActiveIndex.value].column = '6/7'
        players.value[playerActiveIndex.value].positionGoTo = 9
      } else {
        players.value[playerActiveIndex.value].row = '5/6'
        players.value[playerActiveIndex.value].column = '6/7'
        players.value[playerActiveIndex.value].positionGoTo = 29
      }
    }, 2300)
    players.value[playerActiveIndex.value].direction = 'branch'

    setTimeout(() => {
      teleport.value = false
      disabled.value = false
    }, 2000)
  }
}

function goToCasino() {
  players.value[playerActiveIndex.value].row = '9/10'
  players.value[playerActiveIndex.value].column = '11/12'
  players.value[playerActiveIndex.value].direction = 'main'
  players.value[playerActiveIndex.value].positionGoTo = 38

  getCardById(42)
}

function closeModal() {
  showChoose.value = !showChoose.value
  disabled.value = false
}

function isChooseCard(data) {
  itemsChoose.value = dataItem.value.filter((el) => el.id === data)

  showChoose.value = false
  disabled.value = false
  goTo()
}

function buyCard(data) {
  let item = players.value[playerActiveIndex.value]
  if (dataItem.value[data - 1].owner === null) {
    if (players.value[playerActiveIndex.value].money >= dataItem.value[data - 1].price) {
      players.value[playerActiveIndex.value] = {
        ...item,
        money: item.money - dataItem.value[data - 1].price
      }
      dataItem.value[data - 1] = { ...dataItem.value[data - 1], owner: item.name }

      isChooseCard(data)
      sortItems()
    } else {
      showChoose.value = false
      enoughMoney.value = true
      needMoney.value =
        dataItem.value[data - 1].price - players.value[playerActiveIndex.value].money

      cardItem.value = dataItem.value[data - 1]
    }
  } else {
    if (players.value[playerActiveIndex.value].money >= dataItem.value[data - 1].rent) {
      players.value[playerActiveIndex.value] = {
        ...item,
        money: item.money - dataItem.value[data - 1].rent
      }

      players.value.forEach((el, index) => {
        if (el.name === dataItem.value[data - 1].owner) {
          players.value[index] = {
            ...players.value[index],
            money: players.value[index].money + dataItem.value[data - 1].rent
          }
        }
      })

      isChooseCard(data)
      sortItems()
    } else {
      showChoose.value = false
      enoughMoney.value = true
      needMoney.value = dataItem.value[data - 1].rent - players.value[playerActiveIndex.value].money
      cardItem.value = dataItem.value[data - 1]
    }
  }
}

function openDetails(data) {
  players.value.forEach((el) => {
    if (el.id === data) {
      players.value[data - 1].details ? (el.details = false) : (el.details = true)
    } else {
      el.details = false
    }
  })
}

function payMoney() {
  if (players.value[playerActiveIndex.value].money - 150 >= 0) {
    players.value[playerActiveIndex.value].money =
      players.value[playerActiveIndex.value].money - 150

    jail.value = false
    buttonRoll.value = false
    showChoose.value = false
    disabled.value = false
  } else {
    jail.value = false
    enoughMoney.value = true
    disabled.value = true
    cardItem.value = { owner: null }
  }
}

function skipMove() {
  players.value[playerActiveIndex.value].skipMove = true
  jail.value = false
  disabled.value = false
  buttonRoll.value = false
}

function getSurprise(data) {
  surpriseItem.value = null
  showChoose.value = false
  const random = Math.floor(Math.random() * 24)

  surpriseItem.value = surprise[random]

  itemsChoose.value = dataItem.value.filter((el) => el.id === data)
  goTo()
}

function performAction() {
  let money = 0
  if (surpriseItem.value.type === 'profitable') {
    if (surpriseItem.value.id === 7) {
      money =
        dataItem.value.filter((el) => el.owner === players.value[playerActiveIndex.value].name)
          .length * 35

      players.value[playerActiveIndex.value].money =
        players.value[playerActiveIndex.value].money + money
    } else {
      players.value[playerActiveIndex.value].money =
        players.value[playerActiveIndex.value].money + surpriseItem.value.getMoney
    }
    disabled.value = false
  }

  if (surpriseItem.value.type === 'unprofitable') {
    if (surpriseItem.value.id === 13) {
      const result = dataItem.value.filter(
        (el) => el.owner === players.value[playerActiveIndex.value].name
      )

      result.forEach((el) => {
        return (money = money + el.upgrade)
      })

      money = money * 50

      if (players.value[playerActiveIndex.value].money - money < 0) {
        enoughMoney.value = true
        cardItem.value = { owner: 'Owner' }
      } else {
        players.value[playerActiveIndex.value].money =
          players.value[playerActiveIndex.value].money - money
        disabled.value = false
      }
    } else {
      if (players.value[playerActiveIndex.value].money - surpriseItem.value.payMoney < 0) {
        enoughMoney.value = true
        cardItem.value = { owner: 'Owner' }
      } else {
        players.value[playerActiveIndex.value].money =
          players.value[playerActiveIndex.value].money - surpriseItem.value.payMoney
        disabled.value = false
      }
    }
  }

  if (surpriseItem.value.type === 'go') {
    if (typeof surpriseItem.value.goTo === 'number') {
      players.value[playerActiveIndex.value].positionGoTo =
        players.value[playerActiveIndex.value].positionGoTo + surpriseItem.value.goTo
      showChoose.value = true

      filterItem()
    } else {
      players.value[playerActiveIndex.value].positionGoTo = Number(surpriseItem.value.goTo.count)
      players.value[playerActiveIndex.value].row = surpriseItem.value.goTo.row
      players.value[playerActiveIndex.value].column = surpriseItem.value.goTo.column
      players.value[playerActiveIndex.value].direction = 'main'
      if (surpriseItem.value.id === 17) {
        showChoose.value = false
        players.value[playerActiveIndex.value].money =
          players.value[playerActiveIndex.value].money + surpriseItem.value.getMoney
      } else {
        showChoose.value = true

        itemsChoose.value = dataItem.value.filter(
          (el) => el.count === surpriseItem.value.goTo.count && el.direction === 'main'
        )
      }
    }
  }
  surpriseItem.value = null
}

function getTradeItems() {
  enoughMoney.value = false
  tradeBank.value = true
  tradeItems.value = dataItem.value.filter(
    (el) => el.owner === players.value[playerActiveIndex.value].name
  )
}

function getSell() {
  getTradeItems()
  sell.value = true
}

function closeTradeBank() {
  tradeBank.value = false
  showChoose.value = true
  sell.value = false
}

function closeError() {
  showChoose.value = !showChoose.value
  enoughMoney.value = !enoughMoney.value
}

function isGameOver() {
  dataItem.value.forEach((el) =>
    el.owner === players.value[playerActiveIndex.value].name ? (el.owner = null) : ''
  )

  players.value[playerActiveIndex.value].status = 'game over'

  setTimeout(() => {
    enoughMoney.value = false
    finishedRound()

    winnerPlayer.value = players.value.filter((el) => el.status !== 'game over')
    winnerPlayer.value.length === 1 ? (winner.value = true) : (winner.value = false)
    disabled.value = winner.value
  }, 1500)
}

function isBankrupt() {
  players.value[playerActiveIndex.value].status = 'game over'
  tradeBank.value = false
  enoughMoney.value = true
  isGameOver()
}

function isUpgrade(data) {
  dataItem.value.forEach((el) => {
    if (el.id === data && el.upgrade <= 2) {
      el.price = el.coefficient[el.upgrade].upgrade
      el.rent = el.coefficient[el.upgrade].rent
      el.upgrade++
    }
  })
}

function getUpgradeItems() {
  let resultArray = []

  sortGroupItems.value.forEach((group) => {
    const result = group.items.filter(
      (el) => el.owner === players.value[playerActiveIndex.value].name
    )

    result.length === group.items.length ? (resultArray = [...resultArray, ...group.items]) : ''
  })

  upgradeItems.value = dataItem.value
    .filter((item) => {
      return resultArray.some((item2) => item2.id === item.id)
    })
    .sort((a, b) => {
      if (a.color > b.color) {
        return 1
      }
      if (a.color < b.color) {
        return -1
      }
      return 0
    })
}

function toggleRules() {
  rules.value = !rules.value
}

// function calc() {
//   let rent =24
//   let upgrade = rent*5
//   let result = []
//   const newCoefficient = { upgrade: 0, rent: 0 }

//   for (let index = 0; index < 3; index++) {
//     if (index == 0) {
//       rent=rent*2
//       upgrade=rent/0.3
//     } else {
//       let asd=0.3+index*0.06
//       upgrade = upgrade *1.25
//       rent = upgrade * asd
//     }
//     result = [...result, { ...newCoefficient, upgrade: upgrade, rent: rent }]
//   }

//
// }

watch(players.value, () => {
  sortItems()
  getUpgradeItems()
})

onMounted(() => {
  sortItems()
  getUpgradeItems()
})
</script>

<style lang="scss" scoped>
.cell {
  height: 100%;
  vertical-align: top;
}

.board {
  position: relative;

  display: flex;
  gap: 60px;

  padding: 24px;

  &__wrap {
    position: relative;
    display: grid;
    grid-template-columns: repeat(11, 75px);
    grid-template-rows: repeat(11, 75px);

    justify-items: center;
    align-items: center;

    background-color: #ebf4eb;
    border-radius: 8px;
    padding: 28px;

    gap: 4px 4px;
  }

  &__button-box {
    grid-column: 8/10;
    grid-row: 9/11;
  }

  &__button {
    cursor: pointer;
    width: 108px;
    height: 40px;
    grid-column: 8/10;
    grid-row: 10/11;

    color: white;

    background-color: #0d3b10;
    border-radius: 4px;

    margin: 0 0 auto 0;

    transition: all 0.3s ease-in-out;

    &:hover {
      background-color: #125417;
    }
    &:active {
      background-color: #092a0b;
    }

    &.finished {
      background-color: #ca5f63;
      border-color: #a54a4d;

      &:hover {
        background-color: #972c31;
      }

      &:active {
        background-color: #6b1e22;
        border-color: #6b1e22;
      }
    }
  }

  &__dice-wrap {
    grid-column: 8/10;
    grid-row: 9/10;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 20px;
  }

  &__rules-wrap {
    cursor: pointer;

    grid-column: 2/4;
    grid-row: 2/3;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;

    color: rgb(168, 168, 168);

    &:hover {
      & .board__rules-icon {
        color: #6ba56f;
        border-color: #6ba56f;
      }
      & .board__rules-text {
        color: #6ba56f;
      }
    }

    &:active {
      & .board__rules-icon {
        color: #125417;
        border-color: #125417;
      }
      & .board__rules-text {
        color: #125417;
      }
    }
  }

  &__rules-icon {
    width: 26px;
    height: 26px;

    text-align: center;
    font-size: 20px;
    line-height: 24px;

    border-radius: 50%;
    border: 1px solid rgb(168, 168, 168);

    transition: all 0.4s ease-in-out;
  }

  &__rules-text {
    font-size: 20px;
    line-height: 24px;

    transition: color 0.4s ease-in-out;
  }

  &__players {
    grid-column: 2/6;
    grid-row: 2/7;

    &.disabled {
      cursor: auto;
      pointer-events: none;
    }
  }
}

.direction-arrow {
  &__vertical {
    grid-column: 7/8;
    grid-row: 10/11;

    justify-self: flex-start;
    padding-bottom: 6px;

    &.top {
      grid-column: 5/6;
      grid-row: 2/3;
      justify-self: flex-end;

      transform: rotate(180deg);
    }
  }

  &__gorizontal {
    grid-column: 5/6;
    grid-row: 10/11;

    align-self: end;
    padding-right: 6px;

    &.top {
      grid-column: 7/8;
      grid-row: 2/3;
      align-self: flex-start;

      transform: rotate(180deg);
    }
  }
}

.card-enter-from {
  transform: scale(0);
  opacity: 0;
}

.card-enter-to {
  transform: scale(1);
  opacity: 1;
  transition: all 0.3s ease-in;
}

.button-roll-enter-from {
  transform: rotateX(-90deg);
}
.button-roll-enter-to {
  transform: rotateX(0deg);
  transition: transform 0.5s ease-in-out 0.3s;
}

.button-roll-leave-from {
  transform: rotateX(0deg);
}
.button-roll-leave-to {
  transform: rotateX(90deg);
  transition: transform 0.5s ease-in-out;
}
</style>
