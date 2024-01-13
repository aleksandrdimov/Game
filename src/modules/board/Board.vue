<template>
  <section id="board" class="board">
    <div class="board__wrap">
      <BoardItem v-for="(item, index) in dataItem" :key="index" class="cell" :item="item"
        :class="`board__item-${index}`" />
      <PlayerToken v-for="player in players" :key="player.id" :player="player"></PlayerToken>

      <div class="board__dice-wrap">
        <p class="board__dice-item">{{ dice1 }}</p>
        <p class="board__dice-item">{{ dice2 }}</p>
      </div>
      <button class="board__button" @click="clickBtn">Roll Dice</button>

      <Players class="board__players" :players="players" @open="openDetails" :groups="sortGroupItems" />
    </div>
    <Transition name="card">
      <ModalCard v-if="showChoose" :items="itemsChoose" @close="closeModal" @choose="isChooseCard" />
    </Transition>
  </section>
</template>

<script setup>
import { onBeforeMount, onMounted, ref } from 'vue'
import BoardItem from './components/BoardItem.vue'
import ModalCard from '../modal/ModalCard.vue'
import Players from '../player/Players.vue'
import PlayerToken from '../player/components/PlayerToken.vue'

const dataItem = ref([
  {
    id: 1,
    owner: null,
    count: '20',
    img: 'surprise_img',
    text: '20',
    color: null,
    rent: '',
    price: '',
    update: '',
    position: null,
    row: '1/2',
    column: '1/2',
    direction: 'main'
  },
  {
    id: 2,
    owner: "Player 1",
    count: '21',
    img: 'puma_img',
    text: '21',
    color: 'rgb(32, 32, 219)',
    rent: '',
    price: '',
    update: '',
    position: 'top',
    row: '1/2',
    column: '2/3',
    direction: 'main'
  },
  {
    id: 3,
    owner: null,
    count: '22',
    img: 'reebok_img',
    text: '22',
    color: 'rgb(32, 32, 219)',
    rent: '',
    price: '',
    update: '',
    position: 'top',
    row: '1/2',
    column: '3/4',
    direction: 'main'
  },
  {
    id: 4,
    owner: 'Player 1',
    count: '23',
    img: 'sea_terminal_img',
    text: '23',
    color: 'transparent',
    rent: '',
    price: '',
    update: '',
    position: 'top',
    row: '1/2',
    column: '4/5',
    direction: 'main'
  },
  {
    id: 5,
    owner: null,
    count: '24',
    img: 'fitness_dream_img',
    text: '24',
    color: 'rgb(190, 190, 190)',
    rent: '',
    price: '',
    update: '',
    position: 'top',
    row: '1/2',
    column: '5/6',
    direction: 'main'
  },
  {
    id: 6,
    owner: null,
    count: '25',
    img: 'street_corner',
    text: '25',
    color: null,
    rent: '',
    price: '',
    update: '',
    position: null,
    row: '1/2',
    column: '6/7',
    direction: 'main'
  },
  {
    id: 7,
    owner: "Player 1",
    count: '26',
    img: 'fitness_girl_img',
    text: '26',
    color: 'rgb(190, 190, 190)',
    rent: '',
    price: '',
    update: '',
    position: 'top',
    row: '1/2',
    column: '7/8',
    direction: 'main'
  },
  {
    id: 8,
    owner: null,
    count: '27',
    img: 'surprise_img',
    text: '27',
    color: null,
    rent: '',
    price: '',
    update: '',
    position: 'top',
    row: '1/2',
    column: '8/9',
    direction: 'main'
  },
  {
    id: 9,
    owner:null,
    count: '28',
    img: 'sushi_bar_img',
    text: '28',
    color: '#573d3f',
    rent: '',
    price: '',
    update: '',
    position: 'top',
    row: '1/2',
    column: '9/10',
    direction: 'main'
  },
  {
    id: 10,
    owner: null,
    count: '29',
    img: 'steak_house_img',
    text: '29',
    color: '#573d3f',
    rent: '',
    price: '',
    update: '',
    position: 'top',
    row: '1/2',
    column: '10/11',
    direction: 'main'
  },
  {
    id: 11,
    owner: null,
    count: '30',
    img: 'police_img',
    text: '30',
    color: null,
    rent: '',
    price: '',
    update: '',
    position: null,
    row: '1/2',
    column: '11/12',
    direction: 'main'
  },

  {
    id: 12,
    owner: null,
    count: '19',
    img: 'adidas_img',
    text: '19',
    color: 'rgb(32, 32, 219)',
    rent: '',
    price: '',
    update: '',
    position: 'left',
    row: '2/3',
    column: '1/2',
    direction: 'main'
  },
  {
    id: 13,
    owner: null,
    count: '26',
    img: 'fitness_men_img',
    text: '26s',
    color: 'rgb(190, 190, 190)',
    rent: '',
    price: '',
    update: '',
    position: 'top',
    row: '2/3',
    column: '6/7',
    direction: 'branch'
  },
  {
    id: 14,
    owner: null,
    count: '31',
    img: 'burger_house_img',
    text: '31',
    color: '#573d3f',
    rent: '',
    price: '',
    update: '',
    position: 'right',
    row: '2/3',
    column: '11/12',
    direction: 'main'
  },

  {
    id: 15,
    owner: null,
    count: '18',
    img: 'pc_shop_img',
    text: '18',
    color: 'mediumorchid',
    rent: '',
    price: '',
    update: '',
    position: 'left',
    row: '3/4',
    column: '1/2',
    direction: 'main'
  },
  {
    id: 16,
    owner: null,
    count: '27',
    img: 'bessarabian_shop_img',
    text: '27s',
    color: 'rgb(238, 151, 151)',
    rent: '',
    price: '',
    update: '',
    position: 'top',
    row: '3/4',
    column: '6/7',
    direction: 'branch'
  },
  {
    id: 17,
    owner: null,
    count: '32',
    img: 'go_to_casino_img',
    text: '32',
    color: null,
    rent: '',
    price: '',
    update: '',
    position: 'right',
    row: '3/4',
    column: '11/12',
    direction: 'main'
  },

  {
    id: 18,
    owner: null,
    count: '17',
    img: 'mobile_shop_img',
    text: '17',
    color: 'mediumorchid',
    rent: '',
    price: '',
    update: '',
    position: 'left',
    row: '4/5',
    column: '1/2',
    direction: 'main'
  },
  {
    id: 19,
    owner: null,
    count: '28',
    img: 'surprise_img',
    text: '28s',
    color: null,
    rent: '',
    price: '',
    update: '',
    position: null,
    row: '4/5',
    column: '6/7',
    direction: 'branch'
  },
  {
    id: 20,
    owner: null,
    count: '29',
    img: 'wine_valley_img',
    text: '29s',
    color: 'rgb(238, 151, 151)',
    rent: '',
    price: '',
    update: '',
    position: 'top',
    row: '4/5',
    column: '7/8',
    direction: 'branch'
  },
  {
    id: 21,
    owner: null,
    count: '30',
    img: 'teleport_img',
    text: '30s',
    color: null,
    rent: '',
    price: '',
    update: '',
    position: null,
    row: '4/5',
    column: '8/9',
    direction: 'branch'
  },
  {
    id: 22,
    owner: null,
    count: '33',
    img: 'fashion_girl_img',
    text: '33',
    color: 'rgb(167, 218, 218',
    rent: '',
    price: '',
    update: '',
    position: 'right',
    row: '4/5',
    column: '11/12',
    direction: 'main'
  },

  {
    id: 23,
    owner: null,
    count: '16',
    img: 'appliances_shop_img',
    text: '16',
    color: 'mediumorchid',
    rent: '',
    price: '',
    update: '',
    position: 'left',
    row: '5/6',
    column: '1/2',
    direction: 'main'
  },
  {
    id: 24,
    owner: null,
    count: '31',
    img: 'electric_power_img',
    text: '31s',
    color: 'transparent',
    rent: '',
    price: '',
    update: '',
    position: 'top',
    row: '5/6',
    column: '8/9',
    direction: 'branch'
  },
  {
    id: 25,
    owner: null,
    count: '32',
    img: 'bessarabian_tour_img',
    text: '32s',
    color: 'rgb(238, 151, 151)',
    rent: '',
    price: '',
    update: '',
    position: 'top',
    row: '5/6',
    column: '9/10',
    direction: 'branch'
  },
  {
    id: 26,
    owner: null,
    count: '33',
    img: 'kids_clothes_img',
    text: '33s',
    color: 'rgb(167, 218, 218',
    rent: '',
    price: '',
    update: '',
    position: 'top',
    row: '5/6',
    column: '10/11',
    direction: 'branch'
  },
  {
    id: 27,
    owner: null,
    count: '34',
    img: 'railway_station_img',
    text: '34',
    color: 'transparent',
    rent: '',
    price: '',
    update: '',
    position: null,
    row: '5/6',
    column: '11/12',
    direction: 'main'
  },

  {
    id: 28,
    owner: null,
    count: '15',
    img: 'grocery_family_img',
    text: '15',
    color: 'rgb(194, 1, 1)',
    rent: '',
    price: '',
    update: '',
    position: 'left',
    row: '6/7',
    column: '1/2',
    direction: 'main'
  },
  {
    id: 29,
    owner: null,
    count: '35',
    img: 'mens_clothes_img',
    text: '35',
    color: 'rgb(167, 218, 218',
    rent: '',
    price: '',
    update: '',
    position: 'right',
    row: '6/7',
    column: '11/12',
    direction: 'main'
  },

  {
    id: 30,
    owner: null,
    count: '14',
    img: 'bus_station_img',
    text: '14',
    color: 'transparent',
    rent: '',
    price: '',
    update: '',
    position: 'left',
    row: '7/8',
    column: '1/2',
    direction: 'main'
  },
  {
    id: 31,
    owner: null,
    count: '13',
    img: 'grocery_organic_img',
    text: '13s',
    color: 'rgb(194, 1, 1)',
    rent: '',
    price: '',
    update: '',
    position: 'bottom',
    row: '7/8',
    column: '2/3',
    direction: 'branch'
  },
  {
    id: 32,
    owner: null,
    count: '12',
    img: 'smoke_shop_img',
    text: '12s',
    color: 'rgb(182, 182, 0)',
    rent: '',
    price: '',
    update: '',
    position: 'bottom',
    row: '7/8',
    column: '3/4',
    direction: 'branch'
  },
  {
    id: 33,
    owner: null,
    count: '11',
    img: 'water_energy_img',
    text: '11s',
    color: 'transparent',
    rent: '',
    price: '',
    update: '',
    position: 'bottom',
    row: '7/8',
    column: '4/5',
    direction: 'branch'
  },
  {
    id: 34,
    owner: null,
    count: '36',
    img: 'las_vegas_1_img',
    text: '36',
    color: 'orange',
    rent: '',
    price: '',
    update: '',
    position: 'right',
    row: '7/8',
    column: '11/12',
    direction: 'main'
  },

  {
    id: 35,
    owner: null,
    count: '13',
    img: 'grocery_img',
    text: '13',
    color: 'rgb(194, 1, 1)',
    rent: '',
    price: '',
    update: '',
    position: 'left',
    row: '8/9',
    column: '1/2',
    direction: 'main'
  },
  {
    id: 36,
    owner: null,
    count: '10',
    img: 'teleport_img',
    text: '10s',
    color: null,
    rent: '',
    price: '',
    update: '',
    position: null,
    row: '8/9',
    column: '4/5',
    direction: 'branch'
  },
  {
    id: 37,
    owner: null,
    count: '9',
    img: 'vape_shop_img',
    text: '9s',
    color: 'rgb(182, 182, 0)',
    rent: '',
    price: '',
    update: '',
    position: 'bottom',
    row: '8/9',
    column: '5/6',
    direction: 'branch'
  },
  {
    id: 38,
    owner: null,
    count: '8',
    img: 'surprise_img',
    text: '8s',
    color: null,
    rent: '',
    price: '',
    update: '',
    position: null,
    row: '8/9',
    column: '6/7',
    direction: 'branch'
  },
  {
    id: 39,
    owner: null,
    count: '37',
    img: 'surprise_img',
    text: '37',
    color: null,
    rent: '',
    price: '',
    update: '',
    position: 'right',
    row: '8/9',
    column: '11/12',
    direction: 'main'
  },

  {
    id: 40,
    owner: null,
    count: '12',
    img: 'surprise_img',
    text: '12',
    color: null,
    rent: '',
    price: '',
    update: '',
    position: 'left',
    row: '9/10',
    column: '1/2',
    direction: 'main'
  },
  {
    id: 41,
    owner: null,
    count: '7',
    img: 'hookah_shop_img',
    text: '7s',
    color: 'rgb(182, 182, 0)',
    rent: '',
    price: '',
    update: '',
    position: 'bottom',
    row: '9/10',
    column: '6/7',
    direction: 'branch'
  },
  {
    id: 42,
    owner: null,
    count: '38',
    img: 'casino_img',
    text: '38',
    color: 'orange',
    rent: '',
    price: '',
    update: '',
    position: 'right',
    row: '9/10',
    column: '11/12',
    direction: 'main'
  },

  {
    id: 43,
    owner: null,
    count: '11',
    img: 'coffee_shop_img',
    text: '11',
    color: 'rgb(148, 100, 55)',
    rent: '',
    price: '',
    update: '',
    position: 'left',
    row: '10/11',
    column: '1/2',
    direction: 'main'
  },
  {
    id: 44,
    owner: null,
    count: '6',
    img: 'kids_barber_img',
    text: '6s',
    color: 'rgb(132, 156, 224)',
    rent: '',
    price: '',
    update: '',
    position: 'bottom',
    row: '10/11',
    column: '6/7',
    direction: 'branch'
  },
  {
    id: 45,
    owner: null,
    count: '39',
    img: 'hotel_royal_img',
    text: '39',
    color: 'orange',
    rent: '',
    price: '',
    update: '',
    position: 'right',
    row: '10/11',
    column: '11/12',
    direction: 'main'
  },

  {
    id: 46,
    owner: null,
    count: '10',
    img: 'jail_img',
    text: '10',
    color: null,
    rent: '',
    price: '',
    update: '',
    position: null,
    row: '11/12',
    column: '1/2',
    direction: 'main'
  },
  {
    id: 47,
    owner: null,
    count: '9',
    img: 'hot_dogs_img',
    text: '9',
    color: 'rgb(148, 100, 55)',
    rent: '',
    price: '',
    update: '',
    position: 'bottom',
    row: '11/12',
    column: '2/3',
    direction: 'main'
  },
  {
    id: 48,
    owner: null,
    count: '8',
    img: 'airport_img',
    text: '8',
    color: 'transparent',
    rent: '',
    price: '',
    update: '',
    position: 'bottom',
    row: '11/12',
    column: '3/4',
    direction: 'main'
  },
  {
    id: 49,
    owner: null,
    count: '7',
    img: 'croissant_bakehouse_img',
    text: '7',
    color: 'rgb(148, 100, 55)',
    rent: '',
    price: '',
    update: '',
    position: 'bottom',
    row: '11/12',
    column: '4/5',
    direction: 'main'
  },
  {
    id: 50,
    owner: null,
    count: '6',
    img: 'barber_shop_img',
    text: '6',
    color: 'rgb(132, 156, 224)',
    rent: '',
    price: '',
    update: '',
    position: 'bottom',
    row: '11/12',
    column: '5/6',
    direction: 'main'
  },
  {
    id: 51,
    owner: null,
    count: '5',
    img: 'street_corner',
    text: '5',
    color: null,
    rent: '',
    price: '',
    update: '',
    position: null,
    row: '11/12',
    column: '6/7',
    direction: 'main'
  },
  {
    id: 52,
    owner: null,
    count: '4',
    img: 'hair_salon_img',
    text: '4',
    color: 'rgb(132, 156, 224)',
    rent: '',
    price: '',
    update: '',
    position: 'bottom',
    row: '11/12',
    column: '7/8',
    direction: 'main'
  },
  {
    id: 53,
    owner: null,
    count: '3',
    img: 'continantal_avenue_img',
    text: '3',
    color: 'rgb(68, 177, 68)',
    rent: '',
    price: '',
    update: '',
    position: 'bottom',
    row: '11/12',
    column: '8/9',
    direction: 'main'
  },
  {
    id: 54,
    owner: null,
    count: '2',
    img: 'old_avenue_img',
    text: '2',
    color: 'rgb(68, 177, 68)',
    rent: '',
    price: '',
    update: '',
    position: 'bottom',
    row: '11/12',
    column: '9/10',
    direction: 'main'
  },
  {
    id: 55,
    owner: null,
    count: '1',
    img: 'main_avenue_img',
    text: '1',
    color: 'rgb(68, 177, 68)',
    rent: '',
    price: '',
    update: '',
    position: 'bottom',
    row: '11/12',
    column: '10/11',
    direction: 'main'
  },
  {
    id: 56,
    owner: null,
    count: '40',
    img: 'start_img',
    text: '0',
    color: null,
    rent: null,
    price: null,
    update: null,
    position: null,
    row: '11/12',
    column: '11/12',
    direction: 'main'
  }
])

