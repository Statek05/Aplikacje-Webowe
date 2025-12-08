const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let frames = 0;
const DEGREE = Math.PI / 180;
const BASE_HEIGHT = 512;
let scale = 1;
let virtualWidth = 288;

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  scale = canvas.height / BASE_HEIGHT;
  virtualWidth = canvas.width / scale;
}
window.addEventListener("resize", resize);
resize();

const bgImg = new Image();
bgImg.src = "flappybird/background-day.png";
const fgImg = new Image();
fgImg.src = "flappybird/base.png";
const birdImg = [new Image(), new Image(), new Image()];
birdImg[0].src = "flappybird/yellowbird-upflap.png";
birdImg[1].src = "flappybird/yellowbird-midflap.png";
birdImg[2].src = "flappybird/yellowbird-downflap.png";
const pipeImg = new Image();
pipeImg.src = "flappybird/pipe-green.png";

const messageImg = new Image();
messageImg.src = "ui/message.png";
const gameoverImg = new Image();
gameoverImg.src = "ui/gameover.png";

const scoreImages = [];
for (let i = 0; i < 10; i++) {
  scoreImages[i] = new Image();
  scoreImages[i].src = `number/${i}.png`;
}

const SCORE_S = new Audio();
SCORE_S.src = "soundefects/point.wav";
const FLAP_S = new Audio();
FLAP_S.src = "soundefects/wing.wav";
const HIT_S = new Audio();
HIT_S.src = "soundefects/hit.wav";
const SWOOSH_S = new Audio();
SWOOSH_S.src = "soundefects/swoosh.wav";
const DIE_S = new Audio();
DIE_S.src = "soundefects/die.wav";

function playSound(sound) {
  try {
    sound.currentTime = 0;
    sound.play();
  } catch (e) {}
}

const state = {
  current: 0,
  getReady: 0,
  game: 1,
  dying: 2,
  newBest: 3,
  over: 4,
};

let ghostTimer = 0;
let warpTimer = 0;
let postBoostTimer = 0;
let recordAnimationStartTime = 0;

function action() {
  switch (state.current) {
    case state.getReady:
      state.current = state.game;
      playSound(SWOOSH_S);
      break;
    case state.game:
      if (warpTimer <= 0) {
        bird.flap();
        playSound(FLAP_S);
      }
      break;
    case state.over:
      resetGame();
      playSound(SWOOSH_S);
      break;
  }
}

document.addEventListener("keydown", function (evt) {
  if (evt.code === "Space") action();
});
canvas.addEventListener("click", action);

const bg = {
  w: 288,
  h: 512,
  draw: function () {
    let count = Math.ceil(virtualWidth / this.w) + 1;
    for (let i = 0; i < count; i++) {
      ctx.drawImage(bgImg, i * this.w, 0, this.w, this.h);
    }
  },
};

const fg = {
  x: 0,
  w: 336,
  h: 112,
  get y() {
    return BASE_HEIGHT - this.h;
  },
  draw: function () {
    let count = Math.ceil(virtualWidth / this.w) + 1;
    for (let i = 0; i < count; i++) {
      ctx.drawImage(
        fgImg,
        (this.x % this.w) + i * this.w,
        this.y,
        this.w,
        this.h
      );
    }
  },
  update: function () {
    if (state.current == state.game) {
      let speed = warpTimer > 0 ? 6 : 2;
      this.x = this.x - speed;
    }
  },
};

