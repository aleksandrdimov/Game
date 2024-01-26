<template>
  <section class="board">
    <div class="board__wrap">
      <BoardItem
        v-for="(item, index) in dataItem"
        :key="index"
        :players="players"
        class="cell"
        :item="item"
        :class="`board__item-${index}`"
      />
      <PlayerToken v-for="player in players" :key="player.id" :player="player"></PlayerToken>

      <div class="board__dice-wrap">
        <p class="board__dice-item">{{ dice1 }}</p>
        <p class="board__dice-item">{{ dice2 }}</p>
      </div>
      <button v-if="buttonRoll" class="board__button" @click="rollDice">Roll Dice</button>
      <button v-else class="board__button" @click="finishedRound">Finished Round</button>

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
          :player="players[playerActiveIndex]"
          :items="itemsChoose"
        />

        <ModalJail v-if="jail" @pay="payMoney" @skip="skipMove" />
        <ModalTeleport v-if="teleport" :player="players[playerActiveIndex]" />
        <ModalTradeBank
          v-if="tradeBank"
          :cards="tradeItems"
          :player="players[playerActiveIndex]"
          :need-money="needMoney"
          @close="closeTradeBank"
          @bankrupt="isBankrupt"
        />

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
      :players="players"
      @open="openDetails"
      :groups="sortGroupItems"
    />
  </section>
</template>

<script setup>
import { onBeforeMount, onBeforeUpdate, onMounted, onUpdated, ref, watch } from 'vue'
import BoardItem from './components/BoardItem.vue'
import ModalCard from '../modal/ModalCard.vue'
import ModalError from '../modal/ModalError.vue'
import ModalJail from '../modal/ModalJail.vue'
import ModalTeleport from '../modal/ModalTeleport.vue'
import ModalSurprise from '../modal/ModalSurprise.vue'
import ModalTradeBank from '../modal/ModalTradeBank.vue'
import Players from '../player/Players.vue'
import PlayerToken from '../player/components/PlayerToken.vue'

