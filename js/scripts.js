//**********Global Variables**********//
var player_one_color = "#d54";                 //Color of "X" and "Player 1's Turn" at the bottom
var player_two_color = "#5a4";                 //Color of "O" and "Player 2's Turn" at the bottom
var player_colors = ["", "#d54", "#5a4"];      //Color of "X" or "O" on the board and "Player 1's Turn" or "Player 2's Turn" at the bottom
var player_turn;                               //whose turn is it?
var player_letter = ["", "X", "O"];            //Player letter
var number_of_players;                         //Either 2 players or 1 player with computer
var difficulty;                                //1 = easy & 2 = hard
var winCombos = [ [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6] ];
var board = [[9, 9, 9], [9, 9, 9], [9, 9, 9]]; //9 = empty space, 1 = "X", 2 = "O"
// Board[x][y] locations:
// [0][0] - [0][1] - [0][2]
//
// [1][0] - [1][1] - [1][2]
//
// [2][0] - [2][1] - [2][2]



//**********Functions**********//
//**********Print Player 1's Turn on the bottom and set player_turn = 1***********//
function startGame() {
  //start with player one
  player_turn = 1;
  playerTurnText("Player " + player_turn + "'s Turn"); //Player 1's color and turn going into "#player_turn"
} //end startGame()



//**********Takes location of square after all logic if it should be placed and marks on the board**********//
function placeLetter(clicked) {
  $("#" + clicked).css("color", player_colors[player_turn]).text(player_letter[player_turn]); //"X" or "O" depending on player_turn

} //end placeLetter()



//**********Check to see if there are no more spaces -> Tie Game**********//
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
} //end checkForEmptySpaces()



//**********Changes the text written in "#player_turn"**********//
function playerTurnText(text_going_into_player_turn) {
  $("#player_turn").css("color", player_colors[player_turn]);
  if (text_going_into_player_turn == "Player " + player_turn + " wins!!") {
    $("#player_turn").text("Game Over");
  }
  else {
    $("#player_turn").text(text_going_into_player_turn);
  }
} //end playerTurnText()



//**********Changes the text written in "#output"**********//
function outputText(text_going_into_output) {
  $("#output").text(text_going_into_output);
} //end outputText()



//**********Convert the number 0-8 to the Div ID**********//
function convertToBoard(num) {
  if (num == 0) {
    return "_0_0";
  }
  else if (num == 1) {
    return "_0_1";
  }
  else if (num == 2) {
    return "_0_2";
  }
  else if (num == 3) {
    return "_1_0";
  }
  else if (num == 4) {
    return "_1_1";
  }
  else if (num == 5) {
    return "_1_2";
  }
  else if (num == 6) {
    return "_2_0";
  }
  else if (num == 7) {
    return "_2_1";
  }
  else if (num == 8) {
    return "_2_2";
  }
} //end convertToBoard()



//**********Check to see if the current player won**********//
function win() {
  var win_row;
  var win_column;
  var win_diagonal_left = board[1][1];
  var win_diagonal_right = board[1][1];
    for (var i = 0; i <= 2; i++) {
      win_row = board[i][0] + board[i][1] + board[i][2];
      win_column = board[0][i] + board[1][i] + board[2][i];
      if (win_row == 3 || win_row == 6 || win_column == 3 || win_column == 6) {
        return true;
      }
  }
  win_diagonal_left += board[0][0] + board[2][2];
  win_diagonal_right += board[0][2] + board[2][0];
  if (win_diagonal_left == 3 || win_diagonal_left == 6 ||
      win_diagonal_right == 3 || win_diagonal_right == 6) {
      return true;
  }
  return false;
} //end win()



//**********Mark the square in the array**********//
function markSquareInArray(row, column, player_turn) {
  if (board[row][column] != 9) {
    return "Space already taken";
  }
  else {
    board[row][column] = player_turn;
    if (win()) {
      return "Player " + player_turn + " wins!!";
    }
    else {
      return board;
    }
  }
} //end markSquareInArray()



