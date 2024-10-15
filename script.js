let board;
let boardWidth = 750;
let boardHeight = 250;
let context;

// Joueur
let pHeight = 94;
let pWidth = 88;
let pX = 50;
let pY = boardHeight - pHeight;
let pImg;

let player = {
    x: pX,
    y: pY,
    width: pWidth,
    height: pHeight
};

// Obstacles
let obstacleArray = [];

let obstacle1Width = 34;
let obstacle2Width = 69;
let obstacle3Width = 102;
let obstacleHeight = 70;
let obstacleX = 700;
let obstacleY = boardHeight - obstacleHeight;

let obstacle1Img, obstacle2Img, obstacle3Img;

// Physique
let velocityX = -8;
let velocityY = 0;
let gravity = 0.4;

let gameOver = false;
let score = 0;

window.onload = function() {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d");

    pImg = new Image();
    pImg.src = "./img/idlle.png";
    pImg.onload = function() {
        context.drawImage(pImg, player.x, player.y, player.width, player.height);
    };

    obstacle1Img = new Image();
    obstacle1Img.src = "./img/obstacle1.png";

    requestAnimationFrame(update);
    setInterval(placeObstacle, 1000);
    document.addEventListener("keydown", moveDirectionPlayer);
};

function update() {
    requestAnimationFrame(update);
    if (gameOver) return;

    context.clearRect(0, 0, boardWidth, boardHeight);

    // Joueur
    velocityY += gravity;
    player.y = Math.min(player.y + velocityY, pY);
    context.drawImage(pImg, player.x, player.y, player.width, player.height);

    // Obstacles
    for (let i = 0; i < obstacleArray.length; i++) {
        let obstacle = obstacleArray[i];
        obstacle.x += velocityX;
        context.drawImage(obstacle.img, obstacle.x, obstacle.y, obstacle.width, obstacle.height);

        // Détection de collision
        if (detectCollision(player, obstacle)) {
            gameOver = true;
        }
    }

    // Score
    context.fillStyle = "black";
    context.font = "20px Courier";
    score++;
    context.fillText(score, 5, 20);

    // Retirer les obstacles hors de l'écran
    //obstacleArray = obstacleArray.filter(obstacle => obstacle.x + obstacle.width > 0);
}

function moveDirectionPlayer(e) {
    if (gameOver) return;

    if ((e.code === "Space" || e.code === "ArrowUp") && player.y === pY) {
        velocityY = -10; // Saut
    }
}

function placeObstacle() {
    if (gameOver) return;

    let obstacle = {
        img: null,
        x: obstacleX,
        y: obstacleY,
        width: null,
        height: obstacleHeight
    };

    let placeObstacleRandom = Math.random();
    if (placeObstacleRandom > 0.90) {
        obstacle.img = obstacle1Img;
        obstacle.width = obstacle1Width;
    } else if (placeObstacleRandom > 0.70) {
        obstacle.img = obstacle2Img;
        obstacle.width = obstacle2Width;
    } else {
        obstacle.img = obstacle3Img;
        obstacle.width = obstacle3Width;
    }

    obstacleArray.push(obstacle);

    // Limiter le nombre d'obstacles
    if (obstacleArray.length > 5) {
        obstacleArray.shift();
    }
}

function detectCollision(a, b) {
    return a.x < b.x + b.width &&
           a.x + a.width > b.x &&
           a.y < b.y + b.height &&
           a.y + a.height > b.y;
}
