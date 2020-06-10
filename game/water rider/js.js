const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const step = 10;
const objects = [];
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
    this.y = water.y - canvas.width + step;
  }
};

const Boat = function(image, x, y, isPlayer) {
  this.x = x;
  this.y = y;
  this.loaded = false;
  this.dead = false;
  this.isPlayer = isPlayer;
  this.image = new Image();
  const obj = this;
  this.image.addEventListener('load', () => { obj.loaded = true; });
  this.image.src = image;
};

Boat.prototype.Update = function() {
  if (!this.isPlayer) {
    this.y += step;
  }

  if (this.y > canvas.height + 50) {
    this.dead = true;
  }
};

Boat.prototype.Collide = function(ball) {
  let hit = false;
  if (this.y < ball.y + ball.image.height - 10 && this.y + this.image.height - 10 > ball.y) {
    if (this.x + this.image.width - 10 > ball.x && this.x < ball.x + ball.image.width - 10) {
      hit = true;
    }
  }

  return hit;
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

const Ball = function(image, x, y) {
  this.x = x;
  this.y = y;
  this.loaded = false;
  this.dead = false;
  this.image = new Image();
  const obj = this;
  this.image.addEventListener('load', () => { obj.loaded = true; });
  this.image.src = image;
};

Ball.prototype.Update = function() {
  this.y += step;

  if (this.y > canvas.height + 50) {
    this.dead = true;
  }
};

const roads = [
  new WaterRoad('img/waterRoad.jpg', 0),
  new WaterRoad('img/waterRoad.jpg', canvas.width),
];


const user = new Boat('img/bigboat.png', (canvas.width / 2) - 20, canvas.height - 48, true);

function RandomInteger(min, max) {
  const rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

function Update() {
  roads[0].Update(roads[1]);
  roads[1].Update(roads[0]);
  if (RandomInteger(0, 10000) > 9000) {
    objects.push(new Ball('img/ball.png', RandomInteger(30, canvas.width - 50), RandomInteger(250, 400) * -1));
  }

  user.Update();
  let isDead = false;

  for (let i = 0; i < objects.length; i++) {
    objects[i].Update();

    if (objects[i].dead) {
      isDead = true;
    }
  }

  if (isDead) {
    objects.shift();
  }

  let hit = false;

  for (let i = 0; i < objects.length; i++) {
    hit = user.Collide(objects[i]);
    if (hit) {
      Stop();
      user.dead = true;
      break;
    }
  }


  Draw();
}


function Draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < roads.length; i++) {
    ctx.drawImage(roads[i].image, 0, 0, roads[i].image.width, roads[i].image.height, roads[i].x, roads[i].y, canvas.width, canvas.width,);
  }

  DrawBoat(user);

  for (let i = 0; i < objects.length; i++) {
    DrawBall(objects[i]);
  }
}
function DrawBoat(boat) {
  ctx.drawImage(boat.image, 0, 0, boat.image.width, boat.image.height, boat.x, boat.y, boat.image.width, boat.image.height);
}


function DrawBall(ball) {
  ctx.drawImage(ball.image,  ball.x, ball.y, ball.image.width, ball.image.height);
}

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


function Stop() {
  clearInterval(timer);
  document.getElementById('end').style.display = 'block';
  document.getElementById('endText').innerHTML = 'Game Over';
  document.getElementById('btn').style.display = 'none';
  setTimeout(() => {
    document.location.reload();
  }, 5000);
}


function Start() {
  if (!user.dead) {
    timer = setInterval(Update, 100);
  }
}

const start = document.getElementById('start');
start.addEventListener('click', () => {
  start.style.display = 'none';
  const buttons = document.getElementById('btn');
  buttons.style.display = 'block';
  canvas.style.display = 'block';
  Start();
});
