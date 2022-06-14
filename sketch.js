var pos
var player
var coin
var score = 0
var gamestate = 'move'
function preload(){
  playerIMG = loadImage('player.png')
  coinIMG = loadImage('coin.png')
  backgroundIMG = loadImage('background.png')
}
function setup() {
  createCanvas(windowWidth,windowHeight);
  database = firebase.database()

  player = createSprite(200, 200, 50, 50)
  player.addImage("player", playerIMG)

  pos = database.ref("player/position")
  pos.on('value', readpos)

  coin = createSprite(300,200,40,50)
  coin.addImage('coin', coinIMG)

}

function draw() {
  background(backgroundIMG);
  textSize(14)
  fill("black")
  text("Score: " + score, 10,10,)
  if (gamestate === 'move'){
      if (keyDown("UP_ARROW")){
    changepos(0,-5)
  }  
  if (keyDown("DOWN_ARROW")){
    changepos(0,5)
  }
  if (keyDown("LEFT_ARROW")){
    changepos(-5,0)
  }
  if (keyDown("RIGHT_ARROW")){
    changepos(5,0)
  }
  }
  if (player.isTouching(coin)){
    changescore()
  }
  if(score > 5){
    win()
  }
  drawSprites();
}
function changepos(x,y){
  database.ref("player/position")
  .set({
    "x":position.x + x,
    "y":position.y + y
  })
}
function changescore(){
  score += 1
  coin.x = Math.round(random(100,windowWidth-100))
  coin.y = Math.round(random(100,windowHeight-100))
}
function readpos(data){
  position = data.val()
  player.x = position.x
  player.y = position.y
}
function win(){
  textSize(50)
  fill("black")
  text("you won!", windowWidth/2.5, windowHeight/2)
  textSize(30)
  text("..but you can keep playing!", windowWidth/2.7, windowHeight/1.5)
}