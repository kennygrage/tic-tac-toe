board = [[9, 9, 9], [9, 9, 9], [9, 9, 9]]; //9 = empty space, 1 = "X", 2 = "O"
var player_one_color = "#d54";
var player_two_color = "#5a4";
var player_number;

function startGame() {
  //start with player one
  player_number = 1;
  $("#player_turn").css("color", player_one_color);
  $("#player_turn").text("Player 1's Turn");
}

function markBox(clicked) {
  var row = clicked.substring(1,2);
  var column = clicked.substring(3,4);
  var markSquareResult = markSquare(row, column, player_number);
  if (markSquareResult == "Space already taken" && player_number < 9) {
    $("#output").text(markSquareResult);
  }
  else if (markSquareResult == "Player 1 wins!!") {
    $("#" + clicked).css("color", player_one_color).text("X");
    player_number = 9; //make sure the game can't be played anymore
    $("#player_turn").css("color", player_one_color);
    $("#player_turn").text("Game Over");
    $("#output").text(markSquareResult);
  }
  else if (markSquareResult == "Player 2 wins!!") {
    $("#" + clicked).css("color", player_two_color).text("O");
    player_number = 9; //make sure the game can't be played anymore
    $("#player_turn").css("color", player_two_color);
    $("#player_turn").text("Game Over");
    $("#output").text(markSquareResult);
  }
  else if (player_number == 1) {
    $("#" + clicked).css("color", player_one_color).text("X");
    player_number = 2;
    $("#player_turn").css("color", player_two_color);
    $("#player_turn").text("Player 2's Turn");
    $("#output").text("");  //empty output incase an error message was there
  }
  else if (player_number == 2) {
    $("#" + clicked).css("color", player_two_color).text("O");
    player_number = 1;
    $("#player_turn").css("color", player_one_color);
    $("#player_turn").text("Player 1's Turn");
    $("#output").text("");  //empty output incase an error message was there
  }
}

function markSquare(row, column, player_number) {
  if (board[row][column] != 9) {
    return "Space already taken";
  }
  else {
    board[row][column] = player_number;
    if (win()) {
      return "Player " + player_number + " wins!!";
    }
    else {
      return board;
    }
  }
}

function win() {
  if ((board[0][0] == board[0][1] && board[0][0] == board[0][2] && board[0][0] < 9) || //top row
      (board[1][0] == board[1][1] && board[1][0] == board[1][2] && board[1][0] < 9) || //middle row
      (board[2][0] == board[2][1] && board[2][0] == board[2][2] && board[2][0] < 9) || //bottom row
      (board[0][0] == board[1][0] && board[0][0] == board[2][0] && board[0][0] < 9) || //left column
      (board[0][1] == board[1][1] && board[0][1] == board[2][1] && board[0][1] < 9) || //middle column
      (board[0][2] == board[1][2] && board[0][2] == board[2][2] && board[0][2] < 9) || //right column
      (board[0][0] == board[1][1] && board[0][0] == board[2][2] && board[0][0] < 9) || //from upper left to lower right diagonal
      (board[0][2] == board[1][1] && board[0][2] == board[2][0] && board[0][2] < 9) )  //from upper right to lower left diagonal
      {
    return true;
  }
  else {
    return false;
  }
}


$(document).ready(function() {
  startGame();
  $(document.body).click(function(evt) {
    var clicked = evt.target.id;
    if (clicked.match(/_\d_\d/)) { //don't go into markBox unless one of the 9 boxes are clicked
      markBox(clicked);
    }
  }); //end document.body
}); //end document.ready

//board locations:
// 0,0 - 0,1 - 0,2
//
// 1,0 - 1,1 - 1,2
//
// 2,0 - 2,1 - 2,2
