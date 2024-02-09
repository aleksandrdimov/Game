export const surprise = [
  {
    id: 1,
    type: 'profitable',
    text: 'You won the lottery. The bank will pay you $150',
    getMoney: 150
  },
  { id: 2, type: 'unprofitable', text: 'Your wallet was stolen! You lost $150', payMoney: 150 },
  { id: 3, type: 'profitable', text: 'You accidentally found $50 on the street', getMoney: 50 },
  {
    id: 4,
    type: 'go',
    text: 'You met your friend and he gave you a ride. Move to 4 cards forward.',
    goTo: 4
  },
  {
    id: 5,
    type: 'unprofitable',
    text: 'You didn`t pay your bank loan on time! The bank charges you interest of $125',
    payMoney: 125
  },
  {
    id: 6,
    type: 'go',
    text: 'You don`t have time for your training session, so you take a taxi and go to "Fitness Dream"',
    goTo: {count: '24', row: '1/2', column: '5/6' }
  },
  {
    id: 7,
    type: 'profitable',
    text: 'You have attracted the attention of many investors! Get $35 for every card of your assets',
  },
  {
    id: 8,
    type: 'unprofitable',
    text: 'You lost your investment of $200',
    payMoney: 200
  },
  {
    id: 9,
    type: 'go',
    text: 'It`s -10°C outside and you`re freezing. Head to the "Coffee House" to warm up with some hot coffee.',
    goTo: { count: '11', row: '10/11', column: '1/2' }
  },
  {
    id: 10,
    type: 'unprofitable',
    text: 'Your phone is broken! Pay $50 for repairs',
    payMoney: 50
  },
  {
    id: 11,
    type: 'profitable',
    text: 'Luck is on your side today! Get $125',
    getMoney: 125
  },
  {
    id: 12,
    type: 'unprofitable',
    text: 'You`ve ordered your household goods! Pay delivery 75$',
    payMoney: 75
  },
  {
    id: 13,
    type: 'unprofitable',
    text: 'For non-compliance with the agreement, the bank imposes sanctions on your property in the amount of $50 for each card improvement.',
  },
  {
    id: 14,
    type: 'go',
    text: 'You`ve arrived in New York for a business meeting! Head to the "Hotel Royal"',
    goTo: {count:'39', row: '10/11', column: '11/12' }
  },
  {
    id: 15,
    type: 'profitable',
    text: 'Your granny left a will! Get $250',
    getMoney: 250
  },
  {
    id: 16,
    type: 'profitable',
    text: 'You made a successful deal! Get $175 profit',
    getMoney: 175
  },
  {
    id: 17,
    type: 'go',
    text: 'Go to the start and get $200',
    getMoney: 200,
    goTo: {count:'0', row: '11/12', column: '11/12' }
  },
  { id: 18, type: 'profitable', text: 'Your friend returned your debt of $100', getMoney: 100 },
  {
    id: 19,
    type: 'go',
    text: 'You were so carried away by your thoughts and did not notice how you went 3 cards ahead',
    goTo: 3
  },
  {
    id: 20,
    type: 'go',
    text: 'You were caught by the police and sent to prison for not paying taxes.',
    goTo: {count:'10', row: '11/12', column: '1/2' }
  },
  {
    id: 21,
    type: 'unprofitable',
    text: 'Your company`s expenses exceeded budget! Spend an extra $100',
    payMoney: 100
  },
  {
    id: 22,
    type: 'profitable',
    text: 'You have a good credit history, so the bank will give you $200 for business development',
    getMoney: 200
  },
  {
    id: 23,
    type: 'go',
    text: 'You are very cheerful and full of energy! Go to 5 cards  forward',
    goTo: 5
  },
  { id: 24, type: 'unprofitable', text: 'Do you feel sick! Pay $175 for treatment', payMoney: 175 }
]
