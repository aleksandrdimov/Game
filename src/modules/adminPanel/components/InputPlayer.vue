<template>
  <div class="input">
    <h3 class="input__title">Player {{ player.id }}</h3>
    <div class="input__wrap">
      <div class="input__item">
        <label class="input__item-title">Name</label>
        <input type="text" ref="inputName" @change="isCheckName" />
      </div>

      <div class="input__item">
        <p class="input__item-title">Color</p>
        <div class="input__item-container">
          <div
            class="input__color"
            v-for="(color, index) in data"
            :key="index"
            :class="[
              { active: data[index].active && player.id === data[index].label },
              { disabled: data[index].active && player.id !== data[index].label }
            ]"
          >
            <span
              class="input__radio"
              :style="{ '--color-radio': color.color }"
              @click="isActiveColor(index)"
            />
          </div>
        </div>
      </div>

      <div class="input__item token">
        <p class="input__item-title">Token</p>

        <div class="input__item-container">
          <div
            class="token__item-wrap"
            :class="{ active: tokens[index].active && player.id === tokens[index].label }"
            :style="{
              '--color-token':
                tokens[index].active && player.id !== tokens[index].label ? 'grey' : playerColor
            }"
            v-for="(token, index) in tokens"
            :key="index"
          >
            <div
              class="token__item"
              :class="[
                token.name,
                { active: tokens[index].active && player.id === tokens[index].label },
                { disabled: tokens[index].active && player.id !== tokens[index].label }
              ]"
              :style="{
                '--color-token':
                  tokens[index].active && player.id !== tokens[index].label ? 'grey' : playerColor
              }"
              @click="isActiveToken(index)"
            ></div>
            <span></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  player: { type: Object, required: false },
  data: { type: Array, required: false },
  tokens: { type: Array, required: false }
})

const playerColor = ref('grey')

const emit = defineEmits(['send'])

const inputName = ref(null)

function isActiveColor(index) {
  props.data.forEach((el, i) => {
    if (i === index) {
      el.active = !el.active
      if (el.active === true) {
        playerColor.value = el.color

        el.label = props.player.id
        el.name = inputName.value.value

        props.player.color = el.color
        props.player.name = inputName.value.value

        props.tokens.forEach((token) => {
          if (token.active && token.label === el.label) el.token = token.name
        })
      } else {
        props.player.color = null
        playerColor.value = 'grey'
      }
    } else {
      if (el.label === props.player.id) {
        el.active = false
        el.label = null
        el.name = null
        el.token = null
      }
    }
  })
}

function isActiveToken(index) {
  props.tokens.forEach((el, i) => {
    if (i === index) {
      el.active = !el.active
      if (el.active === true) {
        el.label = props.player.id

        props.player.img = el.name
        props.player.name = inputName.value.value

        props.data.forEach((item) =>
          item.label == props.player.id ? (item.token = el.name) : (item.token = null)
        )
      } else {
        el.token = null
        props.player.img = null
        props.data.forEach((item) => (item.token = null))
      }
    } else {
      if (el.label === props.player.id) {
        el.active = false
        el.label = null
        el.token = null
      }
    }
  })
}

function isCheckName() {
  props.player.name = inputName.value.value
}

watch(props.player, () => {
  isCheckName()
})
</script>

