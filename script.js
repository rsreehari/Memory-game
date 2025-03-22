// script.js
const grid = document.getElementById('grid');
const movesDisplay = document.getElementById('moves');
const resetBtn = document.querySelector('.reset-btn');

let cards = [];
let flippedCards = [];
let moves = 0;

// Icons for the cards
const icons = ['🚀', '🌌', '🛸', '👾', '🌠', '🪐', '🔭', '🌑'];
const cardValues = [...icons, ...icons]; // Duplicate for pairs

// Shuffle function
const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

// Create cards
const createCards = () => {
  shuffle(cardValues);
  grid.innerHTML = '';
  cardValues.forEach((value, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.index = index;
    card.innerHTML = `
      <div class="front">${value}</div>
      <div class="back">?</div>
    `;
    card.addEventListener('click', flipCard);
    grid.appendChild(card);
    cards.push(card);
  });
};

// Flip card
const flipCard = (e) => {
  const card = e.target.closest('.card');
  if (!card || flippedCards.length === 2 || card.classList.contains('flipped')) return;

  card.classList.add('flipped');
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    moves++;
    movesDisplay.textContent = moves;
    checkForMatch();
  }
};

// Check for match
const checkForMatch = () => {
  const [card1, card2] = flippedCards;
  const value1 = card1.querySelector('.front').textContent;
  const value2 = card2.querySelector('.front').textContent;

  if (value1 === value2) {
    card1.classList.add('matched');
    card2.classList.add('matched');
    flippedCards = [];
  } else {
    setTimeout(() => {
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
      flippedCards = [];
    }, 1000);
  }
};

// Reset game
const resetGame = () => {
  moves = 0;
  movesDisplay.textContent = moves;
  flippedCards = [];
  cards = [];
  createCards();
};

// Initialize game
resetBtn.addEventListener('click', resetGame);
createCards();