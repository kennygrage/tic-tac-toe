describe('markSquare', function() {
  it("Player 1 marks the middle square", function() {
    expect(markSquare(1, 1, 1)).to.eql([[0, 0, 0], [0, 1, 0], [0, 0, 0]]);
  });

});




// expect(markSquare(1, 1, 1)).to.equal("Space already taken");
// var testContact = new Contact("Rita","Moreno");
// expect(testContact.firstName).to.equal("Rita");
// expect(testContact.lastName).to.equal("Moreno");
// expect(testContact.addresses).to.eql([]);
