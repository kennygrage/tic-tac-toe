Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

Address.prototype.fullAddress = function() {
  return this.street + ", " + this.city + ", " + this.state;
}

// String.prototype.addExcitement = function() { return this + "!!!!!!"};
// var test = "Hello";
// var test2 = test.addExcitement();
//       console.log(test2);

function Contact(firstName,lastName){
  this.firstName = firstName;
  this.lastName = lastName;
  this.addresses = [];
}

function Address(street, city, state) {
  this.street = street;
  this.city = city;
  this.state = state;
}

function resetFields() {
  $("input#new-first-name").val("");
  $("input#new-last-name").val("");
  $("input.new-street").val("");
  $("input.new-city").val("");
  $("input.new-state").val("");
}

$(document).ready(function() {
  $("#add-address").click(function() {
    $("#new-addresses").append('<div class="new-address hide_after_submit">' +
                                     '<div class="form-group">' +
                                       '<label for="new-street">Street</label>' +
                                       '<input type="text" class="form-control new-street">' +
                                     '</div>' +
                                     '<div class="form-group">' +
                                       '<label for="new-city">City</label>' +
                                       '<input type="text" class="form-control new-city">' +
                                     '</div>' +
                                     '<div class="form-group">' +
                                       '<label for="new-state">State</label>' +
                                       '<input type="text" class="form-control new-state">' +
                                     '</div>' +
                                   '</div>');

});

$("form#new-contact").submit(function(event) {
    event.preventDefault();

    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();

    var newContact = new Contact(inputtedFirstName, inputtedLastName);

    $(".new-address").each(function() {
      var inputtedStreet = $(this).find("input.new-street").val();
      var inputtedCity = $(this).find("input.new-city").val();
      var inputtedState = $(this).find("input.new-state").val();

      var newAddress = new Address(inputtedStreet, inputtedCity, inputtedState);
      newContact.addresses.push(newAddress);

    });
    $(".hide_after_submit").hide();


    $("ul#contacts").append("<li><span class='contact'>" + newContact.fullName() + "</span></li>");

    $(".contact").last().click(function() {


      $(".showme h2").text(newContact.fullName());
      $(".first-name").text(newContact.firstName);
      $(".last-name").text(newContact.lastName);

      $("ul#addresses").text("");


      newContact.addresses.forEach(function(address) {
        $("ul#addresses").append("<li>" + address.fullAddress() + "</li>");
      });

      $(".showme").fadeIn(3000);

      $(".hover_color").mouseover(function() {
          $(this).css("color", "red");
      })
      .mouseout(function() {
        $(this).css("color", "initial");
      });

    });

    resetFields();
  });


});
