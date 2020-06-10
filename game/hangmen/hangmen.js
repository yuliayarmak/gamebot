'use strict'
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const floor = new Image();
floor.src = 'img/floor.jpg';

const pillar = new Image();
pillar.src = 'img/pillar.jpg';

const upper = new Image();
upper.src = 'img/upper.jpg';

const head = new Image();
head.src = 'img/head.jpg';

const body = new Image();
body.src = 'img/body.jpg';

const hang = new Image();
hang.src = 'img/hang.jpg';

const fff = new Image();
fff.src = 'img/end.jpg';


const words = ['нужно', 'добавить', 'словарь', 'потом', 'это', 'сделаю'];
let lives = 6;
const rand = Math.floor(Math.random() * words.length);
const randWord = words[rand];
const securedWord = [];
const usedLetters = [];

for (let i = 0; i < randWord.length; i++) {
  securedWord[i] = '_';
}


const end = function() {
  document.location.reload();
};

const warning = document.getElementById('attention');

const none = function() {
  warning.style.display = 'none';
};

const start = document.getElementById('start');
const sendHere = document.getElementById('sendHere');
const tries = document.getElementById('tries');
const lifeScore = document.getElementById('lifeScore');
const wordLine = document.getElementById('word');
const result = document.getElementById('result');

const startGame = function() {
  start.style.display = 'none';
  canvas.style.display = 'block';
  sendHere.style.display = 'block';
  tries.style.display = 'block';
  lifeScore.innerHTML = `number of attempts: ${lives}`;
  wordLine.innerHTML = securedWord.join(' ');
  wordLine.style.display = 'block';
  ctx.drawImage(floor, 0, 0);
};

const game = function() {
  let letter = document.getElementById('userLetter').value;
  let n = letter.toLowerCase();
  document.getElementById('userLetter').value = '';
  if (n === ' ' || n.length > 1) {
    warning.innerHTML = 'please follow the correct entry rules';
    warning.style.display = 'block';
    setTimeout(none, 5000);
  }

  if (usedLetters.includes(n)) {
    warning.innerHTML = ' you have already entered this letter';
    warning.style.display = 'block';
    setTimeout(none, 5000);
  } else {
    usedLetters.push(n);
  }

  if (!randWord.includes(n)) {
    lifeScore.innerHTML = `number of attempts: ${--lives}`;
  }

  for (let j = 0; j < randWord.length; j++) {
    if (randWord[j] === n) {
      securedWord[j] = n;
      wordLine.innerHTML = securedWord.join(' ');

    }
  }

  if (lives === 5) {
    ctx.drawImage(pillar, 0, 0);
  } else if (lives === 4) {
    ctx.drawImage(hang, 0, 0);
  } else if (lives === 3) {
    ctx.drawImage(upper, 0, 0);
  } else if (lives === 2) {
    ctx.drawImage(head, 0, 0);
  } else if (lives === 1) {
    ctx.drawImage(body, 0, 0);
  } else if (lives === 0) {
    ctx.drawImage(fff, 0, 0);
    sendHere.style.display = 'none';
    result.innerHTML = 'YOU LOSE';
    result.style.display = 'block';
    setTimeout(end, 5000);
  }

  if (!securedWord.includes('_')) {
    sendHere.style.display = 'none';
    result.innerHTML = 'YOU WON';
    result.style.display = 'block';
    setTimeout(end, 5000);
  }


};

start.addEventListener('click', startGame);

const send = document.getElementById('send');
send.addEventListener('click', game);

if(!(/iPhone|iPad/i.test(navigator.userAgent))){
  document.getElementById('canvas').style.display='none';
  document.getElementById('word').style.display='none';
  document.getElementById('tries').style.display='none';
  document.getElementById('sendHere').style.display='none';
  document.getElementById('attention').style.display='none';
  document.getElementById('result').style.display='none';
  document.getElementById('startButton').style.display='none';
  document.getElementById('sorry').style.display = 'block';
  document.getElementById('sorry').style.color = 'white';
}

