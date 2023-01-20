var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var levelHeading = 1;

var gameInit = true;

$(document).keydown(function (event) {
  if (event.key == "a" && gameInit) {
    gameInit = false;
    levelHeading = 1;
    console.log("game start");
    nextLevel();
  }
});

// getting user input into userClickedPattern
$(".btn").click(function (event) {
  makeSound(event.target.id);
  showClickedButton(event.target.id);

  userClickedPattern.push(event.target.id);
  compareAnswer(userClickedPattern.length - 1);
});

function nextLevel() {
  setTimeout(function () {
    $("#level-title").text("level " + levelHeading);
  }, 500);

  setTimeout(function () {
    var randomNumber = Math.floor(Math.random() * 4);
    gamePattern.push(buttonColors[randomNumber]);
    makeSound(buttonColors[randomNumber]);
    showClickedButton(buttonColors[randomNumber]);
    console.log("game pattern : " + gamePattern);
    userClickedPattern = [];
  }, 1000);
}

// comparing color in arrays
function compareAnswer(level) {
  if (userClickedPattern[level] == gamePattern[level]) {
    if (userClickedPattern.length == gamePattern.length) {
      console.log("correct answer");
      ++level;
      ++levelHeading;
      nextLevel();
    }
  } else {
    wrongVisual();
    init();
    gameInit = true;
  }
}

function wrongVisual() {
  console.log("wrong answer");
  makeSound("wrong");

  $("body").addClass("game-over");
  $("#level-title").text("Game over");

  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 300);

  setTimeout(function () {
    $("#level-title").text("Press A Key to Start");
  }, 1000);
}

// initialize
function init() {
  console.log("initialized");
  gamePattern = [];
  userClickedPattern = [];
}

// playing sound
function makeSound(text) {
  var sound = new Audio("./sounds/" + text + ".mp3");
  sound.play();
}

// animate clicking button
function showClickedButton(color) {
  $("#" + color).addClass("pressed");
  setTimeout(function () {
    $("#" + color).removeClass("pressed");
  }, 200);
}
