'use strict';
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const scoreTable = document.getElementById('score');
let score = 0;
const size = 4;
const width = canvas.width / size - 5;
const upButton = document.getElementById('up');
const downButton = document.getElementById('down');
const leftButton = document.getElementById('left');
const rightButton = document.getElementById('right');
const blocks = [];
let textSize;
let lose = false;
let win = false;
startGame();

function startGame() {
  canvas.style.opacity = '1'
  score = 0;
  createBlocks();
  drawAllBlocks();
  pasteNewBlock();
  pasteNewBlock();
  
  

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
  ctx.fillStyle = '#FFFFFF'
   
    ctx.fill();
    
    
  if (block.value) {
    const colors  = new Map([
      [2, '#CEFFAB'],
      [4, '#CEFFAB'],
      [8, '#F9ABFF'],
      [16, '#FF3C3C'],
      [32, '#3C82FF'],
      [64,'#3CFFDA'],
      [128, '#BF3CFF'],
      [256, '#9B3CFF'],
      [512, '#5BFF3C'],
      [1024, '#8489FF'],
      [2048,'#D9FF28'],
      [4096, '#F9ABFF'],
    ]);
    for(let value of colors.values()){
      ctx.fillStyle = value;
      ctx.fill()
    }
    textSize = width / 2;
    ctx.font = textSize + 'px Arial';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.fillText(block.value, block.x + width / 2, block.y + width / 1.5);
   
  }
}

function drawAllBlocks() {
  for (let i = 0; i < blocks.length; i++) {
    for (let j = 0; j < blocks.length; j++) {
      drawBlock(blocks[i][j]);
    }
  }
}

function pasteNewBlock() {
  let count = 0;
  let i;
  let j;
  for (i = 0; i < blocks.length; i++) {
    for (j = 0; j < blocks.length; j++) {
      if (blocks[i][j].value === 0) {
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
    const row = Math.floor(Math.random() * size);
    const coll = Math.floor(Math.random() * size);
    if (blocks[row][coll].value === 0) {
      blocks[row][coll].value = Math.random(1) > 0.5 ? 2 : 4;
      drawAllBlocks()
      return;
    }
  }
}

// function compare(a, b) {
//     for (let i = 0; i < size; i++) {
//       for (let j = 0; j < size; j++) {
//         if (a[i][j] !== b[i][j]) {
//           return true;
//         }
//       }
//     }

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
    scoreTable.innerHTML  = ("Score: " + score);
  }

  } }
;

click()

function click(){
  if(document.getElementById('up').clicked == true){
    scoreTable.innerHTML  = ("Score: " + score);
  }}

  function сheckWin() {
    for (let i = 0; i < blocks.length; i++) {
      for (let j = 0; j < blocks.length; j++) {
        if (blocks[i][j] == 2048) {
          return win = true;
        }
      }
    }
    }



function moveRight() {
  let i;
  let j;
  let coll;
  for (i = 0; i < blocks.length; i++) {
    for (j = blocks.length - 2; j >= 0; j--) {
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
  pasteNewBlock();
}

function moveLeft() {
  let i;
  let j;
  let coll;
  for (i = 0; i < blocks.length; i++) {
    for (j = 1; j < blocks.length; j++) {
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
  pasteNewBlock();
}

function moveUp() {
  let i;
  let j;
  let row;
  for (j = 0; j < blocks.length; j++) {
    for (i = 1; i < blocks.length; i++) {
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
  pasteNewBlock();
}

function moveDown() {
  let i;
  let j;
  let row;
  for (j = 0; j < blocks.length; j++) {
    for (i = blocks.length - 2; i >= 0; i--) {
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
  pasteNewBlock();
}

function finishGame() {
  canvas.style.opacity = '0.5';
  if (lose = true){
  alert("you lose")
} else if (win = true){
    alert("you win")
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
