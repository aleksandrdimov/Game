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
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import BoardItem from './components/BoardItem.vue'

const dataItem = ref([
  {
    count: '20',
    img: ' ',
    text: '20',
    color: null,
    rent: '',
    price: '',
    update: '',
    position: null,
  },
  {
    count: '21',
    img: ' ',
    text: '21',
    color: '  ',
    rent: '',
    price: '',
    update: '',
    position: 'top'
  },
  {
    count: '22',
    img: ' ',
    text: '22',
    color: '  ',
    rent: '',
    price: '',
    update: '',
    position: 'top'
  },
  {
    count: '23',
    img: 'sea_terminal_img',
    text: '23',
    color: "transparent",
    rent: '',
    price: '',
    update: '',
    position: 'top'
  },
  {
    count: '24',
    img: ' ',
    text: '24',
    color: '  ',
    rent: '',
    price: '',
    update: '',
    position: 'top'
  },
  {
    count: '25',
    img: 'street_corner',
    text: '25',
    color: null,
    rent: '',
    price: '',
    update: '',
    position: null
  },
  {
    count: '26',
    img: ' ',
    text: '26',
    color: '  ',
    rent: '',
    price: '',
    update: '',
    position: 'top'
  },
  {
    count: '27',
    img: ' ',
    text: '27',
    color: '  ',
    rent: '',
    price: '',
    update: '',
    position: 'top'
  },
  {
    count: '28',
    img: ' ',
    text: '28',
    color: '  ',
    rent: '',
    price: '',
    update: '',
    position: 'top'
  },
  {
    count: '29',
    img: ' ',
    text: '29',
    color: '  ',
    rent: '',
    price: '',
    update: '',
    position: 'top'
  },
  {
    count: '30',
    img: ' ',
    text: '30',
    color: null,
    rent: '',
    price: '',
    update: '',
    position: null
  },

  {
    count: '19',
    img: ' ',
    text: '19',
    color: '  ',
    rent: '',
    price: '',
    update: '',
    position: 'left'
  },
  {
    count: '26',
    img: ' ',
    text: '26s',
    color: '  ',
    rent: '',
    price: '',
    update: '',
    position: 'top'
  },
  {
    count: '31',
    img: ' ',
    text: '31',
    color: '  ',
    rent: '',
    price: '',
    update: '',
    position: 'right'
  },

  {
    count: '18',
    img: ' ',
    text: '18',
    color: '  ',
    rent: '',
    price: '',
    update: '',
    position: 'left'
  },
  {
    count: '27',
    img: ' ',
    text: '27s',
    color: '  ',
    rent: '',
    price: '',
    update: '',
    position: 'top'
  },
  {
    count: '32',
    img: ' ',
    text: '32',
    color: '  ',
    rent: '',
    price: '',
    update: '',
    position: 'right'
  },

  {
    count: '17',
    img: ' ',
    text: '17',
    color: '  ',
    rent: '',
    price: '',
    update: '',
    position: 'left'
  },
  {
    count: '28',
    img: ' ',
    text: '28s',
    color: null,
    rent: '',
    price: '',
    update: '',
    position: null
  },
  {
    count: '29',
    img: ' ',
    text: '29s',
    color: '  ',
    rent: '',
    price: '',
    update: '',
    position: 'top'
  },
  {
    count: '30',
    img: 'teleport_img',
    text: '30s',
    color: null,
    rent: '',
    price: '',
    update: '',
    position: null
  },
  {
    count: '33',
    img: ' ',
    text: '33',
    color: '  ',
    rent: '',
    price: '',
    update: '',
    position: 'right'
  },

  {
    count: '16',
    img: ' ',
    text: '16',
    color: '  ',
    rent: '',
    price: '',
    update: '',
    position: 'left'
  },
  {
    count: '31',
    img: 'electric_power_img',
    text: '31s',
    color: 'transparent',
    rent: '',
    price: '',
    update: '',
    position: 'top'
  },
  {
    count: '32',
    img: ' ',
    text: '32s',
    color: '  ',
    rent: '',
    price: '',
    update: '',
    position: 'top'
  },
  {
    count: '33',
    img: ' ',
    text: '33s',
    color: '  ',
    rent: '',
    price: '',
    update: '',
    position: 'top'
  },
  {
    count: '34',
    img: 'railway_station_img',
    text: '34',
    color: 'transparent',
    rent: '',
    price: '',
    update: '',
    position: null
  },

  {
    count: '15',
    img: ' ',
    text: '15',
    color: '  ',
    rent: '',
    price: '',
    update: '',
    position: 'left'
  },
  {
    count: '35',
    img: ' ',
    text: '35',
    color: '  ',
    rent: '',
    price: '',
    update: '',
    position: 'right'
  },

  {
    count: '14',
    img: 'bus_station_img',
    text: '14',
    color: 'transparent',
    rent: '',
    price: '',
    update: '',
    position: 'left'
  },
  {
    count: '13',
    img: ' ',
    text: '13s',
    color: '  ',
    rent: '',
    price: '',
    update: '',
    position: 'bottom'
  },
  {
    count: '12',
    img: ' ',
    text: '12s',
    color: '  ',
    rent: '',
    price: '',
    update: '',
    position: 'bottom'
  },
  {
    count: '11',
    img: 'water_energy_img',
    text: '11s',
    color: 'transparent',
    rent: '',
    price: '',
    update: '',
    position: 'bottom'
  },
  {
    count: '36',
    img: ' ',
    text: '36',
    color: '  ',
    rent: '',
    price: '',
    update: '',
    position: 'right'
  },

  {
    count: '13',
    img: ' ',
    text: '13',
    color: '  ',
    rent: '',
    price: '',
    update: '',
    position: 'left'
  },
  {
    count: '10',
    img: 'teleport_img',
    text: '10s',
    color: null,
    rent: '',
    price: '',
    update: '',
    position: null
  },
  {
    count: '9',
    img: ' ',
    text: '9s',
    color: '  ',
    rent: '',
    price: '',
    update: '',
    position: 'bottom'
  },
  {
    count: '8',
    img: ' ',
    text: '8s',
    color: null,
    rent: '',
    price: '',
    update: '',
    position: null
  },
  {
    count: '37',
    img: ' ',
    text: '37',
    color: '  ',
    rent: '',
    price: '',
    update: '',
    position: 'right'
  },

  {
    count: '12',
    img: ' ',
    text: '12',
    color: '  ',
    rent: '',
    price: '',
    update: '',
    position: 'left'
  },
  {
    count: '7',
    img: ' ',
    text: '7s',
    color: '  ',
    rent: '',
    price: '',
    update: '',
    position: 'bottom'
  },
  {
    count: '38',
    img: ' ',
    text: '38',
    color: '  ',
    rent: '',
    price: '',
    update: '',
    position: 'right'
  },

  {
    count: '11',
    img: 'coffee_shop_img',
    text: '11',
    color: 'rgb(148, 100, 55)',
    rent: '',
    price: '',
    update: '',
    position: 'left'
  },
  {
    count: '6',
    img: ' ',
    text: '6s',
    color: 'rgb(132, 156, 224)',
    rent: '',
    price: '',
    update: '',
    position: 'bottom'
  },
  {
    count: '39',
    img: ' ',
    text: '39',
    color: '  ',
    rent: '',
    price: '',
    update: '',
    position: 'right'
  },

  {
    count: '10',
    img: 'jail_img',
    text: '10',
    color: null,
    rent: '',
    price: '',
    update: '',
    position: null
  },
  {
    count: '9',
    img: 'hot_dogs_img',
    text: '9',
    color: 'rgb(148, 100, 55)',
    rent: '',
    price: '',
    update: '',
    position: 'bottom'
  },
  {
    count: '8',
    img: 'airport_img',
    text: '8',
    color: 'transparent',
    rent: '',
    price: '',
    update: '',
    position: 'bottom'
  },
  {
    count: '7',
    img: 'croissant_bakehouse_img',
    text: '7',
    color: 'rgb(148, 100, 55)',
    rent: '',
    price: '',
    update: '',
    position: 'bottom'
  },
  {
    count: '6',
    img: '',
    text: '6',
    color: 'rgb(132, 156, 224)',
    rent: '',
    price: '',
    update: '',
    position: 'bottom'
  },
  {
    count: '5',
    img: 'street_corner',
    text: '5',
    color: null,
    rent: '',
    price: '',
    update: '',
    position: null
  },
  {
    count: '4',
    img: '',
    text: '4',
    color: 'rgb(132, 156, 224)',
    rent: '',
    price: '',
    update: '',
    position: 'bottom'
  },
  {
    count: '3',
    img: 'continantal_avenue_img',
    text: '3',
    color: 'rgb(68, 177, 68)',
    rent: '',
    price: '',
    update: '',
    position: 'bottom'
  },
  {
    count: '2',
    img: 'old_avenue_img',
    text: '2',
    color: 'rgb(68, 177, 68)',
    rent: '',
    price: '',
    update: '',
    position: 'bottom'
  },
  {
    count: '1',
    img: 'main_avenue_img',
    text: '1',
    color: 'rgb(68, 177, 68)',
    rent: '',
    price: '',
    update: '',
    position: 'bottom'
  },
  {
    count: '0',
    img: 'start_img',
    text: '0',
    color: null,
    rent: null,
    price: null,
    update: null,
    position: null
  }
])
</script>

