var dog,sadDog,happyDog,garden,washroom, database;
var foodS,foodStock;
var fedTime,lastFed,currentTime;
var feed,addFood;
var foodObj;
var gameState,readState;

function preload(){
sadDog=loadImage("images/Dog.png");
happyDog=loadImage("images/Happy.png");
garden=loadImage("images/Garden.png");
washroom=loadImage("images/Wash Room.png");
bedroom=loadImage("images/Bed Room.png");
livingroom=loadImage("images/Living Room.png");
milkImg = loadImage("images/milk.png")
}

function setup() {
  database=firebase.database();
  createCanvas(600,500);
  
  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  foodStock.set(20)

  
   
  dog=createSprite(250,250,10,10);
  dog.addImage(sadDog);
  dog.scale=0.15;
  

  milkBottle2 = createSprite(210,280,10,10)
  milkBottle2.addImage(milkImg)
  milkBottle2.scale = 0.025
  milkBottle2.visible = false;
}

function draw() {
  background("yellow");

  foodObj.display();
  writeStock(foodS)

  if(foodS === 0){
    dog.addImage(happyDog)
    milkBottle2.visible = false
  }
  else{
    dog.addImage(sadDog)
    milkBottle2.visible = true
  }

   
   if(gameState === 1 ){
     dog.addImage(happyDog)
     dog.scale = 0.175
     dog.y=250
   }

   if(gameState === 2 ){
    dog.addImage(sadDog)
    dog.scale = 0.175
    milkBottle2.visible=false
    dog.y=250 
  }

  var Bath=createButton("I want to take bath")
  Bath.position(580,125)
  if(Bath.mousePressed(function(){
    gameState=3
    database.ref('/').update({'gameState':gameState})
  }))
  if(gameState === 3 ){
    dog.addImage(washroom)
    dog.scale = 1
    milkBottle2.visible=false
  }

  var Sleep=createButton("I am very sleepy")
  Sleep.position(710,125)
  if(Sleep.mousePressed(function(){
    gameState=4
    database.ref('/').update({'gameState':gameState})
  }))
  if(gameState === 4 ){
    dog.addImage(bedroom)
    dog.scale = 1
    milkBottle2.visible=false
  }

  var Play=createButton("Lets play")
  Play.position(400,160)
  if(Play.mousePressed(function(){
    gameState=5
    database.ref('/').update({'gameState':gameState})
  }))
  if(gameState === 5 ){
    dog.addImage(livingroom)
    dog.scale = 1
    milkBottle2.visible=false
  }

  var PlayInGarden=createButton("I want to play in a park")
  PlayInGarden.position(500,160)
  if(PlayInGarden.mousePressed(function(){
    gameState=6
    database.ref('/').update({'gameState':gameState})
  }))
  if(gameState === 6 ){
    dog.addImage(garden)
    dog.scale = 0.5
    milkBottle2.visible=false
  }
  
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  
}

function writeStock(x){
  database.ref('/').update({
      food:x
  })
  
}

