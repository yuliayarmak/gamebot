'use strict';
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const scoreTable = document.getElementById('score');
let score = 0;
class GameBoard {
  constructor(size = 4, blocks = []) {
    this.size = size;
    this.width = canvas.width / size - 5;
    this.blocks = blocks;
  }
};
const board = new GameBoard();
let textSize;
let lose = false;
let win = false;
startGame();
function startGame() {
  canvas.style.opacity = '1';
  score = 0;
  createBlocks();
  drawAllBlocks();
  pasteNewBlock();
  pasteNewBlock();
};

function block(row, coll) {
  this.value = 0;
  this.x = coll * board.width + 4 * (coll + 1);
  this.y = row * board.width + 4 * (row + 1);
};
function createBlocks() {
  for (let i = 0; i < board.size; i++) {
    board.blocks[i] = [];
    for (let j = 0; j < board.size; j++) {
      board.blocks[i][j] = new block(i, j);
    }
  }
};

function drawBlock(block) {
  ctx.beginPath();
  ctx.rect(block.x, block.y, board.width, board.width);
  ctx.fillStyle = '#FFFFFF';
  ctx.fill();
  if (block.value) {
    const colors  = new Map([
      [2, '#CEFFAB'],
      [4, '#CEFFAB'],
      [8, '#F9ABFF'],
      [16, '#FF3C3C'],
      [32, '#3C82FF'],
      [64, '#3CFFDA'],
      [128, '#BF3CFF'],
      [256, '#9B3CFF'],
      [512, '#5BFF3C'],
      [1024, '#8489FF'],
      [2048, '#D9FF28'],
      [4096, '#F9ABFF'],
    ]);
    for (const value of colors.values()) {
      ctx.fillStyle = value;
      ctx.fill();
    };
    textSize = board.width / 2;
    ctx.font = textSize + 'px Arial';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.fillText(block.value, block.x + board.width / 2, block.y + board.width / 1.5);

  }
};

function drawAllBlocks() {
  for (let i = 0; i < board.blocks.length; i++) {
    for (let j = 0; j < board.blocks.length; j++) {
      drawBlock(board.blocks[i][j]);
    }
  }
};

function pasteNewBlock() {
  let count = 0;
  for (let i = 0; i < board.blocks.length; i++) {
    for (let j = 0; j < board.blocks.length; j++) {
      if (board.blocks[i][j].value === 0) {
        count++;
      }
    }
  }
  if (count === 0) {
    lose = true;
    finishGame();
    return;
  }
  while (true) {
    const row = Math.floor(Math.random() * board.size);
    const coll = Math.floor(Math.random() * board.size);
    if (board.blocks[row][coll].value === 0) {
      board.blocks[row][coll].value = Math.random(1) > 0.5 ? 2 : 4;
      drawAllBlocks();
      return;
    }
  }
};

//config
document.onkeydown = function(event) {
  if (lose == false) {
    if (event.keyCode === 38) {
      moveUp();
      сheckWin();
    } else if (event.keyCode === 39) {
      moveRight();
      сheckWin();
    } else if (event.keyCode === 40) {
      moveDown();
      сheckWin();
    } else if (event.keyCode === 37) {
      moveLeft();
      сheckWin();
      scoreTable.innerHTML  = ('Score: ' + score);
    }
  }
};

function сheckWin() {
  for (let i = 0; i < board.blocks.length; i++) {
    for (let j = 0; j < board.blocks.length; j++) {
      if (board.blocks[i][j] == 2048) {
        return win = true;
      }
    }
  }
};



function moveRight() {
  for (let i = 0; i < board.blocks.length; i++) {
    for (let j = board.blocks.length - 2; j >= 0; j--) {
      if (board.blocks[i][j].value) {
        let coll = j;
        while (coll + 1 < board.blocks.length) {
          if (board.blocks[i][coll + 1].value === 0) {
            board.blocks[i][coll + 1].value = board.blocks[i][coll].value;
            board.blocks[i][coll].value = 0;
            coll++;
          } else if (board.blocks[i][coll].value == board.blocks[i][coll + 1].value) {
            board.blocks[i][coll + 1].value *= 2;
            score +=  board.blocks[i][coll + 1].value;
            board.blocks[i][coll].value = 0;
            break;
          } else {
            break;
          }
        }
      }
    }
  }
  pasteNewBlock();
};

function moveLeft() {
  for (let i = 0; i < board.blocks.length; i++) {
    for (let j = 1; j < board.blocks.length; j++) {
      if (board.blocks[i][j].value) {
        let coll = j;
        while (coll - 1 >= 0) {
          if (board.blocks[i][coll - 1].value === 0) {
            board.blocks[i][coll - 1].value = board.blocks[i][coll].value;
            board.blocks[i][coll].value = 0;
            coll--;
          } else if (board.blocks[i][coll].value ==  board.blocks[i][coll - 1].value) {
            board.blocks[i][coll - 1].value *= 2;
            score +=   board.blocks[i][coll - 1].value;
            board.blocks[i][coll].value = 0;
            break;
          } else {
            break;
          }
        }
      }
    }
  }
  pasteNewBlock();
};

function moveUp() 
  for (let j = 0; j < board.blocks.length; j++) {
    for (let i = 1; i <  board.blocks.length; i++) {
      if (board.blocks[i][j].value) {
       let row = i;
        while (row > 0) {
          if (board.blocks[row - 1][j].value === 0) {
            board.blocks[row - 1][j].value =  board.blocks[row][j].value;
            board.blocks[row][j].value = 0;
            row--;
          } else if (board.blocks[row][j].value == board.blocks[row - 1][j].value) {
            board.blocks[row - 1][j].value *= 2;
            score +=   board.blocks[row - 1][j].value;
            board.blocks[row][j].value = 0;
            break;
          } else {
            break;
          }
        }
      }
    }
  }
  pasteNewBlock();
};

function moveDown() {
  for (let j = 0; j < board.blocks.length; j++) {
    for (let i = board.blocks.length - 2; i >= 0; i--) {
      if (board.blocks[i][j].value) {
        let row = i;
        while (row + 1 < board.blocks.length) {
          if (board.blocks[row + 1][j].value === 0) {
            board.blocks[row + 1][j].value = board.blocks[row][j].value;
            board.blocks[row][j].value = 0;
            row++;
          } else if (board.blocks[row][j].value == board.blocks[row + 1][j].value) {
            board.blocks[row + 1][j].value *= 2;
            score += board.blocks[row + 1][j].value;
            board.blocks[row][j].value = 0;
            break;
          } else {
            break;
          }
        }
      }
    }
  }
  pasteNewBlock();
};

function finishGame() {
  canvas.style.opacity = '0.5';
  if (lose = true) {
    alert('you lose');
  } else if (win = true) {
    alert('you win');
  }
};
// if(!(/iPhone|iPad/i.test(navigator.userAgent))){
//   document.getElementById('canvasBlock').style.display='none';
//   document.getElementById('canvas').style.display='none';
//   document.getElementById('btn').style.display='none';
//   document.getElementById('control').style.display='none';
//   document.getElementById('score').style.display='none';
//   document.getElementById('notification').style.display = 'block';
// }
