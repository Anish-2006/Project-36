var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;

//create feed and lastFed variable here
var feed,lastFed,lastFedTime,foodT,time


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  //dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  feed=createButton("Feed The Dog");
  feed.position(690,95);
  feed.mousePressed(feedDog);

  
}

function draw() {
  background(46,139,87);
  foodObj.display();

  
  //write code to read fedtime value from the database 
  
  lastFedTime = database.ref('FoodTime');
  lastFedTime.on("value",readTime);
 
  //write code to display text lastFed time here

  textSize(15);
  fill("white");
  //stroke("black");
  if(foodT > 12){
    text("Last Fed : " + (foodT-12) + "PM",360,29);
  }else if(foodT === 12){
    text("Last Fed : " + (foodT) + "noon",360,29);
  }else if(foodT === 0){
    text("Last Fed : " + (foodT) + "midnight",360,29);
  }else{
    text("Last Fed : " + (foodT) + "AM",360,29);
  }


  time = hour();
  if((time - lastFed) <=2){
    dog.addImage(happyDog);
  }else{
    dog.addImage(sadDog);
  }
 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

function readTime(data){
  foodT=data.val();
  foodObj.getFedTime(foodT);
}



function feedDog(){
  
  //write code here to update food stock and last fed time
if(foodS > 0){
  foodS = foodS-1;
  database.ref('/').update({
    Food : foodS
  });

  lastFed = hour();
  database.ref('/').update({
    FoodTime : lastFed
  })

}
  
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
