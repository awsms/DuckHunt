const duck = document.getElementById('duck');
const duckScore = document.getElementById('score-duck');
const hunterScore = document.getElementById('score-hunter');
// const resetButton = document.getElementById('button-reset');
const newGameButton = document.getElementById('button-new_game');
const timerElement = document.getElementById('timer');
const results = document.getElementById('score-results');

var gameOver = false;

// endroit où se trouve actuellement le canard sur les axes X/Y
var duckLocation = {
   x: 0,
   y: 0
};

var remainingTime = 120
var timer = setInterval(function(){
   remainingTime -= 1
   timerElement.textContent = remainingTime+'s';
   if (remainingTime == 0) {
      clearInterval(timer)
      whoWins(duckScoreCount,hunterScoreCount)
      gameOver = true
   }
} ,1000);



// variable indexant l'état de chaque touche du clavier répondant aux inputs 
var currentKeyPressed = {
   up: false,
   down: false,
   left: false,
   right: false,
   shift: false
};

//reset l'état de toutes les touches
function resetKeyPressed() {
   currentKeyPressed.up = false,
   currentKeyPressed.down = false,
   currentKeyPressed.left = false,
   currentKeyPressed.right = false,
   currentKeyPressed.shift = false
};

// évènements qui écoutent les inputs du clavier lorsqu'une touche est appuyée (déplacement du canard)
window.addEventListener("keydown", function(e) {
   // arrête de répondre aux inputs si la partie est terminée
   if (gameOver) {
      return
   } else if (e.code === "ArrowDown"){
      // move the duck 50px down when arrow down key is pressed
      // when the down arrow is pressed, change the currentKeyPressed property for down key to true
      currentKeyPressed.down = true
   } else if (e.code === "ArrowUp"){
      currentKeyPressed.up = true
   } else if (e.code === "ArrowLeft"){
      currentKeyPressed.left = true
   } else if (e.code === "ArrowRight"){
      currentKeyPressed.right = true
   } else if (e.code === "ShiftLeft"){
      currentKeyPressed.shift = true
}});
 
// évènements qui écoutent les inputs du clavier lorsqu'une touche est relâchée
window.addEventListener("keyup", function(e) {
   if (e.code === "ArrowDown"){
      // move the duck 50px down when arrow down key is pressed
      currentKeyPressed.down = false
   } if (e.code === "ArrowUp"){
      currentKeyPressed.up = false
   } if (e.code === "ArrowLeft"){
      currentKeyPressed.left = false
   } if (e.code === "ArrowRight"){
      currentKeyPressed.right = false
   } else if (e.code === "ShiftLeft"){
      currentKeyPressed.shift = false
}});

// intervalle auquel est rafraîchi l'appel des fonctions du déplacement du canard
// const intervalDuck = 8

setInterval(() => {
   if (currentKeyPressed.up) {
      duckPosition(0,-9)
   } else if (currentKeyPressed.down) {
      duckPosition(0,9)
   } if (currentKeyPressed.right) {
      duckPosition(9,0)
   } else if (currentKeyPressed.left) {
      duckPosition(-9,0)
   }
}, 8);


window.addEventListener("keydown", function(e) {
   if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
       e.preventDefault();
   }
}, false);

function newGame() {
   // on génère une position aléatoire à chaque début de partie pour le canard
   duckLocation.x = Math.floor(Math.random() * (1300 - 1 + 1))
   duckLocation.y = Math.floor(Math.random() * (775 - 1 + 1))
   duck.style.transform = 'translate('+duckLocation.x+'px,'+duckLocation.y+'px)'
   remainingTime = 120
   timerElement.textContent = remainingTime+'s'
   hunterScoreCount = 0
   hunterScore.textContent = 0
   duckScoreCount = 0
   duckScore.textContent = 0
   resetKeyPressed()
};

newGame()

function duckPosition(x,y) {
   // le canard ira plus rapidement si shift gauche est enfoncée
   if (currentKeyPressed.shift) {
      x=x*1.3
      y=y*1.3 }
   duckLocation.x += x
   duckLocation.y += y
   // si le canard sort de l'écran de jeu, on le force à s'y mettre à l'extrémité
   if (duckLocation.x > 1300) {
      duckLocation.x = 1300
   } if (duckLocation.x < 0) {
      duckLocation.x = 0
   } if (duckLocation.y > 775) {
      duckLocation.y = 775
   } if (duckLocation.y < 0) {
      duckLocation.y = 0
   } if (x<0) {
      // scaleX(-1) permet de refléter le sprite du canard sur l'axe X     
      duck.style.transform = 'translate('+duckLocation.x+'px,'+duckLocation.y+'px) scaleX(-1)'
   // on utilise une fonction CSS qui permet de changer l'emplacement du canard sur les axes X/Y
   // "translateX(x_px) translateY(y_px)" = "translate(x_px, y_px)"
   } else {
      duck.style.transform = 'translate('+duckLocation.x+'px,'+duckLocation.y+'px)'
}};

// var gunsound = new Audio('sfx/10 - SFX Gun Shot.mp3')

// window.addEventListener('click', () => {
//    gunsound.play();
//  });

// évènements qui écoutent les inputs de la souris et qui appellent une fonction selon l'endroit cliqué (tir sur canard ou reset du timer)
duck.addEventListener('mousedown', () => {
   hunterHit();
});

newGameButton.addEventListener('click', () => {
   newGame();
});
  

// update score for the duck player every 10sec

var tets = setInterval(function(){
   //  console.log(l);
   //  l--;
   //  this.
   //  timer.textContent = time
   //  if(l == -1) {
//      console.log('t');
//      clearInterval(tets);
   //  }
   duckScoreCount += 10
   duckScore.textContent = duckScoreCount
},10000);



function whoWins(duckScoreCount,hunterScoreCount) {
   results.style.display = "block"
   if (duckScoreCount>hunterScoreCount) {
      results.textContent = "Le canneton a gagné !"
      // alert("le canneton a gagné")
   } else if (duckScoreCount<hunterScoreCount) {
      results.textContent = "Le chasseur a gagné !"
      // alert("le chasseur a gagné")
   } else {
      alert('égalité')
   }
};

/* scoring part */
// hunterScore.textContent = 0
hunterScoreCount = 0;
function hunterHit() {
   // hunterScoreCount += 1
   hunterScore.textContent = (hunterScoreCount += 1)
};