const dataItem = ref([
  {
    id: 1,
    type: 'surprise',
    owner: null,
    count: '20',
    img: 'surprise_img',
    sell: false,
    color: null,
    rent: null,
    price: null,
    update: null,
    position: null,
    row: '1/2',
    column: '1/2',
    direction: 'main'
  },
  {
    id: 2,
    type: 'card',
    owner: null,
    count: '21',
    img: 'puma_img',
    sell: false,
    color: '#4D9FFF',
    rent: 60,
    price: 300,
    update: '',
    position: 'top',
    row: '1/2',
    column: '2/3',
    direction: 'main'
  },
  {
    id: 3,
    type: 'card',
    owner: null,
    count: '22',
    img: 'reebok_img',
    sell: false,
    color: '#4D9FFF',
    rent: 56,
    price: 280,
    update: '',
    position: 'top',
    row: '1/2',
    column: '3/4',
    direction: 'main'
  },
  {
    id: 4,
    type: 'card',
    owner: null,
    count: '23',
    img: 'sea_terminal_img',
    sell: false,
    color: 'transparent',
    rent: 45,
    price: 225,
    update: '',
    position: 'top',
    row: '1/2',
    column: '4/5',
    direction: 'main'
  },
  {
    id: 5,
    type: 'card',
    owner: null,
    count: '24',
    img: 'fitness_dream_img',
    sell: false,
    color: '#FF8965',
    rent: 46,
    price: 230,
    update: '',
    position: 'top',
    row: '1/2',
    column: '5/6',
    direction: 'main'
  },
  {
    id: 6,
    type: 'corner',
    owner: null,
    count: '25',
    img: 'street_corner',
    sell: false,
    color: null,
    rent: null,
    price: null,
    update: null,
    position: null,
    row: '1/2',
    column: '6/7',
    direction: 'main'
  },
  {
    id: 7,
    type: 'card',
    owner: null,
    count: '26',
    img: 'fitness_girl_img',
    sell: false,
    color: '#FF8965',
    rent: 55,
    price: 275,
    update: '',
    position: 'top',
    row: '1/2',
    column: '7/8',
    direction: 'main'
  },
  {
    id: 8,
    type: 'surprise',
    owner: null,
    count: '27',
    img: 'surprise_img',
    sell: false,
    color: null,
    rent: null,
    price: null,
    update: null,
    position: 'top',
    row: '1/2',
    column: '8/9',
    direction: 'main'
  },
  {
    id: 9,
    type: 'card',
    owner: null,
    count: '28',
    img: 'sushi_bar_img',
    sell: false,
    color: '#7CD65C',
    rent: 53,
    price: 265,
    update: '',
    position: 'top',
    row: '1/2',
    column: '9/10',
    direction: 'main'
  },
  {
    id: 10,
    type: 'card',
    owner: null,
    count: '29',
    img: 'steak_house_img',
    sell: false,
    color: '#7CD65C',
    rent: 56,
    price: 280,
    update: '',
    position: 'top',
    row: '1/2',
    column: '10/11',
    direction: 'main'
  },
  {
    id: 11,
    type: 'police',
    owner: null,
    count: '30',
    img: 'police_img',
    sell: false,
    color: null,
    rent: null,
    price: null,
    update: null,
    position: null,
    row: '1/2',
    column: '11/12',
    direction: 'main'
  },

  {
    id: 12,
    type: 'card',
    owner: null,
    count: '19',
    img: 'adidas_img',
    sell: false,
    color: '#4D9FFF',
    rent: 58,
    price: 290,
    update: '',
    position: 'left',
    row: '2/3',
    column: '1/2',
    direction: 'main'
  },
  {
    id: 13,
    type: 'card',
    owner: null,
    count: '26',
    img: 'fitness_men_img',
    sell: false,
    color: '#FF8965',
    rent: 50,
    price: 250,
    update: '',
    position: 'left',
    row: '2/3',
    column: '6/7',
    direction: 'branch'
  },
  {
    id: 14,
    type: 'card',
    owner: null,
    count: '31',
    img: 'burger_house_img',
    sell: false,
    color: '#7CD65C',
    rent: 55,
    price: 275,
    update: '',
    position: 'right',
    row: '2/3',
    column: '11/12',
    direction: 'main'
  },

  {
    id: 15,
    type: 'card',
    owner: null,
    count: '18',
    img: 'pc_shop_img',
    sell: false,
    color: '#FF65DB',
    rent: 52,
    price: 260,
    update: '',
    position: 'left',
    row: '3/4',
    column: '1/2',
    direction: 'main'
  },
  {
    id: 16,
    type: 'card',
    owner: null,
    count: '28',
    img: 'bessarabian_shop_img',
    sell: false,
    color: '#33CFFF',
    rent: 57,
    price: 285,
    update: '',
    position: 'left',
    row: '4/5',
    column: '6/7',
    direction: 'branch'
  },
  {
    id: 17,
    type: 'go',
    owner: null,
    count: '32',
    img: 'go_to_casino_img',
    sell: false,
    color: null,
    rent: null,
    price: null,
    update: null,
    position: 'right',
    row: '3/4',
    column: '11/12',
    direction: 'main'
  },

  {
    id: 18,
    type: 'card',
    owner: null,
    count: '17',
    img: 'mobile_shop_img',
    sell: false,
    color: '#FF65DB',
    rent: 48,
    price: 240,
    update: '',
    position: 'left',
    row: '4/5',
    column: '1/2',
    direction: 'main'
  },
  {
    id: 19,
    type: 'surprise',
    owner: null,
    count: '31',
    img: 'surprise_img',
    sell: false,
    color: null,
    rent: null,
    price: null,
    update: null,
    position: null,
    row: '5/6',
    column: '8/9',
    direction: 'branch'
  },
  {
    id: 20,
    type: 'card',
    owner: null,
    count: '30',
    img: 'wine_valley_img',
    sell: false,
    color: '#33CFFF',
    rent: 64,
    price: 320,
    update: '',
    position: 'top',
    row: '5/6',
    column: '7/8',
    direction: 'branch'
  },
  {
    id: 21,
    type: 'teleport',
    owner: null,
    count: '29',
    img: 'teleport_img',
    sell: false,
    color: null,
    rent: null,
    price: null,
    update: null,
    position: null,
    row: '5/6',
    column: '6/7',
    direction: 'branch'
  },
  {
    id: 22,
    type: 'card',
    owner: null,
    count: '33',
    img: 'fashion_girl_img',
    sell: false,
    color: '#FFBB00',
    rent: 66,
    price: 330,
    update: '',
    position: 'right',
    row: '4/5',
    column: '11/12',
    direction: 'main'
  },

  {
    id: 23,
    type: 'card',
    owner: null,
    count: '16',
    img: 'appliances_shop_img',
    sell: false,
    color: '#FF65DB',
    rent: 55,
    price: 275,
    update: '',
    position: 'left',
    row: '5/6',
    column: '1/2',
    direction: 'main'
  },
  {
    id: 24,
    type: 'card',
    owner: null,
    count: '27',
    img: 'electric_power_img',
    sell: false,
    color: 'transparent',
    rent: 45,
    price: 225,
    update: '',
    position: 'left',
    row: '3/4',
    column: '6/7',
    direction: 'branch'
  },
  {
    id: 25,
    type: 'card',
    owner: null,
    count: '32',
    img: 'bessarabian_tour_img',
    sell: false,
    color: '#33CFFF',
    rent: 60,
    price: 300,
    update: '',
    position: 'top',
    row: '5/6',
    column: '9/10',
    direction: 'branch'
  },
  {
    id: 26,
    type: 'card',
    owner: null,
    count: '33',
    img: 'kids_clothes_img',
    sell: false,
    color: '#FFBB00',
    rent: 58,
    price: 290,
    update: '',
    position: 'top',
    row: '5/6',
    column: '10/11',
    direction: 'branch'
  },
  {
    id: 27,
    type: 'card',
    owner: null,
    count: '34',
    img: 'railway_station_img',
    sell: false,
    color: 'transparent',
    rent: 45,
    price: 225,
    update: '',
    position: 'right',
    row: '5/6',
    column: '11/12',
    direction: 'main'
  },

  {
    id: 28,
    type: 'card',
    owner: null,
    count: '15',
    img: 'grocery_family_img',
    sell: false,
    color: '#C5D65C',
    rent: 44,
    price: 220,
    update: '',
    position: 'left',
    row: '6/7',
    column: '1/2',
    direction: 'main'
  },
  {
    id: 29,
    type: 'card',
    owner: null,
    count: '35',
    img: 'mens_clothes_img',
    sell: false,
    color: '#FFBB00',
    rent: 62,
    price: 310,
    update: '',
    position: 'right',
    row: '6/7',
    column: '11/12',
    direction: 'main'
  },

  {
    id: 30,
    type: 'card',
    owner: null,
    count: '14',
    img: 'bus_station_img',
    sell: false,
    color: 'transparent',
    rent: 45,
    price: 225,
    update: '',
    position: 'left',
    row: '7/8',
    column: '1/2',
    direction: 'main'
  },
  {
    id: 31,
    type: 'card',
    owner: null,
    count: '13',
    img: 'grocery_organic_img',
    sell: false,
    color: '#C5D65C',
    rent: 43,
    price: 215,
    update: '',
    position: 'bottom',
    row: '7/8',
    column: '2/3',
    direction: 'branch'
  },
  {
    id: 32,
    type: 'card',
    owner: null,
    count: '12',
    img: 'smoke_shop_img',
    sell: false,
    color: '#D665FF',
    rent: 38,
    price: 190,
    update: '',
    position: 'bottom',
    row: '7/8',
    column: '3/4',
    direction: 'branch'
  },
  {
    id: 33,
    type: 'surprise',
    owner: null,
    count: '11',
    img: 'surprise_img',
    sell: false,
    color: null,
    rent: null,
    price: null,
    update: '',
    position: null,
    row: '7/8',
    column: '4/5',
    direction: 'branch'
  },
  {
    id: 34,
    type: 'card',
    owner: null,
    count: '10',
    img: 'vape_shop_img',
    sell: false,
    color: '#D665FF',
    rent: 42,
    price: 210,
    update: '',
    position: 'bottom',
    row: '7/8',
    column: '5/6',
    direction: 'branch'
  },
  {
    id: 35,
    type: 'teleport',
    owner: null,
    count: '9',
    img: 'teleport_img',
    sell: false,
    color: null,
    rent: null,
    price: null,
    update: '',
    position: null,
    row: '7/8',
    column: '6/7',
    direction: 'branch'
  },
  {
    id: 36,
    type: 'card',
    owner: null,
    count: '36',
    img: 'las_vegas_1_img',
    sell: false,
    color: '#E83061',
    rent: 75,
    price: 375,
    update: '',
    position: 'right',
    row: '7/8',
    column: '11/12',
    direction: 'main'
  },
  {
    id: 37,
    type: 'card',
    owner: null,
    count: '13',
    img: 'grocery_img',
    sell: false,
    color: '#C5D65C',
    rent: 46,
    price: 230,
    update: '',
    position: 'left',
    row: '8/9',
    column: '1/2',
    direction: 'main'
  },
  {
    id: 38,
    type: 'card',
    owner: null,
    count: '8',
    img: 'hookah_shop_img',
    sell: false,
    color: '#D665FF',
    rent: 40,
    price: 200,
    update: '',
    position: 'right',
    row: '8/9',
    column: '6/7',
    direction: 'branch'
  },

  {
    id: 39,
    type: 'surprise',
    owner: null,
    count: '37',
    img: 'surprise_img',
    sell: false,
    color: null,
    rent: null,
    price: null,
    update: '',
    position: 'right',
    row: '8/9',
    column: '11/12',
    direction: 'main'
  },

  {
    id: 40,
    type: 'surprise',
    owner: null,
    count: '12',
    img: 'surprise_img',
    sell: false,
    color: null,
    rent: null,
    price: null,
    update: '',
    position: 'left',
    row: '9/10',
    column: '1/2',
    direction: 'main'
  },
  {
    id: 41,
    type: 'card',
    owner: null,
    count: '7',
    img: 'water_energy_img',
    sell: false,
    color: 'transparent',
    rent: 45,
    price: 225,
    update: '',
    position: 'right',
    row: '9/10',
    column: '6/7',
    direction: 'branch'
  },

  {
    id: 42,
    type: 'card',
    owner: null,
    count: '38',
    img: 'casino_img',
    sell: false,
    color: '#E83061',
    rent: 80,
    price: 400,
    update: '',
    position: 'right',
    row: '9/10',
    column: '11/12',
    direction: 'main'
  },

  {
    id: 43,
    type: 'card',
    owner: null,
    count: '11',
    img: 'coffee_shop_img',
    sell: false,
    color: '#8D33FF',
    rent: 35,
    price: 175,
    update: '',
    position: 'left',
    row: '10/11',
    column: '1/2',
    direction: 'main'
  },
  {
    id: 44,
    type: 'card',
    owner: null,
    count: '6',
    img: 'kids_barber_img',
    sell: false,
    color: '#FF658E',
    rent: 28,
    price: 140,
    update: '',
    position: 'right',
    row: '10/11',
    column: '6/7',
    direction: 'branch'
  },
  {
    id: 45,
    type: 'card',
    owner: null,
    count: '39',
    img: 'hotel_royal_img',
    sell: false,
    color: '#E83061',
    rent: 70,
    price: 350,
    update: '',
    position: 'right',
    row: '10/11',
    column: '11/12',
    direction: 'main'
  },

  {
    id: 46,
    type: 'jail',
    owner: null,
    count: '10',
    img: 'jail_img',
    sell: false,
    color: null,
    rent: null,
    price: null,
    update: '',
    position: null,
    row: '11/12',
    column: '1/2',
    direction: 'main'
  },
  {
    id: 47,
    type: 'card',
    owner: null,
    count: '9',
    img: 'hot_dogs_img',
    sell: false,
    color: '#8D33FF',
    rent: 34,
    price: 170,
    update: '',
    position: 'bottom',
    row: '11/12',
    column: '2/3',
    direction: 'main'
  },
  {
    id: 48,
    type: 'card',
    owner: null,
    count: '8',
    img: 'airport_img',
    sell: false,
    color: 'transparent',
    rent: 45,
    price: 225,
    update: '',
    position: 'bottom',
    row: '11/12',
    column: '3/4',
    direction: 'main'
  },
  {
    id: 49,
    type: 'card',
    owner: null,
    count: '7',
    img: 'croissant_bakehouse_img',
    sell: false,
    color: '#8D33FF',
    rent: 36,
    price: 180,
    update: '',
    position: 'bottom',
    row: '11/12',
    column: '4/5',
    direction: 'main'
  },
  {
    id: 50,
    type: 'card',
    owner: null,
    count: '6',
    img: 'barber_shop_img',
    sell: false,
    color: '#FF658E',
    rent: 32,
    price: 160,
    update: '',
    position: 'bottom',
    row: '11/12',
    column: '5/6',
    direction: 'main'
  },
  {
    id: 51,
    type: 'corner',
    owner: null,
    count: '5',
    img: 'street_corner',
    sell: false,
    color: null,
    rent: null,
    price: null,
    update: null,
    position: null,
    row: '11/12',
    column: '6/7',
    direction: 'main'
  },
  {
    id: 52,
    type: 'card',
    owner: null,
    count: '4',
    img: 'hair_salon_img',
    sell: false,
    color: '#FF658E',
    rent: 35,
    price: 175,
    update: '',
    position: 'bottom',
    row: '11/12',
    column: '7/8',
    direction: 'main'
  },
  {
    id: 53,
    type: 'card',
    owner: null,
    count: '3',
    img: 'continantal_avenue_img',
    sell: false,
    color: '#5CD6B6',
    rent: 20,
    price: 100,
    update: '',
    position: 'bottom',
    row: '11/12',
    column: '8/9',
    direction: 'main'
  },
  {
    id: 54,
    type: 'card',
    owner: null,
    count: '2',
    img: 'old_avenue_img',
    sell: false,
    color: '#5CD6B6',
    rent: 30,
    price: 150,
    update: '',
    position: 'bottom',
    row: '11/12',
    column: '9/10',
    direction: 'main'
  },
  {
    id: 55,
    type: 'card',
    owner: null,
    count: '1',
    img: 'main_avenue_img',
    sell: false,
    color: '#5CD6B6',
    rent: 24,
    price: 120,
    update: '',
    position: 'bottom',
    row: '11/12',
    column: '10/11',
    direction: 'main'
  },
  {
    id: 56,
    type: 'start',
    owner: null,
    count: '0',
    img: 'start_img',
    sell: false,
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
    img: 'burst-8',
    row: '11/12',
    column: '11/12',
    positionStart: 0,
    positionGoTo: 0,
    direction: 'main',
    active: true,
    details: true,
    skipMove: false,
    status: null
  },
  {
    id: 2,
    name: 'Player 2',
    money: 1500,
    color: '#00DDEB',
    img: 'heart',
    row: '11/12',
    column: '11/12',
    positionStart: 0,
    positionGoTo: 0,
    direction: 'main',
    active: false,
    details: false,
    skipMove: false,
    status: null
  },
  {
    id: 3,
    name: 'Player 3',
    money: 1500,
    color: '#00CC08',
    img: 'yin-yang',
    row: '11/12',
    column: '11/12',
    positionStart: 0,
    positionGoTo: 0,
    direction: 'main',
    active: false,
    details: false,
    skipMove: false,
    status: null
  },
  {
    id: 4,
    name: 'Player 4',
    money: 1500,
    color: '#A300CC',
    img: 'pacman',
    row: '11/12',
    column: '11/12',
    positionStart: 0,
    positionGoTo: 0,
    direction: 'main',
    active: false,
    details: false,
    skipMove: false,
    status: null
  }
])

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

