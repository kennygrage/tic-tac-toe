describe('markSquare', function() {
  describe('New game: square can\'t be marked twice', function() {
    it("Player 1 marks the middle square", function() {
      expect(markSquare(1, 1, 1)).to.eql([[9, 9, 9], [9, 1, 9], [9, 9, 9]]);
    });

    it("Player 2 tries to mark the middle square but it is taken", function() {
      expect(markSquare(1, 1, 2)).to.equal("Space already taken");
    });
  }); //end inner describe()


  describe('New game: Player 1 wins in top row', function() {
    before(function() {
      board = [[9, 9, 9], [9, 9, 9], [9, 9, 9]];
    });

    it("Player 1 marks the top left square", function() {
      expect(markSquare(0, 0, 1)).to.eql([[1, 9, 9], [9, 9, 9], [9, 9, 9]]);
    });

    it("Player 2 marks the middle square", function() {
      expect(markSquare(1, 1, 2)).to.eql([[1, 9, 9], [9, 2, 9], [9, 9, 9]]);
    });

    it("Player 1 marks the upper right square", function() {
      expect(markSquare(0, 2, 1)).to.eql([[1, 9, 1], [9, 2, 9], [9, 9, 9]]);
    });

    it("Player 2 marks the middle right square", function() {
      expect(markSquare(1, 2, 2)).to.eql([[1, 9, 1], [9, 2, 2], [9, 9, 9]]);
    });

    it("Player 1 marks the upper middle square and wins", function() {
      expect(markSquare(0, 1, 1)).to.equal("Player 1 wins!!");
    });
  }); //end inner describe()


  describe('New game: Player 2 wins in middle row', function() {
    before(function() {
      board = [[9, 9, 9], [9, 9, 9], [9, 9, 9]];
    });

    it("Player 1 marks the top left square", function() {
      expect(markSquare(0, 0, 1)).to.eql([[1, 9, 9], [9, 9, 9], [9, 9, 9]]);
    });

    it("Player 2 marks the middle square", function() {
      expect(markSquare(1, 1, 2)).to.eql([[1, 9, 9], [9, 2, 9], [9, 9, 9]]);
    });

    it("Player 1 marks the upper right square", function() {
      expect(markSquare(0, 2, 1)).to.eql([[1, 9, 1], [9, 2, 9], [9, 9, 9]]);
    });

    it("Player 2 marks the middle right square", function() {
      expect(markSquare(1, 2, 2)).to.eql([[1, 9, 1], [9, 2, 2], [9, 9, 9]]);
    });

    it("Player 1 marks the bottom right square", function() {
      expect(markSquare(2, 2, 1)).to.eql([[1, 9, 1], [9, 2, 2], [9, 9, 1]]);
    });

    it("Player 2 marks the left middle square and wins", function() {
      expect(markSquare(1, 0, 2)).to.equal("Player 2 wins!!");
    });
  }); //end inner describe()


  describe('New game: Player 2 wins in bottom row', function() {
    before(function() {
      board = [[9, 9, 9], [9, 9, 9], [9, 9, 9]];
    });

    it("Player 1 marks the top left square", function() {
      expect(markSquare(0, 0, 1)).to.eql([[1, 9, 9], [9, 9, 9], [9, 9, 9]]);
    });

    it("Player 2 marks the bottom middle square", function() {
      expect(markSquare(2, 1, 2)).to.eql([[1, 9, 9], [9, 9, 9], [9, 2, 9]]);
    });

    it("Player 1 marks the upper right square", function() {
      expect(markSquare(0, 2, 1)).to.eql([[1, 9, 1], [9, 9, 9], [9, 2, 9]]);
    });

    it("Player 2 marks the bottom right square", function() {
      expect(markSquare(2, 2, 2)).to.eql([[1, 9, 1], [9, 9, 9], [9, 2, 2]]);
    });

    it("Player 1 marks the middle right square", function() {
      expect(markSquare(1, 2, 1)).to.eql([[1, 9, 1], [9, 9, 1], [9, 2, 2]]);
    });

    it("Player 2 marks the bottom left square and wins", function() {
      expect(markSquare(2, 0, 2)).to.equal("Player 2 wins!!");
    });
  }); //end inner describe()


  describe('New game: Player 2 wins in left column', function() {
    before(function() {
      board = [[2, 9, 9], [2, 9, 9], [9, 9, 9]];
    });
    it("Player 2 marks the bottom left square and wins", function() {
      expect(markSquare(2, 0, 2)).to.equal("Player 2 wins!!");
    });
  }); //end inner describe()


  describe('New game: Player 1 wins in middle column', function() {
    before(function() {
      board = [[9, 1, 9], [9, 1, 9], [9, 9, 9]];
    });
    it("Player 1 marks the bottom middle square and wins", function() {
      expect(markSquare(2, 1, 1)).to.equal("Player 1 wins!!");
    });
  }); //end inner describe()


  describe('New game: Player 2 wins in right column', function() {
    before(function() {
      board = [[9, 9, 2], [9, 9, 2], [9, 9, 9]];
    });
    it("Player 2 marks the bottom right square and wins", function() {
      expect(markSquare(2, 2, 2)).to.equal("Player 2 wins!!");
    });
  }); //end inner describe()


  describe('New game: Player 1 wins diagonally down-right', function() {
    before(function() {
      board = [[1, 9, 9], [9, 1, 9], [9, 9, 9]];
    });
    it("Player 1 marks the bottom right square and wins", function() {
      expect(markSquare(2, 2, 1)).to.equal("Player 1 wins!!");
    });
  }); //end inner describe()


  describe('New game: Player 2 wins diagonally up-right', function() {
    before(function() {
      board = [[9, 9, 2], [9, 2, 9], [9, 9, 9]];
    });
    it("Player 2 marks the bottom left square and wins", function() {
      expect(markSquare(2, 0, 2)).to.equal("Player 2 wins!!");
    });
  }); //end inner describe()

}); //end main describe()