<style lang="scss" scoped>
.input {
  display: flex;
  flex-direction: column;
  gap: 16px;

  color: black;

  border-radius: 8px;
  background-color: white;

  padding: 20px;

  &__title {
    font-size: 24px;
    line-height: 28px;
    font-weight: 700;
  }

  &__wrap {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  &__item {
    width: 200px;

    display: flex;
    flex-direction: column;
    gap: 4px;

    & input {
      font-size: 16px;
      font-weight: 400;
      line-height: 24px;

      border-radius: 4px;
      border: 2px solid #a8bda8;

      padding: 8px 16px;

      transition: border-color 0.3s ease-in-out;

      &:hover {
        border-color: #6f906f;
      }

      &:focus {
        outline: none;
        border-color: #6f906f;
      }
    }
  }

  &__item-title {
    font-style: 14px;
    font-weight: 400;
    line-height: 24px;
  }

  &__item-container {
    width: 100%;

    display: grid;
    grid-template-columns: repeat(4, 40px);
    justify-items: center;
    align-items: center;
  }

  &__color {
    width: 40px;
    height: 40px;

    padding: 8px;

    &.active {
      border-bottom: 2px solid #6e916e;
    }

    &.disabled {
      cursor: auto;
      pointer-events: none;

      & span {
        border-color: grey;
        background-color: grey;
      }
    }
  }

  &__radio {
    --color-radio: grey;
    cursor: pointer;

    display: block;
    width: 24px;
    height: 24px;

    border: 2px solid var(--color-radio);
    background-color: var(--color-radio);

    border-radius: 50%;

    transition: background-color 0.3s ease-in-out;
  }
}

.token {
  --color-token: grey;

  &__item-wrap {
    position: relative;
    & span {
      display: none;
      position: absolute;
      z-index: 10;
      bottom: 0px;
      left: 0;
      width: 100%;
      border: 1px solid #6e916e;
    }

    &.active span {
      display: block;
    }
  }

  &__item {
    cursor: pointer;
    width: 24px;
    height: 24px;

    margin: 8px;

    transition: all 0.4s linear;

    &.disabled {
      cursor: auto;
      pointer-events: none;
    }

    &.square {
      background-color: var(--color-token);
    }

    &.circle {
      background-color: var(--color-token);
      border-radius: 50%;
    }

    // &.triangle {
    //   width: 0;
    //   height: 0;
    //   border-left: 16px solid transparent;
    //   border-right: 16px solid transparent;
    //   background-color: transparent;

    //   border-bottom: 32px solid var(--color-token);
    // }

    &.pacman {
      position: relative;
      width: 0px;
      height: 0px;
      border-left: 12px solid transparent;
      border-top: 12px solid var(--color-token);
      border-right: 12px solid var(--color-token);
      border-bottom: 12px solid var(--color-token);
      border-top-left-radius: 12px;
      border-top-right-radius: 12px;
      border-bottom-left-radius: 12px;
      border-bottom-right-radius: 12px;

      &::after {
        content: '';
        position: absolute;
        top: -8px;
        left: 0;
        width: 3.5px;
        height: 3.5px;
        border-radius: 50%;
        background-color: white;
      }
    }

    &.yin-yang {
      width: 24px;
      box-sizing: content-box;
      height: 12px;
      background: #eee;
      border-color: var(--color-token);
      border-style: solid;
      border-width: 1px 1px 12px 1px;
      border-radius: 100%;
      position: relative;

      &:before {
        content: '';
        position: absolute;
        top: 50%;
        left: 0;
        background: #eee;
        border: 4px solid var(--color-token);
        border-radius: 100%;
        width: 4px;
        height: 4px;
        box-sizing: content-box;
      }

      &:after {
        content: '';
        position: absolute;
        top: 50%;
        right: 0;
        background: var(--color-token);
        border: 4px solid #eee;
        border-radius: 100%;
        width: 4px;
        height: 4px;
        box-sizing: content-box;
      }
    }

    &.burst-8 {
      background: var(--color-token);
      width: 20px;
      height: 20px;
      position: relative;
      text-align: center;
      transform: rotate(20deg);

      &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        height: 20px;
        width: 20px;
        background: var(--color-token);
        transform: rotate(135deg);
      }
    }

    &.heart {
      position: relative;
      width: 24px;
      height: 24px;

      &:before,
      &:after {
        position: absolute;
        content: '';
        left: 12px;
        top: 0;
        width: 14px;
        height: 24px;
        background: var(--color-token);
        border-radius: 18px 18px 0 0;
        transform: rotate(-45deg);
        transform-origin: 0 100%;
      }

      &:after {
        left: -2px;
        transform: rotate(45deg);
        transform-origin: 100% 100%;
      }
    }
  }
}
</style>
