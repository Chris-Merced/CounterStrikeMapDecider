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

        switch (choice) {
          case "A":
            await addFriend();
            resolve();
            return;
            break;
          case "D":
            await deleteFriend();
            resolve();
            return;
            break;
          case "E":
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
        switch (verification) {
          case "Y":
            //add friend
            friends[friend.toLowerCase] = maps;
            console.log(friends);
            fs.writeFileSync(
              "friends.json",
              JSON.stringify(friends, null, 2),
              "utf-8",
            );
            console.log("Friend added!");
            resolve();
            correct = true;
            break;
          case "N":
            friend = await askUser("Input friend name: ");
            break;
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

async function deleteFriend() {}

module.exports = { options, addFriend, deleteFriend };