function finishedRound() {
  playerActiveIndex.value < players.value.length - 1
    ? playerActiveIndex.value++
    : (playerActiveIndex.value = 0)

  if (!players.value[playerActiveIndex.value].status) {
    players.value[playerActiveIndex.value].skipMove
      ? (buttonRoll.value = false)
      : (buttonRoll.value = true)

    players.value[playerActiveIndex.value].skipMove = false
  } else {
    playerActiveIndex.value < players.value.length - 1
      ? playerActiveIndex.value++
      : (playerActiveIndex.value = 0)
  }
  players.value.forEach((el) => {
    el.id === playerActiveIndex.value + 1 ? (el.active = true) : (el.active = false)
    el.id === playerActiveIndex.value + 1 ? (el.details = true) : (el.details = false)
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

function rollDice() {
  directionTop.value = false

  dice1.value = Math.floor(Math.random() * 6) + 1
  dice2.value = Math.floor(Math.random() * 6) + 1
  const total = dice1.value + dice2.value

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

  filterItem()

  showChoose.value = true

  buttonRoll.value = dice1.value === dice2.value
}

function goTo() {
  isJail()
  players.value[playerActiveIndex.value].row = itemsChoose.value[0].row
  players.value[playerActiveIndex.value].column = itemsChoose.value[0].column
  players.value[playerActiveIndex.value].direction = itemsChoose.value[0].direction

  if (itemsChoose.value[0].type === 'police') {
    players.value[playerActiveIndex.value].row = '11/12'
    players.value[playerActiveIndex.value].column = '1/2'
    players.value[playerActiveIndex.value].direction = 'main'
    players.value[playerActiveIndex.value].positionGoTo = 10

    showChoose.value = false
    jail.value = true
  }

  if (itemsChoose.value[0].type === 'go') {
    goToCasino()
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
}

function isJail() {
  if (itemsChoose.value[0].type === 'jail') {
    showChoose.value = false
    jail.value = true
  }
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
}

function isChooseCard(data) {
  itemsChoose.value = dataItem.value.filter((el) => el.id === data)

  goTo()
  showChoose.value = false
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
  } else {
    jail.value = false
    enoughMoney.value = true

    setTimeout(() => {
      enoughMoney.value = false

      jail.value = true
    }, 3000)
  }
}

function skipMove() {
  players.value[playerActiveIndex.value].skipMove = true
  jail.value = false
  buttonRoll.value = false
}

function getSurprise() {}

function getTradeItems() {
  enoughMoney.value = false
  tradeBank.value = true
  tradeItems.value = dataItem.value.filter(
    (el) => el.owner === players.value[playerActiveIndex.value].name
  )
}

function closeTradeBank() {
  tradeBank.value = false

  showChoose.value = true
}

function isGameOver() {
  dataItem.value.forEach((el) =>
    el.owner === players.value[playerActiveIndex.value].name ? (el.owner = null) : ''
  )

  players.value[playerActiveIndex.value].status = 'game over'

  setTimeout(() => {
    enoughMoney.value = false
    finishedRound()
  }, 1500)
}

function isBankrupt(){
  players.value[playerActiveIndex.value].status = 'game over'
  tradeBank.value=false
  enoughMoney.value=true
  isGameOver()
}

watch(players, () => {})

onMounted(() => {
  sortItems()
  // getTradeItems()
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

    margin: auto;
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

  &__dice-item {
    width: 44px;
    height: 44px;

    text-align: center;
    font-weight: 600;
    font-size: 36px;

    background-color: white;
    border: 1px solid black;
  }

  &__players {
    grid-column: 2/6;
    grid-row: 2/7;
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
</style>
