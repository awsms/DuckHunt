const duck = document.getElementById('duck');
const duckScore = document.getElementById('duckScore');
const hunterScore = document.getElementById('hunterScore');
const resetButton = document.getElementById('reset');
const timer = document.getElementById('timer');
const intervalDuck = 10

var gameOver = false
duckScore.textContent = 'turbo claqué'
// miroir le jpg quand presse gauche / droite


// duck's location on x & y axes
duckXLocation = 625
duckYLocation = 425
var duckX = duck.style.transform = 'translateX('+duckXLocation+'px)'
var duckY = duck.style.transform = 'translateY('+duckYLocation+'px)'


// onclick events part

//document.getElementById('new_game').addEventListener('click', () => {
//  newGame();
//  });

document.getElementById('duck').addEventListener('mousedown', () => {
   hunterHit();
});

document.getElementById('reset').addEventListener('click', () => {
   reset();
});

var currentKeyPressed = {
   up: false,
   down: false,
   left: false,
   right: false
} 

var duckLookingRight = true

// if (currentKeyPressed.left) {
//    duckLookingRight = false
// }

// if (!duckLookingRight) {
//    duck.style.transform = 'scaleX(-1)'
// }




function resetKeyPressed() {
   currentKeyPressed.up = false,
   currentKeyPressed.down = false,
   currentKeyPressed.left = false,
   currentKeyPressed.right = false
}

// modify duck's location on x axis
// function duckX(distance) {
//    duckXLocation += distance
//    duck.style.transform = 'translate('+duckXLocation+'px,'+duckYLocation+'px)'
   // if (!duckXLocation < 0) {
   // duck.style.transform = 'translateX('+duckXLocation+'px)'
   // }
   // else duckXLocation = 0
//   }

// modify duck's location on y axis
// function duckY(distance) {
//    duckYLocation += distance
//    duck.style.transform = 'translate('+duckXLocation+'px,'+duckYLocation+'px)'
   // duck.style.transform = 'translateY('+duckYLocation+'px)'
// }

// update duck's location on both x & y axises
// function updateDuck(duckXLocation,duckYLocation) {
//
// }

function duckPosition(x,y) {
   duckXLocation += x
   duckYLocation += y
   if (duckXLocation > 1350) {duckXLocation = 1350}
   if (duckXLocation < 0) {duckXLocation = 0}
   if (duckYLocation > 825) {duckYLocation = 825}
   if (duckYLocation < 0) {duckYLocation = 0}
   duck.style.transform = 'translate('+duckXLocation+'px,'+duckYLocation+'px)'
}




 


//input handling part
// list of events happening when the key is hold down
window.addEventListener("keydown", function(e) {
   if (e.code === "ArrowDown"){
      // move the duck 50px down when arrow down key is pressed
      // duckY(50);
      // duckPosition(0,16);
      // when the down arrow is pressed, change the currentKeyPressed property for down key to true
      currentKeyPressed.down = true
   } if (e.code === "ArrowUp"){
      // duckPosition(0,-16)
      currentKeyPressed.up = true
      // duckY(-50);
   } if (e.code === "ArrowLeft"){
      // duckPosition(-16,0)
      currentKeyPressed.left = true
      // duckX(-50);
   } if (e.code === "ArrowRight"){
      // duckPosition(16,0)
      currentKeyPressed.right = true
      // duckX(50);
   // } resetKeyPressed()
}});

//list of events happening when the key is released
window.addEventListener("keyup", function(e) {
   if (e.code === "ArrowDown"){
      // move the duck 50px down when arrow down key is pressed
      // duckY(50);
      // duckPosition(0,16);
      currentKeyPressed.down = false
   } if (e.code === "ArrowUp"){
      // duckPosition(0,-16)
      currentKeyPressed.up = false
      // duckY(-50);
   } if (e.code === "ArrowLeft"){
      // duckPosition(-16,0)
      currentKeyPressed.left = false
      // duckX(-50);
   } if (e.code === "ArrowRight"){
      // duckPosition(16,0)
      currentKeyPressed.right = false
      // duckX(50);
   // } resetKeyPressed()
}});



// setInterval(() => {
//    (currentKeyPressed.up
//       ? duckPosition(0,-16)
//       : currentKeyPressed.down
//          ? duckPosition(0,16)
//          : duckPosition(0,0))
 
//    currentKeyPressed.left
//       ? duckPosition(-16,0)
//       : currentKeyPressed.right
//          ? duckPosition(16,0)
//          : duckPosition(0,0)
// }, intervalDuck);


setInterval(() => {
   if (currentKeyPressed.up) {
      duckPosition(0,-9)
   } else if (currentKeyPressed.down) {
      duckPosition(0,9)
   }


   if (currentKeyPressed.right) {
      duckPosition(9,0)
   } else if (currentKeyPressed.left) {
      duckPosition(-9,0)
      duck.style.transform = 'scaleX(-1)'
   }
}, intervalDuck);

function reset() {
   time = 120
   hunterScoreCount = 0
   hunterScore.textContent = 0
   duckScore = 0
   duckScore.textContent = 0
   duckXLocation = 625
   duckYLocation = 425
}
  

// update score for the duck player every 10sec
duckScoreCount = 0
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
   if (duckScoreCount>hunterScoreCount) {
      alert("le canneton a gagné")
   } else if (duckScoreCount<hunterScoreCount) {
      alert("le chasseur a gagné")
   } else {
      alert('nique ta tante')
   }
}


var time = 120
var timerInterval = setInterval(function(){
   time -= 1
   timer.textContent = time+'s';

   if (time == 0) {
      clearInterval(timerInterval)
      whoWins(duckScoreCount,hunterScoreCount)
      gameOver = True
   }
} ,1000);

/* scoring part */
// hunterScore.textContent = 0
hunterScoreCount = 0;
function hunterHit() {
   // hunterScoreCount += 1
   hunterScore.textContent = (hunterScoreCount += 1)
}

currentKeyPressed.left ? duck.style.transform = 'scaleX(-1)' : duck.style.transform = 'scaleX(1)'