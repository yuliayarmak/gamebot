'use strict';

const player = 'X';
const aI = 'O';
const winnCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8]
];
const boxes = document.querySelectorAll('.box');
let gameBoard;
startGame();
function startGame() {
  gameBoard = Array.from(Array(9).keys());
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].innerText = '';
    boxes[i].addEventListener('click', turnOn, false);
  }
}


function turnOn(sqr) {
  // console.log("click")
  if (typeof gameBoard[sqr.target.id] === 'number') {
    turn(sqr.target.id, player);
    if (!checkDraw()) turn(aiSpot(), aI);
  }
}

function turn(sqrId, player) {
  gameBoard[sqrId] = player;
  document.getElementById(sqrId).innerText = player;
  const gameWin = checkIfWin(gameBoard, player);
  if (gameWin) gameOver(gameWin);

}

    
    
  

function checkIfWin(board, plr) {

  const plays = board.reduce((a, e, i) =>
    ((e === plr) ? a.concat(i) : a), []);
  let gameWin = null;
  for (const [index, win] of winnCombos.entries()) {
    if (win.every(elem => plays.indexOf(elem) > -1)) {
      gameWin = { index, plr };
      break;
    }
  }
  return gameWin;
}
function gameOver(gameWin) {
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].removeEventListener('click', turnOn, false);
  }
  winningMessage(gameWin.plr === player ? 'You win!' : 'You lose.');
}


function emptyBoxes() {
  return gameBoard.filter(s => typeof s === 'number');
}

function aiSpot() {
  return emptyBoxes()[0];
}

function checkDraw() {
  if (emptyBoxes().length == 0) {
    for (let i = 0; i < boxes.length; i++) {
      boxes[i].removeEventListener('click', turnOn, false);
    }
    winningMessage('Draw!');
    return true;
  }
  return false;
}

function winningMessage(plr) {

  alert(plr);
}



//  function resetGame(){
//     location.reload();
//  }
if(!(/iPhone|iPad/i.test(navigator.userAgent))){
  document.getElementById('game').style.display='none'; 
  document.getElementById('btn').style.display='none';
  document.getElementById('resetButton').style.display='none';
  document.getElementById('resetButton').style.display='none';
  
  
}
