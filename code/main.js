
import kaboom from "kaboom"

// initialize context
kaboom({
    font: "sinko",
    canvas: document.querySelector("#mycanvas"),
    background: [100, 100, 100],
    
})

//Adding PNG Sprites
loadSprite("Beer", "sprites/Beer.png");
loadSprite("Hero", "sprites/Hero.png");
loadSprite("Bug", "sprites/Bug.png");

//Adding Music
loadSound("Drink", "sounds/Drink.mp3");
loadSound("score", "sounds/score.mp3");
loadSound("Game Over", "sounds/Game Over.mp3");
loadSound("Game Music", "sounds/Game Music.mp3");

//Adding game variables
let SPEED = 560
let bugSpeed = 2
let score = 0
let scoreText
let bg = false
let backgroundMusic;

//Play Background music on event Listener
const playBg = ()=> {
  if (!bg) {
  backgroundMusic = play("Game Music")
    bg= true
  }

}

//Displaying Score board
  let scoreBoard = (()=> {
    destroy(scoreText)
    
   scoreText =  add([
    text("Score: "+ score),
    scale(2.2),
     color(0, 0, 255),
    pos(width() - 180, 20), 
       ])
  } 
)
//Adding Player in Game
let player = add([
    sprite("Hero"),  // renders as a sprite
    pos(120, 80),    // position in world
    area(),          // has a collider
    scale(1.5),
  "hero"
    // body(),          // responds to physics and gravity
])



onClick (() => {loop(2, ()=>{

  playBg()

  /*** Innitilize Bugs Sprites in game ***/
  for (let i=0; i<2; i++) {
    let x = width();
    let y = rand(height(), 0);
    
    let bug = add([
    sprite("Bug"),  // renders as a sprite
    pos(x, y),    // position in world
    area(),          // has a collider
    scale(1.5),
    "Bug"
    // body(),          // responds to physics and gravity
    ])
    bug.onUpdate(()=> {
      bug.moveTo(bug.pos.x - bugSpeed, bug.pos.y )
    })

  }

 
  
})

// Innitilize Beer Sprites in game
loop(2, () => {
   let x = width();
    let y = rand(height(), 0);
    
    let bug = add([
    sprite("Beer"),  // renders as a sprite
    pos(x, y),    // position in world
    area(),          // has a collider
    scale(1.5),
    "Beer"
    // body(),          // responds to physics and gravity
    ])
    bug.onUpdate(()=> {
      bug.moveTo(bug.pos.x - bugSpeed, bug.pos.y )
    })

})

loop(3, () => {
    bugSpeed+= 0.5 && bugSpeed< 8
  console.log(bugSpeed)
})
                
}
        )

player.onCollide("Bug", () => {
    play("Game Over")
    console.log("Game Over")
  destroy(player)
  addKaboom(player.pos)
  scoreText = add([
  text("Game Over"),
  color(0, 0, 255),
  scale(2),
  pos(20, 20),
])

  
})

player.onCollide("Beer", (beer) => {
  backgroundMusic.volume(0.5)
    play("Drink", {
      volume : 2
    })
    console.log("WoW")
  destroy(beer)
  score++
  scoreBoard()
  
  wait(1, () => {
      backgroundMusic.volume(1)
})



})


//Initialize Keyboard events
onKeyDown("left", () => {
  playBg()
    player.move(-SPEED, 0)
})

onKeyDown("right", () => {
  playBg()
    player.move(SPEED, 0)
})

onKeyDown("up", () => {
  playBg()
    player.move(0, -SPEED)
})

onKeyDown("down", () => {
  playBg()
    player.move(0, SPEED)
})