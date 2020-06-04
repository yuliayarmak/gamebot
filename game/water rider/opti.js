'use strict'
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const step = 10;
const width = canvas.width;
const height = canvas.height;

const WaterRoad = function(image, y) {
  this.x = 0;
  this.y = y;
  this.loaded = false;
  this.image = new Image();
  const obj = this;
  this.image.addEventListener('load', () => {
    obj.loaded = true;
  });
  this.image.src = image;
};

WaterRoad.prototype.Update = function(water) {
  this.y += step;
  if (this.y > 390) {
    this.y = water.y - width + step;
  }
};

const place = [
  new WaterRoad('img/waterRoad.jpg', 0),
  new WaterRoad('img/waterRoad.jpg', width),
];

const Boat = function(image, x, y, isUser) {
  this.x = x;
  this.y = y;
  this.loaded = false;
  this.dead = false;
  this.isUser = isUser;
  this.image = new Image();
  const obj = this;
  this.image.addEventListener('load', () => {
    obj.loaded = true;
  });
  this.image.src = image;
};

Boat.prototype.Equal = function(anotherItem) {
  return this.x === anotherItem.x && this.y === anotherItem.y;
};


Boat.prototype.MovingBoat = function(variable, distance) {
  if (variable === 'x') {
    this.x += distance;
  }
  if (this.x + this.image.width > width) {
    this.x -= distance;
  }
  if (this.x < 0) {
    this.x = 0;
  }

  if (variable === 'y') {
    this.y += distance;
    if (this.y + this.image.height > height) {
      this.y -= distance;
    }
    if (this.y < 0) {
      this.y = 0;
    }
  }
};

const Ball = function(color, x, y) {
  this.x = x;
  this.y = y;
  this.color = color;
  this.isUser = false;
  this.dead = false;
};

Ball.prototype.DrawCircle = function() {
  ctx.arc(this.x, this.y, 5, 0, Math.PI * 2);
  ctx.fillStyle = this.color;
};

Ball.prototype.Update = function() {
  if (!this.isUser) {
    this.y += step;
  }

  if (this.y > height + 50) {
    this.dead = true;
  }
};


const user = new Boat('img/bigboat.png', (width / 2) - 20, height - 48, true);

const up = document.getElementById('up');
up.addEventListener('click', () => {
  user.MovingBoat('y', -step);
});

const left = document.getElementById('left');
left.addEventListener('click', () => {
  user.MovingBoat('x', -step);
});

const right = document.getElementById('right');
right.addEventListener('click', () => {
  user.MovingBoat('x', +step);
});
const down = document.getElementById('down');
down.addEventListener('click', () => {
  user.MovingBoat('y', step);
});

function randomInteger(min, max) {
  const rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

const redballs = [];

function Update() {
  place[0].Update(place[1]);
  place[1].Update(place[0]);
  if (randomInteger(1, 30) > 25) {
    redballs.push(new Ball('red', randomInteger(250, 390), randomInteger(250, 390)));
  }
  Draw();
  DrawBall();
}

function Draw() {
  ctx.clearRect(0, 0, width, height);
  for (let i = 0; i < place.length; i++) {
    ctx.drawImage(place[i].image, 0, 0, place[i].image.width, 
      place[i].image.height, place[i].x, place[i].y, width, width,);
  }

  DrawBoat(user);
}


function DrawBall() {
  for (let i = 0; i < redballs.length; i++) {
    redballs[i].DrawCircle();
  }
}

function DrawBoat(boat) {
  ctx.drawImage(boat.image, 0, 0, boat.image.width, boat.image.height,
     boat.x, boat.y, boat.image.width, boat.image.height);
}

function Start() {
 setInterval(Update, 100);
}

const start = document.getElementById('start');
start.addEventListener('click', () => {
  start.style.display = 'none';
  const buttons = document.getElementById('btn');
  buttons.style.display = 'block';
  canvas.style.display = 'block';
  Start();
});
