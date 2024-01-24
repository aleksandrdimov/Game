<template>
  <div class="player">
    <div class="player__wrap">
      <div v-if="player.name !== 'Bank'" class="player__header" @click="clickArrow">
        <PlayerToken :player="player" :small="true" :table="true" />
        <div class="player__wrap-name">
          <h3 class="player__name">{{ player.name }}</h3>
          <img v-if="player.active" src="/images/game_dice.svg" alt="dice" class="player__active" />
        </div>

        <div class="player__arrow" :class="{ active: player.details }">
          <img src="/images/arrow.svg" alt="arrow" />
        </div>
      </div>
      <h3 v-else class="player__name" :class="{ bank: player.name === 'Bank' }">
        {{ player.name }}
      </h3>

      <Transition name="details">
        <div v-if="player.details" class="player__container" :class="{ bank: player.name === 'Bank' }">
          <div class="player__content">
            <div class="player__group" :class="`player__group-${index + 1}`" v-for="(group, index) in groups"
              :key="index">
              <div v-if="player.name !== 'Bank'" class="player__group-item"
                :class="{ active: item.owner === player.name }" v-for="(item, idx) in group.items" :key="idx"
                :style="{ '--color': item.color === 'transparent' ? '#B3B3B3' : item.color }">
                <p class="player__group-owner-line"
                  :style="{ '--color': item.color === 'transparent' ? '#B3B3B3' : item.color }"></p>
              </div>

              <div v-else class="player__group-item" :class="{ active: item.owner }" v-for="(item, i) in group.items"
                :key="i" :style="{ '--color': item.color === 'transparent' ? '#B3B3B3' : item.color }">
                <p class="player__group-owner-line"
                  :style="{ '--color': item.color === 'transparent' ? '#B3B3B3' : item.color }"></p>
              </div>
            </div>
          </div>

          <div v-if="player.name !== 'Bank'" class="player__footer">
            <span class="player__money">{{ player.money }} $</span>

            <button class="player__button">upgrade</button>

            <button class="player__button">trade</button>
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
    <Transition>
      <ModalUpgrade v-if="upgrade" :groups="upgradeGroups" :player="player" />
    </Transition>
  </div>
</template>

<script setup>
import PlayerToken from './PlayerToken.vue';
import ModalUpgrade from '@/modules/modal/ModalUpgrade.vue'
import { onMounted, onUpdated, ref, watch } from 'vue'

const props = defineProps({
  player: { type: Object, required: true },
  groups: { type: Array, required: true }
})

const emit = defineEmits(['open'])

function clickArrow() {
  emit('open', props.player.id)
}

const playerColor = ref(props.player.color)
const playerBg = ref('')
const playerHover = ref('')
const moneyColor = ref('')
const upgrade = ref(false)
const upgradeGroups = ref([])

function getPlayerColors(bg, hover) {
  playerBg.value = bg
  playerHover.value = hover
}

function getColor() {
  if (props.player.money > 700) {
    moneyColor.value = 'rgb(33, 158, 33)'
  } else if (props.player.money <= 700 && props.player.money > 250) {
    moneyColor.value = 'orange'
  } else moneyColor.value = 'rgb(240, 24, 24)'

  if (props.player.color === 'red') {
    getPlayerColors('#FFF5F5', '#F8E2E2')
  } else if (props.player.color === '#00DDEB') {
    getPlayerColors('#F5FEFF', '#E2F8E3')
  } else if (props.player.color === '#00CC08') {
    getPlayerColors('#F5FFF5', '#E2F7F8')
  } else if (props.player.color === '#A300CC') {
    getPlayerColors('#FDF5FF', '#F4E2F8')
  } else {
    getPlayerColors('#FAFAFA', '#FAFAFA')
  }
}

function isUpgrade() {
  upgradeGroups.value = []
  props.groups.forEach((group) => {
    let result
    group.items.find((item) => (item.owner !== props.player.name ? '' : (result = true)))
    result ? (upgradeGroups.value = [...upgradeGroups.value, { ...group }]) : ''
  })
}

const ownerNumber = ref(0)

function calcOwnerCard() {
  ownerNumber.value = 0
  if (props.player.name === 'Bank') {
    props.groups.forEach(group => {
      group.items.forEach(el => {
        el.owner ? ownerNumber.value++ : ''
        return ownerNumber.value
      })
    })
  }
}

function getUpgradeGroups() {
  upgrade.value = true
}

onMounted(() => {
  getColor()
  isUpgrade()
  calcOwnerCard()
})

onUpdated(() => {
  getColor()
  isUpgrade()
  calcOwnerCard()
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
    display: grid;
    grid-template-columns: 24px 1fr 44px;
    align-items: center;

    gap: 12px;

    padding: 3px 16px 0;
    overflow: hidden;

    &:hover {
      background-color: v-bind(playerHover);
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

    grid-column: 3/4;

    display: flex;
    justify-content: center;
    align-items: center;

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
    color: #CA5F63;
  }

  &__no-owner {
    color: #12A11B;
  }

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
