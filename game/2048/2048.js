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
}

const board = new GameBoard();
let textSize;
let lose = false;

function startGame() {
  canvas.style.opacity = '1';
  score = 0;
  createBlocks();
  drawAllBlocks();
  pasteNewBlock();
  pasteNewBlock();
}

startGame();

function Block(row, coll) {
  this.value = 0;
  this.x = coll * board.width + 4 * (coll + 1);
  this.y = row * board.width + 4 * (row + 1);
}

function createBlocks() {
  for (let i = 0; i < board.size; i++) {
    board.blocks[i] = [];
    for (let j = 0; j < board.size; j++) {
      board.blocks[i][j] = new Block(i, j);
    }
  }
}

function drawBlock(Block) {
  ctx.beginPath();
  ctx.rect(Block.x, Block.y, board.width, board.width);
  ctx.fillStyle = '#FFFFFF';
  ctx.fill();
  if (Block.value) {
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
    }
    textSize = board.width / 2;
    ctx.font = textSize + 'px Arial';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    const { width } = board;
    const { value, x, y } = Block;
    ctx.fillText(value, x + width / 2, y + width / 1.5);
  }
}
function drawAllBlocks() {
  for (let i = 0; i < board.blocks.length; i++) {
    for (let j = 0; j < board.blocks.length; j++) {
      drawBlock(board.blocks[i][j]);
    }
  }
}

function pasteNewBlock() {
  let count = 0;
  for (let i = 0; i < board.blocks.length; i++) {
    for (let j = 0; j < board.blocks.length; j++) {
      if (board.blocks[i][j].value === 0) count++;
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
}

//config
document.onkeydown = function(event) {
  if (lose) return;
  const  UP = '38';
  const RIGHT = '39';
  const DOWN = '40';
  const LEFT = '37';
  const directionals = {};
  directionals[UP] = moveUp;
  directionals[DOWN] = moveDown;
  directionals[LEFT] = moveLeft;
  directionals[RIGHT] = moveRight;
  const fn = directionals[event.keyCode];
  fn();
  сheckWin();
  scoreTable.innerHTML  = ('Score: ' + score);
};

function сheckWin() {
  for (let i = 0; i < board.blocks.length; i++) {
    for (let j = 0; j < board.blocks.length; j++) {
      if (board.blocks[i][j] === 2048) {
        return lose = false;
      }
    }
  }
}

function moveRight() {
  const field = board.blocks;
  for (let i = 0; i < field.length; i++) {
    for (let j = field.length - 2; j >= 0; j--) {
      if (field[i][j].value) {
        let coll = j;
        while (coll + 1 < field.length) {
          if (field[i][coll + 1].value === 0) {
            field[i][coll + 1].value = field[i][coll].value;
            field[i][coll].value = 0;
            coll++;
          } else if (field[i][coll].value === field[i][coll + 1].value) {
            field[i][coll + 1].value *= 2;
            score +=  field[i][coll + 1].value;
            field[i][coll].value = 0;
            break;
          } else {
            break;
          }
        }
      }
    }
  }
  pasteNewBlock();
}

function moveLeft() {
  const field = board.blocks;
  for (let i = 0; i < field.length; i++) {
    for (let j = 1; j < field.length; j++) {
      if (field[i][j].value) {
        let coll = j;
        while (coll - 1 >= 0) {
          if (field[i][coll - 1].value === 0) {
            field[i][coll - 1].value = field[i][coll].value;
            field[i][coll].value = 0;
            coll--;
          } else if (field[i][coll].value === field[i][coll - 1].value) {
            field[i][coll - 1].value *= 2;
            score +=   field[i][coll - 1].value;
            field[i][coll].value = 0;
            break;
          } else {
            break;
          }
        }
      }
    }
  }
  pasteNewBlock();
}

function moveUp() {
  const field = board.blocks;
  for (let j = 0; j < field.length; j++) {
    for (let i = 1; i < field.length; i++) {
      if (field[i][j].value) {
        let row = i;
        while (row > 0) {
          if (field[row - 1][j].value === 0) {
            field[row - 1][j].value = field[row][j].value;
            field[row][j].value = 0;
            row--;
          } else if (field[row][j].value === field[row - 1][j].value) {
            field[row - 1][j].value *= 2;
            score +=   field[row - 1][j].value;
            field[row][j].value = 0;
            break;
          } else {
            break;
          }
        }
      }
    }
  }
  pasteNewBlock();
}

function moveDown() {
  const field = board.blocks;
  for (let j = 0; j < field.length; j++) {
    for (let i = field.length - 2; i >= 0; i--) {
      if (field[i][j].value) {
        let row = i;
        while (row + 1 < field.length) {
          if (field[row + 1][j].value === 0) {
            field[row + 1][j].value = field[row][j].value;
            field[row][j].value = 0;
            row++;
          } else if (field[row][j].value === field[row + 1][j].value) {
            field[row + 1][j].value *= 2;
            score += field[row + 1][j].value;
            field[row][j].value = 0;
            break;
          } else {
            break;
          }
        }
      }
    }
  }
  pasteNewBlock();
}

function finishGame() {
  canvas.style.opacity = '0.5';
  if (lose === true) {
    alert('you lose');
  } else if (lose === false) {
    alert('you win');
  }
}

// if(!(/iPhone|iPad/i.test(navigator.userAgent))){
//   document.getElementById('canvasBlock').style.display='none';
//   document.getElementById('canvas').style.display='none';
//   document.getElementById('btn').style.display='none';
//   document.getElementById('control').style.display='none';
//   document.getElementById('score').style.display='none';
//   document.getElementById('notification').style.display = 'block';
// }