const bird = {
  animation: [0, 1, 2, 1],
  x: 50,
  y: 150,
  w: 34,
  h: 24,
  radius: 12,
  frame: 0,
  speed: 0,
  gravity: 0.25,
  jump: 4.6,
  rotation: 0,
  draw: function () {
    let birdIndex = this.animation[this.frame];
    ctx.save();
    ctx.translate(this.x, this.y);

    if (ghostTimer > 0) ctx.globalAlpha = 0.5;
    else if (postBoostTimer > 0) ctx.globalAlpha = frames % 10 < 5 ? 0.2 : 1.0;

    if (state.current == state.newBest) {
      let timePassed = Date.now() - recordAnimationStartTime;
      this.rotation = (timePassed / 100) * Math.PI;
    } else {
      this.rotation = this.speed * 3 * DEGREE;
      if (this.rotation > 90 * DEGREE) this.rotation = 90 * DEGREE;
      if (this.rotation < -25 * DEGREE) this.rotation = -25 * DEGREE;
      if (warpTimer > 0) this.rotation = 0;
      if (state.current == state.dying || state.current == state.over)
        this.rotation = 90 * DEGREE;
    }

    ctx.rotate(this.rotation);
    ctx.drawImage(birdImg[birdIndex], -this.w / 2, -this.h / 2, this.w, this.h);
    ctx.restore();
  },
  flap: function () {
    this.speed = -this.jump;
  },
  update: function () {
    if (state.current == state.game) {
      if (ghostTimer > 0) {
        ghostTimer--;
        if (ghostTimer === 0) postBoostTimer = 90;
      }
      if (warpTimer > 0) {
        warpTimer--;
        if (warpTimer === 0) postBoostTimer = 90;
        this.y += (150 - this.y) * 0.1;
        this.speed = 0;
        this.rotation = 0;
        return;
      }
      if (postBoostTimer > 0) postBoostTimer--;
    }

    const period = state.current == state.getReady ? 10 : 5;
    this.frame += frames % period == 0 ? 1 : 0;
    this.frame = this.frame % this.animation.length;

    if (state.current == state.getReady) {
      this.y = 150;
      this.rotation = 0;
    } else {
      this.speed += this.gravity;
      this.y += this.speed;

      if (this.y + this.h / 2 >= fg.y) {
        this.y = fg.y - this.h / 2;
        if (state.current == state.game || state.current == state.dying) {
          playSound(DIE_S);
          if (score.value > score.best) {
            score.best = score.value;
            localStorage.setItem("flappy_best", score.best);
            saveHighScore();
            state.current = state.newBest;
            recordAnimationStartTime = Date.now();
          } else {
            state.current = state.over;
            saveHighScore();
          }
        }
      }
    }
    if (state.current == state.newBest) {
      if (Date.now() - recordAnimationStartTime > 3000)
        state.current = state.over;
    }
  },
};