//**********Check if space is already taken, there is a winner, etc, and send to mark the square**********//
function markSquareOnBoard(clicked) {
  var row = clicked.substring(1,2);
  var column = clicked.substring(3,4);
  var markSquareInArrayResult = markSquareInArray(row, column, player_turn); //place the result in the array
  if (markSquareInArrayResult == "Space already taken" && player_turn < 9) {
    outputText(markSquareInArrayResult);
  }
  else if ((markSquareInArrayResult == "Player 1 wins!!" ||
            markSquareInArrayResult == "Player 2 wins!!") &&
            player_turn < 9) {
    placeLetter(clicked);
    playerTurnText(markSquareInArrayResult);
    outputText(markSquareInArrayResult);
    player_turn = 9; //make sure the game can't be played anymore
    $("#new_game_button").show();
  }
  else if (player_turn == 1) { //player 1's turn
    placeLetter(clicked); //place the result on the board
    player_turn = 2; //now change it to player 2's turn
    playerTurnText("Player 2's Turn");
    outputText(""); //empty output incase an error message was there
  }
  else if (player_turn == 2 && number_of_players == 2) { //player 2's turn (human)
      placeLetter(clicked);
      player_turn = 1;
      playerTurnText("Player 1's Turn");
      $("#output").text("");  //empty output incase an error message was there
  }

  //not part of the if..else if chain above so that player 1 doesn't need to click for player 2 computer to go
  //player 2's turn (computer) on easy mode
  if (player_turn == 2 && number_of_players == 1 && difficulty == 1) {
    if (markSquareInArrayResult == "Player 1 wins!!" && player_turn < 9) {
      player_turn = 1; //for the correct colors going into the proceeding functions
      playerTurnText(markSquareInArrayResult); //Player (1 or 2) wins !! results in "Game Over" output
      outputText(markSquareInArrayResult);
      player_turn = 9; //make sure the game can't be played anymore
      $("#new_game_button").show();
    }
    if (number_of_players == 1 && checkForEmptySpaces()) {
      do {
        var done = 0;
        var random_x = Math.floor(Math.random() * 3); //random number between 0 and 2
        var random_y = Math.floor(Math.random() * 3); //random number between 0 and 2
        if (board[random_x][random_y] == 9) {         //if the random space is empty
          done = 1;                                   //don't keep looking for spaces because we found one
          clicked = "_" + random_x + "_" + random_y;  //Div ID of the random space chosen
          markSquareInArrayResult = markSquareInArray(random_x, random_y, player_turn);
          placeLetter(clicked);
          if (markSquareInArrayResult == "Player 2 wins!!") {
            playerTurnText(markSquareInArrayResult); //Player (1 or 2) wins !! results in "Game Over" output
            outputText(markSquareInArrayResult);
            player_turn = 9; //make sure the game can't be played anymore
            $("#new_game_button").show();
          }
          else {
            playerTurnText("Player 1's Turn");
            outputText(""); //empty output incase an error message was there
          }
        }
      } while (done == 0);
      if (player_turn == 2) {player_turn = 1;} //don't change player_turn if it equals 9
    }
  }

  //not part of the if..else if chain above so that player 1 doesn't need to click for player 2 computer to go
  //player 2's turn (computer) on hard mode
  if (player_turn == 2 && number_of_players == 1 && difficulty == 2) {
    //win when 2 in a row
    var winnerArray = [];
    var found_a_spot = 0;
    for (var i = 0; i<=2; i++) {
      for (var j = 0; j<=2; j++) {
        winnerArray.push(board[i][j]);
      }
    }
    for (var j = 0; j<=7; j++) {
      var solution = winnerArray[winCombos[j][0]] + winnerArray[winCombos[j][1]] + winnerArray[winCombos[j][2]];
      if (solution == 13) { //two places filled with "2" and the other empty filled with "9"
        if (winnerArray[winCombos[j][0]] == 9) {
          clicked = convertToBoard(winCombos[j][0]);
          found_a_spot++;
        }
        else if (winnerArray[winCombos[j][1]] == 9) {
          clicked = convertToBoard(winCombos[j][1]);
          found_a_spot++;
        }
        else if (winnerArray[winCombos[j][2]] == 9) {
          clicked = convertToBoard(winCombos[j][2]);
          found_a_spot++;
        }
      }
      if (found_a_spot > 0) {break;}
    }

    //block when other has 2 in a row
    if (found_a_spot == 0) { //only look to block if we haven't found a spot to win
      for (var j = 0; j<=7; j++) {
        var solution = winnerArray[winCombos[j][0]] + winnerArray[winCombos[j][1]] + winnerArray[winCombos[j][2]];
        if (solution == 11) { //player one has two in a row and there is one empty space, so block it
          if (winnerArray[winCombos[j][0]] == 9) {
            clicked = convertToBoard(winCombos[j][0]);
            found_a_spot++;
          }
          else if (winnerArray[winCombos[j][1]] == 9) {
            clicked = convertToBoard(winCombos[j][1]);
            found_a_spot++;
          }
          else if (winnerArray[winCombos[j][2]] == 9) {
            clicked = convertToBoard(winCombos[j][2]);
            found_a_spot++;
          }
        }
        if (found_a_spot > 0) {break;}
      }
    }

    //create 2 in a row
    if (found_a_spot == 0) { //only look to create 2 in a row if we cannot win or block
      for (var j = 0; j<=7; j++) {
        solution = winnerArray[winCombos[j][0]] + winnerArray[winCombos[j][1]] + winnerArray[winCombos[j][2]];
        if (solution == 20) { //player two has one spot and there are two empty spaces
          if (winnerArray[winCombos[j][0]] == 9) {
            clicked = convertToBoard(winCombos[j][0]);
            found_a_spot++;
          }
          else if (winnerArray[winCombos[j][1]] == 9) {
            clicked = convertToBoard(winCombos[j][1]);
            found_a_spot++;
          }
          else if (winnerArray[winCombos[j][2]] == 9) {
            clicked = convertToBoard(winCombos[j][2]);
            found_a_spot++;
          }
        }
        if (found_a_spot > 0) {break;}
      }
    }

    //if center space is not taken, take it
    if (found_a_spot == 0) { //only do this if we haven't found a spot yet
      if (board[1][1] == 9) {
        clicked = convertToBoard(4); //Div ID for "_1_1"
        found_a_spot++;
      }
    }

    //if we found a spot from our logic tests above
    if (found_a_spot > 0) {
      var x_position = clicked.substring(1,2);
      var y_position = clicked.substring(3,4);
      markSquareInArrayResult = markSquareInArray(x_position, y_position, player_turn);
      placeLetter(clicked);
      if (markSquareInArrayResult == "Player 2 wins!!") {
        playerTurnText(markSquareInArrayResult); //Player (1 or 2) wins !! results in "Game Over" output
        outputText(markSquareInArrayResult);
        player_turn = 9; //make sure the game can't be played anymore
        $("#new_game_button").show();
      }
      else {
        player_turn = 1;
        playerTurnText("Player 1's Turn");
        outputText(""); //empty output incase an error message was there
      }
    }

    //Random if we did not find a logic test from above
    if (number_of_players == 1 && checkForEmptySpaces() && found_a_spot == 0) {
      do {
        var done = 0;
        var random_x = Math.floor(Math.random() * 3); //random number between 0 and 2
        var random_y = Math.floor(Math.random() * 3); //random number between 0 and 2
        if (board[random_x][random_y] == 9) {         //if the random space is empty
          done = 1;                                   //don't keep looking for spaces because we found one
          clicked = "_" + random_x + "_" + random_y;  //Div ID of the random space chosen
          markSquareInArrayResult = markSquareInArray(random_x, random_y, player_turn);
          placeLetter(clicked);
          if (markSquareInArrayResult == "Player 2 wins!!") {
            playerTurnText(markSquareInArrayResult); //Player (1 or 2) wins !! results in "Game Over" output
            outputText(markSquareInArrayResult);
            player_turn = 9; //make sure the game can't be played anymore
            $("#new_game_button").show();
          }
          else {
            player_turn = 1;
            playerTurnText("Player 1's Turn");
            outputText(""); //empty output incase an error message was there
          }
        }
      } while (done == 0);
      if (player_turn == 2) {player_turn = 1;} //don't change player_turn if it equals 9
    }
  }

  if (!(checkForEmptySpaces()) && !(win())) {
    playerTurnText("");
    outputText("Tie Game");
    player_turn = 9; //make sure the game can't be played anymore
    $("#new_game_button").show();
  }
} //end markSquareOnBoard()



