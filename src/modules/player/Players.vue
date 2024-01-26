<template>
  <section class="players">
    <div class="players__wrap">
      <PlayerItem v-for="player in players" :key="player.id" :player="player" :groups="groups" @open="openDetails" />
    </div>
    <PlayerItem class="players__bank" :player="playerBank" :groups="groups"/>
  </section>
</template>

<script setup>
import PlayerItem from './components/PlayerItem.vue'
const props = defineProps({
  players: { type: Array, required: true },
  groups: { type: Array, required: true },
  
})

const playerBank={
    id: 5,
    name: 'Bank',
    color: '#7C7C7C',
    details: true
  }

const emit = defineEmits(['open'])

function openDetails(data) {
  emit('open', data)
}


</script>

<style lang="scss" scoped>
.players {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &__wrap {
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 12px;

    overflow: hidden;
  }

  &__bank{
    width: 341px;
  }

}
</style>
