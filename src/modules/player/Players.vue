<template>
  <section class="players">
    <div class="players__wrap">
      <PlayerItem v-for="player in players" :key="player.id" :player="player" :groups="groups" @open="openDetails"  />
    </div>
  </section>
</template>

<script setup>
import PlayerItem from './components/PlayerItem.vue'
const props = defineProps({
  players: { type: Array, required: true },
  groups: { type: Array, required: true }
})

const emit = defineEmits('open')

function openDetails(data) {
  emit('open', data)
}
</script>

<style lang="scss" scoped>
.players {
  padding: 5px;
  &__wrap {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }
}
</style>
