// business logic

// business logic for AddressBook
function AddressBook()  {
  this.contacts = {};
  this.currentId = 0;
}

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
};

AddressBook.prototype.addContact = function(contact)
{
  contact.id = this.assignId();
  this.contacts[contact.id] = contact;
}

AddressBook.prototype.findContact = function(id)  {
  if (this.contacts[id] != undefined) {
    return this.contacts[id];
  }
  return false;
};

AddressBook.prototype.deleteContact = function(id)  {
  if (this.contacts[id] === undefined)  {
    return false;
  }
  delete this.contacts[id];
  return true;
};

//Busiess Logic for EmailAddresses

function EmailAddresses(workEmailAddress, personalEmailAddress) {
  this.workEmailAddress = workEmailAddress;
  this.personalEmailAddress = personalEmailAddress;
};

// business logic for Contacts
function Contact(firstName, lastName, phoneNumber, emailAddresses, physicalAddress)  {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
  this.emailAddresses = emailAddresses;
  this.physicalAddress = physicalAddress;
  // this.emailAddresses = {
  //    this.mainEmailAddress = mainEmailAddress,
  //    this.secondEmailAddress = secondEmailAddress,
  //    this.thirdEmailAddress = thirdEmailAddress,
     //this.emailAddresses = {
     //workEmailAdress:  
   };



EmailAddresses.prototype.allEmails = function() {
return "Work Email: " + this.workEmailAddress + " Personal Email: " + this.personalEmailAddress;
};

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
};

// User Interface Logic ---------
let addressBook = new AddressBook();

function displayContactDetails(addressBookToDisplay) {
  let contactsList = $("ul#contacts");
  let htmlForContactInfo = "";
  Object.keys(addressBookToDisplay.contacts).forEach(function(key) {
    const contact = addressBookToDisplay.findContact(key);
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";
  });
  contactsList.html(htmlForContactInfo);
}

function showContact(contactId) {
  const contact = addressBook.findContact(contactId);
  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  $(".email-address").html(contact.emailAddress)
  $(".physical-address").html(contact.physicalAddress)
  //(".")
  let buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" +  + contact.id + ">Delete</button>");
}

function attachContactListeners() {
  $("ul#contacts").on("click", "li", function() {
    showContact(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function() {
    addressBook.deleteContact(this.id);
    $("#show-contact").hide();
    displayContactDetails(addressBook);
  });
}

$(document).ready(function() {
  attachContactListeners();
  $("form#new-contact").submit(function(event) {
    event.preventDefault();
    const inputtedFirstName = $("input#new-first-name").val();
    const inputtedLastName = $("input#new-last-name").val();
    const inputtedPhoneNumber = $("input#new-phone-number").val();
    const inputtedWorkEmailAddress = $("input#new-work-email-address").val();
    const inputtedPersonalEmailAddress = $("input#new-personal-email-address").val();
    const inputtedPhysicalAddress = $("input#new-physical-address").val();

    // The next three lines are new:
    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input#new-phone-number").val("");
    $("input#new-work-email-address").val("");
    $("input#new-personal-email-address").val("");
    $("input#new-physical-address").val("");

    let newEmailAdresses = new EmailAddresses(inputtedWorkEmailAddress, inputtedPersonalEmailAddress);
    let newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, newEmailAdresses, inputtedPhysicalAddress);
    addressBook.addContact(newContact);
    console.log(newContact.emailAddresses.allEmails(newEmailAdresses))
    newContact.emailAddresses.allEmails(newEmailAdresses)
    displayContactDetails(addressBook);
    console.log(EmailAddresses());
  });
});

// let emailAddresses = {name: "Email Address", emails: []};
// let workEmailAddress = {name: "Work Email"};
// emailAddresses.email.push(workemailAddress);