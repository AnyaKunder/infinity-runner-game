var trex,trex_running,ground,groundImage,invisibleGround,cloudImage,random, obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstcle6,trex_collided, jumpSound, dieSound, checkpointSound, count,gameOver,reset,gameoverImage,resetImage

var play=1
var end=0
var gameState=play

var obstaclesGroup, cloudsGroup

function preload(){
trex_running=loadImage("boy.png")
//trex_collided=loadAnimation("trex_collided.png")
  groundImage=loadImage("ground2.png")
  
  cloudImage=loadAnimation("cloud.png")
  
  obstacle1=loadImage("obstacleGame1.png")
  
  obstacle2=loadImage("obstacleGame2.png")
  
  //obstacle3=loadImage("obstacle3.png")
  
  
  gameoverImage=loadImage("gameOver.png")
  resetImage=loadImage("restart.png")
  
  jumpSound=loadSound("jump.mp3")
  dieSound=loadSound("die.mp3")
  checkpointSound=loadSound("checkPoint.mp3")
  
}

function setup() {
  createCanvas(800, 400);
  trex=createSprite(50,360,10,10);
  trex.addImage("running",trex_running)
  //trex.addAnimation("collided",trex_collided)
  trex.scale=0.5

  gameOver=createSprite(400,200)
  gameOver.addImage(gameoverImage)
  gameOver.scale=0.5
  gameOver.visible=false;
  
  reset=createSprite(400,280)
  reset.addImage(resetImage)
  reset.scale=0.5
  reset.visible=false;
  
  count=0;
  
  ground=createSprite(400,360,800,20);
  ground.addAnimation("ground",groundImage);
  
  
  
  invisibleGround=createSprite(400,370,800,5);
  invisibleGround.visible=false;
  
  obstaclesGroup=new Group()
  cloudsGroup=new Group()
  
  
}

function draw() {
  background("white");
  drawSprites()
  text("score;"+count,50,50)
  
  trex.collide(invisibleGround)
  
 
  
  //console.log(trex.y)
  
  
  if(gameState===play){
   if(ground.x<0){
  ground.x=ground.width/2

  }
    if(count>0&&count%100===0){
    checkpointSound.play()
    }
  
  if(keyDown("space")){
  trex.velocityY=-10
  jumpSound.play()
  }
    trex.velocityY=trex.velocityY+0.5
  
  if(World.frameCount%60===0){
spawnClouds()
}
  if(World.frameCount%70===0){
  spawnObstacles()
}
    if(obstaclesGroup.isTouching(trex)){
    gameState=end;
      dieSound.play()
    }
    ground.velocityX=-6
    
    count=count+Math.round(getFrameRate()/20)
}
  else if(gameState===end){
    
 trex.velocityY=0
  obstaclesGroup.setVelocityXEach(0)
  cloudsGroup.setVelocityXEach(0)
    obstaclesGroup.setLifetimeEach(-1)
    cloudsGroup.setLifetimeEach(-1)
    ground.velocityX=0
   // trex.changeAnimation("collided",trex_collided)
    reset.visible=true;
    gameOver.visible=true;
    if(mousePressedOver(reset)){
    resetGame()
    }
    
  
  }
  
  
}



function spawnClouds(){
clouds=createSprite(800,200,10,10);
clouds.addAnimation("clouds",cloudImage)
clouds.velocityX=-6
clouds.scale=0.7
clouds.lifetime=150;
clouds.y=random(250,300)  
clouds.depth=trex.depth
trex.depth=trex.depth+1
  
cloudsGroup.add(clouds)
}

function spawnObstacles() {
var Obstacles=createSprite(800,360,10,10)
var rand=Math.round(random(1,2))
switch(rand){
  case 1:Obstacles.addImage(obstacle1)
  break
  case 2:Obstacles.addImage(obstacle2)
  break
  
  
}
Obstacles.velocityX=-6
Obstacles.lifetime=150
Obstacles.scale=0.2
  
obstaclesGroup.add(Obstacles)
}
  
function resetGame(){
gameState=play
gameOver.visible=false;
reset.visible=false;
obstaclesGroup.destroyEach()
cloudsGroup.destroyEach()
trex.changeAnimation("running",trex_running)
score=0;

}

  