let order = [];
let playerOrder =[];
let flash;
let turn;
let good;
let compTurn;
let intervalId;
let strict = false;
let noise = true;
let on = false;
let win;


const turnCounter = document.querySelector("#turn");
const topBlock = document.querySelector("#topBlock");
const leftBlock = document.querySelector("#leftBlock");
const bottomBlock = document.querySelector("#bottomBlock");
const rightBlock = document.querySelector("#rightBlock");
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

//set the new game default values,win condition loop 20 times between the 4 colored panels
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

//define when its players turn and when its compTurn - lights flash -
function gameTurn() {
  on = false; // player can not push panels while lights flash

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
    let audio = document.getElementById("clip1");
    audio.play();
  }
  noise = true;
  topBlock.style.backgroundColor = "tomato";
};

function two() {
  if (noise) {
    let audio = document.getElementById("clip2");
    audio.play();
  }
  noise = true;
  leftBlock.style.backgroundColor = "lightgreen";
};

function three() {
  if (noise) {
    let audio = document.getElementById("clip3");
    audio.play();
  }
  noise = true;
  bottomBlock.style.backgroundColor = "yellow";
};

function four() {
  if (noise) {
    let audio = document.getElementById("clip4");
    audio.play();
  }
  noise = true;
  rightBlock.style.backgroundColor = "lightskyblue";
};


//Reset color to default CSS value
let clearColor = () => {
  topBlock.style.backgroundColor = "darkred";
  leftBlock.style.backgroundColor = "green";
  bottomBlock.style.backgroundColor = "orange";
  rightBlock.style.backgroundColor = "blue";
};

//add the flash effect to the 4 panels
let flashColor = () => {
  topBlock.style.backgroundColor = "tomato";
  leftBlock.style.backgroundColor = "lightgreen";
  bottomBlock.style.backgroundColor = "yellow";
  rightBlock.style.backgroundColor = "lightskyblue";
};

//Enable the player to interact and validate flashed color
topBlock.addEventListener('click', (event) => {
  if (on) {
    playerOrder.push(1);
    check();
    one();
    if (!win) {
      setTimeout(() => {
        clearColor();
      },300);
    }
  }
});

leftBlock.addEventListener('click', (event) => {
  if (on) {
    playerOrder.push(2);
    check();
    two();
    if (!win) {
      setTimeout(() => {
        clearColor();
      },300);
    }
  }
});

bottomBlock.addEventListener('click', (event) => {
  if (on) {
    playerOrder.push(3);
    check();
    three();
    if (!win) {
      setTimeout(() => {
        clearColor();
      },300);
    }
  }
});

rightBlock.addEventListener('click', (event) => {
  if (on) {
    playerOrder.push(4);
    check();
    four();
    if (!win) {
      setTimeout(() => {
        clearColor();
      },300);
    }
  }
});

//set condition if player won game, player got it wrong, player got right bu not win the game yet
function check() {
  if (playerOrder[playerOrder.length - 1] !== order[playerOrder.length - 1])
    good = false; //
  if (playerOrder.length == 20 && good) {
    winGame();
  }
  if (good == false) {
      flashColor();
      turnCounter.innerHTML = "NO!";
      setTimeout(() => {
      turnCounter.innerHTML = turn;
      clearColor();
      if (strict) {
        play();
      } else {
        compTurn = true;
        flash = 0;
        playerOrder = [];
        good = true;
        intervalId = setInterval(gameTurn, 800);
      }
    },800);
    noise = false;
  }
    if (turn == playerOrder.length && good && !win) {
      turn++;
      playerOrder = [];
      compTurn = true;
      flash = 0;
      turnCounter.innerHTML = turn;
      intervalId = setInterval(gameTurn, 800);
   }
};

//Congratulaions, you have won the game
function winGame() {
  flashColor();
  turnCounter.innerHTML = "WIN!";
  on = false;
  win = true;
};
