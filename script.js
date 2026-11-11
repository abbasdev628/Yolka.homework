const tree = document.getElementById('tree');
const star = document.getElementById('star');
const resetBtn = document.getElementById('reset');

const TREE_HEIGHT = 420;   // yolkanın hündürlüyü (px) – CSS ilə eyni olmalıdır
const SIZE = 22;           // oyuncağın ölçüsü (px)

// Oyuncaqların yolka daxilindəki mövqeyi: [x, y]
const points = [
  [150, 100],
  [125, 140], [178, 160],
  [120, 215], [185, 235], [150, 190],
  [90, 300], [210, 310], [150, 330],
  [60, 345], [240, 350]
];

const colors = ['#e63946', '#4dabf7', '#f5c542', '#c77dff', '#ff9f1c', '#ffffff'];

const rand = (min, max) => Math.random() * (max - min) + min;

// Oyuncaqları yaradırıq
points.forEach(([x, y], i) => {
  const ball = document.createElement('button');
  ball.className = 'ornament';
  ball.setAttribute('aria-label', 'Oyuncaq');
  ball.style.left = (x - SIZE / 2) + 'px';
  ball.style.top = (y - SIZE / 2) + 'px';
  ball.style.setProperty('--c', colors[i % colors.length]);

  ball.addEventListener('click', () => dropOrnament(ball, y));
  tree.appendChild(ball);
});

// Oyuncaq yerə düşür
function dropOrnament(ball, y) {
  if (ball.classList.contains('fall')) return;

  const distance = TREE_HEIGHT - (y + SIZE / 2) + rand(2, 10); // yerə qədər məsafə
  ball.style.setProperty('--drop', distance + 'px');
  ball.style.setProperty('--dx', rand(-40, 40) + 'px');         // yana sapma
  ball.classList.add('fall');
}

// Ulduza basanda işıq yanır / sönür
star.addEventListener('click', () => {
  tree.classList.toggle('lit');
});

// Bütün oyuncaqları yenidən asırıq
resetBtn.addEventListener('click', () => {
  document.querySelectorAll('.ornament').forEach(o => o.classList.remove('fall'));
});
// ---------- İşıq zənciri (ulduza basanda yanıb-sönür) ----------
const bulbPoints = [
  [140, 75], [162, 118], [110, 165], [195, 185], [100, 230],
  [215, 255], [150, 265], [180, 285], [75, 320], [225, 330],
  [115, 350], [190, 355], [40, 360], [260, 362]
];
const bulbColors = ['#ff4d6d', '#ffd166', '#06d6a0', '#4cc9f0', '#f72585'];

bulbPoints.forEach(([x, y], i) => {
  const bulb = document.createElement('span');
  bulb.className = 'bulb';
  bulb.style.left = (x - 4) + 'px';
  bulb.style.top = (y - 4) + 'px';
  bulb.style.setProperty('--c', bulbColors[i % bulbColors.length]);
  bulb.style.setProperty('--d', rand(0, 1.2) + 's');
  tree.appendChild(bulb);
});

// ---------- Qar yağması ----------
const snow = document.getElementById('snow');

for (let i = 0; i < 60; i++) {
  const flake = document.createElement('span');
  flake.className = 'flake';
  const size = rand(3, 8);
  flake.style.width = flake.style.height = size + 'px';
  flake.style.left = rand(0, 100) + 'vw';
  flake.style.opacity = rand(0.4, 0.9);
  flake.style.setProperty('--sway', rand(-60, 60) + 'px');
  flake.style.animationDuration = rand(6, 14) + 's';
  flake.style.animationDelay = (-rand(0, 14)) + 's';
  snow.appendChild(flake);
}   