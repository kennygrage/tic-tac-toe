board = [[9, 9, 9], [9, 9, 9], [9, 9, 9]]; //9 = empty space, 1 = "X", 2 = "O"
var player_one_color = "#d54";
var player_two_color = "#5a4";
var player_number; //whose turn is it?
var number_of_players;

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
  else if (markSquareResult == "Player 1 wins!!" && player_number < 9) {
    $("#" + clicked).css("color", player_one_color).text("X");
    player_number = 9; //make sure the game can't be played anymore
    $("#player_turn").css("color", player_one_color);
    $("#player_turn").text("Game Over");
    $("#output").text(markSquareResult);
    $("#new_game_button").show();
  }
  else if (markSquareResult == "Player 2 wins!!" && player_number < 9) {
    $("#" + clicked).css("color", player_two_color).text("O");
    player_number = 9; //make sure the game can't be played anymore
    $("#player_turn").css("color", player_two_color);
    $("#player_turn").text("Game Over");
    $("#output").text(markSquareResult);
    $("#new_game_button").show();
  }
  else if (player_number == 1) {
    $("#" + clicked).css("color", player_one_color).text("X");
    player_number = 2;
    $("#player_turn").css("color", player_two_color);
    $("#player_turn").text("Player 2's Turn");
    $("#output").text("");  //empty output incase an error message was there
    markSquareResult = markSquare(row, column, player_number);
    if (markSquareResult == "Player 1 wins!!" && player_number < 9) {
      player_number = 9; //make sure the game can't be played anymore
      $("#player_turn").css("color", player_one_color);
      $("#player_turn").text("Game Over");
      $("#output").text(markSquareResult);
      $("#new_game_button").show();
    }
    if (number_of_players == 1 && checkForEmptySpaces()) {
      do {
        var done = 0;
        var random_x = Math.floor(Math.random() * 3); //random number between 0 and 2
        var random_y = Math.floor(Math.random() * 3); //random number between 0 and 2
        if (board[random_x][random_y] == 9) {
          done = 1;
          clicked = "_" + random_x + "_" + random_y;
          $("#" + clicked).css("color", player_two_color).text("O");
          markSquareResult = markSquare(random_x, random_y, player_number);
          if (markSquareResult == "Player 2 wins!!") {
            player_number = 9; //make sure the game can't be played anymore
            $("#player_turn").css("color", player_two_color);
            $("#player_turn").text("Game Over");
            $("#output").text(markSquareResult);
            $("#new_game_button").show();
          }
          else {
            $("#player_turn").css("color", player_one_color);
            $("#player_turn").text("Player 1's Turn");
            $("#output").text("");  //empty output incase an error message was there
          }
        }
      } while (done == 0);
      if (player_number == 2) {player_number = 1;} //don't change player_number if it equals 9
    }
  }
  else if (player_number == 2 && number_of_players == 2) {
      $("#" + clicked).css("color", player_two_color).text("O");
      player_number = 1;
      $("#player_turn").css("color", player_one_color);
      $("#player_turn").text("Player 1's Turn");
      $("#output").text("");  //empty output incase an error message was there
  }
  if (!(checkForEmptySpaces())) {
    player_number = 9; //make sure the game can't be played anymore
    $("#player_turn").text("");
    $("#output").text("Tie Game");
    $("#new_game_button").show();
  }
}

function checkForEmptySpaces() {
  var empty = 0;
  for (var x=0; x<=2; x++) {
    for (var y=0; y<=2; y++) {
      if (board[x][y] == 9) {
        empty = 1;
      }
    }
  }
  if (empty) {
    return true;
  }
  else {
    return false;
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
  event.preventDefault();
  $("#one_player").click(function() {
    number_of_players = 1;
    startGame();
    $(".choose_number_of_players").hide();
    $(".container").fadeIn(1000);
  });

  $("#two_players").click(function() {
    number_of_players = 2;
    startGame();
    $(".choose_number_of_players").hide();
    $(".container").fadeIn(1000);
  });

  $("#new_game_button").click(function() {
    //get rid of all X's and O's on the board
    for (var x=0; x<=2; x++) {
      for (var y=0; y<=2; y++) {
        var div_id = "_" + x + "_" + y;
        $("#" + div_id).text("");
      }
    }

    board = [[9, 9, 9], [9, 9, 9], [9, 9, 9]]; //reset board array
    $(".container").hide();
    $("#new_game_button").hide();
    $(".choose_number_of_players").show();
  });

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
