let cvs = document.getElementById("canvas");
let ctx = cvs.getContext("2d");

let bg = new Image();
let bird = new Image();
let fg = new Image();
let trumpBot = new Image();
let trumpUp = new Image();

bg.src = "img/bg.png";
bird.src = "img/bird.png";
fg.src = "img/fg.png";
trumpBot.src = "img/pipeBottom.png";
trumpUp.src = "img/pipeUp.png";

const fly = new Audio();
const scoreAudio = new Audio();

fly.src = "audio/fly.mp3";
scoreAudio.src = "audio/score.mp3";

let gap = 90;
let score = 0;
let birdX = 10;
let birdY = 150;
let grav = 1;

let trump = [];
trump[0] = {
  x: cvs.width,
  y: 0
};

function moveUp() {
  birdY -= 20;
  fly.play();
}

function draw() {
  ctx.drawImage(bg, 0, 0);
  for (let i = 0; i < trump.length; i++) {
    ctx.drawImage(trumpUp, trump[i].x, trump[i].y);
    ctx.drawImage(trumpBot, trump[i].x, trump[i].y + trumpUp.height + gap);
    trump[i].x--;

    if (trump[i].x == 100) {
      trump.push({
        x: cvs.width,
        y: Math.floor(Math.random() * trumpUp.height) - trumpUp.height
      });
    }

    if (
      (birdX + bird.width >= trump[i].x &&
        birdX <= trump[i].x + trumpUp.width &&
        (birdY <= trump[i].y + trumpUp.height ||
          birdY + bird.height >= trump[i].y + trumpUp.height + gap)) ||
      birdY + bird.height >= cvs.height - fg.height
    ) {
      location.reload();
    }

    if (trump[i].x == 5) {
      score++;
      scoreAudio.play();
    }
  }

  ctx.drawImage(fg, 0, cvs.height - fg.height);
  ctx.drawImage(bird, birdX, birdY);
  birdY += grav;
  ctx.fillStyle = "white";
  ctx.font = "20px SansSerif";
  ctx.fillText("Score : " + score, 10, 20);

  requestAnimationFrame(draw);
}

document.addEventListener("keydown", moveUp);

trumpUp.onload = draw;
