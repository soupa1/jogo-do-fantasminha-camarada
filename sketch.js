var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var pontuacao;
var gameState = "play"


function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  spookySound.play();
  spookySound.setVolume(0.2);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  ghost = createSprite(200,200);
  ghost.addImage("player", ghostImg);
  ghost.scale = 0.3;

  pontuacao = 0;

  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  
}

function draw() {
  background("black");

  if(gameState === "play"){
    pontuacao += Math.round(frameRate()/60)

    doors();
    ghost.velocityY += 1;
  
    //Movimento
    if(keyDown("space")){
      ghost.velocityY = -10;
    }
  
    if(keyDown("a")){
      ghost.x -= 7;
    }
  
    if(keyDown("d")){
      ghost.x += 7;
    }
    //
  
    if(ghost.isTouching(climbersGroup)){ 
      ghost.velocityY = 0;

      
    }

    if(tower.y > 400){
      tower.y = 300
    }

    
    if(ghost.isTouching(invisibleBlockGroup) || ghost.y > 600){
      gameState = "gameOver";
    }

  drawSprites();
  textSize(30);
  fill("DarkSlateGrey");
  text("Pontuação:"+ pontuacao, 200, 30);
  }

  if(gameState === "gameOver"){
    textSize(30);
    fill("white");
    text("Game Over!", 210, 250);
    text("Pontuação:"+ pontuacao, 200, 30);
  }

}

function doors() {
  if(frameCount % 240 === 0){
    door = createSprite(200,-50);
    door.addImage("prota", doorImg);
    door.velocityY = 1;
    door.x = Math.round(random(120,400));
    door.lifetime = 800;
    doorsGroup.add(door);

    climber = createSprite(200,10);
    climber.addImage("grade", climberImg);
    climber.velocityY = 1;
    climber.x = door.x;
    climber.lifetime = 800;
    climbersGroup.add(climber);

    invisibleBlock = createSprite(200,15,climber.width, 2);
    invisibleBlock.velocityY = 1;
    invisibleBlock.x = door.x;
    invisibleBlock.lifetime = 800;
    invisibleBlock.visible = true;
    invisibleBlockGroup.add(invisibleBlock);

    ghost.depth = door.depth;
    ghost.depth += 1;


  }

}