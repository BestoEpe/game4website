const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const scoreDiv = document.getElementById("score");
const winner = document.getElementById("winner");

let  audio = new Audio("winner.mp3");

let ImgUp = new Image();
ImgUp.src = "kanye_up.png";
//hei
let ImgDown = new Image();
ImgDown.src = "kanye_down.png";

let ImgLeft = new Image();
ImgLeft.src = "kanye_left.png";

let imgwinner = new Image();
imgwinner.src = "kanye_winner.png";

let ImgRight = new Image();
ImgRight.src = "kanye_right.png";

let ImgApple = new Image();
ImgApple.src = "champagne_score.png";

let currentImg = ImgDown;

let x = 40;
let y = 40;

let apples = [];

for (let i = 0; i < 10; i++) {
  let appleX = Math.random() * (canvas.width - 50);
  let appleY = Math.random() * (canvas.height - 50);
  apples.push({ x: appleX, y: appleY });
}

let score = 0;

const update = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < apples.length; i++) {
    ctx.drawImage(ImgApple, apples[i].x, apples[i].y, 50, 50);
    if (
      x < apples[i].x + 50 &&
      x + 50 > apples[i].x &&
      y < apples[i].y + 50 &&
      y + 50 > apples[i].y
    ) {
      score++;
      apples.splice(i, 1);
      i--;
    }
  }

  ctx.drawImage(currentImg, x, y, 50, 50);
  scoreDiv.innerHTML = `Score: ${score}`;

  if (score >= 10) {
    winner.innerHTML = "Winner!";
    currentImg = imgwinner;
    restartButton.style.display = "block";
    audio.play();
  }
  
  restartButton.addEventListener("click", () => {
    x = 40;
    y = 40;
    score = 0;
    apples = [];
    for (let i = 0; i < 10; i++) {
      let appleX = Math.random() * (canvas.width - 50);
      let appleY = Math.random() * (canvas.height - 50);
      apples.push({ x: appleX, y: appleY });
    }
    winner.innerHTML = "";
    restartButton.style.display = "none";
  });
};

document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "a":
      if (x > 0) {
        x -= 10;
        currentImg = ImgLeft;
      }
      break;
    case "d":
      if (x < canvas.width - 50) {
        x += 10;
        currentImg = ImgRight;
      }
      break;
    case "w":
      if (y > 0) {
        y -= 10;
        currentImg = ImgUp;
      }
      break;
    case "s":
      if (y < canvas.height - 50) {
        y += 10;
        currentImg = ImgDown;
      }
      break;
  }
});

const restartButton = document.getElementById("restartButton");
restartButton.style.display = "none";

// j score ylitai kymmenen 



//muokkaus

setInterval(update, 16);
