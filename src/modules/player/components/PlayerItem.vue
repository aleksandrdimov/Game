<template>
  <div class="player">
    <div class="player__wrap">
      <div
        v-if="player.name !== 'Bank'"
        class="player__header"
        :class="{ disabled: player.status }"
        @click="clickArrow"
      >
        <PlayerToken :player="player" :small="true" :table="true" />
        <div class="player__wrap-name">
          <h3 class="player__name">{{ player.name }}</h3>
          <img v-if="player.active" src="/images/game_dice.svg" alt="dice" class="player__active" />
        </div>

        <div v-if="playerCardNumber" class="player__card-number" :style="{ '--color': player.color }">
          <p>{{ playerCardNumber }}</p>
          <div class="player__group-item small active" :style="{ '--color': player.color }">
            <p class="player__group-owner-line"></p>
          </div>
        </div>
        <div
          class="player__arrow"
          :class="[{ active: player.details }, { disabled: player.status }]"
        >
          <img src="/images/arrow.svg" alt="arrow" />
        </div>
      </div>
      <h3 v-else class="player__name" :class="{ bank: player.name === 'Bank' }">
        {{ player.name }}
      </h3>

      <Transition name="details">
        <div
          v-if="player.details && !player.status"
          class="player__container"
          :class="{ bank: player.name === 'Bank' }"
        >
          <div class="player__content" @mouseleave="mouseHoverCard(null)">
            <div
              class="player__group"
              :class="`player__group-${index + 1}`"
              v-for="(group, index) in groups"
              :key="index"
            >
              <div
                v-if="player.name !== 'Bank'"
                class="player__group-item"
                :class="{ active: item.owner === player.name }"
                v-for="(item, idx) in group.items"
                :key="idx"
                :style="{ '--color': item.color === 'transparent' ? '#B3B3B3' : item.color }"
                @mouseover="mouseHoverCard(item)"
              >
                <p
                  class="player__group-owner-line"
                  :style="{ '--color': item.color === 'transparent' ? '#B3B3B3' : item.color }"
                ></p>
              </div>

              <div
                v-else
                class="player__group-item"
                :class="{ active: item.owner === null }"
                v-for="(item, i) in group.items"
                :key="i"
                :style="{ '--color': item.color === 'transparent' ? '#B3B3B3' : item.color }"
              >
                <p
                  class="player__group-owner-line"
                  :style="{ '--color': item.color === 'transparent' ? '#B3B3B3' : item.color }"
                ></p>
              </div>
            </div>
          </div>

          <div v-if="player.name !== 'Bank'" class="player__footer">
            <span class="player__money">{{ player.money }} $</span>

            <button
              :disabled="!upgradeItems.length || player.id !== active.id"
              @click="toggleUpgrade"
              class="player__button"
            >
              upgrade
            </button>

            <button :disabled="disabledTrade" class="player__button" @click="toggleTrade">
              trade
            </button>
          </div>
          <div v-else class="player__bank">
            <div class="player__bank-owner">
              <span class="player__no-owner">{{ 42 - ownerNumber }}</span>
              <img src="/images/icon_no_owner.svg" alt="item" />
            </div>
            <div class="player__bank-owner">
              <span class="player__has-owner">{{ ownerNumber }}</span>
              <img src="/images/icon_has_owner.svg" alt="item" />
            </div>
          </div>
        </div>
      </Transition>
    </div>
    <TransitionGroup>
      <ModalUpgrade
        v-if="showUpgrade"
        :items="upgradeItems"
        :player="player"
        @upgrade="getUpgrade"
        @close="toggleUpgrade"
      />

      <ModalTrade
        v-if="showTrade"
        @close="toggleTrade"
        @disabled="isDisabled"
        :items="items"
        :allPlayers="allPlayers"
        :active="active"
      />

      <ModalCardHover v-if="showCardHover" :item="cardHover" :player-id="player.id" />
    </TransitionGroup>
  </div>
</template>

<script setup>
import ModalCardHover from '@/modules/modal/ModalCardHover.vue'
import PlayerToken from './PlayerToken.vue'
import ModalUpgrade from '@/modules/modal/ModalUpgrade.vue'
import ModalTrade from '@/modules/modal/ModalTrade.vue'
import { onBeforeUpdate, onMounted, onUpdated, ref, watch } from 'vue'

