// attribution des éléments HTML à des variables JS
const duck = document.getElementById('duck');
const duckScore = document.getElementById('score-duck_count');
const gameScreen = document.getElementById('game-screen');
const hunterScore = document.getElementById('score-hunter');
const newGameButton = document.getElementById('button-new_game');
const timerElement = document.getElementById('timer');
const results = document.getElementById('score-results');

// endroit où se trouve le canard sur les axes X/Y
var duckLocation = {
   x: 0,
   y: 0
};

// variable indexant l'état de chaque touche du clavier répondant aux inputs 
var currentKeyPressed = {
   up: false,
   down: false,
   left: false,
   right: false,
   shift: false
};

// reset l'état de toutes les touches
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
      resetKeyPressed()
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
setInterval(() => {
   if (currentKeyPressed.up) {
      duckPosition(0,-8.7)
   } else if (currentKeyPressed.down) {
      duckPosition(0,8.7)
   } if (currentKeyPressed.right) {
      duckPosition(8.7,0)
   } else if (currentKeyPressed.left) {
      duckPosition(-8.7,0)
   }
}, 8);


// window.addEventListener("keydown", function(e) {
//    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
//        e.preventDefault();
//    }
// }, false);

function newGame() {
   // on génère une position aléatoire à chaque début de partie pour le canard
   // gameScreen.offsetHeight représente la hauteur de l'écran, gameScreen.offsetWidth la largeur
   duckLocation.x = Math.floor(Math.random() * (gameScreen.offsetWidth - 143 + 1))
   duckLocation.y = Math.floor(Math.random() * (gameScreen.offsetHeight - 140 + 1))
   duck.style.transform = 'translate('+duckLocation.x+'px,'+duckLocation.y+'px)'

   // on cache le bandeau d'affichage du résultat final
   results.style.display = 'none'

   // initialisation graphique du timer
   timerElement.textContent = '2:00'
   
   // remise à zéro des inputs et de toutes les valeurs de score
   gameOver = false
   hunterScoreCount = 0
   hunterScore.textContent = 0
   duckScoreCount = 0
   duckScore.textContent = 0
   min = 0
   sec = 0
   timerElement.style.color = "blue"
   resetKeyPressed()

   // initialisation du timer
   var remainingTime = 120;
   var timer = setInterval(function(){
      remainingTime -= 1
      var min = Math.floor(remainingTime / 60);
      var sec = remainingTime - min * 60;
      
      // le timer devient rouge dans les 15 dernières secondes
      if (remainingTime <= 15) {
         timerElement.style.color = "red"   
      } 
      // on s'assure que le timer soit toujours sous la forme M:SS
      if (sec <= 9) {
         timerElement.textContent = min + ':' + '0' + sec;   
      } else timerElement.textContent = min + ':' + sec;
      
      if (remainingTime === 0) {
         clearInterval(timer)
         whoWins(duckScoreCount,hunterScoreCount)
         gameOver = true
      }
   } ,1000);
};

newGame()

function duckPosition(x, y) {
   // le canard ira plus rapidement si shift gauche est enfoncée (ne fonctionne que sur les navigateurs basés sur chromium)
   if (currentKeyPressed.shift) {
      x=x*1.3
      y=y*1.3 }
   duckLocation.x += x
   duckLocation.y += y
   // si le canard sort de l'écran de jeu, on le force à se mettre à l'extrémité de la cartouche
   if (duckLocation.x > gameScreen.offsetWidth - 143) {
      duckLocation.x = gameScreen.offsetWidth - 143
   } if (duckLocation.x < 0) {
      duckLocation.x = 0
   } if (duckLocation.y > gameScreen.offsetHeight - 140) {
      duckLocation.y = gameScreen.offsetHeight - 140
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

// liste évènements qui écoutent les inputs de la souris et qui appellent une fonction selon l'endroit cliqué
// un clic gauche sur le canard appelle immédiatement hunterHit() 
duck.addEventListener('mousedown', () => {
   hunterHit();
});

// clic gauche lance une nouvelle partie une fois le clic relâché
newGameButton.addEventListener('click', () => {
   newGame();
});
  
// on ajoute 1 point au chasseur à chaque tir réussi sur le canard si la partie n'est pas terminée
hunterScoreCount = 0;
function hunterHit() {
   if (!gameOver) {
      hunterScore.textContent = (hunterScoreCount += 1)
}};

// on incrémente de 10 points le score du canard toutes les 10 secondes si la partie n'est pas terminée
var duckTimedScore = setInterval(function(){
   if (!gameOver) {
      duckScoreCount += 10
      duckScore.textContent = duckScoreCount
}},10000);

function whoWins(duckScoreCount, hunterScoreCount) {
   results.style.display = "block"
   if (duckScoreCount > hunterScoreCount) {
      results.textContent = "Le canneton a gagné !"
   } else if (duckScoreCount < hunterScoreCount) {
      results.textContent = "Le chasseur a gagné !"
   } else {
      results.textContent = "Égalité !"
   }
};