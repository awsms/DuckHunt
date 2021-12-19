var duck = document.getElementById('duck');
var duckScore = document.getElementById('duckScore');
var hunterScore = document.getElementById('hunterScore').innerHTML;
const timer = document.getElementById('timer');

duckScore.textContent = 'turbo claqué'

duckXLocation = 0
duckYLocation = 0


// modify duck's location on x axis
function duckX(distance) {
   duckXLocation += distance
   duck.style.transform = 'translate('+duckXLocation+'px,'+duckYLocation+'px)'
   // if (!duckXLocation < 0) {
   // duck.style.transform = 'translateX('+duckXLocation+'px)'
   // }
   // else duckXLocation = 0
  }

// modify duck's location on y axis
function duckY(distance) {
   duckYLocation += distance
   duck.style.transform = 'translate('+duckXLocation+'px,'+duckYLocation+'px)'
   // duck.style.transform = 'translateY('+duckYLocation+'px)'
}

// update duck's location on both x & y axises
// function updateDuck(duckXLocation,duckYLocation) {
//
// }




// input handling part
window.addEventListener("keydown", function(event) {
   if (event.code === "ArrowDown"){
      // move the duck 50px down when arrow down key is pressed
      duckY(50);
   } else if (event.code === "ArrowUp"){
      duckY(-50);
   } else if (event.code === "ArrowLeft"){
      duckX(-50);
   } else if (event.code === "ArrowRight"){
      duckX(50);
   }
}, true);



  

// update score for the duck player every 10sec

var tets = setInterval(function(){
    // console.log(l);
    // l--;
    this.
    timer.textContent = time
    // if(l == -1) {
    //     console.log('t');
    //     clearInterval(tets);
    // }
},1000);



var tim = setInterval(myTimer ,1000);
var time = 120
function myTimer() {
      time -= 1
      timer.textContent = time+'s';}