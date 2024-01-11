<template>
  <section id="board" class="board">
    <div class="board__wrap">
      <BoardItem
        v-for="(item, index) in dataItem"
        :key="index"
        class="cell"
        :item="item"
        :class="`board__item-${index}`"
      />
      <div class="board__player"></div>
      
        <div class="board__dice-wrap">
          <p class="board__dice-item">{{ dice1 }}</p>
          <p class="board__dice-item">{{ dice2 }}</p>
        </div>
        <button class="board__button" @click="clickBtn">Roll Dice</button>
      
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import BoardItem from './components/BoardItem.vue'

const dataItem = ref([
  {
    count: '20',
    img: 'surprise_img',
    text: '20',
    color: null,
    rent: '',
    price: '',
    update: '',
    position: null,
    row: '1/2',
    column: '1/2'
  },
  {
    count: '21',
    img: 'puma_img',
    text: '21',
    color: 'rgb(32, 32, 219)',
    rent: '',
    price: '',
    update: '',
    position: 'top',
    row: '1/2',
    column: '2/3'
  },
  {
    count: '22',
    img: 'reebok_img',
    text: '22',
    color: 'rgb(32, 32, 219)',
    rent: '',
    price: '',
    update: '',
    position: 'top',
    row: '1/2',
    column: '3/4'
  },
  {
    count: '23',
    img: 'sea_terminal_img',
    text: '23',
    color: 'transparent',
    rent: '',
    price: '',
    update: '',
    position: 'top',
    row: '1/2',
    column: '4/5'
  },
  {
    count: '24',
    img: 'fitness_dream_img',
    text: '24',
    color: 'rgb(190, 190, 190)',
    rent: '',
    price: '',
    update: '',
    position: 'top',
    row: '1/2',
    column: '5/6'
  },
  {
    count: '25',
    img: 'street_corner',
    text: '25',
    color: null,
    rent: '',
    price: '',
    update: '',
    position: null,
    row: '1/2',
    column: '6/7'
  },
  {
    count: '26',
    img: 'fitness_girl_img',
    text: '26',
    color: 'rgb(190, 190, 190)',
    rent: '',
    price: '',
    update: '',
    position: 'top',
    row: '1/2',
    column: '7/8'
  },
  {
    count: '27',
    img: 'surprise_img',
    text: '27',
    color: '  ',
    rent: '',
    price: '',
    update: '',
    position: 'top',
    row: '1/2',
    column: '8/9'
  },
  {
    count: '28',
    img: 'sushi_bar_img',
    text: '28',
    color: '#573d3f',
    rent: '',
    price: '',
    update: '',
    position: 'top',
    row: '1/2',
    column: '9/10'
  },
  {
    count: '29',
    img: 'steak_house_img',
    text: '29',
    color: '#573d3f',
    rent: '',
    price: '',
    update: '',
    position: 'top',
    row: '1/2',
    column: '10/11'
  },
  {
    count: '30',
    img: 'police_img',
    text: '30',
    color: null,
    rent: '',
    price: '',
    update: '',
    position: null,
    row: '1/2',
    column: '11/12'
  },

  {
    count: '19',
    img: 'adidas_img',
    text: '19',
    color: 'rgb(32, 32, 219)',
    rent: '',
    price: '',
    update: '',
    position: 'left',
    row: '2/3',
    column: '1/2'
  },
  {
    count: '',
    img: 'fitness_men_img',
    text: '26s',
    color: 'rgb(190, 190, 190)',
    rent: '',
    price: '',
    update: '',
    position: 'top',
    row: '2/3',
    column: '6/7'
  },
  {
    count: '31',
    img: 'burger_house_img',
    text: '31',
    color: '#573d3f',
    rent: '',
    price: '',
    update: '',
    position: 'right',
    row: '2/3',
    column: '11/12'
  },

  {
    count: '18',
    img: 'pc_shop_img',
    text: '18',
    color: 'mediumorchid',
    rent: '',
    price: '',
    update: '',
    position: 'left',
    row: '3/4',
    column: '1/2'
  },
  {
    count: '',
    img: 'bessarabian_shop_img',
    text: '27s',
    color: 'rgb(238, 151, 151)',
    rent: '',
    price: '',
    update: '',
    position: 'top',
    row: '3/4',
    column: '6/7'
  },
  {
    count: '32',
    img: 'go_to_casino_img',
    text: '32',
    color: null,
    rent: '',
    price: '',
    update: '',
    position: 'right',
    row: '3/4',
    column: '11/12'
  },

  {
    count: '17',
    img: 'mobile_shop_img',
    text: '17',
    color: 'mediumorchid',
    rent: '',
    price: '',
    update: '',
    position: 'left',
    row: '4/5',
    column: '1/2'
  },
  {
    count: '',
    img: 'surprise_img',
    text: '28s',
    color: null,
    rent: '',
    price: '',
    update: '',
    position: null,
    row: '4/5',
    column: '6/7'
  },
  {
    count: '',
    img: 'wine_valley_img',
    text: '29s',
    color: 'rgb(238, 151, 151)',
    rent: '',
    price: '',
    update: '',
    position: 'top',
    row: '4/5',
    column: '7/8'
  },
  {
    count: '',
    img: 'teleport_img',
    text: '30s',
    color: null,
    rent: '',
    price: '',
    update: '',
    position: null,
    row: '4/5',
    column: '8/9'
  },
  {
    count: '33',
    img: 'fashion_girl_img',
    text: '33',
    color: 'rgb(167, 218, 218',
    rent: '',
    price: '',
    update: '',
    position: 'right',
    row: '4/5',
    column: '11/12'
  },

  {
    count: '16',
    img: 'appliances_shop_img',
    text: '16',
    color: 'mediumorchid',
    rent: '',
    price: '',
    update: '',
    position: 'left',
    row: '5/6',
    column: '1/2'
  },
  {
    count: '',
    img: 'electric_power_img',
    text: '31s',
    color: 'transparent',
    rent: '',
    price: '',
    update: '',
    position: 'top',
    row: '5/6',
    column: '8/9'
  },
  {
    count: '',
    img: 'bessarabian_tour_img',
    text: '32s',
    color: 'rgb(238, 151, 151)',
    rent: '',
    price: '',
    update: '',
    position: 'top',
    row: '5/6',
    column: '9/10'
  },
  {
    count: '',
    img: 'kids_clothes_img',
    text: '33s',
    color: 'rgb(167, 218, 218',
    rent: '',
    price: '',
    update: '',
    position: 'top',
    row: '5/6',
    column: '10/11'
  },
  {
    count: '34',
    img: 'railway_station_img',
    text: '34',
    color: 'transparent',
    rent: '',
    price: '',
    update: '',
    position: null,
    row: '5/6',
    column: '11/12'
  },

  {
    count: '15',
    img: 'grocery_family_img',
    text: '15',
    color: 'rgb(194, 1, 1)',
    rent: '',
    price: '',
    update: '',
    position: 'left',
    row: '6/7',
    column: '1/2'
  },
  {
    count: '35',
    img: 'mens_clothes_img',
    text: '35',
    color: 'rgb(167, 218, 218',
    rent: '',
    price: '',
    update: '',
    position: 'right',
    row: '6/7',
    column: '11/12'
  },

  {
    count: '14',
    img: 'bus_station_img',
    text: '14',
    color: 'transparent',
    rent: '',
    price: '',
    update: '',
    position: 'left',
    row: '7/8',
    column: '1/2'
  },
  {
    count: '13',
    img: 'grocery_organic_img',
    text: '13s',
    color: 'rgb(194, 1, 1)',
    rent: '',
    price: '',
    update: '',
    position: 'bottom',
    row: '7/8',
    column: '2/3'
  },
  {
    count: '',
    img: 'smoke_shop_img',
    text: '12s',
    color: 'rgb(182, 182, 0)',
    rent: '',
    price: '',
    update: '',
    position: 'bottom',
    row: '7/8',
    column: '3/4'
  },
  {
    count: '',
    img: 'water_energy_img',
    text: '11s',
    color: 'transparent',
    rent: '',
    price: '',
    update: '',
    position: 'bottom',
    row: '7/8',
    column: '4/5'
  },
  {
    count: '36',
    img: 'las_vegas_1_img',
    text: '36',
    color: 'orange',
    rent: '',
    price: '',
    update: '',
    position: 'right',
    row: '7/8',
    column: '11/12'
  },

  {
    count: '13',
    img: 'grocery_img',
    text: '13',
    color: 'rgb(194, 1, 1)',
    rent: '',
    price: '',
    update: '',
    position: 'left',
    row: '8/9',
    column: '1/2'
  },
  {
    count: '',
    img: 'teleport_img',
    text: '10s',
    color: null,
    rent: '',
    price: '',
    update: '',
    position: null,
    row: '8/9',
    column: '4/5'
  },
  {
    count: '',
    img: 'vape_shop_img',
    text: '9s',
    color: 'rgb(182, 182, 0)',
    rent: '',
    price: '',
    update: '',
    position: 'bottom',
    row: '8/9',
    column: '5/6'
  },
  {
    count: '',
    img: 'surprise_img',
    text: '8s',
    color: null,
    rent: '',
    price: '',
    update: '',
    position: null,
    row: '8/9',
    column: '6/7'
  },
  {
    count: '37',
    img: 'surprise_img',
    text: '37',
    color: '  ',
    rent: '',
    price: '',
    update: '',
    position: 'right',
    row: '8/9',
    column: '11/12'
  },

  {
    count: '12',
    img: 'surprise_img',
    text: '12',
    color: '  ',
    rent: '',
    price: '',
    update: '',
    position: 'left',
    row: '9/10',
    column: '1/2'
  },
  {
    count: '',
    img: 'hookah_shop_img',
    text: '7s',
    color: 'rgb(182, 182, 0)',
    rent: '',
    price: '',
    update: '',
    position: 'bottom',
    row: '9/10',
    column: '6/7'
  },
  {
    count: '38',
    img: 'casino_img',
    text: '38',
    color: 'orange',
    rent: '',
    price: '',
    update: '',
    position: 'right',
    row: '9/10',
    column: '11/12'
  },

  {
    count: '11',
    img: 'coffee_shop_img',
    text: '11',
    color: 'rgb(148, 100, 55)',
    rent: '',
    price: '',
    update: '',
    position: 'left',
    row: '10/11',
    column: '1/2'
  },
  {
    count: '',
    img: 'kids_barber_img',
    text: '6s',
    color: 'rgb(132, 156, 224)',
    rent: '',
    price: '',
    update: '',
    position: 'bottom',
    row: '10/11',
    column: '6/7'
  },
  {
    count: '39',
    img: 'hotel_royal_img',
    text: '39',
    color: 'orange',
    rent: '',
    price: '',
    update: '',
    position: 'right',
    row: '10/11',
    column: '11/12'
  },

  {
    count: '10',
    img: 'jail_img',
    text: '10',
    color: null,
    rent: '',
    price: '',
    update: '',
    position: null,
    row: '11/12',
    column: '1/2'
  },
  {
    count: '9',
    img: 'hot_dogs_img',
    text: '9',
    color: 'rgb(148, 100, 55)',
    rent: '',
    price: '',
    update: '',
    position: 'bottom',
    row: '11/12',
    column: '2/3'
  },
  {
    count: '8',
    img: 'airport_img',
    text: '8',
    color: 'transparent',
    rent: '',
    price: '',
    update: '',
    position: 'bottom',
    row: '11/12',
    column: '3/4'
  },
  {
    count: '7',
    img: 'croissant_bakehouse_img',
    text: '7',
    color: 'rgb(148, 100, 55)',
    rent: '',
    price: '',
    update: '',
    position: 'bottom',
    row: '11/12',
    column: '4/5'
  },
  {
    count: '6',
    img: 'barber_shop_img',
    text: '6',
    color: 'rgb(132, 156, 224)',
    rent: '',
    price: '',
    update: '',
    position: 'bottom',
    row: '11/12',
    column: '5/6'
  },
  {
    count: '5',
    img: 'street_corner',
    text: '5',
    color: null,
    rent: '',
    price: '',
    update: '',
    position: null,
    row: '11/12',
    column: '6/7'
  },
  {
    count: '4',
    img: 'hair_salon_img',
    text: '4',
    color: 'rgb(132, 156, 224)',
    rent: '',
    price: '',
    update: '',
    position: 'bottom',
    row: '11/12',
    column: '7/8'
  },
  {
    count: '3',
    img: 'continantal_avenue_img',
    text: '3',
    color: 'rgb(68, 177, 68)',
    rent: '',
    price: '',
    update: '',
    position: 'bottom',
    row: '11/12',
    column: '8/9'
  },
  {
    count: '2',
    img: 'old_avenue_img',
    text: '2',
    color: 'rgb(68, 177, 68)',
    rent: '',
    price: '',
    update: '',
    position: 'bottom',
    row: '11/12',
    column: '9/10'
  },
  {
    count: '1',
    img: 'main_avenue_img',
    text: '1',
    color: 'rgb(68, 177, 68)',
    rent: '',
    price: '',
    update: '',
    position: 'bottom',
    row: '11/12',
    column: '10/11'
  },
  {
    count: '40',
    img: 'start_img',
    text: '0',
    color: null,
    rent: null,
    price: null,
    update: null,
    position: null,
    row: '11/12',
    column: '11/12'
  }
])

