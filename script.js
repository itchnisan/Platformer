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

window.onload = function(){
    board.height = boardHeight;
    board.width = boardWidth;

    context = board.getContext("2d");



    context.fillStyle="red";
    context.fillRect(pX,pY,pWidth,pHeight);

    // pImg = new Image();
    // pImg.src ="./img/....."
    // pImg.onload = function(){
    // context.drawImage(pImg,pX,pY,pWidth,pHeight);
    // }

    // obstacle1Img = new Image();
    // obstacle1Img.src ="./img/....."


    requestAnimationFrame(update);
    setInterval(placeObstacle,1000);
}

function update(){
    requestAnimationFrame(update);
    context.drawImage(pImg,pX,pY,pWidth,pHeight);

}

function placeObstacle(){
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


}