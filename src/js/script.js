const container = document.getElementById('container');
const updateButton = document.getElementById('update');

const coins = [
  { code: 'btc', name: 'Bitcoin' },
  { code: 'eth', name: 'Ethereum' },
  { code: 'ltc', name: 'Litecoin' },
  { code: 'bch', name: 'Bitcoin Cash' },
  { code: 'doge', name: 'Dogecoin' },
  { code: 'xmr', name: 'Monero' },
  { code: 'xrp', name: 'Ripple' },
  { code: 'trx', name: 'Tron' },
];

const formatCurrency = (value) => {
  if (value > 1_000) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
};

const showSpinner = () => {
  container.textContent = '';

  container.insertAdjacentHTML('afterbegin', `
    <span class="loader"></span>
  `);
};

showSpinner();

const removeSpinner = () => {
  container.querySelectorAll('.loader').forEach((item) => item.remove());
};

const API_URL = 'https://api.coinconvert.net/convert/btc/usd?amount=1';

const fetchChart = () => {
  coins.forEach(({ code, name }, index) => {
    fetch(`https://api.coinconvert.net/convert/${code}/usd?amount=1`)
      .then((res) => res.json())
      .then((data) => {
        removeSpinner();
        insertCoinPrice({
          code,
          name,
          price: formatCurrency(data.USD),
          order: index,
        });
      });
  });
};

fetchChart();

const insertCoinPrice = ({ code, name, price, order }) => {
  container.insertAdjacentHTML(
    'afterbegin',
    `
    <div class="coin" style="${order !== undefined ? `order: ${order}` : ''}">
      <img src="https://coinicons-api.vercel.app/api/icon/${code}" width="48" height="48" alt="${name}" />
      <div class="name">${name}</div>
      <div class="price">${price}</div>
    </div>
  `
  );
};