//**********When document is ready, give player option of 1 player or 2 player game and start playing**********//
$(document).ready(function() {
  event.preventDefault();

  //***Button for one player easy mode***//
  $("#one_player_easy").click(function() {
    number_of_players = 1;
    difficulty = 1;
    startGame();
    $(".choose_number_of_players").hide();
    $(".container-non-responsive").fadeIn(1000);
  }); //end button for one player

  //***Button for one player hard mode***//
  $("#one_player_hard").click(function() {
    number_of_players = 1;
    difficulty = 2;
    startGame();
    $(".choose_number_of_players").hide();
    $(".container-non-responsive").fadeIn(1000);
  }); //end button for one player

  //***Button for two players***//
  $("#two_players").click(function() {
    number_of_players = 2;
    startGame();
    $(".choose_number_of_players").hide();
    $(".container-non-responsive").fadeIn(1000);
  });//end button for two players

  //***Button for new game***//
  $("#new_game_button").click(function() {
    //get rid of all X's and O's on the board
    for (var x=0; x<=2; x++) {
      for (var y=0; y<=2; y++) {
        var div_id = "_" + x + "_" + y;
        $("#" + div_id).text("");
      }
    }
    board = [[9, 9, 9], [9, 9, 9], [9, 9, 9]]; //reset board array
    $(".container-non-responsive").hide();                    //hide the board
    $("#new_game_button").hide();              //hide the new game button
    $(".choose_number_of_players").show();     //show the two buttons: one for a 1 player game and another for a 2 player game
  }); //end button for new game

  //Capture div ID when player clicks on the board
  $(document.body).click(function(evt) {
    var clicked = evt.target.id;
    if (clicked.match(/_\d_\d/)) { //don't go into markSquareOnBoard unless one of the 9 boxes are clicked
      markSquareOnBoard(clicked);
    }
  }); //end document.body
}); //end document.ready
