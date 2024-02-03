export const surprise = [
  {
    id: 1,
    type: 'profitable',
    text: 'Вы выйграли в лотерею.Банк заплатит вам 150$',
    getMoney: 150
  },
  { id: 2, type: 'unprofitable', text: 'У вас украли кошелек! Вы потеряли 150$', payMoney: 150 },
  { id: 3, type: 'profitable', text: 'Вы случайно нашли 50$ на улице', getMoney: 50 },
  {
    id: 4,
    type: 'go',
    text: 'Вы встретили своего друга и он вас подвез. Пройдити вперед на 4 карточки',
    goTo: 4
  },
  {
    id: 5,
    type: 'unprofitable',
    text: 'Вы вовремя не оплатили в банке свой кредит! Банк взымает с вас проценты в размере 125$',
    payMoney: 125
  },
  {
    id: 6,
    type: 'go',
    text: 'Вы не успеваете на свою тренеровку, поэтому взяли такси и отправляетесь в "Fitness Dream"',
    goTo: { row: '1/2', column: '5/6' }
  },
  {
    id: 7,
    type: 'profitable',
    text: 'Вы привлекли вниманием многих инвесторов! Получите 35$ за каждую карточку ваших активов',
    getMoney: ''
  },
  {
    id: 8,
    type: 'unprofitable',
    text: 'Вы потеряли свои инвистиции в размере 200$',
    payMoney: 200
  },
  {
    id: 9,
    type: 'go',
    text: 'На улице -10С и вы замерзли. Отправляйтесь в "Coffee House" ,чтобы согреться горячим кофе',
    goTo: { count: '11', row: '10/11', column: '1/2' }
  },
  {
    id: 10,
    type: 'unprofitable',
    text: 'Ваш телефон сломался! Заплатите 50$ за ремонт',
    payMoney: 50
  },
  {
    id: 11,
    type: 'profitable',
    text: 'Удача сегодня на вашей стороне! Получите 125$',
    getMoney: 125
  },
  {
    id: 12,
    type: 'unprofitable',
    text: 'Вы заказали товары для дома! Оплатите доставку 75$',
    payMoney: 75
  },
  {
    id: 13,
    type: 'unprofitable',
    text: 'За несоблюдение договора, банк накладывает санкции на ваше имющество в размере 50$ за каждое улучшение карточки',
    payMoney: 0
  },
  {
    id: 14,
    type: 'go',
    text: 'Вы прибыли в Нью Йорк на деловую встречу! Отправляйтесь в "Hotel Royal"',
    goTo: {count:'39', row: '10/11', column: '11/12' }
  },
  {
    id: 15,
    type: 'profitable',
    text: 'Ваша бабушка оставила завещание! Получите 250$',
    getMoney: 250
  },
  {
    id: 16,
    type: 'profitable',
    text: 'Вы совершили удачную сделку! Получите 175$ прибыли',
    getMoney: 175
  },
  {
    id: 17,
    type: 'go',
    text: 'Пройдите на старт и получите 200$',
    getMoney: 200,
    goTo: {count:'0', row: '11/12', column: '11/12' }
  },
  { id: 18, type: 'profitable', text: 'Друг вернул вам долг 100$', getMoney: 100 },
  {
    id: 19,
    type: 'go',
    text: 'Вы были так увлечены своими мяслями и незаметили как прошли вперд на 3 карточки',
    goTo: 3
  },
  {
    id: 20,
    type: 'go',
    text: 'За не уплату налогов вы были пойманы полицией и отправлены в тюрьму',
    goTo: {count:'10', row: '11/12', column: '1/2' }
  },
  {
    id: 21,
    type: 'unprofitable',
    text: 'Расходы вашей компании превысили бюджет! Потратьте дополнительные 100$',
    payMoney: 100
  },
  {
    id: 22,
    type: 'profitable',
    text: 'У вас хорошая кредитная история, поэтому банк  выделит Вам 200$ на развитие бизнеса',
    getMoney: 200
  },
  {
    id: 23,
    type: 'go',
    text: 'Вы очень бодры и полны энергии! Отправляйтесь вперед на 5 карточек',
    goTo: 5
  },
  { id: 24, type: 'unprofitable', text: 'Вы заболели! Заплатите 175$ за лечение', payMoney: 175 }
]
