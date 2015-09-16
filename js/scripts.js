board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]; //0 = empty space, 1 = "X", 2 = "O"


function markSquare(row, column, player_number) {
  if (board[row][column] != 0) {
    return "Space already taken";
  }
  else {
    board[row][column] = player_number;
    if (win()) {
      return "Player " + player_number + " wins";
    }
    else {
      return board;
    }
  }
}

function win() {
  if ((board[0][0] == board[0][1] && board[0][0] == board[0][2] && board[0][0] > 0) || //top row
      (board[1][0] == board[1][1] && board[1][0] == board[1][2] && board[1][0] > 0) || //middle row
      (board[2][0] == board[2][1] && board[2][0] == board[2][2] && board[2][0] > 0) || //bottom row
      (board[0][0] == board[1][0] && board[0][0] == board[2][0] && board[0][0] > 0) || //left column
      (board[0][1] == board[1][1] && board[0][1] == board[2][1] && board[0][1] > 0) || //middle column
      (board[0][2] == board[1][2] && board[0][2] == board[2][2] && board[0][2] > 0) || //right column
      (board[0][0] == board[1][1] && board[0][0] == board[2][2] && board[0][0] > 0) || //from upper left to lower right diagonal
      (board[0][2] == board[1][1] && board[0][2] == board[2][0] && board[0][2] > 0) )  //from upper right to lower left diagonal
      {
    return true;
  }
  else {
    return false;
  }
}


$(document).ready(function() {

  $(document.body).click(function(evt) {
    var clicked = evt.target.id;
    console.log(clicked);
  }); //end document.body
}); //end document.ready

//board locations:
// 0,0 - 0,1 - 0,2
//
// 1,0 - 1,1 - 1,2
//
// 2,0 - 2,1 - 2,2