const props = defineProps({
  player: { type: Object, required: true },
  allPlayers: { type: Array, required: true },
  items: { type: Array, required: true },
  groups: { type: Array, required: true },
  upgradeItems: { type: Array, required: false },
  active: { type: Object, required: true }
})


const emit = defineEmits(['open', 'upgrade'])

function clickArrow() {
  emit('open', props.player.id)
}

function getUpgrade(data) {
  emit('upgrade', data)
}

const playerColor = ref(props.player.color)
const playerBg = ref('')
const playerHover = ref('')
const moneyColor = ref('')
const showUpgrade = ref(false)
const showTrade = ref(false)

const disabledTrade = ref(true)

const showCardHover = ref(false)
const cardHover = ref(null)
const playerCardNumber = ref(0)

function getPlayerColors(bg, hover) {
  playerBg.value = bg
  playerHover.value = hover
}

const typeColor = [
  { color: '#F70000', name: 'red' },
  { color: '#00DDEB', name: 'aqua' },
  { color: '#00CC08', name: 'green' },
  { color: '#A300CC', name: 'purple' },
  { color: '#100CFD', name: 'blue' },
  { color: '#DDDD00', name: 'yellow' },
  { color: '#FF9900', name: 'orange' },
  { color: '#7C7C7C', name: 'grey' }
]

const itemColor = {
  red: { colorBorder: '#F70000', colorBg: '#FFF5F5', colorHover: '#F8E2E2' },
  aqua: { colorBorder: '#00DDEB', colorBg: '#F5FEFF', colorHover: '#E2F7F8' },
  green: { colorBorder: '#00CC08', colorBg: '#F5FFF5', colorHover: '#E2F8E3' },
  purple: { colorBorder: '#A300CC', colorBg: '#FDF5FF', colorHover: '#F4E2F8' },
  blue: { colorBorder: '#100CFD', colorBg: '#E9E9F5', colorHover: '#D2D2F6' },
  yellow: { colorBorder: '#DDDD00', colorBg: '#F5F5E9', colorHover: '#F4F4D0' },
  orange: { colorBorder: '#FF9900', colorBg: '#F5F0E8', colorHover: '#F6E7D0' },
  grey: { colorBorder: '#7C7C7C', colorBg: '#FAFAFA', colorHover: '#FAFAFA' }
}

function getColor() {
  if (props.player.money > 700) {
    moneyColor.value = 'rgb(33, 158, 33)'
  } else if (props.player.money <= 700 && props.player.money > 250) {
    moneyColor.value = 'orange'
  } else moneyColor.value = 'rgb(240, 24, 24)'

  let color
  typeColor.forEach((el) => (el.color === props.player.color ? (color = el.name) : ''))

  if (!props.player.status) {
    getPlayerColors(itemColor[color].colorBg, itemColor[color].colorHover)
  } else {
    getPlayerColors(' #646864', ' #646864')
  }
}

function getDisabledTrade() {
  disabledTrade.value = !props.player.finishedRound
}

const ownerNumber = ref(0)

function calcOwnerCard() {
  ownerNumber.value = 0
  if (props.player.name === 'Bank') {
    props.groups.forEach((group) => {
      group.items.forEach((el) => {
        el.owner ? ownerNumber.value++ : ''
        return ownerNumber.value
      })
    })
  }
}

function toggleUpgrade() {
  showUpgrade.value = !showUpgrade.value
}

function toggleTrade() {
  showTrade.value = !showTrade.value
}

function isDisabled() {
  toggleTrade();
  disabledTrade.value=true
}

function mouseHoverCard(el) {
  if (el !== null) {
    cardHover.value = el
    showCardHover.value = true
  } else {
    showCardHover.value = false
  }
}

function calcCardNumber() {
  playerCardNumber.value = props.items.filter((el) => el.owner === props.player.name).length
}

// watch(props.groups, () => {
//   isUpgrade()
// })

onMounted(() => {
  getColor()
  getDisabledTrade()
  calcOwnerCard()
  calcCardNumber()
})

onBeforeUpdate(() => {
  getDisabledTrade()
})

onUpdated(() => {
  getColor()
  // getDisabledTrade()

  calcOwnerCard()
  calcCardNumber()
})
</script>

