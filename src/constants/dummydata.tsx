import Bullet from '../assets/bottomTabNavigation/wallet/bulletPoint.svg';

export const walletsHistoryLinks: any = {
  btc: 'https://www.blockchain.com/btc-testnet/tx/',

  trx: 'https://shasta.tronscan.org/?_ga=2.230439132.1991851709.1662647087-463570880.1662647087#/transaction/',

  eth: 'https://sepolia.etherscan.io/tx/',

  matic: 'https://mumbai.polygonscan.com/tx/',
};

export const month_names_short: any = {
  1: 'jan',
  2: 'Feb',
  3: 'Mar',
  4: 'Apr',
  5: 'May',
  6: 'Jun',
  7: 'Jul',
  8: 'Aug',
  9: 'Sep',
  10: 'Oct',
  11: 'Nov',
  12: 'Dec',
};

export const spending_filter_dates = [
  {
    label: 'This month',
    value: 'analytics filter',
  },
  {
    label: 'Last month',
    value: 'analytics filter',
  },
  {
    label: 'Custom',
    value: 'analytics filter',
  },
];

export const cardFunctionsData: any = [
  {
    heading: 'Online transactions:',
    bodyText:
      'Internet-based transactions are generally high-risk. You can switch them off for extra security',
    svg: Bullet,
    button: 'Toggle',
  },
  {
    heading: 'Location-based security',
    bodyText:
      'We’ll use your location to help prevent fraudulent transactions if your card is ever compromised. GPS must be turned on.',
    svg: Bullet,
    button: 'Toggle',
  },
  {
    heading: 'Swipe payments',
    bodyText:
      'Sometimes cards can be cloned. Switch off the magnetic stripe for extra security.',
    svg: Bullet,
    button: 'Toggle',
  },
  {
    heading: 'ATM withdrawals',
    bodyText:
      'If you do not plan to withdraw cash, you can swtich ATM withdrawals off.',
    svg: Bullet,
    button: 'Toggle',
  },
  {
    heading: 'Contacless payments',
    bodyText:
      'You can disable contacless payments by turning this setting off. Payemnts you make using mobile wallets like Apple Pay won’t be affected.',
    svg: Bullet,
    button: 'Toggle',
  },
  {
    heading: 'Contacless payments',
    bodyText: '€- / €200',
    svg: Bullet,
    button: 'Reset',
  },
  {
    heading: 'Terminate card',
    bodyText: 'This card will be permanently terminated',
    svg: Bullet,
    button: 'Terminate',
  },
];

export const dummyHorizontalData = [
  'Futures',
  'Spot',
  'Tokenized Stocks',
  'Leveraged Tokens',
  'Volatility',
  'Prediction',
  'Fiat',
];

export const dummyCurrencyData = ['USD', 'USDT', 'BTC', 'EUR'];

export const filterButtons = [
  {
    name: 'USD',
    id: 'USD',
  },
  {
    name: 'EUR',
    id: 'EUR',
  },
  {
    name: 'USDT',
    id: 'USDT',
  },
  {
    name: 'BTC',
    id: 'BTC',
  },
];

export const dropDownArray = [
  'Hip Hop',
  'R&B/ Soul',
  'Electronic',
  'Pop',
  'Rock',
  'Reggae/Dancehall',
  'Reggaeton',
  'Afro',
];

export const sideTypeDropDowndata = [
  {label: 'Buy', value: 'side'},
  {label: 'Sell', value: 'side'},
];

export const orderTypeDropDowndata = [
  {label: 'Limit order', value: 'orderType'},
  {label: 'Market order', value: 'orderType'},
  {label: 'Stop market', value: 'orderType'},
  {label: 'Stop limit', value: 'orderType'},
  {label: 'Trailing stop', value: 'orderType'},
  {label: 'Take profit', value: 'orderType'},
  {label: 'Take profit limit', value: 'orderType'},
];

export const orderBookTabsData = [
  'Balances',
  'Open Orders',
  'Active TWAP Orders',
  'Triger Orders',
  'Borrowed Spot Positions',
  'Order History',
  'Trade History',
];
