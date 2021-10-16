var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie, zombieImg;
var life1, life1Img, life2, life2Img,life3, life3Img;
var zombieGroup;
var bullet = 30;
var life = 3;
var score = 0;
var Gamestate = "Play";
var loseS, winS, explosionS;
var Gameover, overImg;
var win, winImg;
var resetbutton, buttonImg;


function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  zombieImg = loadImage("assets/zombie.png");

  life1Img = loadImage("assets/heart_1.png");
  life2Img = loadImage("assets/heart_2.png");
  life3Img = loadImage("assets/heart_3.png");

  bgImg = loadImage("assets/bg.jpeg");

  overImg = loadImage("assets/gameOver.png");
  winImg = loadImage("assets/youwin.png");

  buttonImg = loadImage("assets/replayB.png");

  loseS = loadSound("assets/lose.mp3");
  winS = loadSound("assets/win.mp3");
  loseS = loadSound("assets/explosion.mp3");


}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   //player.debug = true
   player.setCollider("rectangle",0,0,300,300)

life1 = createSprite(1650,75,50,50)
life1.addImage(life1Img)
life1.scale = 0.4
life1.visible = false;

life2 = createSprite(1610,75,50,50)
life2.addImage(life2Img)
life2.scale = 0.4
life2.visible = false;

life3 = createSprite(1570,75,50,50)
life3.addImage(life3Img)
life3.scale = 0.4

Gameover = createSprite(windowWidth/2-50,windowHeight/2,50,50)
Gameover.addImage(overImg);
Gameover.scale = 1.2;
Gameover.visible = false;

win = createSprite(windowWidth/2-50,windowHeight/2,50,50)
win.addImage(winImg);
win.scale = 1.2;
win.visible = false;

resetbutton = createSprite(windowWidth/2, windowHeight/2+270, 50,50);
resetbutton.addImage(buttonImg);
resetbutton.scale = 0.3;
resetbutton.visible = false;

zombieGroup = new Group();
bulletG = new Group();


}

function draw() {
  background(0); 



if(Gamestate === "Play"){

  createZombie();

  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")&& player.y> windowHeight/2){
  player.y = player.y-30

}
if(keyDown("DOWN_ARROW")&& player.y< windowHeight-50){
 player.y = player.y+30
}

if(keyDown("RIGHT_ARROW")&& player.x< windowWidth/2){
  player.x = player.x+10
 }
 
 if(keyDown("LEFT_ARROW")&& player.x> 650){
  player.x = player.x-10
 }

 if(keyWentDown("space")&& Gamestate === "Play"){
 
  player.addImage(shooter_shooting)
  bullets = createSprite(player.x,player.y-25,20,1)
  bullets.velocityX = 60;
  bullet = bullet-1;
  bulletG.add(bullets);
 
}

else if(keyWentUp("space")){
  player.addImage(shooterImg)
}

if(life === 3){
  life3.visible = true;
  life2.visible = false;
  life1.visible = false;

}

if(life === 2){
  life3.visible = false;
  life2.visible = true;
  life1.visible = false;

}

if(life === 1){
  life3.visible = false;
  life2.visible = false;
  life1.visible = true;

}

if(life === 0){
  life3.visible = false;
  life2.visible = false;
  life1.visible = false;
  Gamestate = "End"
}

if(zombieGroup.isTouching(player)){
  
  
  for(var i = 0; i<zombieGroup.length;i++){
    if(zombieGroup[i].isTouching(player)){
      zombieGroup[i].destroy();
    }

    life = life-1
  }

}

if(bullet === 0){
  Gamestate = "OutofAmmo"
 
  }

if(score === 100){
  Gamestate = "Win"
}



if(bulletG.isTouching(zombieGroup)){
  
  
  for(var z = 0; z<zombieGroup.length;z++){
    if(zombieGroup[z].isTouching(bulletG)){
      zombieGroup[z].destroy();
      bulletG.destroyEach();
    }
  }
  score = score+5
}

}

if(mousePressedOver(resetbutton.ismousePressedOver)){
  Gamestate = "reset"
}
  
drawSprites();

if(Gamestate === "OutofAmmo"){
  textSize(20)
  fill("red")
  text("You are out of ammo",windowWidth/2,windowHeight/2)
  player.destroy()
  zombieGroup.destroyEach();
  bulletG.destroyEach();
}



if(Gamestate === "End"){
  player.visible = false;
  zombieGroup.destroyEach();
  Gameover.visible = true;
  //loseS.play();
  resetbutton.visible = true;
  if(mousePressedOver(resetbutton)){
    reset();
  }
  
}

if(Gamestate === "Win"){
  player.visible = false;
  zombieGroup.destroyEach();
  win.visible = true;
  resetbutton.visible = true;
  if(mousePressedOver(resetbutton)){
    reset();
  }

}

textSize(20)
fill("red")
text("Bullets: " +bullet, width/2, 50)

text("Score: " +score, width/2-130, 50)

}

function createZombie(){

if(frameCount % 120 === 0){
  zombie = createSprite(1650,displayHeight - 300, 50,50)
  zombie.addImage(zombieImg);
  zombie.scale = 0.2
  zombie.velocityX = -(3+Math.round(score/10));
  zombie.lifetime = 450;
  zombie.y = random(displayHeight/2,displayHeight - 100)
  zombieGroup.add(zombie)

}


}

function reset(){
  Gamestate = "Play"
  Gameover.visible = false;
  win.visible = false;
  player.visible = true;
  life = 3;
  resetbutton.visible = false;

}
