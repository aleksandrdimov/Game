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

        <ModalSurprise v-if="surpriseItem !== null" :item="surpriseItem" @button="performAction" />
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
      :groups="sortGroupItems"
      :upgradeItems="upgradeItems"
      :active="players[playerActiveIndex]"
      :items="dataItem"
      @open="openDetails"
      @upgrade="isUpgrade"
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
import { surprise } from '../../data/surprise'

const props = defineProps({ data: { type: Array, required: true } })

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
    upgrade: null,
    position: null,
    row: '1/2',
    column: '1/2',
    direction: 'main'
  },
  {
    id: 2,
    title: 'Puma',
    coefficient: [
      { upgrade: 400, rent: 120 },
      { upgrade: 500, rent: 175 },
      { upgrade: 600, rent: 250 }
    ],
    type: 'card',
    owner: null,
    count: '21',
    img: 'puma_img',
    sell: false,
    color: '#4D9FFF',
    rent: 60,
    price: 300,
    upgrade: 0,
    position: 'top',
    row: '1/2',
    column: '2/3',
    direction: 'main'
  },
  {
    id: 3,
    title: 'Reebok',
    coefficient: [
      { upgrade: 370, rent: 112 },
      { upgrade: 460, rent: 170 },
      { upgrade: 580, rent: 230 }
    ],
    type: 'card',
    owner: null,
    count: '22',
    img: 'reebok_img',
    sell: false,
    color: '#4D9FFF',
    rent: 56,
    price: 280,
    upgrade: 0,
    position: 'top',
    row: '1/2',
    column: '3/4',
    direction: 'main'
  },
  {
    id: 4,
    title: 'Sea Terminal',
    coefficient: [
      { upgrade: 300, rent: 100 },
      { upgrade: 350, rent: 150 },
      { upgrade: 400, rent: 200 }
    ],
    type: 'card',
    owner: null,
    count: '23',
    img: 'sea_terminal_img',
    sell: false,
    color: 'transparent',
    rent: 45,
    price: 225,
    upgrade: 0,
    position: 'top',
    row: '1/2',
    column: '4/5',
    direction: 'main'
  },
  {
    id: 5,
    title: 'Fitness Dream',
    coefficient: [
      { upgrade: 300, rent: 90 },
      { upgrade: 380, rent: 135 },
      { upgrade: 480, rent: 190 }
    ],
    type: 'card',
    owner: null,
    count: '24',
    img: 'fitness_dream_img',
    sell: false,
    color: '#FF8965',
    rent: 46,
    price: 230,
    upgrade: 0,
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
    upgrade: null,
    position: null,
    row: '1/2',
    column: '6/7',
    direction: 'main'
  },
  {
    id: 7,
    title: 'Fitness Girl',
    coefficient: [
      { upgrade: 365, rent: 110 },
      { upgrade: 460, rent: 150 },
      { upgrade: 570, rent: 200 }
    ],
    type: 'card',
    owner: null,
    count: '26',
    img: 'fitness_girl_img',
    sell: false,
    color: '#FF8965',
    rent: 55,
    price: 275,
    upgrade: 0,
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
    upgrade: null,
    position: 'top',
    row: '1/2',
    column: '8/9',
    direction: 'main'
  },
  {
    id: 9,
    title: 'Sushi Bar',
    coefficient: [
      { upgrade: 350, rent: 105 },
      { upgrade: 400, rent: 150 },
      { upgrade: 550, rent: 210 }
    ],
    type: 'card',
    owner: null,
    count: '28',
    img: 'sushi_bar_img',
    sell: false,
    color: '#7CD65C',
    rent: 53,
    price: 265,
    upgrade: 0,
    position: 'top',
    row: '1/2',
    column: '9/10',
    direction: 'main'
  },
  {
    id: 10,
    title: 'Steak House',
    coefficient: [
      { upgrade: 375, rent: 112 },
      { upgrade: 470, rent: 160 },
      { upgrade: 590, rent: 220 }
    ],
    type: 'card',
    owner: null,
    count: '29',
    img: 'steak_house_img',
    sell: false,
    color: '#7CD65C',
    rent: 56,
    price: 280,
    upgrade: 0,
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
    upgrade: null,
    position: null,
    row: '1/2',
    column: '11/12',
    direction: 'main'
  },

  {
    id: 12,
    title: 'adidas',
    coefficient: [
      { upgrade: 380, rent: 116 },
      { upgrade: 480, rent: 170 },
      { upgrade: 600, rent: 240 }
    ],
    type: 'card',
    owner: null,
    count: '19',
    img: 'adidas_img',
    sell: false,
    color: '#4D9FFF',
    rent: 58,
    price: 290,
    upgrade: 0,
    position: 'left',
    row: '2/3',
    column: '1/2',
    direction: 'main'
  },
  {
    id: 13,
    title: 'Fitness Men',
    coefficient: [
      { upgrade: 330, rent: 100 },
      { upgrade: 420, rent: 135 },
      { upgrade: 520, rent: 190 }
    ],
    type: 'card',
    owner: null,
    count: '26',
    img: 'fitness_men_img',
    sell: false,
    color: '#FF8965',
    rent: 50,
    price: 250,
    upgrade: 0,
    position: 'left',
    row: '2/3',
    column: '6/7',
    direction: 'branch'
  },
  {
    id: 14,
    title: 'Burger House',
    coefficient: [
      { upgrade: 365, rent: 110 },
      { upgrade: 460, rent: 155 },
      { upgrade: 570, rent: 215 }
    ],
    type: 'card',
    owner: null,
    count: '31',
    img: 'burger_house_img',
    sell: false,
    color: '#7CD65C',
    rent: 55,
    price: 275,
    upgrade: 0,
    position: 'right',
    row: '2/3',
    column: '11/12',
    direction: 'main'
  },

  {
    id: 15,
    title: 'PC Shop',
    coefficient: [
      { upgrade: 350, rent: 104 },
      { upgrade: 430, rent: 155 },
      { upgrade: 540, rent: 222 }
    ],
    type: 'card',
    owner: null,
    count: '18',
    img: 'pc_shop_img',
    sell: false,
    color: '#FF65DB',
    rent: 52,
    price: 260,
    upgrade: 0,
    position: 'left',
    row: '3/4',
    column: '1/2',
    direction: 'main'
  },
  {
    id: 16,
    title: 'Bessarabian Wine Shop',
    coefficient: [
      { upgrade: 380, rent: 114 },
      { upgrade: 475, rent: 160 },
      { upgrade: 600, rent: 220 }
    ],
    type: 'card',
    owner: null,
    count: '28',
    img: 'bessarabian_shop_img',
    sell: false,
    color: '#33CFFF',
    rent: 57,
    price: 285,
    upgrade: 0,
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
    upgrade: null,
    position: 'right',
    row: '3/4',
    column: '11/12',
    direction: 'main'
  },

  {
    id: 18,
    title: 'Mobile Shop',
    coefficient: [
      { upgrade: 320, rent: 96 },
      { upgrade: 400, rent: 140 },
      { upgrade: 500, rent: 205 }
    ],
    type: 'card',
    owner: null,
    count: '17',
    img: 'mobile_shop_img',
    sell: false,
    color: '#FF65DB',
    rent: 48,
    price: 240,
    upgrade: 0,
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
    upgrade: null,
    position: null,
    row: '5/6',
    column: '8/9',
    direction: 'branch'
  },
  {
    id: 20,
    title: 'Wine Valley',
    coefficient: [
      { upgrade: 425, rent: 128 },
      { upgrade: 530, rent: 180 },
      { upgrade: 665, rent: 250 }
    ],
    type: 'card',
    owner: null,
    count: '30',
    img: 'wine_valley_img',
    sell: false,
    color: '#33CFFF',
    rent: 64,
    price: 320,
    upgrade: 0,
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
    upgrade: null,
    position: null,
    row: '5/6',
    column: '6/7',
    direction: 'branch'
  },
  {
    id: 22,
    title: 'Fashion Girl',
    coefficient: [
      { upgrade: 440, rent: 132 },
      { upgrade: 550, rent: 190 },
      { upgrade: 690, rent: 270 }
    ],
    type: 'card',
    owner: null,
    count: '33',
    img: 'fashion_girl_img',
    sell: false,
    color: '#FFBB00',
    rent: 66,
    price: 330,
    upgrade: 0,
    position: 'right',
    row: '4/5',
    column: '11/12',
    direction: 'main'
  },

  {
    id: 23,
    title: 'Appluances Shop',
    coefficient: [
      { upgrade: 370, rent: 110 },
      { upgrade: 460, rent: 160 },
      { upgrade: 575, rent: 235 }
    ],
    type: 'card',
    owner: null,
    count: '16',
    img: 'appliances_shop_img',
    sell: false,
    color: '#FF65DB',
    rent: 55,
    price: 275,
    upgrade: 0,
    position: 'left',
    row: '5/6',
    column: '1/2',
    direction: 'main'
  },
  {
    id: 24,
    title: 'Electric Power',
    coefficient: [
      { upgrade: 300, rent: 100 },
      { upgrade: 350, rent: 150 },
      { upgrade: 400, rent: 200 }
    ],
    type: 'card',
    owner: null,
    count: '27',
    img: 'electric_power_img',
    sell: false,
    color: 'transparent',
    rent: 45,
    price: 225,
    upgrade: 0,
    position: 'left',
    row: '3/4',
    column: '6/7',
    direction: 'branch'
  },
  {
    id: 25,
    title: 'Bessarabian Wine Tour',
    coefficient: [
      { upgrade: 400, rent: 120 },
      { upgrade: 500, rent: 170 },
      { upgrade: 620, rent: 230 }
    ],
    type: 'card',
    owner: null,
    count: '32',
    img: 'bessarabian_tour_img',
    sell: false,
    color: '#33CFFF',
    rent: 60,
    price: 300,
    upgrade: 0,
    position: 'top',
    row: '5/6',
    column: '9/10',
    direction: 'branch'
  },
  {
    id: 26,
    title: 'Kids Clothes',
    coefficient: [
      { upgrade: 390, rent: 116 },
      { upgrade: 480, rent: 165 },
      { upgrade: 600, rent: 235 }
    ],
    type: 'card',
    owner: null,
    count: '33',
    img: 'kids_clothes_img',
    sell: false,
    color: '#FFBB00',
    rent: 58,
    price: 290,
    upgrade: 0,
    position: 'top',
    row: '5/6',
    column: '10/11',
    direction: 'branch'
  },
  {
    id: 27,
    title: 'Railway Station',
    coefficient: [
      { upgrade: 300, rent: 100 },
      { upgrade: 350, rent: 150 },
      { upgrade: 400, rent: 200 }
    ],
    type: 'card',
    owner: null,
    count: '34',
    img: 'railway_station_img',
    sell: false,
    color: 'transparent',
    rent: 45,
    price: 225,
    upgrade: 0,
    position: 'right',
    row: '5/6',
    column: '11/12',
    direction: 'main'
  },

  {
    id: 28,
    title: 'Grocery Family',
    coefficient: [
      { upgrade: 290, rent: 88 },
      { upgrade: 370, rent: 120 },
      { upgrade: 460, rent: 165 }
    ],
    type: 'card',
    owner: null,
    count: '15',
    img: 'grocery_family_img',
    sell: false,
    color: '#C5D65C',
    rent: 44,
    price: 220,
    upgrade: 0,
    position: 'left',
    row: '6/7',
    column: '1/2',
    direction: 'main'
  },
  {
    id: 29,
    title: 'Men`s Clothes',
    coefficient: [
      { upgrade: 415, rent: 124 },
      { upgrade: 515, rent: 180 },
      { upgrade: 645, rent: 250 }
    ],
    type: 'card',
    owner: null,
    count: '35',
    img: 'mens_clothes_img',
    sell: false,
    color: '#FFBB00',
    rent: 62,
    price: 310,
    upgrade: 0,
    position: 'right',
    row: '6/7',
    column: '11/12',
    direction: 'main'
  },

  {
    id: 30,
    title: 'Bus Station',
    coefficient: [
      { upgrade: 300, rent: 100 },
      { upgrade: 350, rent: 150 },
      { upgrade: 400, rent: 200 }
    ],
    type: 'card',
    owner: null,
    count: '14',
    img: 'bus_station_img',
    sell: false,
    color: 'transparent',
    rent: 45,
    price: 225,
    upgrade: 0,
    position: 'left',
    row: '7/8',
    column: '1/2',
    direction: 'main'
  },
  {
    id: 31,
    title: 'Grocery Organic',
    coefficient: [
      { upgrade: 285, rent: 86 },
      { upgrade: 360, rent: 120 },
      { upgrade: 450, rent: 160 }
    ],
    type: 'card',
    owner: null,
    count: '13',
    img: 'grocery_organic_img',
    sell: false,
    color: '#C5D65C',
    rent: 43,
    price: 215,
    upgrade: 0,
    position: 'bottom',
    row: '7/8',
    column: '2/3',
    direction: 'branch'
  },
  {
    id: 32,
    title: 'Smoke Shop',
    coefficient: [
      { upgrade: 255, rent: 76 },
      { upgrade: 320, rent: 110 },
      { upgrade: 400, rent: 155 }
    ],
    type: 'card',
    owner: null,
    count: '12',
    img: 'smoke_shop_img',
    sell: false,
    color: '#D665FF',
    rent: 38,
    price: 190,
    upgrade: 0,
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
    upgrade: 0,
    position: null,
    row: '7/8',
    column: '4/5',
    direction: 'branch'
  },
  {
    id: 34,
    title: 'Vape Shop',
    coefficient: [
      { upgrade: 280, rent: 84 },
      { upgrade: 350, rent: 180 },
      { upgrade: 440, rent: 250 }
    ],
    type: 'card',
    owner: null,
    count: '10',
    img: 'vape_shop_img',
    sell: false,
    color: '#D665FF',
    rent: 42,
    price: 210,
    upgrade: 0,
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
    upgrade: 0,
    position: null,
    row: '7/8',
    column: '6/7',
    direction: 'branch'
  },
  {
    id: 36,
    title: 'Las Vegas',
    coefficient: [
      { upgrade: 500, rent: 150 },
      { upgrade: 625, rent: 230 },
      { upgrade: 780, rent: 335 }
    ],
    type: 'card',
    owner: null,
    count: '36',
    img: 'las_vegas_1_img',
    sell: false,
    color: '#E83061',
    rent: 75,
    price: 375,
    upgrade: 0,
    position: 'right',
    row: '7/8',
    column: '11/12',
    direction: 'main'
  },
  {
    id: 37,
    title: 'Grocery',
    coefficient: [
      { upgrade: 300, rent: 92 },
      { upgrade: 380, rent: 125 },
      { upgrade: 480, rent: 175 }
    ],
    type: 'card',
    owner: null,
    count: '13',
    img: 'grocery_img',
    sell: false,
    color: '#C5D65C',
    rent: 46,
    price: 230,
    upgrade: 0,
    position: 'left',
    row: '8/9',
    column: '1/2',
    direction: 'main'
  },
  {
    id: 38,
    title: 'Hookah Shop',
    coefficient: [
      { upgrade: 265, rent: 80 },
      { upgrade: 330, rent: 115 },
      { upgrade: 415, rent: 160 }
    ],
    type: 'card',
    owner: null,
    count: '8',
    img: 'hookah_shop_img',
    sell: false,
    color: '#D665FF',
    rent: 40,
    price: 200,
    upgrade: 0,
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
    upgrade: 0,
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
    upgrade: 0,
    position: 'left',
    row: '9/10',
    column: '1/2',
    direction: 'main'
  },
  {
    id: 41,
    title: 'Water Energy',
    coefficient: [
      { upgrade: 300, rent: 100 },
      { upgrade: 350, rent: 150 },
      { upgrade: 400, rent: 200 }
    ],
    type: 'card',
    owner: null,
    count: '7',
    img: 'water_energy_img',
    sell: false,
    color: 'transparent',
    rent: 45,
    price: 225,
    upgrade: 0,
    position: 'right',
    row: '9/10',
    column: '6/7',
    direction: 'branch'
  },

  {
    id: 42,
    title: 'Casino',
    coefficient: [
      { upgrade: 530, rent: 160 },
      { upgrade: 660, rent: 245 },
      { upgrade: 830, rent: 360 }
    ],
    type: 'card',
    owner: null,
    count: '38',
    img: 'casino_img',
    sell: false,
    color: '#E83061',
    rent: 80,
    price: 400,
    upgrade: 0,
    position: 'right',
    row: '9/10',
    column: '11/12',
    direction: 'main'
  },

  {
    id: 43,
    title: 'Coffee Shop',
    coefficient: [
      { upgrade: 235, rent: 70 },
      { upgrade: 300, rent: 100 },
      { upgrade: 365, rent: 140 }
    ],
    type: 'card',
    owner: null,
    count: '11',
    img: 'coffee_shop_img',
    sell: false,
    color: '#8D33FF',
    rent: 35,
    price: 175,
    upgrade: 0,
    position: 'left',
    row: '10/11',
    column: '1/2',
    direction: 'main'
  },
  {
    id: 44,
    title: 'Barber Kids',
    coefficient: [
      { upgrade: 185, rent: 56 },
      { upgrade: 240, rent: 80 },
      { upgrade: 300, rent: 107 }
    ],
    type: 'card',
    owner: null,
    count: '6',
    img: 'kids_barber_img',
    sell: false,
    color: '#FF658E',
    rent: 28,
    price: 140,
    upgrade: 0,
    position: 'right',
    row: '10/11',
    column: '6/7',
    direction: 'branch'
  },
  {
    id: 45,
    title: 'Hotel Royal',
    coefficient: [
      { upgrade: 465, rent: 140 },
      { upgrade: 580, rent: 210 },
      { upgrade: 730, rent: 310 }
    ],
    type: 'card',
    owner: null,
    count: '39',
    img: 'hotel_royal_img',
    sell: false,
    color: '#E83061',
    rent: 70,
    price: 350,
    upgrade: 0,
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
    upgrade: 0,
    position: null,
    row: '11/12',
    column: '1/2',
    direction: 'main'
  },
  {
    id: 47,
    title: 'Hot Dogs',
    coefficient: [
      { upgrade: 225, rent: 68 },
      { upgrade: 300, rent: 100 },
      { upgrade: 360, rent: 135 }
    ],
    type: 'card',
    owner: null,
    count: '9',
    img: 'hot_dogs_img',
    sell: false,
    color: '#8D33FF',
    rent: 34,
    price: 170,
    upgrade: 0,
    position: 'bottom',
    row: '11/12',
    column: '2/3',
    direction: 'main'
  },
  {
    id: 48,
    title: 'Airport',
    coefficient: [
      { upgrade: 300, rent: 100 },
      { upgrade: 350, rent: 150 },
      { upgrade: 400, rent: 200 }
    ],
    type: 'card',
    owner: null,
    count: '8',
    img: 'airport_img',
    sell: false,
    color: 'transparent',
    rent: 45,
    price: 225,
    upgrade: 0,
    position: 'bottom',
    row: '11/12',
    column: '3/4',
    direction: 'main'
  },
  {
    id: 49,
    title: 'Croissant Bakehouse',
    coefficient: [
      { upgrade: 240, rent: 72 },
      { upgrade: 300, rent: 105 },
      { upgrade: 375, rent: 140 }
    ],
    type: 'card',
    owner: null,
    count: '7',
    img: 'croissant_bakehouse_img',
    sell: false,
    color: '#8D33FF',
    rent: 36,
    price: 180,
    upgrade: 0,
    position: 'bottom',
    row: '11/12',
    column: '4/5',
    direction: 'main'
  },
  {
    id: 50,
    title: 'Barber Shop',
    coefficient: [
      { upgrade: 215, rent: 64 },
      { upgrade: 270, rent: 90 },
      { upgrade: 335, rent: 125 }
    ],
    type: 'card',
    owner: null,
    count: '6',
    img: 'barber_shop_img',
    sell: false,
    color: '#FF658E',
    rent: 32,
    price: 160,
    upgrade: 0,
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
    upgrade: null,
    position: null,
    row: '11/12',
    column: '6/7',
    direction: 'main'
  },
  {
    id: 52,
    title: 'Hair Salon',
    coefficient: [
      { upgrade: 230, rent: 70 },
      { upgrade: 300, rent: 100 },
      { upgrade: 365, rent: 135 }
    ],
    type: 'card',
    owner: null,
    count: '4',
    img: 'hair_salon_img',
    sell: false,
    color: '#FF658E',
    rent: 35,
    price: 175,
    upgrade: 0,
    position: 'bottom',
    row: '11/12',
    column: '7/8',
    direction: 'main'
  },
  {
    id: 53,
    title: 'Continantal Avenue',
    coefficient: [
      { upgrade: 135, rent: 40 },
      { upgrade: 170, rent: 60 },
      { upgrade: 210, rent: 90 }
    ],
    type: 'card',
    owner: null,
    count: '3',
    img: 'continantal_avenue_img',
    sell: false,
    color: '#5CD6B6',
    rent: 20,
    price: 100,
    upgrade: 0,
    position: 'bottom',
    row: '11/12',
    column: '8/9',
    direction: 'main'
  },
  {
    id: 54,
    title: 'Old Avenue',
    coefficient: [
      { upgrade: 200, rent: 60 },
      { upgrade: 250, rent: 90 },
      { upgrade: 310, rent: 135 }
    ],
    type: 'card',
    owner: null,
    count: '2',
    img: 'old_avenue_img',
    sell: false,
    color: '#5CD6B6',
    rent: 30,
    price: 150,
    upgrade: 0,
    position: 'bottom',
    row: '11/12',
    column: '9/10',
    direction: 'main'
  },
  {
    id: 55,
    title: 'Main Avenue',
    coefficient: [
      { upgrade: 160, rent: 48 },
      { upgrade: 200, rent: 70 },
      { upgrade: 250, rent: 105 }
    ],
    type: 'card',
    owner: null,
    count: '1',
    img: 'main_avenue_img',
    sell: false,
    color: '#5CD6B6',
    rent: 24,
    price: 120,
    upgrade: 0,
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
    upgrade: null,
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
    color: '#F70000',
    img: 'pacman',
    row: '11/12',
    column: '11/12',
    positionStart: 0,
    positionGoTo: 0,
    direction: 'main',
    active: true,
    details: true,
    skipMove: false,
    status: null,
    doubleMove: 0
  },
  {
    id: 2,
    name: 'Player 2',
    money: 1500,
    color: '#00DDEB',
    img: 'burst-8',
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
    status: null,
    doubleMove: 0
  },
  {
    id: 4,
    name: 'Player 4',
    money: 1500,
    color: '#A300CC',
    img: 'heart',
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
])

