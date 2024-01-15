<template>
  <section class="modal-surprise">
    <div class="modal-surprise__wrap"></div>
  </section>
</template>

<script setup>
const props = defineProps({ count: { type: Number, required: false } })

const allSurprise = [{text:'',getMoney:"",payMoney:'',goTo:''}]
</script>

<style lang="scss" scoped></style>
