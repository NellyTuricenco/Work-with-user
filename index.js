"use strict";
function run() {
  function User(firstName, lastName, age, email, password) {
    Object.defineProperty(this, "id", {
      value: Math.random().toString(),
      enumerable: false,
      configurable: false,
      writable: false,
    });
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.email = email;
    this.password = password;
  }

  User.prototype.getFullName = function () {
    return this.firstName + " " + this.lastName;
  };

  alert("Hello!");

  while (true) {
    var users = [
      new User("Bob", "Marley", "54", "bobmarley@gmail.com", "1234"),
    ];

    var message =
      "Please enter one of these options:\n a) registration \n b) authentication \n c) print users \n d) modify \n q) Quit";
    var option = prompt(message, "");

    switch (option) {
      case "a":
      case "A":
        var newUser = createUser();
        users.push(newUser);
        console.log(`${newUser.getFullName()} was registered`);
        break;
      case "b":
      case "B":
        authenticateUser(users, printUser);
        break;
      case "c":
      case "C":
        printUsers(users, printUser);
        break;
      case "d":
      case "D":
        var updatedUser = modifyUser(users);

        if (!updatedUser) break;

        var userIndex = users.findIndex(function (user) {
          return user.id === updatedUser.id;
        });

        users.splice(userIndex, 1, updatedUser);
        break;
      case "q":
      case "Q":
        alert("Goodbye!");
        return;

      default:
        console.log("Your should type one of these options (a, b, c, d)");
        return;
    }
  }

  function createUser(users) {
    var firstName = prompt("Please enter your first name", "");
    var lastName = prompt("Please enter your last name", "");
    var age = prompt("Please enter your age", "");
    var email = prompt("Please enter your email", "");
    var password = prompt("Please enter your password", "");

    return new User(firstName, lastName, age, email, password);
  }

  function printUsers(users, customPrint) {
    if (!users.length) {
      console.error("There are no users yet");
      return;
    }
    users.forEach(function (user) {
      customPrint(user);
      console.log("----------------");
    });
  }
  function printUser(user) {
    for (var key in user) {
      console.log(`[${key}: ${user[key]}]`);
    }
  }
  function authenticateUser(users) {
    var email = prompt("Please enter your email", "");
    var password = prompt("Please enter your password", "");
    var existingUser = users.find(function (user) {
      return user.email === email && user.password === password;
    });
    if (!existingUser) {
      console.error("Current user does not exists");
      return;
    }
    console.log(`${existingUser.getFullName()} was authenticated`);
  }
  function modifyUser(users) {
    var email = prompt("Enter user's email", "");

    var foundUser = users.find(function (user) {
      return user.email === email;
    });

    if (!foundUser) return null;

    var clonedUser = Object.assign(Object.create(User.prototype), foundUser);

    var message =
      "Choose one of these options: \n a) Add a new property \n b) Change existing property \n q) Return to previous menu";
    var option = prompt(message, "");
    switch (option) {
      case "a":
      case "A":
        var propName = prompt("Please enter a new property name", "");
        var propValue = prompt(`Please enter a value for ${propName}`, "");
        clonedUser[propName] = propValue;
        console.log(
          `${propName} was added to the user ${clonedUser.getFullName()}`
        );
        break;
      case "b":
      case "B":
        var keys = Object.keys(clonedUser);
        var key = prompt(`Choose one of these keys: ${keys.join(",")}`, "");
        var value = prompt(`Enter a new value for ${key}`, "");
        clonedUser[key] = value;
        console.log(
          `${key} was updated for the user ${clonedUser.getFullName()}`
        );
        break;
      case "q":
      case "Q":
        break;
    }
    return clonedUser;
  }
}
run();