const players = ref([
  {
    id: 1,
    name: 'Player 1',
    money: 1500,
    color: 'red',
    img: '',
    row: '11/12',
    column: '11/12',
    positionStart: 0,
    positionGoTo: 0,
    direction: 'main',
    active: true,
    details: true
  },
  {
    id: 2,
    name: 'Player 2',
    money: 1000,
    color: 'green',
    img: '',
    row: '11/12',
    column: '11/12',
    positionStart: 0,
    positionGoTo: 0,
    direction: 'main',
    active: false,
    details: false
  },
  {
    id: 3,
    name: 'Player 3',
    money: 700,
    color: 'blue',
    img: '',
    row: '11/12',
    column: '11/12',
    positionStart: 0,
    positionGoTo: 0,
    direction: 'main',
    active: false,
    details: false
  },
  {
    id: 4,
    name: 'Player 4',
    money: 500,
    color: 'yellow',
    img: '',
    row: '11/12',
    column: '11/12',
    positionStart: 0,
    positionGoTo: 0,
    direction: 'main',
    active: false,
    details: false
  }
])

const sortGroupItems = ref([])

function checkItemValue(el, array) {
  const checkItem = (x) => x.items[0].color === el.color;
  const resultIndex = array.findIndex(checkItem)

  resultIndex >= 0 ? array[resultIndex].items.push(el) : ''
}

