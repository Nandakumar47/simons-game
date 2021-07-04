var colour = ["green", "red", "yellow", "blue"];
var listOfColor = [];
var level = 0;
var flag = 0;
function randomColor() {
  level++;
  $("#level-title").text("Level " + level);
  var num = Math.floor(Math.random() * 4);
  listOfColor.push(colour[num]);
  $("#" + colour[num])
    .fadeOut(100)
    .fadeIn(100);
  playAudio(colour[num]);
}
$(document).on("keydown", function () {
  if (flag === 0) {
    $("#level-title").text("Level " + level);
    randomColor();
    flag = 1;
  }
});

var i = -1;
$(".btn").on("click", function () {
  if (flag === 1) {
    var currentid = $(this).attr("id");
    playAudio(currentid);
    animate(currentid);
    i++;
    var j = listOfColor.length - 1;
    if (listOfColor[i] === currentid) {
      if (i === listOfColor.length - 1) {
        setTimeout(function () {
          randomColor();
        }, 500);
        i = -1;
      }
    } else {
      playAudio("wrong");
      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 100);

      listOfColor = [];
      flag = 0;
      i = -1;
      $("#level-title").text("game over");
      setTimeout(function () {
        $("#level-title").text("Press any key to continue");
      }, 1000);
      level = 0;
    }
  }
});

function playAudio(name) {
  var audio = new Audio("./audio/"+name + ".mp3");
  audio.play();
}
function animate(values) {
  $("#" + values).addClass("pressed");
  setTimeout(function () {
    $("#" + values).removeClass("pressed");
  }, 100);
}
