<template>
  <section class="modal-error">
    <div class="modal-error__wrap">
      <div class="modal-error__image-wrap">
        <img class="modal-error__image" src="/images/error__icon.png" alt="error" />
      </div>
      <img  class="modal-error__image-crack" src="/images/crack_icon.png" alt="crack">
      <p class="modal-error__title">Not enough money Please, sell the card !</p>
    </div>
  </section>
</template>

<script setup></script>

<style lang="scss" scoped>
.modal-error {
  width: 100%;
  height: 100%;

  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;

  // background-color: rgba(0, 0, 0, 0.5);

  &__wrap {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    width: 300px;
    height:250px;

    display: flex;
    flex-direction: row;
    gap: 36px;

    background-color: white;
    border-radius: 15px;
    box-shadow: 0px 0px 10px grey;

    padding: 50px 25px;
  }

  &__image-wrap{
    position: absolute;
    z-index: 10;
    top: 50%;
    left: 50%;
    background-color: #dd1c1c;
    transform: rotate(20deg) scale(0);

    // transform: translate(0%,100%) rotate(-20deg);
    animation: error .5s ease-in-out forwards .4s;
    border-radius: 17px;
  }

  &__image {
    width: 250px;
    display: inline;
  }

  &__image-crack{
    position: relative;
    z-index: 2;
    opacity: 0;
    animation: crack .4s ease-in-out forwards .8s;
  }

  &__title{
    position: absolute;
    z-index: 15;
    top: 20px;
    left: 50%;
    transform: translateX(-50%) scale(0);

    width: 210px;

    text-align: center;
    font-size: 22px;
    font-weight: 600;
    color: black;


    animation: title .4s ease-in-out forwards 1.2s;
  }
}

@keyframes error{
    0%{
        transform: translate(0%,100%) rotate(-20deg) scale(0);
    }

    80%{
        transform: translate(-10%,50%) rotate(-20deg)  scale(0.3)
    }
    100%{
        transform: translate(-50%,-50%) rotate(-20deg) scale(1);
        box-shadow: 0px 0px 10px grey;
    }
}

@keyframes crack{
    0%{opacity: 0;}
    100%{opacity: 1;}
}

@keyframes title{
    0%{transform:translateX(-50%) scale(0);}
    100%{transform: translateX(-50%) scale(1);}
}
</style>