function sortItems() {
  const array = dataItem.value
    .filter((el) => el.color !== null)
 
  array.forEach((el) => {
    const newItem = {
      items: [{ ...el }]
    }

    const result = sortGroupItems.value.find((item) => item.items[0].color == el.color)

    result
    ? checkItemValue(el, sortGroupItems.value)
    : (sortGroupItems.value = [...sortGroupItems.value, { ...newItem }])
  })
}

const playerColumn = ref('11/12')
const playerRow = ref('11/12')

const dice1 = ref(0)
const dice2 = ref(0)

const itemsChoose = ref([])

const showChoose = ref(false)

function closeModal() {
  showChoose.value = !showChoose.value
}

function clickBtn() {
  dice1.value = Math.floor(Math.random() * 6) + 1
  dice2.value = Math.floor(Math.random() * 6) + 1
  const total = dice1.value + dice2.value

  player.value.positionStart = player.value.positionGoTo

  player.value.positionGoTo + total >= 40
    ? (player.value.positionGoTo = player.value.positionGoTo + total - 40)
    : (player.value.positionGoTo = player.value.positionGoTo + total)

  filterItem()

  showChoose.value = true
}

function filterItem() {
  itemsChoose.value = dataItem.value.filter((el) => el.count == player.value.positionGoTo)

  if (itemsChoose.value.length > 1) {
    if (
      (player.value.positionStart > 5 && player.value.positionStart < 14) ||
      (player.value.positionStart > 25 && player.value.positionStart < 34)
    ) {
      itemsChoose.value = itemsChoose.value.filter((el) => el.direction === player.value.direction)
      goTo()
    }
  } else {
    goTo()
  }
}