<style lang="scss" scoped>
.player {
  width: 100%;

  &__wrap {
    background-color: v-bind(playerBg);
    border-radius: 4px;
    border: 1px solid v-bind(playerColor);

    transition: background-color 0.3s ease-in-out;
  }

  &__header {
    cursor: pointer;
    display: grid;
    grid-template-columns: 24px 1fr 44px 44px;
    align-items: center;

    gap: 12px;

    padding: 3px 16px 0;
    overflow: hidden;

    &:hover {
      background-color: v-bind(playerHover);
    }

    &.disabled {
      cursor: auto;
      pointer-events: none;
    }
  }

  &__wrap-name {
    display: flex;
    gap: 12px;
  }

  &__name {
    justify-self: start;

    text-transform: capitalize;
    font-size: 16x;
    font-weight: 600;
    color: black;

    &.bank {
      padding: 16px 16px 0;
    }
  }

  &__money {
    font-size: 18px;
    font-weight: 700;
    color: v-bind(moneyColor);
  }

  &__arrow {
    cursor: pointer;
    width: 44px;
    height: 44px;

    grid-column: 4/5;

    display: flex;
    justify-content: center;
    align-items: center;

    &.disabled {
      pointer-events: none;
      cursor: auto;
    }

    & img {
      width: 16px;
      height: 16px;

      transition: transform 0.3s ease-in-out;
    }

    &.active img {
      transform: rotate(180deg);
    }
  }

  &__container {
    height: 318px;
    // width: 100%;

    display: flex;
    flex-direction: column;

    gap: 20px;
    overflow: hidden;

    &.bank {
      height: max-content;
    }
  }

  &__content {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(5, 38px);

    gap: 8px 32px;
    padding: 20px 16px 0px;
  }

  &__group {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 4px;
  }

  &__group-13 {
    grid-column: 1/3;

    justify-self: start;
    gap: 4px;
  }

  &__group-item {
    position: relative;
    --color: black;

    width: 24px;
    height: 36px;

    border: 1px solid var(--color);
    border-radius: 4px;

    padding: 2px;

    &.active {
      background-color: var(--color);

      & .player__group-owner-line {
        width: 20px;
        height: 6px;

        top: 1px;
        left: 1px;

        background-color: white;
        border-radius: 4px;
      }
      &.small {
        height: 24px;
        width: 16px;
        background-color: rgb(82, 82, 82);
        border-color:  rgb(39, 39, 39);


        & .player__group-owner-line {
          width: 12px;
          height: 4px;
        }
      }
    }

    &:hover .card-item {
      display: block;
    }
  }

  &__group-owner-line {
    --color: #b3b3b3;
    width: 100%;
    height: 7px;

    position: absolute;
    z-index: 3;
    top: 0;
    left: 0;

    background-color: var(--color);
  }

  &__card-number {
    --color: white;

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;

    & p {
      color: black;
      font-weight: 600;
      font-size: 18px;
    }
  }

  &__footer {
    display: grid;
    grid-template-columns: 1.5fr 1fr 1fr;
    gap: 12px;

    padding: 0px 16px;
  }

  &__button {
    cursor: pointer;

    text-transform: capitalize;
    font-weight: 700;
    font-size: 14px;
    line-height: 24px;
    color: white;

    background-color: #2598a7;
    border-radius: 4px;
    border: 0;

    padding: 4px 12px;

    &:disabled {
      cursor: auto;

      color: white;
      background-color: #646864;
    }
  }

  &__bank {
    display: flex;
    gap: 12px;

    padding: 0 16px 16px;
  }

  &__bank-owner {
    display: flex;
    align-items: center;
    gap: 4px;

    & span {
      font-size: 18px;
      font-weight: 700;
      line-height: 20px;
    }
  }

  &__has-owner {
    color: #ca5f63;
  }

  &__no-owner {
    color: #12a11b;
  }
}

.card-item {
  display: none;
  position: absolute;
  z-index: 100;

  top: 40px;
  left: 0;

  width: 70px;
  height: 120px;
  background-color: white;
}

.details-enter-from {
  height: 0px;
}

.details-enter-to {
  height: 318px;
  transition: all 0.4s ease-in;
}

.details-leave-to {
  height: 0px;
  opacity: 0;
  transition: all 0.4s ease-in;
}
</style>
