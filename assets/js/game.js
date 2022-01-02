// attribution des éléments HTML à des variables JS
const duck = document.getElementById('duck');
const duckScore = document.getElementById('score-duck_count');
const gameScreen = document.getElementById('game-screen');
const hunterScore = document.getElementById('score-hunter');
const newGameButton = document.getElementById('button-new_game');
const timerElement = document.getElementById('timer');
const results = document.getElementById('score-results');

// initialisation du timer
var timer = 0;

// initialisation des bruitages sonores
const duckPointSFX = new Audio('assets/audio/duck_point.wav');
const newGameSFX = new Audio('assets/audio/new_game.wav');
const gunSFX = new Audio('assets/audio/hunter_point.wav');
 
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
      // lorsque flèche bas est pressée, "position bas" passe à vrai 
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
      // lorsque flèche bas est relâchée, "position bas" passe à faux 
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

// intervalle auquel est rafraîchi l'appel des fonctions de déplacement du canard
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
   
   // remise à zéro des inputs et de toutes les valeurs de score et timer
   gameOver = false
   hunterScoreCount = 0
   hunterScore.textContent = 0
   duckScoreCount = 0
   duckScore.textContent = 0
   timerElement.style.color = "blue"
   var remainingTime = 1;
   resetKeyPressed()

   if (timer !== 0) {
      clearInterval(timer);
      timer = 0
   }

   timer = setInterval(() => {
      remainingTime -= 1
      var min = Math.floor(remainingTime / 60);
      var sec = remainingTime - min * 60;
      
      // le timer devient rouge dans les 15 dernières secondes
      if (remainingTime <= 15) {
         timerElement.style.color = "red"   
      } 
      // le timer devient noir lorsque la partie s'arrête
      if (remainingTime === 0) {
         timerElement.style.color = "black"   
      } 
      // on s'assure que le timer soit toujours sous la forme M:SS
      if (sec <= 9) {
         timerElement.textContent = min + ':' + '0' + sec;   
      } else timerElement.textContent = min + ':' + sec;
      
      // on incrémente de 10 points le score du canard toutes les 10 secondes
      if (remainingTime %10 === 0 && remainingTime !== 0) {
         if (!gameOver) {
         duckScore.textContent = (duckScoreCount += 10)
         duckPointSFX.play()
         }
      }

      // fin de partie lorsqu'il reste 0 seconde au timer 
      if (remainingTime === 0) {
         clearInterval(timer)
         whoWins(duckScoreCount, hunterScoreCount)
         gameOver = true
      }
   } ,1000);
};

newGame()

/**
 * fonction permettant de déplacer le canard grâce au CSS 
 * @param {Number} x   distance de parcours en pixel sur l'axe x
 * @param {Number} y   distance de parcours en pixel sur l'axe y
 */
function duckPosition(x, y) {
   // le canard ira plus rapidement si shift gauche est enfoncée (ne fonctionne que sur les navigateurs basés sur chromium)
   if (currentKeyPressed.shift) {
      x=x*1.3
      y=y*1.3 }

   // la position du canard sur x & y est incrémentée par les valeurs en entrée de fonction
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
   // "translateX(Xpx) translateY(Ypx)" = "translate(Xpx, Ypx)"
   } else {
      duck.style.transform = 'translate('+duckLocation.x+'px,'+duckLocation.y+'px)'
}};

// évènements qui écoutent les inputs de la souris et qui appellent une fonction selon l'endroit cliqué
// clic gauche sur le canard appelle immédiatement hunterHit() 
duck.addEventListener('mousedown', () => {
   hunterHit();
});

// clic gauche sur le bouton button-new_game lance une nouvelle partie une fois le clic relâché
newGameButton.addEventListener('click', () => {
   newGameSFX.play()
   newGame();
});
  
// on ajoute 1 point au chasseur à chaque tir réussi sur le canard si la partie n'est pas terminée
hunterScoreCount = 0;
function hunterHit() {
   if (!gameOver) {
      hunterScore.textContent = (hunterScoreCount += 1)
      gunSFX.play()
}};

/**
 * fonction permettant d'afficher le vainqueur 
 * @param {Number} duckScoreCount   score du joueur canard
 * @param {Number} hunterScoreCount   score du joueur chasseur
 */
function whoWins(duckScoreCount, hunterScoreCount) {
   results.style.display = "block"
   if (duckScoreCount > hunterScoreCount) {
      results.textContent = "Le cannard l'emporte!"
   } else if (duckScoreCount < hunterScoreCount) {
      results.textContent = "Le chasseur l'emporte!"
   } else {
      results.textContent = "Match nul!"
   }
};