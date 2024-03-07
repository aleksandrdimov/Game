<template>
  <section class="modal-upgrade">
    <div class="modal-upgrade__wrap">
      <IconClose @click="closeUpgrade"/>
      <h3 class="modal-upgrade__title">Upgrade</h3>
      <div class="modal-upgrade__header">
        <p class="modal-upgrade__name">{{ player.name }}</p>
        <p class="modal-upgrade__money">{{ player.money }}$</p>
      </div>
      <Slider :cards="items" :upgrade="true" @active="initCard" />
      <Transition name="upgrade">
        <div v-if="activeCard !== null" class="modal-upgrade__content item">
          <h3 class="item__name">{{ activeCard.title }}</h3>
          <div class="item__container">
            <div class="item__content">
              <div class="item__text">
                Upgrade: <span>{{activeCard.upgrade<3? activeCard.upgrade:'MAX' }}</span>
                <img src="/images/icon_has_owner.svg" alt="house" />
              </div>
              <div class="item__text">
                Rent: <span>{{ activeCard.rent }}$</span>
              </div>
            </div>
            <svg v-if="activeCard.upgrade < 3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g data-name="Double Arrow Box">
                <rect x="2" y="2" width="20" height="20" rx="1" ry="1" style="fill: white" />
                <path
                  d="M12 17a1 1 0 0 1-.707-1.707L14.586 12l-3.293-3.293a1 1 0 1 1 1.414-1.414l4 4a1 1 0 0 1 0 1.414l-4 4A1 1 0 0 1 12 17z"
                  style="fill: green"
                />
                <path
                  d="M8 17a1 1 0 0 1-.707-1.707L10.586 12 7.293 8.707a1 1 0 1 1 1.414-1.414l4 4a1 1 0 0 1 0 1.414l-4 4A1 1 0 0 1 8 17z"
                  style="fill: green"
                />
              </g>
            </svg>
            <div v-if="activeCard.upgrade < 3" class="item__content">
              <div class="item__text upgrade">
                Upgrade: <span>{{ activeCard.upgrade + 1 }} </span>
                <img src="/images/icon_has_owner.svg" alt="house" />
              </div>
              <div class="item__text upgrade">
                Rent : <span>{{ rent }}$</span>
              </div>
            </div>
          </div>
          <button
            :disabled="player.money < buy || activeCard.upgrade > 2"
            class="modal-upgrade__button"
            @click="getUpgrade"
          >
            {{ activeCard.upgrade < 3 ? `Price upgrade  ${buy}$` : 'You have max upgrade' }}
          </button>
        </div>
      </Transition>
    </div>
  </section>
</template>

<script setup>
import IconClose from '../UIComponents/IconClose.vue';
import Slider from './components/Slider.vue'
import { onBeforeUpdate, ref } from 'vue'

const props = defineProps({
  items: { type: Array, required: true },
  player: { type: Object, required: true }
})

const emit = defineEmits(['upgrade', 'close'])

const playerColor = ref(props.player.color)

const activeCard = ref(null)

const rent = ref(0)
const buy = ref(0)

function initCard(data) {
  props.items.forEach((el, i) => (i === data ? (el.sell = true) : (el.sell = false)))
  activeCard.value = props.items[data]

  getValues()
}

function getValues() {
  if (activeCard.value.upgrade <= 2) {
    buy.value = activeCard.value.coefficient[activeCard.value.upgrade].upgrade

    rent.value = activeCard.value.coefficient[activeCard.value.upgrade].rent
  }
}

function getUpgrade() {
  emit('upgrade', activeCard.value.id)
  if (activeCard.value.upgrade <= 3) {
    props.player.money = props.player.money - buy.value
  }
}

function closeUpgrade() {
  emit('close')
  props.items.forEach((el) => (el.sell = false))
}

onBeforeUpdate(() => {
  getValues()
})
</script>

<style lang="scss" scoped>
.modal-upgrade {
  width: 100%;
  height: 100%;

  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;

  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(2px);

  &__wrap {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    width: 510px;
    min-height: 240px;
    // min-height: 404px;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    // padding: 0px 5px;

    background-color: white;
    border-radius: 12px;
    box-shadow: 0px 0px 10px grey;

    padding: 12px 0px;

    transition: all 0.4s ease-in-out;
  }

  &__header {
    display: flex;
    align-items: center;
    gap: 20px;

    color: black;
    font-size: 24px;
    line-height: 28px;

    & p {
      font-weight: 700;
    }
  }

  &__title {
    font-weight: 600;
    color: #2598a7;
  }

  &__button {
    cursor: pointer;
    max-width: 425px;
    width: 100%;

    font-size: 14px;
    font-weight: 700;
    line-height: 24px;
    color: white;

    background-color: #008309;
    border-radius: 4px;

    padding: 8px 12px;
    margin: 0 44px;

    &:disabled {
      cursor: auto;

      color: white;
      background-color: #646864;
    }
  }
}

.item {
  width: 100%;
  // padding: 12px 44px;
  overflow: hidden;

  display: flex;
  flex-direction: column;
  gap: 12px;

  &__name {
    text-transform: capitalize;
    text-align: center;
    font-weight: 600;
    font-size: 20px;
    line-height: 25px;
    letter-spacing: 0.5px;
    // margin-bottom: 12px;
  }

  &__container {
    display: grid;
    grid-template-columns: 1fr 44px 1fr;
    justify-content: center;
    align-items: center;
    gap: 24px;
    padding: 0 43px;

  }

  &__content {
    display: flex;
    flex-direction: column;

    color: black;

    border: 1px solid black;
    border-radius: 4px;

    padding: 6px 12px;
  }

  &__text {
    font-size: 16px;
    font-weight: 500;

    & span {
      font-size: 20px;
      font-weight: 600;
    }

    &.upgrade span {
      color: green;
    }
  }
}

.upgrade-enter-from {
  height: 0px;
}
.upgrade-enter-to {
  height: 165px;
  transition: height 0.4s ease-in-out;
}

.upgrade-leave-from {
  height: 165px;
}
.upgrade-leave-to {
  height: 0px;
  transition: height 0.4s ease-in-out;
}
</style>