const boosts = {
  position: [],
  r: 15,
  draw: function () {
    for (let i = 0; i < this.position.length; i++) {
      let b = this.position[i];
      ctx.beginPath();
      ctx.arc(b.x, b.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle =
        b.type === "ghost"
          ? "rgba(100, 200, 255, 0.8)"
          : "rgba(255, 100, 100, 0.8)";
      ctx.fill();
      ctx.strokeStyle = "#FFF";
      ctx.stroke();
      ctx.closePath();
      ctx.fillStyle = "#FFF";
      ctx.font = "12px Arial";
      ctx.fillText(b.type === "ghost" ? "G" : "W", b.x - 5, b.y + 4);
    }
  },
  update: function () {
    if (state.current !== state.game) return;
    if (frames % 500 == 0 && warpTimer <= 0) {
      this.position.push({
        x: virtualWidth,
        y: Math.random() * (fg.y - 100) + 50,
        type: Math.random() > 0.5 ? "ghost" : "warp",
      });
    }
    for (let i = 0; i < this.position.length; i++) {
      let b = this.position[i];
      b.x -= 2;
      let dx = bird.x - b.x;
      let dy = bird.y - b.y;
      if (Math.sqrt(dx * dx + dy * dy) < bird.radius + this.r) {
        if (b.type === "ghost") ghostTimer = 300;
        else warpTimer = 100;
        playSound(SCORE_S);
        this.position.splice(i, 1);
        i--;
        continue;
      }
      if (b.x + this.r < 0) {
        this.position.shift();
        i--;
      }
    }
  },
  reset: function () {
    this.position = [];
  },
};

const pipes = {
  position: [],
  w: 52,
  h: 320,
  gap: 90,
  draw: function () {
    for (let i = 0; i < this.position.length; i++) {
      let p = this.position[i];
      let topY = p.y;
      let bottomY = p.y + this.h + this.gap;
      ctx.save();
      ctx.translate(p.x, topY + this.h);
      ctx.scale(1, -1);
      ctx.drawImage(pipeImg, 0, 0, this.w, this.h);
      ctx.restore();
      ctx.drawImage(pipeImg, p.x, bottomY, this.w, this.h);
    }
  },
  update: function () {
    if (state.current !== state.game) return;
    let currentDx = warpTimer > 0 ? 6 : 2;
    let spawnRate = warpTimer > 0 ? 35 : 100;

    if (frames % spawnRate == 0) {
      this.position.push({
        x: virtualWidth,
        y: -150 * (Math.random() + 1),
      });
    }

    for (let i = 0; i < this.position.length; i++) {
      let p = this.position[i];
      p.x -= currentDx;
      if (p.x + this.w <= 0) {
        this.position.shift();
        score.value += 1;
        if (warpTimer <= 0) playSound(SCORE_S);
        i--;
        continue;
      }
      if (ghostTimer <= 0 && warpTimer <= 0 && postBoostTimer <= 0) {
        let bottomPipeY = p.y + this.h + this.gap;
        if (
          bird.x + bird.radius > p.x &&
          bird.x - bird.radius < p.x + this.w &&
          (bird.y - bird.radius < p.y + this.h ||
            bird.y + bird.radius > bottomPipeY)
        ) {
          state.current = state.dying;
          playSound(HIT_S);
        }
      }
    }
  },
  reset: function () {
    this.position = [];
  },
};

const score = {
  best: localStorage.getItem("flappy_best") || 0,
  value: 0,
  saved: false,
  drawNumber: function (val, x, y) {
    let valStr = val.toString();
    let digitWidth = 24;
    let startX = x - (valStr.length * digitWidth) / 2;
    for (let i = 0; i < valStr.length; i++) {
      let digit = parseInt(valStr[i]);
      if (scoreImages[digit].complete)
        ctx.drawImage(scoreImages[digit], startX + i * digitWidth, y - 25);
    }
  },
  draw: function () {
    let centerX = virtualWidth / 2;
    if (state.current == state.game || state.current == state.dying) {
      this.drawNumber(this.value, centerX, 50);
      if (ghostTimer > 0) {
        ctx.fillStyle = "rgba(100, 200, 255, 0.5)";
        ctx.fillRect(centerX - 50, 60, ghostTimer * 0.6, 5);
      }
    } else if (state.current == state.over) {
      this.drawNumber(this.value, centerX, 186);
      this.drawNumber(this.best, centerX, 228);
      displayTop5(centerX);
    } else if (state.current == state.newBest) {
      ctx.fillStyle = "white";
      ctx.strokeStyle = "black";
      ctx.lineWidth = 2;
      ctx.font = "40px Arial";
      ctx.textAlign = "center";
      ctx.fillText("NEW BEST!", centerX, 150);
      ctx.strokeText("NEW BEST!", centerX, 150);
      this.drawNumber(this.value, centerX, 200);
    }
  },
  reset: function () {
    this.value = 0;
    this.saved = false;
  },
};

function displayTop5(x) {
  let highScores = [];
  try {
    highScores = JSON.parse(localStorage.getItem("flappyHighScores")) || [];
  } catch (e) {}
  ctx.fillStyle = "black";
  ctx.font = "16px Arial";
  ctx.textAlign = "left";
  let startX = x - 70;
  ctx.fillText("Top 5:", startX, 310);
  for (let i = 0; i < highScores.length; i++) {
    ctx.fillText(i + 1 + ". " + highScores[i], startX, 335 + i * 20);
  }
}

function saveHighScore() {
  if (score.saved) return;
  let highScores = [];
  try {
    highScores = JSON.parse(localStorage.getItem("flappyHighScores")) || [];
  } catch (e) {}
  highScores.push(score.value);
  highScores.sort((a, b) => b - a);
  highScores = highScores.slice(0, 5);
  localStorage.setItem("flappyHighScores", JSON.stringify(highScores));
  score.saved = true;
}

function drawUI() {
  let centerX = virtualWidth / 2;
  if (state.current == state.getReady) {
    let w = messageImg.width;
    ctx.drawImage(messageImg, centerX - w / 2, 80);
  }
  if (state.current == state.over) {
    let w = gameoverImg.width;
    ctx.drawImage(gameoverImg, centerX - w / 2, 80);
    ctx.fillStyle = "orange";
    ctx.fillRect(centerX - 60, 260, 120, 35);
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Restart", centerX, 285);
  }
}

function draw() {
  ctx.save();
  ctx.scale(scale, scale);
  bg.draw();
  pipes.draw();
  boosts.draw();
  fg.draw();
  bird.draw();
  drawUI();
  score.draw();
  ctx.restore();
}

function update() {
  bird.update();
  fg.update();
  pipes.update();
  boosts.update();
}

function loop() {
  update();
  draw();
  frames++;
  requestAnimationFrame(loop);
}

function resetGame() {
  bird.speed = 0;
  bird.rotation = 0;
  bird.y = 150;
  pipes.reset();
  boosts.reset();
  score.reset();
  state.current = state.getReady;
  ghostTimer = 0;
  warpTimer = 0;
  postBoostTimer = 0;
  frames = 0;
}

loop();
