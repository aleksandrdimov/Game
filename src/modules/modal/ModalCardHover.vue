<template>
  <section
    class="card-item-hover"
    :style="{ '--color': item.color !== 'transparent' ? item.color : '#b3b3b3' }"
  >
    <div class="card-item-hover__label"></div>
    <img class="card-item-hover__picture" :src="`/images/${item.img}.png`" :alt="item.img" />
    <div class="card-item-hover__container">
        <p class="card-item-hover__params">
          Owner: <span>{{ item.owner !== null ? item.owner : 'Bank' }}</span>
        </p>
        <p class="card-item-hover__params">
          Price: <span>{{ item.price }}$</span>
        </p>
        <p class="card-item-hover__params">
          Rent: <span>{{ item.rent }}$</span>
        </p>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const props = defineProps({
  item: { type: Object, required: true },
  playerId: { type: Number, required: true }
})
const positionCard=ref()

onMounted(()=>{
positionCard.value=`${47*props.playerId+44+(props.playerId-1)*12}px`
})
</script>

<style lang="scss" scoped>
.card-item-hover {
  --color: transparent;
  position: absolute;
  z-index: 20;

  right: 450px;
  top: v-bind(positionCard);

  width: 150px;
  height: 300px;

  background-color: white;
  border: 1px solid var(--color);
  border-radius: 8px;

  &__label {
    width: 100%;
    height: 15px;

    background-color: var(--color);
    border-radius: 7px 7px 0 0;
  }

  &__picture {
    width: 148px;
    height: 148px;
  }

  &__container{
      height: 135px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 6px;

    padding: 4px 8px;
  }

  &__params {
    font-size: 16px;
    text-align: center;

    & span {
      font-size: 19px;
      line-height: 25px;
      font-weight: 600;
    }
  }
}
</style>
