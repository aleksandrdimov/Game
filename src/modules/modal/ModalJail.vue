<template>
  <div class="modal-jail">
    <div class="modal-jail__wrap">
        <button class="modal-jail__button" @click="payMoney">Pay 150 $</button>
        <button class="modal-jail__button" @click="skipMove"> Skip <p>next move</p> </button>
    </div>
  </div>
</template>

<script setup>

const emit =defineEmits(['pay','skip'])

function payMoney(){
    emit('pay')
}

function skipMove(){
    emit('skip')
}
</script>

<style lang="scss" scoped>
.modal-jail {
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
    height: 300px;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 24px;

    background-image: url('/images/jail_img.png');
    background-size: contain;
    background-repeat: no-repeat;
    border-radius: 15px;
    box-shadow: 0px 0px 10px grey;

    // padding: 50px 25px;
  }

  &__button {
    cursor: pointer;
    width: 110px;
    height: 45px;

    text-transform: uppercase;
    font-weight: 600;
    color: rgb(133, 193, 233);

    background-color: white;
    border-radius: 5px;
    box-shadow: 2px 3px 5px blue;

    padding: 5px 10px;

    transition: all .3s ease-in-out;

    & p{
        font-weight: 600;
    }

    &:active{
        color: grey;
        box-shadow: 0px 0px 1px blue;
        transform: translate(3px , 3px);
    }

    // &::before {
    // //   content: '';
    //   height: 100%;
    //   width: 100%;

    //   position: absolute;
    //   z-index: -1;
    //   top: 2px;
    //   left: 2px;

    //   background-color: blue;
    //   border-radius: 5px;
    // }
  }
}


</style>
