<template>
  <section class="modal-rules">
    <div class="modal-rules__wrap">
      <IconClose @click="closeRules"/>
      <div class="modal-rules__lang">
        <span
          class="modal-rules__lang-item"
          :class="{ active: activeIndex === index }"
          v-for="(lang, index) in langs"
          :key="index"
          @click="clickLang(index)"
          >{{ lang }}</span
        >
      </div>
      <p class="modal-rules__description">{{ rules[activeIndex].description }}</p>
      <h2 class="modal-rules__title">{{ rules[activeIndex].title }}:</h2>
      <ol class="modal-rules__list">
        <li
          class="modal-rules__item"
          v-for="(item, index) in rules[activeIndex].items"
          :key="index"
        >
          {{ item.name }}
        </li>
      </ol>
    </div>
  </section>
</template>

<script setup>
import IconClose from '../UIComponents/IconClose.vue';
import { ref } from 'vue'
const emit = defineEmits(['close'])

const langs = ref(['en', 'ua'])

const rules = [
  {
    title: 'Rules',
    description:
      'This is a turn-based game in which each player rolls the dice and moves his token depending on the numbers that are rolled. Next, the player has the right to buy a card if it does not belong to anyone, otherwise he has to pay rent to the owner for stopping on this card. The last one standing wins.',
    items: [
      {
        name: 'At the beginning of the game, each player has $1,500, and all cards belong to the bank'
      },
      {
        name: "For each completed lap, you will be given $200, but the mandatory requirement is to go through the 'Start' card "
      },
      {
        name: 'The game has some special cards: jail, police, crossroads, go to card, teleport and surprise'
      },
      {
        name: 'Jail: You can skip your next turn or pay money and end your turn to be able to walk on your next turn.'
      },
      {
        name: 'Police: If you hit this card, you will be automatically sent to jail and given the right to choose'
      },
      { name: 'Crossroads: You have the right to be on these cards for free' },
      { name: "Go to card: you are transferred to the 'Casino' card" },
      { name: 'Teleport: will transfer you to another, same card for free' },
      {
        name: 'Surprise: it has three types of cards: profitable - you will receive money, loss-making - you will have to pay money and the last type of card - a card that indicates the amount to transfer.'
      },
      {
        name: 'The player has the opportunity to roll the dice once and move forward. If the same numbers fall out ("double"), then I throw it again, but no more than twice. If he gets a double two times in a row, he is sent to the grid because of his luck or fraud.'
      },
      {
        name: 'The player must choose: buy a card, pay rent or stay on this card for free, depending on the features of the card itself'
      },
      {
        name: 'All cards are divided into groups of 3 cards and one - 6 cards. Each group has a different color to make it easier to navigate.'
      },
      {
        name: 'If the entire group belongs to you, then you can upgrade it to increase the rent for being on it. To do this, you need to click on the "Upgrade" button under your profile and select a card.'
      },
      {
        name: 'After you have moved, but have not yet passed the move to the next player, you have the right to trade by clicking the "Trade" button under your profile. Then choose a player with whom you want to exchange cards or buy. Keep in mind that you can only trade once per turn, even if your opponent has refused the deal.'
      },
      {
        name: 'If you do not have enough money to pay, you can sell your bank cards, otherwise you will have to declare yourself bankrupt.'
      }
    ]
  },
  {
    title: 'Правила',
    description:
      'Це покрокова гра, в якій кожен гравець кидає гральні кістки та пересуває свій токен в залежності від цифр які випали. Далі гравець має право купити карту, якщо вона нікому неналежить, інакше він має заплатиті аренду власнику за остановку на цій картці. Виграє той хто залишиться останнім.',
    items: [
      {
        name: 'Напочатку гри кожен гравець має 1500$,а усі картки належать банку'
      },
      {
        name: "За кожне пройдене коло, вам подарують 200$, але обов'язкова вимога - перейти через картку 'Старт' "
      },
      {
        name: "Гра має деякі особливі картки: в'язницу, поліцию, розвилку вулиць, перейти на картку, телепорт та сюрприз"
      },
      {
        name: "В'зниця: ви можите пропустити наступний свій хід чи заплатити гроші та закінчити хід щоб мати можливість ходити в свій наступний хід."
      },
      {
        name: "Поліція: при протраплянні на цю карту вас автоматично направлять у в'зницу та дадуть право вибора"
      },
      { name: 'Розвилка вулиць: ви маєте право безкоштовно находитись на цих картках' },
      { name: "Перейти на картку: вас переносить на картку 'Казино'" },
      { name: 'Телепорт: вас безкоштовно перенесе на іншу , таку ж картку' },
      {
        name: 'Сюрприз має три різні типа карток: прибуткові - ви отримаєте гроші, збиткові - вам прийдеться заплатити гроші та останній тип картки де вказано на яку картку треба перейти.'
      },
      {
        name: 'Гравець має можливість один раз кинути кісті та просунутись уперед. Якщо віпадають однакові цифри("дубль"), то він кидаю ще раз, але не більше двох разів. Якщо два рази поспіль випадає дубль, то він відправляєтся за грати через свою вдачу чи шахрайство.'
      },
      {
        name: 'Гравець повинен обрати: купити карту,  оплатите аренду чи безкоштовно залишитись на цій картці, взалежності від особливостей самой картки'
      },
      {
        name: 'Усі картки поділяються на групи по 3 картки та одна - 6 карток. Кожна група має інакший колір , щоб було легче орієнтуватись.'
      },
      {
        name: 'Якщо уся група належить Вам, то можно їй зробити апгрейд щоб підняти аренду за находження на ній. Для цього потрібно натиснути на кнопку "Upgrade" під вашим профілем та вибрати карту.'
      },
      {
        name: 'Після того як ви походили, але ще не передали хід наступному гравцю, ви маєте право проводити торги , натиснув кнопку "Trade" під вашим профілем. Потім обрати гравця з ким хочите обмінятись картками або купити. Майте наувазі що торгувати можно лише один раз хід, навіть якщо ваш опонент відмовився від угоди.'
      },
      {
        name: "Якщо у вас не вистачає грошей щоб заплатити, можете продати свої карти банку, інакше прийдеться об'явити себе банкротом."
      }
    ]
  }
]

