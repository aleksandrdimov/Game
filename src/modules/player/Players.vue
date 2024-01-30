<template>
  <section class="players">
    <div class="players__wrap">
      <PlayerItem
        v-for="player in players"
        :key="player.id"
        :player="player"
        :allPlayers="players"
        :active="active"
        :upgradeItems="upgradeItems"
        :groups="groups"
        :items="items"
        @open="openDetails"
        @upgrade="isUpgrade"

      />
    </div>
    <PlayerItem class="players__bank" :player="playerBank" :groups="groups"  :active="null"/>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import PlayerItem from './components/PlayerItem.vue'
const props = defineProps({
  players: { type: Array, required: true },
  items: { type: Array, required: true },
  groups: { type: Array, required: true },
  upgradeItems: { type: Array, required: false },
  active: { type: Object, required:false }
})


const playerBank = {
  id: 5,
  name: 'Bank',
  color: '#7C7C7C',
  details: true
}

const emit = defineEmits(['open', 'upgrade'])

function openDetails(data) {
  emit('open', data)
}

function isUpgrade(data) {
  emit('upgrade', data)
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

  &__bank {
    width: 341px;
  }
}
</style>
