let board = document.getElementById("board");

let boardWidth = 750;
let boardHeight =  250;

let context;


//player
let pHeight = 94;
let pWidth = 88;
let pX = 50;
let pY = boardHeight - pHeight;
let pImg;

//obstacle
let obstacleArray = [];

let obstacle1Width = 34;
let obstacle2Width = 69;
let obstacle3Width = 102;

let obstacleHeight = 70;
let obstacleX = 700;
let obstacleY = boardHeight - obstacleHeight;

//repeat for other 
let obstacle1Img;

//physics
let velocityx = -8;
let velocityY = 0;
let gravity = .4;

let gameOver = false;
let score = 0;

let  player = {
    x : pX,
    y : pY,
    width : pWidth,
    height : pHeight
}


window.onload = function(){

    board.height = boardHeight;
    board.width = boardWidth;

    context = board.getContext("2d");



    context.fillStyle="red";
    context.fillRect(pX,pY,pWidth,pHeight);

    pImg = new Image();
    pImg.src ="./img/idlle.png";
    pImg.onload = function(){
    context.drawImage(pImg,pX,pY,pWidth,pHeight);
    }

    obstacle1Img = new Image();
    obstacle1Img.src ="./img/obstacle1.png";


    requestAnimationFrame(update);
    setInterval(placeObstacle,1000);
    document.addEventListener("keydown",moveDirectionPlayer);

}

function update(){
    requestAnimationFrame(update);
    if(gameOver){
        return;
    }

    context.clearRect(0,0,boardWidth,boardHeight);
    //player
    velocityY += gravity;
    player.y = Math.min(player.y + velocityY,pY);
    context.drawImage(pImg,pX,pY,pWidth,pHeight);
    //obstacle
    for(let i = 0; i < obstacleArray.length;i++){
        let obstacle = obstacleArray[i];
        obstacle.x += velocityx;
        context.drawImage(obstacle.img,obstacle.x,obstacle.width,obstacle.height);

        if(detectCollision(player,obstacle)){
            gameOver = true;

        }
    }
}

function moveDirectionPlayer(e){
    if(gameOver){
        return;
    }

    if((e.code == "Space" || e.code == "ArrowUp") && player.y == pY){
        velocityY = -10;

    }

}

function placeObstacle(){
    if(gameOver){
        return;
    }
    let obstacle = {
        img : null,
        x : obstacleX,
        y : obstacleY,
        width : null,
        height : obstacleHeight
    }

    let placeObstacleRandom = math.random();
    if(placeObstacleRandom > .90){
        obstacle.img = obstacle1Img;
        obstacle.width = obstacle1Width;
        obstacleArray.push(obstacle);
    }
    // else if(){

    // }

    if(obstacleArray.length > 5){
        obstacleArray.shift();
    }
}

function detectCollision(a,b){
    return a.x < b.x + b.width &&
           a.x + a.width > b.x &&
           a.y < b.y + b.height &&
           a.y + a.height > b.y;
}