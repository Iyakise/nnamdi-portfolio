if (localStorage.getItem('loggedIn') !== 'true') {
  window.location.href = 'login.html';
}

function logout() {
  localStorage.removeItem('loggedIn');
  localStorage.removeItem('currentUser');
}

const portfolio = {
  bitcoin: 0.5,
  ethereum: 2,
  solana: 10,
  binancecoin: 3,
  cardano: 100,
  ripple: 500,
  polkadot: 30,
  litecoin: 5,
  avalanche: 12,
  chainlink: 40,
  dogecoin: 1000,
  shiba: 500000,
  cosmos: 18,
  near: 25,
  uniswap: 22,
  stellar: 1500,
  vechain: 8000,
  algorand: 3000,
  aptos: 10,
  //render-token: 8,
  arbitrum: 40,
  optimism: 33,
  pi: 300
};

const ids = Object.keys(portfolio).join(',');
const apiURL = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`;

fetch(apiURL)
  .then(res => res.json())
  .then(data => {
    let total = 0;
    let labels = [];
    let values = [];
    for (const [coin, qty] of Object.entries(portfolio)) {
      const price = data[coin]?.usd || 0;
      const value = price * qty;
      total += value;
      labels.push(coin.toUpperCase());
      values.push(value);
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `<h3>${coin.toUpperCase()}</h3>
                        <p>Qty: ${qty}</p>
                        <p>Price: $${price}</p>
                        <p><strong>Value: $${value.toFixed(2)}</strong></p>`;
      document.getElementById('portfolio').appendChild(card);
    }
    document.getElementById('totalValue').innerText = `Total Portfolio Value: $${total.toFixed(2)}`;

    const ctx = document.getElementById('chart').getContext('2d');
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          label: 'Portfolio Allocation',
          data: values,
          backgroundColor: ['#f39c12','#2ecc71','#3498db','#9b59b6','#e74c3c']
        }]
      },
      options: { responsive: true }
    });
  });

document.getElementById('darkModeToggle').addEventListener('change', e => {
  document.body.classList.toggle('dark', e.target.checked);
});

const canvas = document.getElementById('bgCanvas');
const ctxBg = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const stars = Array.from({ length: 100 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  r: Math.random() * 1.5 + 0.5
}));
function drawStars() {
  ctxBg.clearRect(0, 0, canvas.width, canvas.height);
  ctxBg.fillStyle = 'white';
  stars.forEach(s => {
    ctxBg.beginPath();
    ctxBg.arc(s.x, s.y, s.r, 0, 2 * Math.PI);
    ctxBg.fill();
  });
}
setInterval(drawStars, 100);

function exportToPDF() {
  const el = document.getElementById('portfolio');
  const win = window.open('', '', 'width=800,height=600');
  win.document.write('<html><head><title>Exported Portfolio</title></head><body>');
  win.document.write('<h1>Crypto Portfolio</h1>');
  win.document.write(el.innerHTML);
  win.document.write('</body></html>');
  win.document.close();
  win.print();
}