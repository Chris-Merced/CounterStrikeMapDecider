const friends = require("../src/data/friends.json");
const maps = require("../src/data/maps.json");
const askUser = require("../input");
const fs = require("fs");

async function options() {
  return new Promise(async (resolve) => {
    let trimmed = null;
    try {
      let running = true;

      while (running) {
        let choice = await askUser(
          "Select [A]dd Friend, [D]elete Friend or [E]xit \n",
        );

        switch (choice.toLowerCase()) {
          case "a":
            await addFriend();
            resolve();
            return;
            break;
          case "d":
            await deleteFriend();
            resolve();
            return;
            break;
          case "e":
            resolve();
            return;
            break;
          default:
            console.log(
              "Please select [A]dd Friend, [D]elete Friend or [E]xit \n",
            );
            break;
        }
      }
    } catch (err) {
      console.log("Error choosing Add/Delete Friend: " + err.message);
      resolve();
    }
  });
}

async function addFriend() {
  let friend = await askUser("Input friend name: ");
  let correct = false;
  return new Promise(async (resolve) => {
    try {
      while (!correct) {
        const verification = await askUser(
          `${friend} - Is this correct? (Y/N)`,
        );
        if (friends[friend.toLowerCase()]) {
          console.log("That friend already exists");
          friend = await askUser("Input friend name: ");
          continue;
        }
        switch (verification.toLowerCase()) {
          case "y":
            friends[friend.toLowerCase()] = maps;
            fs.writeFileSync(
              "./src/data/friends.json",
              JSON.stringify(friends, null, 2),
              "utf-8",
            );
            console.log("Friend added!");
            resolve();
            correct = true;
            break;
          case "n":
            friend = await askUser("Input friend name: ");
            break;
          case "e": {
            resolve();
            return;
            break;
          }
          default:
            console.log("Please Enter [Y]es or [N]o");
            break;
        }
      }
    } catch (err) {
      console.log("Error adding friend: " + err.message);
      return;
    }
  });
}

async function deleteFriend() {
  try {
    const input = await askUser("What friend would you like to delete? ");
    const friend = input.toLowerCase();

    if (friends[friend]) {
      delete friends[friend];
      fs.writeFileSync(
        "./src/data/friends.json",
        JSON.stringify(friends, null, 2),
        "utf-8",
      );
      console.log("Friend Deleted :(");
    } else {
      console.log("That friend does not exist");
    }
  } catch (err) {
    console.log("There was an error in deleting a friend: " + err);
    return;
  }
}

module.exports = { options, addFriend, deleteFriend };
