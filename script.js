let box = document.getElementById("box");
let scoreDisplay = document.getElementById("score");
let timeDisplay = document.getElementById("time");
let gameArea = document.getElementById("gameArea");
let restartBtn = document.getElementById("restartBtn");

/* 🔊 Sounds */
let hitSound = document.getElementById("hitSound");
let missSound = document.getElementById("missSound");
let gameOverSound = document.getElementById("gameOverSound");

let score = 0;
let timeLeft = 30;
let gameOver = false;
let timer;

/* Speed control */
let moveSpeed = 0.35;
const minSpeed = 0.12;

/* Move target */
function moveBox() {
    let maxX = gameArea.clientWidth - box.clientWidth;
    let maxY = gameArea.clientHeight - box.clientHeight;

    let randomX = Math.floor(Math.random() * maxX);
    let randomY = Math.floor(Math.random() * maxY);

    box.style.transition = `left ${moveSpeed}s ease, top ${moveSpeed}s ease, transform 0.15s ease`;
    box.style.left = randomX + "px";
    box.style.top = randomY + "px";
}

/* Increase speed slowly */
function increaseSpeed() {
    if (score % 5 === 0 && moveSpeed > minSpeed) {
        moveSpeed -= 0.03;
    }
}

/* End game */
function endGame(message) {
    gameOver = true;
    clearInterval(timer);
    box.style.display = "none";

    gameOverSound.currentTime = 0;
    gameOverSound.play();

    gameArea.classList.add("shake");
    setTimeout(() => gameArea.classList.remove("shake"), 300);

    alert(message + " Your Score: " + score);
}

/* Start / Restart game */
function startGame() {
    score = 0;
    timeLeft = 30;
    moveSpeed = 0.35;
    gameOver = false;

    scoreDisplay.textContent = score;
    timeDisplay.textContent = timeLeft;

    box.style.display = "block";
    moveBox();

    clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--;
        timeDisplay.textContent = timeLeft;

        if (timeLeft <= 0) {
            endGame("⏱ Time's up!");
        }
    }, 1000);
}

/* 🎯 HIT */
box.addEventListener("click", function (event) {
    if (gameOver) return;

    event.stopPropagation();
    score++;
    scoreDisplay.textContent = score;

    hitSound.currentTime = 0;
    hitSound.play();

    increaseSpeed();
    moveBox();
});

/* ❌ MISS */
gameArea.addEventListener("click", function () {
    if (gameOver) return;

    missSound.currentTime = 0;
    missSound.play();

    endGame("❌ You missed the target!");
});

/* Restart */
restartBtn.addEventListener("click", startGame);

/* Initial start */
startGame();
