

const canvas = document.getElementById("myCanvas");

const ctx = canvas.getContext("2d");
const btn= document.createElement("button");

const myDiv= document.createElement("div");

btn.textContent="Game Reset";

btn.addEventListener("click",resetGame);

document.body.prepend(myDiv);

myDiv.append(btn);


requestAnimationFrame(draw);
let speed = 5;
const player1 = { x: 50, y: 50, speed: speed, width: 35, height: 100 ,score:0};

const player2 = { x: 550, y: 50, speed: speed, width: 35, height: 100 , score :0};

const ball={

  x:canvas.width/2,
  y:canvas.height/2,width:10,height:10,xs:speed,ys:-speed
};
const keys1 = {
  ArrowRight: false,
  ArrowLeft: false,
  ArrowUp: false,
  ArrowDown: false,
};
const keys2 = { KeyD: false, KeyA: false, KeyW: false, KeyS: false };


document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);


function resetGame(){

player1.x=50;
player1.y=50;
player1.score=0;

player2.x=550;
player2.y=50;
player2.score=0;
ballReset();

};

function keyDown(event) {
  if (event.code in keys1) {
    keys1[event.code] = true;
  }

  if (event.code in keys2) {
    keys2[event.code] = true;
  }

  move();
}

function keyUp(event) {
  if (event.code in keys1) {
    keys1[event.code] = false;
  }

  if (event.code in keys2) {
    keys2[event.code] = false;
  }
}

function move() {
  if (keys1.ArrowRight && (player1.x + player1.width) < (canvas.width/2)) {

    console.log("condition is true :  "+ player1.x+ "with width offf  :  "+canvas.width )
    player1.x += player1.speed;
  } else if (keys1.ArrowLeft && player1.x>0) {
    player1.x -= player1.speed;
  }
  if (keys1.ArrowUp && player1.y > 0) {
    player1.y -= player1.speed;
  } else if (keys1.ArrowDown && (player1.y + player1.height)  < canvas.height) {
    player1.y += player1.speed;
  }

  if (keys2.KeyD && ( player2.x + player2.width) < canvas.width) {
    player2.x += player2.speed;
  } else if (keys2.KeyA && player2.x > (canvas.width/2)) {
    player2.x -= player2.speed;
  }
  if (keys2.KeyW && player2.y > 0) {
    player2.y -= player2.speed;
  } else if (keys2.KeyS && (player2.y+player2.height) <canvas.height) {
    player2.y += player2.speed;
  };


  ball.x+=ball.xs;
  ball.y-=ball.ys;

if (ball.x<0){

  player2.score+=1;

  ballReset();
}

if (ball.x>canvas.width){

  player1.score+=1;
  ballReset();
}

   if (ball.y<0 || ball.y>canvas.height){
     ball.ys*=-1;
       };



  if(checkCollision(ball,player1)){

    ball.xs*=-1;
    let temp = ((player2.y + player2.height) / 2);
    let temp1 = ((ball.y + ball.height) / 2);
  if (temp<temp1){

    ball.ys=speed;


  }else{

    ball.ys=-speed;
  }

  }
  if (checkCollision(ball, player2)) {
    ball.xs *= -1;
    let temp = ((player2.y + player2.height) / 2);
    let temp1 = ((ball.y + ball.height) / 2);
    if (temp < temp1) {
      ball.ys = speed;
    }
    else {
      ball.ys = -speed;
    }
}
}
function checkCollision(ob1, ob2) {
  //console.log(ob1.x);
let val= ob1.x < ob2.x  + ob2.width && ob1.x + ob1.width > ob2.x && ob1.y<ob2.y+ob2.height && ob1.y + ob1.height > ob2.y;
if(val){
console.log(val)};
return val;
  }
  

 function ballReset(){

 

 ball. x=canvas.width/2;
 ball.y=canvas.height/2;
 ball.width=10;
 ball.height=10;
 ball.xs=speed;
 ball.ys=-speed  ;

 }

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  move();
  checkCollision(player1, player2);
  ctx.fillStyle = "blue";
  ctx.fillRect(player1.x, player1.y, player1.width, player1.height);

  ctx.fillStyle = "red";
  ctx.fillRect(player2.x, player2.y, player2.width, player2.height);

  ctx.fillStyle = "white";
  ctx.fillRect(ball.x, ball.y, ball.width, ball.height);
  //let output = `Player1 X ${player1.x} Y ${player1.y} Player2 X ${player2.x} Y ${player2.y}`;
let output =`Player1   ${player1.score}   VS   Player2   ${player2.score}`;
  ctx.font = "24px serif";

  ctx.textAlign = "center";
  ctx.fillStyle = "red";
  ctx.fillText(output, 300, 30);


  requestAnimationFrame(draw);
}