const player = ref({ row: '11/12', column: '11/12', positionNumber: 0 })

const playerColumn = ref('11/12')
const playerRow = ref('11/12')

const dice1 = ref(0)
const dice2 = ref(0)

function clickBtn() {
  dice1.value = Math.floor(Math.random() * 6) + 1
  dice2.value = Math.floor(Math.random() * 6) + 1
  const total = dice1.value + dice2.value

  player.value.positionNumber + total >= 40
    ? (player.value.positionNumber = player.value.positionNumber + total - 40)
    : (player.value.positionNumber = player.value.positionNumber + total)

  dataItem.value.forEach((el) => {
    if (el.count == player.value.positionNumber) {
      playerColumn.value = el.column
      playerRow.value = el.row

      player.value.row = playerRow.value
      player.value.column = playerColumn.value
    }
  })
  console.log(total, playerColumn.value, playerRow.value, player.value.positionNumber)
}
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
  &__wrap {
    position: relative;
    display: grid;
    grid-template-columns: repeat(11, 75px);
    grid-template-rows: repeat(11, 75px);

    gap: 1px 1px;
  }

  &__player {
    position: absolute;
    z-index: 10;

    width: 20px;
    height: 20px;
    background-color: greenyellow;
    border-radius: 50%;

    grid-column: v-bind(playerColumn);
    grid-row: v-bind(playerRow);

    justify-self: center;
    align-self: center;

    transition: all 1s linear;
  }

  &__button-box {
    grid-column: 8/10;
    grid-row: 9/11;
   
  }

  &__button{
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

  &__dice-item{
    width: 50px;

    text-align: center;
    font-weight: 600;
    font-size: 36px;
  

    background-color: white;
    border: 1px solid black;
  }
}
</style>
