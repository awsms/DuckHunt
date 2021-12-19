var duck = document.getElementById('duck');
var duckScore = document.getElementById('duckScore');
var hunterScore = document.getElementById('hunterScore');
var resetButton = document.getElementById('reset');
var timer = document.getElementById('timer');

duckScore.textContent = 'turbo claqué'

duckXLocation = 0
duckYLocation = 0


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
   if (duckXLocation > 1250) {duckXLocation = 1250}
   if (duckXLocation < 0) {duckXLocation = 0}
   if (duckYLocation > 850) {duckYLocation = 850}
   if (duckYLocation < 0) {duckYLocation = 0}
   duck.style.transform = 'translate('+duckXLocation+'px,'+duckYLocation+'px)'
}



// input handling part
window.addEventListener("keydown", function(event) {
   if (event.code === "ArrowDown"){
      // move the duck 50px down when arrow down key is pressed
      // duckY(50);
      duckPosition(0,16);
   } else if (event.code === "ArrowUp"){
      duckPosition(0,-16)
      // duckY(-50);
   } else if (event.code === "ArrowLeft"){
      duckPosition(-16,0)
      // duckX(-50);
   } else if (event.code === "ArrowRight"){
      duckPosition(16,0)
      // duckX(50);
   }
});



  

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
var interval = setInterval(function(){
   time -= 1
   timer.textContent = time+'s';

   if (time == 0) {
      clearInterval(interval)
      whoWins(duckScoreCount,hunterScoreCount)
   }
} ,1000);

function reset() {
   time = 120
   hunterScoreCount = 0
   hunterScore.textContent = 0
   duckScore = 0
   duckScore.textContent = 0
}

/* scoring part */
// hunterScore.textContent = 0
hunterScoreCount = 0;
function hunterHit() {
   // hunterScoreCount += 1
   hunterScore.textContent = (hunterScoreCount += 1)
}