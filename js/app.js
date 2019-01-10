let order = [];
let playerOrder =[];
let flash;
let turn;
let good;
let compTurn;
let intervalId;
let strict = false;
let noise = true;
let power = false;
let win;

const turnCounter = document.querySelector("#turn");
const leftBlock = document.querySelector("#Left");
const rightBlock = document.querySelector("#right");
const topBlock = document.querySelector("#top");
const bottomBlock = document.querySelector("#bottom");
const strictButton = document.querySelector("#strict");
const onButton = document.querySelector("#on");
const startButton = document.querySelector("#start");

//Enale or disable "STRICT" mode, game resets if 1 mistake is done by the player
strictButton.addEventListener('click', (event) => {
    if (strictButton.checked == true) {
      strict = true;
    } else {
      strict = false;
    }
});

//Power the game ON and start the counter
onButton.addEventListener('click', (event) => {
  if (onButton.checked == true) {
    on = true;
    turnCounter.innerHTML = "-";
      } else {
    on = false;
    turnCounter.innerHTML = "";
    clearColor();
    clearInterval(intervalId);
  }
});

//Start a new game session, reset all values
startButton.addEventListener('click', (event) => {
  if (on || win) {
    play();
  }
});

function play() {
  win = false;
  order = [];
  playerOrder = [];
  flash = 0;
  intervalId = 0;
  turn = 1;
  turnCounter.innerHTML = 1;
  good = true;
  for (var i = 0; i < 20; i++) {
    order.push(Math.floor(Math.random() * 4) +1);
  }
  compTurn = true;

  intervalId = setInterval(gameTurn, 800);
 };


function gameTurn() {
  on = false;

  if (flash == turn) {
    clearInterval(intervalId);
    compTurn = false;
    clearColor();
    on = true;
  }

  if (compTurn) {
    clearColor();
    setTimeout(() => {
      if (order[flash] == 1) one();
      if (order[flash] == 2) two();
      if (order[flash] == 3) three();
      if (order[flash] == 4) four();
      flash++;
    }, 200);
  }
};

//Bind audio to each section and change color; flash color
function one() {
  if (noise) {
    let audio = doucument.getElementById("clip1");
    audio.play();
  }
  noise = true;
  leftBlock.style.backgroundColor = "lightgreen";
};

function two() {
  if (noise) {
    let audio = doucument.getElementById("clip2");
    audio.play();
  }
  noise = true;
  topBlock.style.backgroundColor = "tomato";
};

function three() {
  if (noise) {
    let audio = doucument.getElementById("clip3");
    audio.play();
  }
  noise = true;
  bottomBlock.style.backgroundColor = "yellow";
};

function four() {
  if (noise) {
    let audio = doucument.getElementById("clip4");
    audio.play();
  }
  noise = true;
  rightBlock.style.backgroundColor = "lightskyblue";
};


//Reset color to default CSS value
function clearColor() {
  leftBlock.style.backgroundColor = "green";
  topBlock.style.backgroundColor = "red";
  bottomBlock.style.backgroundColor = "orange";
  rightBlock.style.backgroundColor = "blue";
};