const activeIndex = ref(0)

function clickLang(index) {
  activeIndex.value = index
}

function closeRules() {
  emit('close')
}
</script>

<style lang="scss" scoped>
.modal-rules {
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

    max-width: 700px;
    width: 100%;
    max-height: 600px;
    height: 100%;

    display: flex;
    flex-direction: column;
    // justify-content: center;
    align-items: center;
    gap: 12px;

    background-color: white;
    border-radius: 15px;
    box-shadow: 0px 0px 10px grey;

    padding: 25px;
    // overflow-x: hidden;
  }

  &__close {
    cursor: pointer;
    position: absolute;
    z-index: 20;

    right: 10px;
    top: 0;

    & path {
      transition: all 0.4s ease-in-out;
    }

    &:hover path {
      fill: red;
    }
  }

  &__lang {
    display: flex;
    gap: 4px;

    background-color: rgb(245, 245, 245);
    border: 1px solid #4bb955;
    border-radius: 16px;
  }

  &__lang-item {
    cursor: pointer;
    text-align: center;
    text-transform: uppercase;
    font-size: 16px;
    font-weight: 600;
    line-height: 22px;
    color: rgb(192, 192, 192);

    border-radius: 15px;
    border: 1px solid rgb(245, 245, 245);

    padding: 6px 12px;

    transition: all 0.4s ease-in-out;

    &.active {
      background-color: #f0faf1;
      border-color: #125417;
      color: #125417;
    }
  }

  &__description {
    text-align: center;

    font-size: 16px;
    font-weight: 500;
  }

  &__title {
    font-size: 32px;
    font-weight: 600;
    color: #092a0b;
  }

  &__list {
    max-height: 400px;
    height: 100%;

    overflow-x: hidden;
    padding-right: 5px;

    &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      border-radius: 16px;
      background-color: #f0faf1;
    }

    &::-webkit-scrollbar {
      width: 8px;
      background-color: #f0faf1;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 16px;
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      background-color: #125417;
    }
  }

  &__item {
    font-size: 14px;
    &:not(:last-of-type) {
      margin-bottom: 12px;
    }
  }
}

li {
  list-style-image: url('/images/icon_ok.svg');
}
</style>
