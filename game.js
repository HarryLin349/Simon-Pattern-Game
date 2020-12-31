var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var tempPattern = [];
var userClickedPattern = [];
var notClicked = true;
var level = 0;

$(document).on("keydown", function(event) {
  if (notClicked) {
    notClicked = false;
    nextSequence();
  }
});

$(".btn").on("click", function() {
  if (notClicked == false) {
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    playSound(this.id);
    checkAnswer(this.id);
  }
})

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
};

function animatePress(currentColour) {
  $("." + currentColour).addClass("pressed");
  setTimeout(function() {
    $("." + currentColour).removeClass("pressed");
  }, 100)
}

function nextSequence() {
  level++;
  $("h1").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  tempPattern = gamePattern.slice();
  console.log("debug:" + tempPattern);
  console.log("debug:" + gamePattern);

  $("#" + randomChosenColour).animate({
    opacity: "0%"
  }).animate({
    opacity: "100%"
  });
  playSound(randomChosenColour);

}

function fail() {
  console.log("failure");
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);
  startOver();
  $("h1").text("Game Over, press any key to restart");
}

function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  notClicked = true;
}

function checkAnswer(currentColor) {
  console.log("clicked: " + currentColor);
  console.log("checking: " + tempPattern[0]);
  if (tempPattern.length == 0) {
    console.log("sequence complete");
    setTimeout(function() {
      nextSequence();
    }, 1000);
  } else if (currentColor == tempPattern[0]) {
    console.log("success");
    tempPattern.shift();
    if (tempPattern.length == 0) {
      console.log("sequence complete");
      setTimeout(function() {
        nextSequence();
      }, 1000);

    }
  } else {
    fail();
  }

}