function goTo() {
  playerColumn.value = itemsChoose.value[0].column
  playerRow.value = itemsChoose.value[0].row

  player.value.row = playerRow.value
  player.value.column = playerColumn.value
  player.value.direction = itemsChoose.value[0].direction
}

function isChooseCard(data) {
  showChoose.value = false
  itemsChoose.value = dataItem.value.filter((el) => el.id === data)

  goTo()

  setTimeout(() => {
    showChoose.value = true
  }, 200)
}

function openDetails(data) {
  players.value.forEach((el) => {
    el.id === data ? (el.details = true) : (el.details = false)
  })
  console.log(data)
}

onBeforeMount(() => {
  sortItems()
})
</script>

<style lang="scss" scoped>
#board {
  border: 1px solid black;

  background-color: rgba(209, 247, 209, 0.295);
  padding: 25px;

  color: #573d3f;
}

.cell {
  height: 100%;
  vertical-align: top;
}

.board-top {
  max-width: 72px;
  height: 87px;
}

.board-corner {
  width: 87px;
  height: 87px;
}

.board-left {
  width: 72px;
  height: 72px;
}

.board {
  position: relative;

  &__wrap {
    position: relative;
    display: grid;
    grid-template-columns: repeat(11, 75px);
    grid-template-rows: repeat(11, 75px);

    gap: 1px 1px;
  }

  &__button-box {
    grid-column: 8/10;
    grid-row: 9/11;
  }

  &__button {
    width: 100px;
    height: 50px;
    grid-column: 8/10;
    grid-row: 10/11;

    margin: auto;
  }

  &__dice-wrap {
    grid-column: 8/10;
    grid-row: 9/10;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 16px;
  }

  &__dice-item {
    width: 50px;

    text-align: center;
    font-weight: 600;
    font-size: 36px;

    background-color: white;
    border: 1px solid black;
  }

  &__players {
    grid-column: 2/6;
    grid-row: 2/7;
    // border: 1px solid grey;
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
</style>
