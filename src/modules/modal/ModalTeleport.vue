<template>
  <div class="modal-teleport">
    <div class="modal-teleport__wrap">
      <img class="modal-teleport__image-edge" src="/images/teleport_anim_top.png" alt="teleport" />
      <img class="modal-teleport__image" src="/images/teleport_anim_center.png" alt="teleport" />
      <img
        class="modal-teleport__image-edge"
        src="/images/teleport_anim_bottom.png"
        alt="teleport"
      />

      <PlayerToken class="modal-teleport__token" :player="player"/>
    </div>
  </div>
</template>

<script setup>
import PlayerToken from '../player/components/PlayerToken.vue'

const props = defineProps({ player: { type: Object, required: true } })
</script>

<style lang="scss" scoped>
.modal-teleport {
  width: 100%;
  height: 100%;

  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;

  &__wrap {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    width: 300px;
    height: 350px;

    display: flex;
    flex-direction: column;
    justify-content: end;
    align-items: center;
    // gap: 24px;

    background-color: #06021a;
    border-radius: 15px;
    box-shadow: 0px 0px 10px grey;

    padding: 25px;
  }

  &__image {
    width: 100%;
    animation: teleport 0.7s ease-in forwards 0.5s;
  }

  &__image-edge {
    width: 100%;
    animation: edge 0.5s ease-in forwards 1s;
  }

  &__token{
    justify-self: center;
    align-self: center;
    bottom: 80px;
    animation: token 0.5s ease-in forwards .7s;
  }
}

@keyframes teleport {
  0% {
    height: 115px;
  }
  100% {
    height: 0px;
  }
}

@keyframes edge {
  0% {
    opacity: 1;
    height: auto;
  }
  100% {
    opacity: 0;
    height: 0;
  }
}

@keyframes token {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
</style>
