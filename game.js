// Simon Game Logic

// Arrays to hold the game pattern and the user pattern
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

// Game state variables
var started = false;
var level = 0;

// Start the game when a key is pressed
$(document).keydown(function() {
  if (!started) {
    // Update the level title
    $("#level-title").text("Level " + level);
    // Generate the first sequence
    nextSequence();
    started = true;
  }
});

// Detect button clicks
$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  
  // Play sound and animate button press
  playSound(userChosenColour);
  animatePress(userChosenColour);

  // Check the user's answer
  checkAnswer(userClickedPattern.length - 1);
});

// Check the user's answer
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    // User got the current sequence right, check if the entire sequence is complete
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    // User got the sequence wrong
    playSound("wrong");
    
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

// Generate the next sequence
function nextSequence() {
  // Reset the user's pattern array
  userClickedPattern = [];
  // Increment the level
  level++;
  
  // Update the level title
  $("#level-title").text("Level " + level);

  // Generate a random index
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  
  // Add the random color to the game pattern
  gamePattern.push(randomChosenColour);
  
  // Animate and play sound for the chosen button
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

// Play sound corresponding to each button
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Animate button press
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

// Start over
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