<style lang="scss" scoped>
#board {
  // display: none;
  border: 1px solid black;
  //   border-spacing: 10px;
  padding: 25px;
  //   float: left;
  color: rgb(132, 156, 224);
}

.cell {
  height: 100%;
  vertical-align: top;
  //   background-repeat: no-repeat;
  //   background-size: auto 40px;

  //   &.row {
  //     display: flex;
  //     flex-direction: row;

  //     &.left{
  //        flex-direction: row-reverse;
  //     }
  //   }
  //   &.column {
  //     display: flex;
  //     flex-direction: column;

  //     &.bottom{
  //         flex-direction: column-reverse;
  //     }
  //   }
}

.board-center {
  width: 675px;
  border: none;
  vertical-align: bottom;
  background-repeat: no-repeat;
  background-size: auto 40px;
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
    display: grid;
    grid-template-columns: repeat(11, 75px);
    grid-template-rows: repeat(11, 75px);

    gap: 1px 1px;
  }

  &__item-12 {
    grid-auto-rows: 2/3;
    grid-column: 6/7;
  }

  &__item-13 {
    grid-auto-rows: 2/3;
    grid-column: 11/12;
  }

  &__item-15 {
    grid-auto-rows: 3/4;
    grid-column: 6/7;
  }

  &__item-16 {
    grid-auto-rows: 3/4;
    grid-column: 11/12;
  }

  &__item-18 {
    grid-auto-rows: 4/5;
    grid-column: 6/7;
  }

  &__item-21 {
    grid-auto-rows: 5/6;
    grid-column: 11/12;
  }

  &__item-23 {
    grid-auto-rows: 6/7;
    grid-column: 8/9;
  }

  &__item-28 {
    grid-auto-rows: 7/8;
    grid-column: 11/12;
  }

  &__item-33 {
    grid-auto-rows: 8/9;
    grid-column: 11/12;
  }

  &__item-35 {
    grid-auto-rows: 9/10;
    grid-column: 4/5;
  }

  &__item-38 {
    grid-auto-rows: 9/10;
    grid-column: 11/12;
  }

  &__item-40 {
    grid-auto-rows: 10/11;
    grid-column: 6/7;
  }

  &__item-41 {
    grid-auto-rows: 10/11;
    grid-column: 11/12;
  }

  &__item-43 {
    grid-auto-rows: 10/11;
    grid-column: 6/7;
  }

  &__item-44 {
    grid-auto-rows: 10/11;
    grid-column: 11/12;
  }
}
</style>
