let obstacle = [];
let coin = [];
let gameover;
let img;
let witch;
let ghost;
let song;
let money;

var posX, posY;
var speedX;
var hit = false;
var ctally = 0;

//-----------------------------------------------
//CLASSES

class Obstacle {
  constructor() {
    this.x = width;
    this.y = height - 280;
  }

  move() {
    this.x -= 8;
  }
  show() {
    image(ghost, this.x, this.y, 180, 220);
  }
}
//-----------------------------------------------
//CLASSES

class Coin {
  constructor() {
    this.x = width;
    this.y = height - 280;
  }

  move() {
    this.x -= 8;
  }
  show() {
    image(money, this.x, this.y, 100, 90);
  }
  
  collect(){
    this.x = -100;
  }
}
//---------------------------------------------------
//CLASSES

class Jumper {
  constructor() {
    this.x = -50;
    this.y = height - 100;
    this.vy = 0;
    this.gravity = 1;
  }

  jumpheight() {
    if (this.y == height - 350) {
      this.vy = -25;
    }
  }

  hits(Obstacle) {
    return collideRectRect(
      this.x + 150,
      this.y - 150,
      this.x + 200,
      this.y - 50,
      Obstacle.x + 20,
      Obstacle.y + 50,
      Obstacle.x + 140,
      Obstacle.y + 200
    );
  }

  jump() {
    this.y += this.vy;
    this.vy += this.gravity;
    this.y = constrain(this.y, 0, height - 350);
  }

  show() {
    image(witch, this.x, this.y, 400, 350);
  }
}

//-----------------------------------------------------
//PRELOAD

function preload() {
  song = loadSound("enigmatic.mp3");
}

//---------------------------------------------------------
//SETUP

function setup() {
  createCanvas(1000, 700);

  
  song.loop();

  img = loadImage("scene.jpg");
  witch = loadImage("witch.png");
  ghost = loadImage("ghost.png");
  money = loadImage("money.png");
  ghost.scale = 0.5;

  //setting initial position for the scene
  posX = 0;
  posY = 0;

  //speed of the scene
  speedX = -3;

  jumper = new Jumper();

  gameover = 0;
  welcome = 0;
}

//-------------------------------------------------
//DRAW

function draw() {
  if (welcome == 0) {
    //updating positions according to speed
    posX += speedX;

    //edges
    if (posX <= -3000) {
      posX = 0;
    }

    image(img, posX, posY);

    textSize(100);
    textFont("Courier New");
    fill(255);
    text("WITCH'S HOUSE", 120, height / 2);

    textSize(50);
    textFont("Courier New");
    fill(255);
    text("PRESS ENTER TO START", 200, height / 2 + 50);
  }

  //..........................................................
  if (welcome == 1) {
    //updating positions according to speed
    posX += speedX;

    //edges
    if (posX <= -3000) {
      posX = 0;
    }

    image(img, posX, posY);

    if (gameover && keyWentDown("N")) {
      newGame();
    }

    if (Jumper) jumper.show();
    jumper.jump();

    if (random(1) < 0.005) {
      obstacle.push(new Obstacle());
    }

    if (random(1) < 0.001) {
      coin.push(new Coin());
    }

    for (let c of coin) {
      c.move();
      c.show();
      if (jumper.hits(c)) {
        c.collect();
        ctally++;
        print(ctally);
      }
    }

    for (let o of obstacle) {
      o.move();
      o.show();

      if (jumper.hits(o)) {
        textSize(100);
        textFont("Courier New");
        fill(255);
        text("GAMEOVER", 250, height / 2);

        textSize(30);
        textFont("Courier New");
        fill(255);
        text("Coins Collected =" + ctally, 320, height / 2 + 50);

        welcome = 3;
      }
    }
  }

  //............................................................
  if (welcome == 2) {
    //updating positions according to speed
    posX += speedX;

    //edges
    if (posX <= -3000) {
      posX = 0;
    }

    image(img, posX, posY);
  }
}

//-----------------------------------------------
//KEYS

function keyPressed() {
  if (key == " ") {
    jumper.jumpheight();
  }
  if (keyCode === ENTER) {
    welcome = 1;
  }
  if (key === "n") {
    welcome = 0;
  }
}

//----------------------------------------------
