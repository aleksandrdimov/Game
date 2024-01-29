<template>
  <section class="modal-upgrade">
    <div class="modal-upgrade__wrap">
      <svg
        class="modal-upgrade__close"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        style="enable-background: new 0 0 24 24"
        xml:space="preserve"
        width="44px"
        height="44px"
        @click="closeUpgrade"
      >
        <path
          style="fill: #9ad14b"
          d="M477.261 419.64H34.738c-14.258 0-25.816-11.558-25.816-25.816v-168.28c0-14.258 11.558-25.816 25.816-25.816h442.523c14.258 0 25.816 11.558 25.816 25.816v168.28c0 14.258-11.558 25.816-25.816 25.816z"
        />
        <circle style="fill: #f7b239" cx="256.003" cy="114.998" r="22.64" />
        <path
          fill=" #f2f2f2"
          d="M301.3 258.454a8.923 8.923 0 0 0-8.923 8.923v84.615a8.923 8.923 0 0 0 17.846 0v-84.615a8.923 8.923 0 0 0-8.923-8.923zM256.921 259.98a8.922 8.922 0 0 0-12.387 2.404l-21.156 31.348-21.156-31.348a8.92 8.92 0 0 0-12.387-2.404 8.922 8.922 0 0 0-2.404 12.387l25.184 37.317-25.184 37.317a8.922 8.922 0 0 0 2.404 12.387 8.917 8.917 0 0 0 12.388-2.405l21.156-31.348 21.156 31.348a8.915 8.915 0 0 0 7.405 3.933 8.88 8.88 0 0 0 4.983-1.528 8.922 8.922 0 0 0 2.404-12.387l-25.184-37.317 25.184-37.317a8.921 8.921 0 0 0-2.406-12.387zM159.174 276.3a8.923 8.923 0 0 0 0-17.846h-50.041a8.923 8.923 0 0 0-8.923 8.923v84.615a8.923 8.923 0 0 0 8.923 8.923h50.042a8.923 8.923 0 0 0 0-17.846h-41.119v-23.552h16.098a8.923 8.923 0 0 0 0-17.846h-16.098V276.3h41.118zM402.866 258.454h-61.565a8.923 8.923 0 0 0 0 17.846h21.86v75.692a8.923 8.923 0 0 0 17.846 0V276.3h21.86a8.923 8.923 0 1 0-.001-17.846z"
        />
        <path
          style="fill: #333"
          d="M477.261 190.805H367.064l-79.76-79.76C285.353 95.503 272.063 83.436 256 83.436c-16.064 0-29.353 12.066-31.305 27.609l-79.76 79.76H34.738C15.584 190.805 0 206.389 0 225.544v168.28c0 19.156 15.584 34.738 34.738 34.738h442.523c19.156 0 34.738-15.584 34.738-34.738v-168.28c.001-19.155-15.583-34.739-34.738-34.739zm-221.26-89.522c7.562 0 13.715 6.152 13.715 13.715s-6.152 13.715-13.715 13.715-13.715-6.152-13.715-13.715c-.002-7.563 6.152-13.715 13.715-13.715zm-26.746 30.441c5.587 8.901 15.484 14.835 26.746 14.835 11.262 0 21.159-5.933 26.746-14.835l59.081 59.081H170.173l59.082-59.081zm264.899 262.1c0 9.315-7.578 16.893-16.893 16.893H34.738c-9.315 0-16.893-7.578-16.893-16.893v-168.28c0-9.315 7.578-16.893 16.893-16.893h442.523c9.315 0 16.893 7.578 16.893 16.893v168.28z"
        />
      </svg>
      <div class="modal-upgrade__header">
        <p class="modal-upgrade__name">{{ player.name }}</p>
        <p class="modal-upgrade__money">{{ player.money }}$</p>
      </div>
      <h3 class="modal-upgrade__title">Upgrade</h3>
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
import Slider from './components/Slider.vue'
import { onBeforeUpdate, onMounted, onUpdated, ref, watch } from 'vue'

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

  &__close {
    cursor: pointer;
    position: absolute;
    z-index: 10;
    right: 10px;
    top: 0;

    & path {
      transition: all 0.4s ease-in-out;
    }

    &:hover path {
      fill: red;
    }
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
    color: #d50000;
    text-transform: uppercase;
  }

  // &__name {
  //   justify-self: start;

  //   text-transform: uppercase;
  //   font-weight: 600;
  // }

  // &__money {
  //   font-weight: 700;
  // }

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

    &.max{
      grid-template-columns: auto;
    }

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
