<template>
  <section class="modal-winner">
    <div class="modal-winner__wrap">
      <div class="modal-winner__content">
        <h2 class="modal-winner__title">Winner</h2>
        <p class="modal-winner__player" :style="{'--color-winner':player[0].color}">{{ player[0].name }}</p>
      </div>

      <svg
        class="modal-winner__img"
        fill="#000000"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        width="200px"
        height="250px"
        viewBox="0 0 780.648 780.647"
        xml:space="preserve"
      >
        <g>
          <g>
            <g>
              <path
                class="modal-winner__img-anim"
                d="M533.556,23.431c-0.013-0.01-0.021-0.02-0.032-0.03c0.008-0.246,0.032-0.486,0.032-0.734
				C533.556,10.147,523.409,0,510.888,0c-11.385,0-20.806,8.393-22.421,19.327l-41.088,78.008
				c-2.261,4.195-4.483,8.408-6.661,12.646l-34.771,66.015l-5.521-19.329l11.002-21.416h-0.871h-20.42h-0.872h-20.421h-0.872
				l11.003,21.416l-5.521,19.329l-34.771-66.015c-2.177-4.238-4.398-8.451-6.66-12.646l-41.088-78.008
				C289.322,8.392,279.898,0,268.515,0c-12.519,0-22.667,10.147-22.667,22.667c0,0.248,0.025,0.489,0.033,0.734
				c-0.011,0.011-0.021,0.021-0.032,0.029c0.013,0.032,0.025,0.063,0.038,0.094c0.003,0.089,0.007,0.178,0.012,0.268
				c-0.016,0.018-0.031,0.034-0.049,0.052c0.021,0.042,0.038,0.082,0.059,0.124c0.124,2.17,0.542,4.259,1.232,6.224l0,0
				l73.23,152.873l0.47,133.205c0,0-26.865,131.494-26.865,132.729c0,17.12,13.879,31,31,31c0.114,0,0.229-0.012,0.343-0.015
				c0.179,0.004,0.354,0.015,0.53,0.015c13.357,0,24.74-8.449,29.104-20.295c1.308-2.503,2.342-5.274,3.041-8.278
				c4.289-18.443,8.482-36.912,12.758-55.361c1.361-5.304,2.716-10.606,4.027-15.927c2.396-9.706,4.681-19.438,7.003-29.164
				c2.201-7.211,4.915-14.869,7.928-24.22c3.011,9.352,5.726,17.009,7.927,24.22c2.322,9.726,4.606,19.458,7.002,29.164
				c1.313,5.317,2.665,10.623,4.027,15.927c4.272,18.449,8.47,36.918,12.759,55.361c0.698,3.004,1.73,5.775,3.04,8.278
				C428.822,471.552,440.208,480,453.567,480c0.181,0,0.354-0.011,0.532-0.015c0.112,0.003,0.227,0.015,0.341,0.015
				c17.121,0,31-13.88,31-31c0-1.235-26.864-132.729-26.864-132.729l0.471-133.205l73.229-152.872l0,0
				c0.689-1.964,1.107-4.053,1.231-6.223c0.021-0.042,0.038-0.082,0.059-0.125c-0.018-0.019-0.032-0.035-0.05-0.053
				c0.004-0.088,0.009-0.178,0.013-0.267C533.529,23.496,533.543,23.464,533.556,23.431z"
              />
              <path
                class="modal-winner__img-anim"
                d="M389.264,117.334c0.146,0,0.291-0.011,0.438-0.012c0.146,0.001,0.29,0.012,0.438,0.012
				c24.979,0,45.229-20.25,45.229-45.229c0-24.979-20.25-45.229-45.229-45.229c-0.146,0-0.291,0.01-0.438,0.011
				c-0.146-0.001-0.289-0.011-0.438-0.011c-24.979,0-45.229,20.25-45.229,45.229C344.035,97.084,364.285,117.334,389.264,117.334z"
              />
            </g>
            <path
              d="M718.324,666.647H527.158v38.5c0,6.901-5.597,12.5-12.5,12.5s-12.5-5.599-12.5-12.5v-111.5
			c0-0.662,0.066-1.31,0.166-1.943v-76.057c0-11.047-8.954-20-20-20h-190.5c-11.046,0-20,8.953-20,20v78v4v107.5
			c0,6.901-5.597,12.5-12.5,12.5s-12.5-5.599-12.5-12.5v-107.5h-184.5c-11.046,0-20,8.953-20,20v143c0,11.045,8.954,20,20,20h381h38
			h237c11.046,0,20-8.955,20-20v-74C738.324,675.601,729.37,666.647,718.324,666.647z M403.919,673.343h-16.136V565.517h-0.371
			l-21.454,11.578l-3.229-12.705l26.956-14.438h14.234V673.343L403.919,673.343z"
            />
          </g>
        </g>
      </svg>

      <img class="modal-winner__win" src="/images/win_icon.svg" alt="win" />

      <div class="modal-winner__new-game">
        <Button @active="isNewGame">New game</Button>
      </div>
    </div>
  </section>
</template>

<script setup>
import Button from '../UIComponents/Button.vue';
const props = defineProps({ player: { type: Array, required: true } })

function isNewGame(){
  window.location.reload()
}
</script>

<style lang="scss" scoped>
.modal-winner {
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
    height: 400px;

    display: flex;
    flex-direction: column;
    // justify-content: end;
    align-items: center;

    background-color: white;
    border-radius: 15px;
    box-shadow: 0px 0px 10px grey;

    padding-top: 15px;
  }

  &__content{
    color: black;
    text-align: center;
    padding-bottom: 20px;
  }

  &__title{
    font-size: 26px;
    line-height: 30px;
    font-weight: 600;
  }

  &__player{
    --color-winner:black;
    font-size: 36px;
    line-height:40px;
    font-weight: 700;
    color: var(--color-winner);
  }

  &__img-anim {
    transform: translateY(0px);
    animation: jump 1s linear infinite;
  }

  &__win {
    position: absolute;
    z-index: 10;

    top: 105px;
    left: 80px;

    width: 50px;
    height: 50px;

    transform: rotate(25deg);
    animation: jumpWin 1s linear infinite;
  }

  &__new-game{
    width: 60%;
  }
}

@keyframes jump {
  0% {
    transform: translateY(15px);
  }
  50% {
    transform: translateY(-50px);
  }
  100% {
    transform: translateY(15px);
  }
}

@keyframes jumpWin {
  0% {
    transform: translateY(0px) rotate(25deg);
  }
  50% {
    transform: translateY(-17px) rotate(25deg);
  }
  100% {
    transform: translateY(0px) rotate(25deg);
  }
}
</style>
