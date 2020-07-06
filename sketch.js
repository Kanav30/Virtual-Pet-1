//Create variables here
var dog,happyDog,FoodS,FoodStock;
var happyDog2;
var database
function preload()
{
  //load images here
  happyDog = loadImage("images/dogImg.png");
  happyDog2 = loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(500,500);
  //adding the database
  database = firebase.database();

  //creating the dog sprite
  dog = createSprite(240,235);
  dog.addImage(happyDog);
  dog.scale = 0.5;

  //refering the database for food
  FoodStock = database.ref('Food');
  FoodStock.on("value",readStock);

}


function draw() {  
  background(46, 139, 87);
  
  //giving food on pressing of the up arrow
  if(keyWentDown(UP_ARROW)){
  writeStock(FoodS);
  dog.addImage(happyDog2);
}
//texts for directions
textSize(30); 
fill("blue");
text("FOOD REMAINING: " + FoodS,50,475);
text("PRESS UP ARROW TO FEED THE ",10,45);
text("ONE AND ONLY COOKIE",120,75);
  
drawSprites();
 }

function writeStock(x){
if(x <= 0){
  x = 0;
}
else{
  x = x-1;
}
database.ref('/').update({
  'Food': x
})
}

function readStock(data){
FoodS = data.val();
}