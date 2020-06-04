'use strict';
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const scoreTable = document.getElementById('score');
let score = 0;
const size = 4;
const width = canvas.width / size - 5;

const blocks = [];
let textSize;
const lose = false;
const win = false;
startGame();

function startGame() {
  createBlocks();
  drawAllBlocks();
  addNumber();
  addNumber();


}

function block(row, coll) {
  this.value = 0;
  this.x = coll * width + 4 * (coll + 1);
  this.y = row * width + 4 * (row + 1);

}
function createBlocks() {
  for (let i = 0; i < size; i++) {
    blocks[i] = [];
    for (let j = 0; j < size; j++) {
      blocks[i][j] = new block(i, j);
    }
  }
}

function drawBlock(block) {
  ctx.beginPath();
  ctx.rect(block.x, block.y, width, width);

  switch (block.value) {
  case 0:
    ctx.fillStyle = '#FFFFFF';
    break;
  case 2:
    ctx.fillStyle = '#FFFAAB';
    break;
  case 4:
    ctx.fillStyle = '#CEFFAB';
    break;
  case 8:
    ctx.fillStyle = '#F9ABFF';
    break;
  case 16:
    ctx.fillStyle = '#FF3C3C';
    break;
  case 32:
    ctx.fillStyle = '#3C82FF';
    break;
  case 64:
    ctx.fillStyle = '#3CFFDA';
    break;
  case 128:
    ctx.fillStyle = '#BF3CFF';
    break;
  case 256:
    ctx.fillStyle = '#9B3CFF';
    break;
  case 512:
    ctx.fillStyle = '#5BFF3C';
    break;
  case 1024:
    ctx.fillStyle = '#8489FF';
    break;
  case 2048:
    ctx.fillStyle = '#D9FF28';
    break;
  case 4096:
    ctx.fillStyle = '#BC1B1B';
    break;
  default:
    ctx.fillStyle = '#';

  }
  ctx.fill();
  if (block.value) {
    textSize = width / 2;
    ctx.font = textSize + 'px Arial';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.fillText(block.value, block.x + width / 2, block.y + width / 1.5);

  }
}

function drawAllBlocks() {
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      drawBlock(blocks[i][j]);
    }
  }
}

function addNumber() {
  let count = 0;
  let i;
  let j;
  for (i = 0; i < size; i++) {
    for (j = 0; j < size; j++) {
      if (blocks[i][j].value === 0) {
        count++;
      }
    }
  }
  if (count === 0) {
    //   CheckWin()
    finishGame();
    return;
  }
  while (true) {
    const row = Math.floor(Math.random() * size);
    const coll = Math.floor(Math.random() * size);
    if (blocks[row][coll].value === 0) {
      blocks[row][coll].value = Math.random(1) > 0.5 ? 2 : 4;
      drawAllBlocks();
      return;
    }
  }
}

//config
document.onkeydown = function(event) {
  if (lose == false) {
    if (event.keyCode === 38) {
      moveUp();
    } else if (event.keyCode === 39) {
      moveRight();
    } else if (event.keyCode === 40) {
      moveDown();
    } else if (event.keyCode === 37) {
      moveLeft();
    }
    scoreTable.innerHTML = +score;
  }
};



function moveRight() {
  let i;
  let j;
  let coll;
  for (i = 0; i < size; i++) {
    for (j = size - 2; j >= 0; j--) {
      if (blocks[i][j].value) {
        coll = j;
        while (coll + 1 < size) {
          if (blocks[i][coll + 1].value === 0) {
            blocks[i][coll + 1].value = blocks[i][coll].value;
            blocks[i][coll].value = 0;
            coll++;
          } else if (blocks[i][coll].value == blocks[i][coll + 1].value) {
            blocks[i][coll + 1].value *= 2;
            score +=  blocks[i][coll + 1].value;
            blocks[i][coll].value = 0;
            break;
          } else {
            break;
          }
        }
      }
    }
  }
  addNumber();
}

function moveLeft() {
  let i;
  let j;
  let coll;
  for (i = 0; i < size; i++) {
    for (j = 1; j < size; j++) {
      if (blocks[i][j].value) {
        coll = j;
        while (coll - 1 >= 0) {
          if (blocks[i][coll - 1].value === 0) {
            blocks[i][coll - 1].value = blocks[i][coll].value;
            blocks[i][coll].value = 0;
            coll--;
          } else if (blocks[i][coll].value == blocks[i][coll - 1].value) {
            blocks[i][coll - 1].value *= 2;
            score +=   blocks[i][coll - 1].value;
            blocks[i][coll].value = 0;
            break;
          } else {
            break;
          }
        }
      }
    }
  }
  addNumber();
}

function moveUp() {
  let i;
  let j;
  let row;
  for (j = 0; j < size; j++) {
    for (i = 1; i < size; i++) {
      if (blocks[i][j].value) {
        row = i;
        while (row > 0) {
          if (blocks[row - 1][j].value === 0) {
            blocks[row - 1][j].value = blocks[row][j].value;
            blocks[row][j].value = 0;
            row--;
          } else if (blocks[row][j].value == blocks[row - 1][j].value) {
            blocks[row - 1][j].value *= 2;
            score +=  blocks[row - 1][j].value;
            blocks[row][j].value = 0;
            break;
          } else {
            break;
          }
        }
      }
    }
  }
  addNumber();
}

function moveDown() {
  let i;
  let j;
  let row;
  for (j = 0; j < size; j++) {
    for (i = size - 2; i >= 0; i--) {
      if (blocks[i][j].value) {
        row = i;
        while (row + 1 < size) {
          if (blocks[row + 1][j].value === 0) {
            blocks[row + 1][j].value = blocks[row][j].value;
            blocks[row][j].value = 0;
            row++;
          } else if (blocks[row][j].value == blocks[row + 1][j].value) {
            blocks[row + 1][j].value *= 2;
            score +=  blocks[row + 1][j].value;
            blocks[row][j].value = 0;
            break;
          } else {
            break;
          }
        }
      }
    }
  }
  addNumber();
}

function finishGame() {
  canvas.style.opacity = '0.5';
  lose == true;
  alert("you lose")
}
///iOS only compatibility (optional), comment if not needed
if(!(/iPhone|iPad/i.test(navigator.userAgent))){
  document.getElementById('canvasBlock').style.display='none'; 
  document.getElementById('canvas').style.display='none';
  document.getElementById('btn').style.display='none';
  document.getElementById('control').style.display='none';
  document.getElementById('score').style.display='none';
  document.getElementById('notification').style.display = 'block';
}
