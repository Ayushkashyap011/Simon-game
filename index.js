var buttoncolor = ["red", "blue", "green", "yellow"];
var gamepattern = [];
var userclickedbutton = [];
var started = false;
var level = 0;

$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userclickedbutton.push(userChosenColour);
    playsound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userclickedbutton.length - 1);
});
function playsound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


function nextseq() {
    userclickedbutton=[];
    level++;
    $("#level-title").text("Level " + level);
    var randomnumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttoncolor[randomnumber];
    gamepattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playsound(randomChosenColour);
}
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}


$(document).keypress(function () {
    if (!started) {
        $("#level-title").text("Level" + level);
        nextseq();
        started = true;
    }
});

function checkAnswer(currentLevel) {
    if (gamepattern[currentLevel] === userclickedbutton[currentLevel]) {
        if (userclickedbutton.length ===gamepattern.length ) {
            setTimeout(function () {
                nextseq();
            }, 1000 );
        }

    }
    else {
        playsound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }

}

function startOver() {
    level = 0;
    gamepattern = [];
    started = false;
}
