<template>
  <div class="input">
    <h3 class="input__title">
      Player {{ player.id }}
      <p>Choose params</p>
    </h3>
    <div class="input__header">
      <label>Name :</label>
      <input type="text" ref="inputName" @change="isCheckName" />
    </div>
    <div class="input__wrap">
      <div class="input__color">
        <span>Color :</span>
        <span
          class="input__radio"
          :class="[
            { active: data[index].active && player.id === data[index].label },
            { disabled: data[index].active && player.id !== data[index].label }
          ]"
          v-for="(color, index) in data"
          :key="index"
          :value="color.color"
          :style="{ '--color-radio': color.color }"
          @click="isActiveColor(index)"
        />
      </div>

      <div class="input__token token">
        <p class="input__token-title">Token :</p>

        <div class="token__wrap">
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
      playerColor.value = el.color

      el.active = !el.active
      el.label = props.player.id
      el.name = inputName.value.value

      props.player.color = el.color
      props.player.name = inputName.value.value

      props.tokens.forEach((token) => {
        if (token.active && token.label === el.label) el.token = token.name
      })
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
      el.label = props.player.id

      props.player.img = el.name
      props.player.name = inputName.value.value

      props.data.forEach((item) =>
        item.label == props.player.id ? (item.token = el.name) : (item.token = null)
      )
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
  gap: 12px;

  border: 1px solid grey;
  border-radius: 6px;

  padding: 16px;

  &__title {
    text-align: center;
    font-weight: 600;
  }

  &__header {
    display: flex;
    gap: 12px;
  }

  &__wrap {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  &__color {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  &__radio {
    --color-radio: grey;
    cursor: pointer;
    width: 24px;
    height: 24px;

    border: 2px solid var(--color-radio);
    border-radius: 50%;

    transition: background-color 0.3s ease-in-out;

    &.active {
      background-color: var(--color-radio);
    }

    &.disabled {
      cursor: auto;
      pointer-events: none;
      border-color: grey;
      background-color: grey;
    }
  }
}

.token {
  --color-token: grey;
  &__wrap {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(52px, 80px));
    justify-content: center;
    justify-items: center;
    gap: 8px;
  }

  &__item-wrap {
    position: relative;
    & span {
      display: none;
      position: absolute;
      z-index: 10;
      bottom: 0px;
      left: 0;
      width: 100%;
      border: 1px solid var(--color-token);
      box-shadow: 0px 2px 4px var(--color-token);
    }

    &.active span {
      display: block;
    }
  }

  &__item {
    cursor: pointer;
    width: 32px;
    height: 32px;

    margin: 10px;

    transition: all 0.4s linear;

    &.tringle.active span {
      bottom: 0;
      left: 20px;
    }

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

    &.triangle {
      width: 0;
      height: 0;
      border-left: 16px solid transparent;
      border-right: 16px solid transparent;
      background-color: transparent;

      border-bottom: 32px solid var(--color-token);
    }

    &.pacman {
      position: relative;
      width: 0px;
      height: 0px;
      border-left: 16px solid transparent;
      border-top: 16px solid var(--color-token);
      border-right: 16px solid var(--color-token);
      border-bottom: 16px solid var(--color-token);
      border-top-left-radius: 16px;
      border-top-right-radius: 16px;
      border-bottom-left-radius: 16px;
      border-bottom-right-radius: 16px;

      &::after {
        content: '';
        position: absolute;
        top: -10px;
        left: 0;
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background-color: white;
      }
    }

    &.yin-yang {
      width: 30px;
      box-sizing: content-box;
      height: 15px;
      background: #eee;
      border-color: var(--color-token);
      border-style: solid;
      border-width: 1px 1px 15px 1px;
      border-radius: 100%;
      position: relative;

      &:before {
        content: '';
        position: absolute;
        top: 50%;
        left: 0;
        background: #eee;
        border: 6px solid var(--color-token);
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
        border: 6px solid #eee;
        border-radius: 100%;
        width: 4px;
        height: 4px;
        box-sizing: content-box;
      }
    }

    &.burst-8 {
      background: var(--color-token);
      width: 28px;
      height: 28px;
      position: relative;
      text-align: center;
      transform: rotate(20deg);

      &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        height: 28px;
        width: 28px;
        background: var(--color-token);
        transform: rotate(135deg);
      }
    }

    &.heart {
      position: relative;
      width: 32px;
      height: 32px;

      &:before,
      &:after {
        position: absolute;
        content: '';
        left: 14px;
        top: 0;
        width: 20px;
        height: 32px;
        background: var(--color-token);
        border-radius: 18px 18px 0 0;
        transform: rotate(-45deg);
        transform-origin: 0 100%;
      }

      &:after {
        left: -6px;
        transform: rotate(45deg);
        transform-origin: 100% 100%;
      }
    }
  }
}
</style>