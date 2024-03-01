<template>
  <div class="dice">
    <p
      class="dice__item"
      :class="[{ active: dot.active }, { anim: dot.anim }]"
      :style="{ '--delay-anim': index * 0.05+'s' }"
      v-for="(dot, index) in diceDots"
      :key="index"
    ></p>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'

const props = defineProps({
  dice: { type: Number, required: false },
  roll: { type: Boolean, required: false }
})


const diceDots = ref([
  { active: true, anim: false },
  { active: true, anim: false },
  { active: true, anim: false },
  { active: true, anim: false },
  { active: true, anim: false },
  { active: true, anim: false },
  { active: true, anim: false },
  { active: true, anim: false },
  { active: true, anim: false }
])

const indexActive = [
  {
    active: [4]
  },
  {
    active: [0, 8]
  },
  {
    active: [0, 4, 8]
  },
  {
    active: [0, 2, 6, 8]
  },
  {
    active: [0, 2, 4, 6, 8]
  },
  {
    active: [0, 2, 3, 5, 6, 8]
  }
]

function activeDots() {
  if (props.dice &&props.roll) {
    diceDots.value.forEach((el) => {
      el.active = false
      el.anim = true
    })

    setTimeout(() => {
        diceDots.value.forEach((el) => {
          el.anim = false
        })
      indexActive[props.dice - 1].active.forEach((el) => {
        diceDots.value[el].active = true
      })

    }, 1300)
  }
}

watch(props, () => {
  activeDots()
})

// onMounted(() => {
//   activeDots()
// })
</script>

<style lang="scss" scoped>
.dice {
  width: 44px;
  height: 44px;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 3px;

  background-color: white;
  border: 1px solid #0d3b10;
  border-radius: 4px;

  padding: 6px;

  &__item {
    --delay-anim:0;
    width: 8px;
    height: 8px;

    background-color: white;
    border-radius: 50%;

    transition: background-color 0.3s ease-in-out;

    &.active {
      background-color: #0d3b10;
    }

    &.anim {
      animation: anim 0.4s infinite var(--delay-anim);
    }
  }
}

@keyframes anim {
  0% {
    background-color: white;
  }
  50% {
    background-color: #0d3b10;
  }
  100% {
    background-color: white;
  }
}
</style>