// const players=ref(props.data)

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
// const surpriseMoney = ref(0)

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
    filterItem()

    showChoose.value = true
  }
}

function goTo() {
  if (itemsChoose.value[0].type === 'start') {
    showChoose.value = false
  }
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
}

function isJail() {
  showChoose.value = false
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

  showChoose.value = false
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

function getSurprise() {
  surpriseItem.value = null
  showChoose.value = false
  const random = Math.floor(Math.random() * 24)

  surpriseItem.value = surprise[random]
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

      players.value[playerActiveIndex.value].money =
        players.value[playerActiveIndex.value].money - money
    } else {
      players.value[playerActiveIndex.value].money =
        players.value[playerActiveIndex.value].money - surpriseItem.value.payMoney
    }
  }

  if (surpriseItem.value.type === 'go') {
    if (typeof surpriseItem.value.goTo === 'number') {
      players.value[playerActiveIndex.value].positionGoTo =
        players.value[playerActiveIndex.value].positionGoTo + surpriseItem.value.goTo
      filterItem()
    } else {
      players.value[playerActiveIndex.value].positionGoTo = Number(surpriseItem.value.goTo.count)
      players.value[playerActiveIndex.value].row = surpriseItem.value.goTo.row
      players.value[playerActiveIndex.value].column = surpriseItem.value.goTo.column
      players.value[playerActiveIndex.value].direction = 'main'
      itemsChoose.value = dataItem.value.filter(
        (el) => el.count === surpriseItem.value.goTo.count && el.direction === 'main'
      )
    }
    showChoose.value = true
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
    grid-row: 9/10;

    color: white;

    background-color: #0d3b10;
    border-radius: 4px;

    margin: 0 0 auto 0;
  }

  &__dice-wrap {
    grid-column: 8/10;
    grid-row: 8/9;

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
    color: black;

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
